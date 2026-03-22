export function getPortableTextPreview(
  blocks: Array<{ children?: Array<{ text?: string | null } | null> } | null> | null | undefined
) {
  if (!blocks?.length) return ''

  return blocks
    .flatMap((block) => block?.children ?? [])
    .map((child) => child?.text?.trim() ?? '')
    .filter(Boolean)
    .join(' ')
    .trim()
}

export function formatMonthYear(value?: string | null) {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatYear(value?: string | null) {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
}

export function getGalleryAspectClass(aspectRatio?: string | null) {
  switch (aspectRatio) {
    case '9:16':
      return 'aspect-[9/16]'
    case '16:9':
      return 'aspect-video'
    case '1:1':
      return 'aspect-square'
    case '4:5':
    default:
      return 'aspect-[4/5]'
  }
}

export function getProjectCategories(projects: Array<{ category?: string | null } | null> | null | undefined) {
  const categories = new Set<string>()

  for (const project of projects ?? []) {
    if (project?.category) categories.add(project.category)
  }

  return ['all', ...Array.from(categories)]
}

export function titleCaseCategory(value?: string | null) {
  if (!value) return ''

  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('/')
}

export function getResumeHref(settings: { resumeFile?: { asset?: { url?: string | null } | null } | null; resumeUrl?: string | null } | null | undefined) {
  return settings?.resumeFile?.asset?.url || settings?.resumeUrl || null
}

export function getInstagramHandle(url?: string | null) {
  if (!url) return null

  const match = url.match(/instagram\.com\/([^/?#]+)/i)
  if (!match?.[1]) return null

  return `@${match[1].replace(/\/+$/, '')}`
}
