import { parse } from '@babel/parser'
import type { SourceDescription, TransformPluginContext } from 'rollup'
import { uniViteInjectPlugin } from '../src/vite/plugins/inject'
const injectOptions = {
  sourceMap: false,
  'uni.': [
    '@dcloudio/uni-h5',
    ((method: string) => {
      // API白名单
      return ['navigateTo', 'reLaunch'].includes(method)
    }) as unknown as string,
  ],
}

describe('inject', () => {
  const filename = 'a.js'
  const context = {
    parse: (code: string) => parse(code).program,
  } as unknown as TransformPluginContext
  test(`basic`, () => {
    const plugin = uniViteInjectPlugin('uni:inject', injectOptions)
    expect(
      (
        (plugin.transform as Function).call(
          context,
          `uni.test();uni.reLaunch();`,
          filename
        ) as SourceDescription
      ).code
    ).toMatchSnapshot()
  })
  test(`reassignment`, () => {
    const plugin = uniViteInjectPlugin('uni:inject', injectOptions)
    expect(
      (
        (plugin.transform as Function).call(
          context,
          `uni.reLaunch();uni.reLaunch=()=>{};uni.reLaunch();uni.navigateTo();const temp = uni.navigateTo;uni.navigateTo();temp();`,
          filename
        ) as SourceDescription
      ).code
    ).toMatchSnapshot()
  })
  // 解构默认值也是 shorthand，但不能跳过整棵子树，
  // 否则默认值里的 uni.xxx 不会被注入
  test(`shorthand with default value`, () => {
    const plugin = uniViteInjectPlugin('uni:inject', injectOptions)
    const code = (
      (plugin.transform as Function).call(
        context,
        `const f = (item, { jumpFun = uni.reLaunch, showModal = uni.navigateTo } = {}) => { jumpFun(); showModal(); };`,
        filename
      ) as SourceDescription
    ).code
    // 快捷分支继续生效：默认值里的 uni.xxx 也要被注入
    expect(code).toContain(
      `import { reLaunch as $inject_uni_reLaunch } from '@dcloudio/uni-h5';`
    )
    expect(code).toContain(
      `import { navigateTo as $inject_uni_navigateTo } from '@dcloudio/uni-h5';`
    )
    expect(code).toContain(
      `{ jumpFun = $inject_uni_reLaunch, showModal = $inject_uni_navigateTo }`
    )
  })
  test(`shorthand identifier`, () => {
    const plugin = uniViteInjectPlugin('uni:inject', injectOptions)
    // `{ uni }` 这类真正的简写属性仍按原逻辑处理
    const code = (
      (plugin.transform as Function).call(
        context,
        `uni.navigateTo();const o = { uni };`,
        filename
      ) as SourceDescription
    ).code
    expect(code).toContain(
      `import { navigateTo as $inject_uni_navigateTo } from '@dcloudio/uni-h5';`
    )
    // 简写属性本身不会被改写
    expect(code).toContain(`const o = { uni };`)
  })
})
