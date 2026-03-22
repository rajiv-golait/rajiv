import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ 
      name: 'zone', 
      title: 'Zone', 
      type: 'string', 
      options: { list: ['ai-ml', 'data', 'etc', 'tools'] }
    }),
    defineField({ 
      name: 'proficiency', 
      title: 'Proficiency', 
      type: 'string',
      options: { list: ['built-with', 'comfortable', 'exploring'] }
    }),
    defineField({ name: 'isVisible', title: 'Is Visible', type: 'boolean', initialValue: true }),
  ],
})
