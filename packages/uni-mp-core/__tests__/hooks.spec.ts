import { type ComponentOptions, defineComponent } from 'vue'
import { initHooks, initUnknownHooks } from '../src/runtime/componentHooks'

const vueBasicOptions = defineComponent({
  onLoad() {},
  beforeCreate() {},
}) as ComponentOptions

const vueExtendsOptions = defineComponent({
  extends: vueBasicOptions,
  onShow() {},
}) as ComponentOptions

const vueMixinsOptions = defineComponent({
  mixins: [vueExtendsOptions],
  onHide() {},
}) as ComponentOptions

const vueExtendsANdMixinsOptions = defineComponent({
  extends: vueBasicOptions,
  mixins: [vueMixinsOptions],
  onReady() {},
}) as ComponentOptions

describe('hooks', () => {
  test('basic', () => {
    const mpOptions: any = {}
    initUnknownHooks(mpOptions, vueBasicOptions)
    expect(mpOptions.onLoad).toBeDefined()
    expect(mpOptions.beforeCreate).toBeUndefined()
  })
  test('excludes', () => {
    const mpOptions: any = {}
    initHooks(mpOptions, ['onReady'])
    initUnknownHooks(mpOptions, vueBasicOptions)
    expect(mpOptions.onReady).toBeUndefined()
    expect(mpOptions.onLoad).toBeDefined()
  })
  test('extends', () => {
    const mpOptions: any = {}
    initUnknownHooks(mpOptions, vueExtendsOptions)
    expect(mpOptions.onLoad).toBeDefined()
    expect(mpOptions.onShow).toBeDefined()
  })
  test('mixins', () => {
    const mpOptions: any = {}
    initUnknownHooks(mpOptions, vueMixinsOptions)
    expect(mpOptions.onLoad).toBeDefined()
    expect(mpOptions.onShow).toBeDefined()
    expect(mpOptions.onHide).toBeDefined()
  })
  test('extends and mixins', () => {
    const mpOptions: any = {}
    initUnknownHooks(mpOptions, vueExtendsANdMixinsOptions)
    expect(mpOptions.onLoad).toBeDefined()
    expect(mpOptions.onReady).toBeUndefined()
    expect(mpOptions.onShow).toBeDefined()
    expect(mpOptions.onHide).toBeDefined()
  })
})
