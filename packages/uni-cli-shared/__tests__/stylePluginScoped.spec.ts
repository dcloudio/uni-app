import postcss, { type ProcessOptions } from 'postcss'

import scopedPlugin from '../src/postcss/plugins/stylePluginScoped'

const styleCode = `{color:red;}`
const deepSelectors = [
  ['>>> a', ' a', ':deep(a)'],
  ['a >>> b', 'a b', 'a :deep(b)'],
  ['a >>> b>c', 'a b>c', 'a :deep(b>c)'],
  ['>>> a b', ' a b', ':deep(a b)'],
  ['/deep/ a', ' a', ':deep(a)'],
  ['a /deep/ b', 'a b', 'a :deep(b)'],
  ['a /deep/ b>c', 'a b>c', 'a :deep(b>c)'],
  ['/deep/ a b', ' a b', ':deep(a b)'],
  ['::v-deep a', ' a', ':deep(a)'],
  ['a ::v-deep b', 'a b', 'a :deep(b)'],
  ['a ::v-deep b>c', 'a b>c', 'a :deep(b>c)'],
  ['::v-deep a b', ' a b', ':deep(a b)'],
  ['::v-deep a b,::v-deep a', ' a b, a', ':deep(a b),:deep(a)'],
]
const removeDeepCssCodes = Object.create(null)
const rewriteDeepCssCodes = Object.create(null)
deepSelectors.forEach(([selector, removeDeepSelector, rewriteDeepSelector]) => {
  removeDeepCssCodes[selector + styleCode] = removeDeepSelector + styleCode
  rewriteDeepCssCodes[selector + styleCode] = rewriteDeepSelector + styleCode
})

const processor = postcss([scopedPlugin])

const processorWithVueSfcScoped = postcss([
  scopedPlugin,
  {
    postcssPlugin: 'vue-sfc-scoped',
  },
])

const options: ProcessOptions = { from: 'a.css', map: false }
describe('cssScoped', () => {
  Object.keys(removeDeepCssCodes).forEach((cssCode) => {
    test('remove ' + cssCode, async () => {
      return processor.process(cssCode, options).then((result) => {
        expect(result.css).toBe(removeDeepCssCodes[cssCode])
      })
    })
  })
  Object.keys(rewriteDeepCssCodes).forEach((cssCode) => {
    test('rewrite ' + cssCode, async () => {
      return processorWithVueSfcScoped
        .process(cssCode, options)
        .then((result) => {
          expect(result.css).toBe(rewriteDeepCssCodes[cssCode])
        })
    })
  })
})
