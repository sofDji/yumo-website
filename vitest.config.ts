import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Mirrors the "@/*" path alias in tsconfig, so tests can import modules
  // under app/ that use it — app/sitemap.ts among them.
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['**/__tests__/**/*.test.ts'],
  },
});
