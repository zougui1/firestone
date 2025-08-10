import baseConfig from '@zougui/eslint-config/base';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    }
  },
];
