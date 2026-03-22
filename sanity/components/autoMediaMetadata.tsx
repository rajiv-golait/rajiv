import { useEffect, useRef } from 'react'
import {
  set,
  useClient,
  useFormValue,
  type DateInputProps,
  type StringInputProps,
} from 'sanity'

type AssetMetadata = {
  _createdAt?: string
  originalFilename?: string
  metadata?: {
    location?: {
      lat?: number
      lng?: number
    } | null
    exif?: Record<string, unknown> | null
  } | null
} | null

function normalizeDate(value?: string | null) {
  if (!value) return null

  const trimmed = value.trim()
  const exifMatch = trimmed.match(/^(\d{4}):(\d{2}):(\d{2})/)
  if (exifMatch) {
    return `${exifMatch[1]}-${exifMatch[2]}-${exifMatch[3]}`
  }

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`
  }

  const date = new Date(trimmed)
  if (Number.isNaN(date.getTime())) return null

  return date.toISOString().slice(0, 10)
}

function parseDateFromFilename(filename?: string | null) {
  if (!filename) return null

  const compactMatch = filename.match(/(20\d{2})(\d{2})(\d{2})/)
  if (compactMatch) {
    return `${compactMatch[1]}-${compactMatch[2]}-${compactMatch[3]}`
  }

  const dashedMatch = filename.match(/(20\d{2})[-_](\d{2})[-_](\d{2})/)
  if (dashedMatch) {
    return `${dashedMatch[1]}-${dashedMatch[2]}-${dashedMatch[3]}`
  }

  return null
}

function formatLocation(metadata?: AssetMetadata) {
  const location = metadata?.metadata?.location
  if (typeof location?.lat === 'number' && typeof location?.lng === 'number') {
    return `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
  }

  const exif = metadata?.metadata?.exif
  const gpsLatitude = exif?.GPSLatitude
  const gpsLongitude = exif?.GPSLongitude

  if (typeof gpsLatitude === 'number' && typeof gpsLongitude === 'number') {
    return `${gpsLatitude.toFixed(5)}, ${gpsLongitude.toFixed(5)}`
  }

  return null
}

function getDateFromMetadata(metadata?: AssetMetadata) {
  const exif = metadata?.metadata?.exif
  const candidates = [
    typeof exif?.DateTimeOriginal === 'string' ? exif.DateTimeOriginal : null,
    typeof exif?.CreateDate === 'string' ? exif.CreateDate : null,
    parseDateFromFilename(metadata?.originalFilename),
    metadata?._createdAt ?? null,
  ]

  for (const candidate of candidates) {
    const normalized = normalizeDate(candidate)
    if (normalized) return normalized
  }

  return null
}

function useAssetMetadata() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const image = useFormValue(['image']) as { asset?: { _ref?: string } | null } | undefined
  const videoFile = useFormValue(['videoFile']) as { asset?: { _ref?: string } | null } | undefined

  const imageRef = image?.asset?._ref
  const videoRef = videoFile?.asset?._ref

  const fetchMetadata = async () => {
    const ref = imageRef || videoRef
    if (!ref) return null

    return client.fetch<AssetMetadata>(
      `*[_id == $id][0]{
        _createdAt,
        originalFilename,
        metadata{
          location,
          exif
        }
      }`,
      { id: ref }
    )
  }

  return { fetchMetadata, imageRef, videoRef }
}

export function AutoCaptureDateInput(props: DateInputProps) {
  const attemptedRef = useRef<string | null>(null)
  const { fetchMetadata, imageRef, videoRef } = useAssetMetadata()

  useEffect(() => {
    if (props.value) return

    const ref = imageRef || videoRef
    if (!ref || attemptedRef.current === ref) return
    attemptedRef.current = ref

    let cancelled = false

    ;(async () => {
      const metadata = await fetchMetadata()
      if (cancelled) return

      const value = getDateFromMetadata(metadata)
      if (value) props.onChange(set(value))
    })()

    return () => {
      cancelled = true
    }
  }, [fetchMetadata, imageRef, props, videoRef])

  return props.renderDefault(props)
}

export function AutoLocationInput(props: StringInputProps) {
  const attemptedRef = useRef<string | null>(null)
  const { fetchMetadata, imageRef, videoRef } = useAssetMetadata()

  useEffect(() => {
    if (props.value) return

    const ref = imageRef || videoRef
    if (!ref || attemptedRef.current === ref) return
    attemptedRef.current = ref

    let cancelled = false

    ;(async () => {
      const metadata = await fetchMetadata()
      if (cancelled) return

      const value = formatLocation(metadata)
      if (value) props.onChange(set(value))
    })()

    return () => {
      cancelled = true
    }
  }, [fetchMetadata, imageRef, props, videoRef])

  return props.renderDefault(props)
}
