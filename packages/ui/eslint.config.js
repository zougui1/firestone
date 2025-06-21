import baseConfig from '@zougui/eslint-config/base';
import reactConfig from '@zougui/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
];
