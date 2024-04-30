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
})
