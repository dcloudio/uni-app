import { assert } from './testUtils'

describe('compiler:codegen', () => {
  test('default', () => {
    assert(`<view/>`, `createElementVNode("view")`)
    assert(
      `<view style="width:100px;height:100px;"/>`,
      `createElementVNode("view", utsMapOf({ style: "width:100px;height:100px;" }))`
    )
    assert(
      `<text>{{msg}}</text>`,
      `createElementVNode("text", null, toDisplayString(_ctx.msg), 1 /* TEXT */)`
    )
  })
  test('remove comments', () => {
    assert(
      `<view>
  <!-- comment -->
</view>`,
      `createElementVNode("view")`
    )
    assert(
      `<view>
  <!-- comment1 -->
  <text>test</text>
  <!-- comment2 -->
</view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "test")
])`
    )
  })
  test(`function:kotlin`, () => {
    assert(
      `<view/>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\n  return createElementVNode("view")\n}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })
  test(`UTSComponents:kotlin`, () => {
    assert(
      `<view><uts-hello/><uts-hello/></view>`,
      `@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\n  return createElementVNode("view", null, [\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name),\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name)\n  ])\n}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
        parseUTSComponent(name) {
          if (name === 'uts-hello') {
            return {
              className: 'UtsHelloComponent',
              namespace: 'uts.sdk.modules.utsHello',
              source: '@/uni_modules/uts-hello',
            }
          }
        },
      }
    )
  })
  test(`UTSComponents:kotlin`, () => {
    assert(
      `<view><custom/><custom/><custom1/></view>`,
      `import _easycom_custom from '@/components/custom/custom.vue'\nimport _easycom_custom1 from '@/components/custom1/custom1.vue'\n@Suppress("UNUSED_PARAMETER") function PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\nconst _component_custom = resolveEasyComponent("custom",_easycom_custom)\nconst _component_custom1 = resolveEasyComponent("custom1",_easycom_custom1)\n\n  return createElementVNode("view", null, [\n    createVNode(_component_custom),\n    createVNode(_component_custom),\n    createVNode(_component_custom1)\n  ])\n}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
        matchEasyCom(tag) {
          if (tag.startsWith('custom')) {
            return `@/components/${tag}/${tag}.vue`
          }
        },
      }
    )
  })
})
