import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: '', priority: 1 },
    { path: '/leistungen', priority: 0.9 },
    { path: '/pakete', priority: 0.9 },
    { path: '/steuererklaerungen', priority: 0.9 },
    { path: '/tools', priority: 0.8 },
    { path: '/ueber-uns', priority: 0.7 },
    { path: '/kontakt', priority: 0.8 },
    { path: '/impressum', priority: 0.2 },
    { path: '/datenschutz', priority: 0.2 },
  ];

  return pages.map((page) => ({
    url: `${site.url}${page.path || '/'}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }));
}
