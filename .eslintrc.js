const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' },
    ],
    // most of the codebase are expected to be env agnostic
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    // since we target ES2015 for baseline support, we need to forbid object
    // rest spread usage (both assign and destructure)
    'no-restricted-syntax': [
      'error',
      'ObjectExpression > SpreadElement',
      'ObjectPattern > RestElement',
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    // This rule enforces the preference for using '@ts-expect-error' comments in TypeScript
    // code to indicate intentional type errors, improving code clarity and maintainability.
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    // Enforce the use of 'import type' for importing types
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
    '@typescript-eslint/no-import-type-side-effects': 'error',
  },
  overrides: [
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['**/__tests__/**', '**/dist/**'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
      },
    },
    // Packages targeting DOM
    {
      files: [
        'packages/{uni-api,uni-app,uni-components,uni-core,uni-h5,uni-h5-vue,uni-i18n,uni-shared,uni-vue,uni-app-plus,uni-app-harmony}/**',
      ],
      rules: {
        'no-restricted-globals': ['error', ...NodeGlobals],
      },
    },
    // Packages targeting Node
    {
      files: [
        '.eslintrc.js',
        'jest.config.js',
        'rollup.config.mjs',
        'scripts/**',
        'packages/{uni-cli-shared,uni-cli-utils,uni-app-vite,uni-h5-vite,uni-mp-vite,uni-mp-compiler,vite-plugin-uni,uts,uni-uts-v1,uni-app-uts,uni-preprocess}/**',
        'packages/*/vite.config.ts',
      ],
      rules: {
        'no-restricted-globals': ['error', ...DOMGlobals],
        'no-restricted-syntax': 'off',
      },
    },
  ],
}
