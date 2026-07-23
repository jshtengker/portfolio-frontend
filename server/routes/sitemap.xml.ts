import { projects } from '~~/shared/data/projects'

export default defineEventHandler((event) => {
  const baseUrl = 'https://jshtngkr.pages.dev'
  const staticRoutes = ['', '/about', '/projects']
  const projectRoutes = projects.map(p => `/projects/${p.id}`)

  const allRoutes = [...staticRoutes, ...projectRoutes]

  const sitemapEntries = allRoutes
    .map((route) => {
      const priority = route === '' ? '1.0' : route === '/projects' || route === '/about' ? '0.8' : '0.6'
      return `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return xml
})
