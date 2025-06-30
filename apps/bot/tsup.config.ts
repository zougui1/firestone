import { defineConfig } from 'tsup';

export default defineConfig({
  skipNodeModulesBundle: false,
  noExternal: ['@zougui/firestone.db', '@zougui/firestone.war-machines'],
});
