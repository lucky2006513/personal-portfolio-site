import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? '';
const isUserSite =
  repository !== '' &&
  owner !== '' &&
  repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://example.com');
const base = repository && !isUserSite ? `/${repository}` : '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
