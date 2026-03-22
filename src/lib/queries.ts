import { groq } from 'next-sanity'

export const publishedProjectsQuery = groq`*[_type == "project" && isVisible == true] | order(isFeatured desc, order asc) {
  ...,
}`
export const featuredProjectQuery = groq`*[_type == "project" && isFeatured == true && isVisible == true] | order(order asc)[0] {
  ...,
}`
export const projectsByCategoryQuery = groq`*[_type == "project" && category == $cat && isVisible == true]`
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]`

export const publishedGalleryQuery = groq`*[_type == "galleryItem" && isVisible == true] | order(order asc) {
  ...,
}`
export const galleryItemBySlugQuery = groq`*[_type == "galleryItem" && slug.current == $slug][0]`

export const certificationsQuery = groq`*[_type == "certification" && isVisible == true] | order(order asc) {
  ...,
}`
export const achievementsQuery = groq`*[_type == "achievement" && isVisible == true] | order(isFeatured desc, date desc) {
  ...,
}`
export const experienceQuery = groq`*[_type == "experience"] | order(order asc) {
  ...,
}`
export const skillsQuery = groq`*[_type == "skill" && isVisible == true] | order(zone asc) {
  ...,
}`
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  ...,
  resumeFile {
    asset->{
      url,
      originalFilename
    }
  }
}`
