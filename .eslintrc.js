const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
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
  },
  overrides: [
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['**/__tests__/**'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
      },
    },
    // Packages targeting DOM
    {
      files: [
        'packages/{uni-api,uni-app,uni-components,uni-core,uni-h5,uni-h5-vue,uni-i18n,uni-shared,uni-vue,uni-app-plus}/**',
      ],
      rules: {
        'no-restricted-globals': ['error', ...NodeGlobals],
      },
    },
    // Packages targeting Node
    {
      files: [
        'packages/{uni-cli-shared,uni-cli-nvue,uni-app-vite,uni-h5-vite,uni-mp-vite,uni-mp-compiler,vite-plugin-uni}/**',
        'packages/*/vite.config.ts',
        '.eslintrc.js',
        'scripts/**',
      ],
      rules: {
        'no-restricted-globals': ['error', ...DOMGlobals],
        'no-restricted-syntax': 'off',
      },
    },
  ],
}
