import { defineType, defineField } from 'sanity'

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
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'videoUrl', title: 'Video URL (Reels)', type: 'url' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'captureDate', title: 'Capture Date', type: 'date' }),
    defineField({ name: 'isVisible', title: 'Is Visible', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
