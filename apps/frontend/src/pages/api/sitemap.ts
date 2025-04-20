// pages/api/sitemap.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogSlugs } from '../../../lib/getBlogSlugs';
// or adjust based on file depth


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://intoturnone.com';

  const staticPaths = [
    '',
    'blog',
    'news',
    'calendar',
    'standings',
    'about',
  ];

  const slugs = getBlogSlugs();

  const urls = [
    ...staticPaths.map(
      (slug) => `
      <url>
        <loc>${baseUrl}/${slug}</loc>
        <changefreq>weekly</changefreq>
      </url>`
    ),
    ...slugs.map(
      (slug) => `
      <url>
        <loc>${baseUrl}/blog/${slug}</loc>
        <changefreq>monthly</changefreq>
      </url>`
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
