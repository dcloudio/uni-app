import { BindingTypes } from '@vue/compiler-core'
import { compileTemplate } from '@vue/compiler-sfc'
import { compilerOptions } from '../src/plugin/uni'
const filename = 'foo.vue'

function compile(source: string) {
  return compileTemplate({
    source,
    filename,
    id: filename,
    compilerOptions: {
      ...compilerOptions,
      bindingMetadata: {
        canvas: BindingTypes.SETUP_REF,
      },
    },
  })
}
describe('h5: compiler', () => {
  test('tap=>click', () => {
    expect(compile('<view @tap="tap"/>').code).toContain(`onClick`)
    expect(compile('<map @tap="tap"/>').code).toContain(`onTap`)
  })
  test('builtInComponents', () => {
    expect(compile('<canvas/>').code).toContain(
      `_resolveComponent("v-uni-canvas")`
    )
    expect(compile('<loading/>').code).toContain(`_resolveComponent("loading")`)
  })
})
