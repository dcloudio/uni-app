let dynamicImportPolyfill = false
try {
  /* eslint-disable no-restricted-globals */
  require.resolve('dynamic-import-polyfill')
  dynamicImportPolyfill = true
} catch (e) {}

export const dynamicImportCode = dynamicImportPolyfill
  ? `import dynamicImportPolyfill from 'dynamic-import-polyfill'
dynamicImportPolyfill.initialize({
  importFunctionName: 'dynamicImportPolyfill'
})
`
  : ''
