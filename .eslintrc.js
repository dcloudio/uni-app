const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'after-used', argsIgnorePattern: '^_' }
    ],
    // most of the codebase are expected to be env agnostic
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    // since we target ES2015 for baseline support, we need to forbid object
    // rest spread usage (both assign and destructure)
    'no-restricted-syntax': [
      'error',
      'ObjectExpression > SpreadElement',
      'ObjectPattern > RestElement'
    ]
  },
  overrides: [
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['**/__tests__/**'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off'
      }
    },
    // Packages targeting DOM
    {
      files: [
        'packages/{uni-components,uni-h5,uni-h5-vue,uni-shared,uni-core}/**'
      ],
      rules: {
        'no-restricted-globals': ['error', ...NodeGlobals]
      }
    },
    // Packages targeting Node
    {
      files: ['packages/{vue-cli-plugin-uni,vue-cli-plugin-hbuilderx}/**'],
      rules: {
        'no-restricted-globals': ['error', ...DOMGlobals],
        'no-restricted-syntax': 'off'
      }
    }
  ]
}
