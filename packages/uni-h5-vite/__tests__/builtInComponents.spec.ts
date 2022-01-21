import { BindingTypes } from '@vue/compiler-core'
import { compileTemplate } from '@vue/compiler-sfc'
import { compilerOptions } from '../src/plugin/uni'
const filename = 'foo.vue'
describe('h5: compiler', () => {
  test('builtInComponents', () => {
    expect(
      compileTemplate({
        source: `<canvas/>`,
        filename,
        id: filename,
        compilerOptions: {
          ...compilerOptions,
          bindingMetadata: {
            canvas: BindingTypes.SETUP_REF,
          },
        },
      }).code
    ).toContain(`_resolveComponent("v-uni-canvas")`)
  })
})
