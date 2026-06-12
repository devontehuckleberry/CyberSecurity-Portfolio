import type { MetadataRoute } from 'next'

const BASE = 'https://cyber-security-portfolio-ten.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/resume`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/projects/active-directory-purple-lab`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projects/hijack-investigation`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projects/metasploitable-lab`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projects/sql-investigation`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projects/vulnerability-assessment`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projects/incident-journal`, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
