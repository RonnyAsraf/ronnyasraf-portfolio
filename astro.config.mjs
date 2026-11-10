import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ronnyasraf.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
