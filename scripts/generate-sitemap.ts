#!/usr/bin/env node

/**
 * Generate sitemap.xml with updated lastmod timestamp
 *
 * This script updates the sitemap.xml file with the current date
 * before the build process to ensure search engines see fresh content.
 */

import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITEMAP_PATH = join(__dirname, '..', 'public', 'sitemap.xml');
const SITE_URL = 'https://cylpolentracker.miguelangelcolmenero.es/';

/**
 * Get current date in ISO format (YYYY-MM-DD)
 */
function getCurrentDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Generate sitemap XML content
 */
function generateSitemapXML(lastmod: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <!-- Language alternates for multi-language support -->
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}" />
  </url>
</urlset>
`;
}

/**
 * Main function to update sitemap
 */
function updateSitemap(): void {
  try {
    const currentDate = getCurrentDate();
    const sitemapContent = generateSitemapXML(currentDate);

    // Write the updated sitemap
    writeFileSync(SITEMAP_PATH, sitemapContent, 'utf-8');

    console.log(`Sitemap updated successfully!`);
    console.log(`   Location: ${SITEMAP_PATH}`);
    console.log(`   Last modified: ${currentDate}`);
  } catch (error) {
    console.error('Error updating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
updateSitemap();
