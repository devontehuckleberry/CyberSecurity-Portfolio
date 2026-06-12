import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://cyber-security-portfolio-ten.vercel.app/sitemap.xml',
  }
}
