import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'heroPortrait', title: 'Hero Portrait', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'cgpa', title: 'CGPA', type: 'number' }),
    defineField({ name: 'resumeUrl', title: 'Resume URL', type: 'url' }),
    defineField({ name: 'resumeFile', title: 'Resume File', type: 'file' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'falconInstagram', title: 'Falcon Instagram URL', type: 'url' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'photographyAlias', title: 'Photography Alias', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text' }),
  ],
})
