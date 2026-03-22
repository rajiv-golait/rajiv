import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'issuer', title: 'Issuer', type: 'string' }),
    defineField({ name: 'issueDate', title: 'Issue Date', type: 'date' }),
    defineField({ name: 'credentialUrl', title: 'Credential URL', type: 'url' }),
    defineField({ name: 'badgeImage', title: 'Badge Image', type: 'image' }),
    defineField({ name: 'isVisible', title: 'Is Visible', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
