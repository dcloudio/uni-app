import {
  createIsCustomElement,
  isMiniProgramNativeTag,
  isMiniProgramUVueNativeTag,
} from '@dcloudio/uni-shared'
import { compile } from '../src'
import { assert, miniProgram } from './testUtils'

const emptyRender = `(_ctx, _cache) => {
  return {}
}`

describe('compiler: forwarded slots', () => {
  test.each([
    [`<custom><slot name="title"/></custom>`, `<slot name="title"/>`],
    [
      `<custom><template #default><slot name="title"/></template></custom>`,
      `<view><slot name="title"/></view>`,
    ],
    [
      `<custom v-slot><slot name="title"/></custom>`,
      `<view><slot name="title"/></view>`,
    ],
  ])('ordinary default slot: %s', (template, content) => {
    assert(
      template,
      `<custom u-s="{{[($slots['title'])?'d':null]}}" u-i="2a9ec0b0-0">${content}</custom>`,
      emptyRender
    )
  })

  test('scoped default slot', () => {
    assert(
      `<custom><template #default="{ title }"><slot name="title" :title="title"/></template></custom>`,
      `<custom u-s="{{[($slots['title'])?'d':null]}}" u-i="2a9ec0b0-0"><view wx:for="{{a}}" wx:for-item="v0" wx:key="b" slot="{{v0.c}}"><slot name="title"/></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w(({ title }, s0, i0) => { return { a: _r("title", { title: title }), b: i0, c: s0 }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('multiple targets and multiple sources', () => {
    assert(
      `<custom><template #default><slot name="title"/><slot name="subtitle"/></template><template #extra><slot name="extra"/></template><template #footer><text>footer</text></template></custom>`,
      `<custom u-s="{{[($slots['title']||$slots['subtitle'])?'d':null,($slots['extra'])?'extra':null,'footer']}}" u-i="2a9ec0b0-0"><view><slot name="title"/><slot name="subtitle"/></view><view slot="extra"><slot name="extra"/></view><text slot="footer">footer</text></custom>`,
      emptyRender
    )
  })

  test('default source and special names', () => {
    assert(
      `<custom><template #header><slot/></template><template #extra><slot name="1-title"/></template></custom>`,
      `<custom u-s="{{[($slots['d'])?'header':null,($slots['1-title'])?'extra':null]}}" u-i="2a9ec0b0-0"><view slot="header"><slot/></view><view slot="extra"><slot name="1-title"/></view></custom>`,
      emptyRender
    )
  })

  test('dynamic target mixed with static forwarding', () => {
    assert(
      `<custom><template #[name]><text>content</text></template><template #default><slot name="title"/></template></custom>`,
      `<custom u-s="{{[b[0],($slots['title'])?b[1]:null]}}" u-i="2a9ec0b0-0"><text slot="{{a}}">content</text><view><slot name="title"/></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _d(_ctx.name), b: _d([_ctx.name, 'd']) }
}`
    )
  })

  test('static source forwarded to a dynamic target', () => {
    assert(
      `<custom><template #[name]><slot name="title"/></template></custom>`,
      `<custom u-s="{{[($slots['title'])?b[0]:null]}}" u-i="2a9ec0b0-0"><view slot="{{a}}"><slot name="title"/></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _d(_ctx.name), b: _d([_ctx.name]) }
}`
    )
  })

  test.each([
    `<custom><slot :name="name"/></custom>`,
    `<custom><slot name="title"/><slot :name="name"/></custom>`,
    `<custom v-slot="{ title }"><slot :name="name" :title="title"/></custom>`,
    `<custom v-slot="{ name }"><slot :name="name"/></custom>`,
    `<custom v-for="item in items"><slot :name="item.name"/></custom>`,
  ])(
    'preserves dynamic sources without adding availability conditions: %s',
    (template) => {
      for (const fallbackContent of [false, true]) {
        let output = ''
        const result = compile(template, {
          filename: 'foo.vue',
          mode: 'module',
          inline: true,
          isNativeTag: isMiniProgramNativeTag,
          isCustomElement: createIsCustomElement([]),
          miniProgram: {
            ...miniProgram,
            slot: { ...miniProgram.slot, fallbackContent },
            emitFile({ source }) {
              output = source as string
              return ''
            },
          },
        })
        expect(output).toContain(`u-s="{{['d']}}"`)
        expect(output).toMatch(/<slot name="\{\{[^}]+\}\}"/)
        expect(output).not.toContain('$slots')
        expect(output).not.toContain('wx:if')
        expect(result.code).not.toContain('$slots')
      }
    }
  )

  test.each([
    'uni-mp-weixin',
    'uni-mp-alipay',
    'uni-mp-baidu',
    'uni-mp-toutiao',
    'uni-mp-lark',
    'uni-mp-qq',
    'uni-mp-kuaishou',
    'uni-mp-jd',
    'uni-mp-xhs',
    'uni-mp-harmony',
    'uni-quickapp-webview',
  ])('%s compiles independent forwarded slots for Vue and UVue', (platform) => {
    const options = require(`../../${
      platform === 'uni-mp-lark' ? 'uni-mp-toutiao' : platform
    }/src/compiler/options`)
    for (const isX of [false, true]) {
      let output = ''
      const miniProgramOptions = {
        ...(options.getMiniProgramOptions?.(isX) || options.miniProgram),
      }
      if (platform === 'uni-mp-lark') {
        // 飞书复用头条配置，但关闭原生 fallback。
        miniProgramOptions.slot = {
          ...miniProgramOptions.slot,
          fallbackContent: false,
        }
      }
      const result = compile(
        `<custom><template #default="{ title }"><slot name="title" :title="title"/></template><template #extra><slot name="extra"/></template><template #footer><text>footer</text></template></custom>`,
        {
          filename: 'foo.vue',
          mode: 'module',
          inline: true,
          isX,
          isNativeTag: isX
            ? isMiniProgramUVueNativeTag
            : isMiniProgramNativeTag,
          isCustomElement: createIsCustomElement(options.customElements || []),
          ...options.compilerOptions,
          miniProgram: {
            ...miniProgramOptions,
            emitFile({ source }) {
              output = source as string
              return ''
            },
          },
        }
      )
      const expression = output.match(/u-s="\{\{(.*?)\}\}"/)![1]
      expect(result.code).not.toContain('$slots')
      expect(output).not.toContain(miniProgramOptions.directive + 'if=')
      if (platform !== 'uni-mp-weixin') {
        expect(expression).toBe("['d','extra','footer']")
        continue
      }
      expect(expression).toBe(
        `[($slots['title'])?'d':null,($slots['extra'])?'extra':null,'footer']`
      )
      const evaluate = new Function('$slots', `return ${expression}`)
      expect(evaluate({})).toEqual([null, null, 'footer'])
      expect(evaluate({ title: true })).toEqual(['d', null, 'footer'])
      expect(evaluate({ extra: true })).toEqual([null, 'extra', 'footer'])
      expect(evaluate({ title: true, extra: true })).toEqual([
        'd',
        'extra',
        'footer',
      ])
    }
  })

  test('comments do not make a forwarded slot nonempty', () => {
    assert(
      `<custom><!-- 注释 --><slot name="title"/></custom>`,
      `<custom u-s="{{[($slots['title'])?'d':null]}}" u-i="2a9ec0b0-0"><slot name="title"/></custom>`,
      emptyRender
    )
  })

  test.each([
    `<slot name="title">fallback</slot>`,
    `<view><slot name="title"/></view>`,
    `<slot name="title"/><text>content</text>`,
    `<slot :name="name"/>`,
    `<slot v-if="ok" name="title"/>`,
    `<slot v-for="item in items" name="title"/>`,
    `<template #default v-if="ok"><slot name="title"/></template>`,
    `<template #default="{ title }" v-if="ok"><slot name="title" :title="title"/></template>`,
    `<template #default v-for="item in items"><slot name="title"/></template>`,
  ])('preserves existing behavior for other content: %s', (children) => {
    let output = ''
    compile(`<custom>${children}</custom>`, {
      filename: 'foo.vue',
      mode: 'module',
      inline: true,
      isNativeTag: isMiniProgramNativeTag,
      isCustomElement: createIsCustomElement([]),
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          output = source as string
          return ''
        },
      },
    })
    expect(output).toContain(`u-s="{{['d']}}"`)
  })
})
