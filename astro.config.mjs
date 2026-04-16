import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.it-concept.kr',
  output: 'server',
  adapter: vercel(),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr', ko: 'ko' }
      }
    })
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ko'],
    routing: { prefixDefaultLocale: false }
  }
});
