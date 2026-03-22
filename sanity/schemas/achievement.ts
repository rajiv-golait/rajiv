import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'event', title: 'Event', type: 'string' }),
    defineField({ name: 'position', title: 'Position', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'isFeatured', title: 'Is Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'isVisible', title: 'Is Visible', type: 'boolean', initialValue: true }),
  ],
})
