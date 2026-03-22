import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image' }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'architectureDiagram', title: 'Architecture Diagram', type: 'image' }),
    defineField({ name: 'techStack', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: { list: ['ai-ml', 'data', 'hardware', 'hackathon'] } 
    }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
    defineField({ name: 'isFeatured', title: 'Is Featured', type: 'boolean' }),
    defineField({ name: 'isVisible', title: 'Is Visible', type: 'boolean' }),
    defineField({ 
      name: 'source', 
      title: 'Source', 
      type: 'string', 
      options: { list: ['manual', 'github'] },
      initialValue: 'manual'
    }),
    defineField({ name: 'githubRepoId', title: 'GitHub Repo ID', type: 'number', hidden: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
