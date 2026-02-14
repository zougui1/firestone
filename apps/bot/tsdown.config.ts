import { defineConfig } from 'tsdown';

export default defineConfig({
  skipNodeModulesBundle: false,
  noExternal: ['@zougui/firestone.db', '@zougui/firestone.types', '@zougui/firestone.war-machines'],
});
