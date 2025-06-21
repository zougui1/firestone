import baseConfig, { restrictEnvAccess } from '@zougui/eslint-config/base';
import nextjsConfig from '@zougui/eslint-config/nextjs';
import reactConfig from '@zougui/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
