import { defineType, defineField } from 'sanity'
import { AutoCaptureDateInput, AutoLocationInput } from '../components/autoMediaMetadata'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ 
      name: 'type', 
      title: 'Type', 
      type: 'string', 
      options: { list: ['photo', 'reel', 'cinematic', 'bts'] }
    }),
    defineField({ 
      name: 'aspectRatio', 
      title: 'Aspect Ratio', 
      type: 'string', 
      options: { list: ['16:9', '4:5', '9:16', '1:1'] }
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { metadata: ['exif', 'location'] },
    }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'videoUrl', title: 'Video URL (Reels)', type: 'url' }),
    defineField({ name: 'videoFile', title: 'Video File', type: 'file', options: { accept: 'video/*' } }),
    defineField({
      name: 'videoOrientation',
      title: 'Video Orientation',
      type: 'string',
      options: { list: ['horizontal', 'vertical'] },
    }),
    defineField({
      name: 'isRotatedPhoneVideo',
      title: 'Is Rotated Phone Video',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      components: { input: AutoLocationInput },
      description: 'Auto-fills from asset GPS metadata when available.',
    }),
    defineField({
      name: 'captureDate',
      title: 'Capture Date',
      type: 'date',
      components: { input: AutoCaptureDateInput },
      description: 'Auto-fills from EXIF or file metadata when available.',
    }),
    defineField({ name: 'isVisible', title: 'Is Visible', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
