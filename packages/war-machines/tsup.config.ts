import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm', 'cjs'],
  outDir: './dist',
});
