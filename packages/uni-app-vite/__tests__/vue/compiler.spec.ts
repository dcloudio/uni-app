import { compileTemplate } from '@vue/compiler-sfc'
import { uniOptions } from '../../src/plugin/uni/index'
const { compilerOptions } = uniOptions('vue')!
const filename = 'foo.vue'

function compile(source: string) {
  return compileTemplate({
    source,
    filename,
    id: filename,
    compilerOptions: {
      ...compilerOptions,
    },
  })
}

function genCode(source: string) {
  return compile(source).code
}

const codes = [
  `<view :prop="options" :change:prop="renderScript.updateOptions"/>`,
]

describe('app-vue: compiler', () => {
  codes.forEach((code) => {
    test(code, () => {
      expect(genCode(code)).toMatchSnapshot()
    })
  })
})
