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
      `function PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\n  return createElementVNode("view")\n}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })
  test(`UTSComponents:kotlin`, () => {
    assert(
      `<view><uts-hello/><uts-hello/></view>`,
      `function PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\n  return createElementVNode("view", null, [\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name),\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name)\n  ])\n}`,
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
  test(`easycom`, () => {
    assert(
      `<view><custom/><custom/><custom1/><index/><index1/></view>`,
      `import _easycom_custom, { GenComponentsCustomCustomComponentPublicInstance as CustomComponentPublicInstance } from '@/components/custom/custom.vue'\nimport _easycom_custom1, { GenComponentsCustom1Custom1ComponentPublicInstance as Custom1ComponentPublicInstance } from '@/components/custom1/custom1.vue'\nimport _easycom_index, { GenComponentsIndexIndexComponentPublicInstance as IndexComponentPublicInstance } from '@/components/index/index.vue'\nfunction PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\nconst _component_custom = resolveEasyComponent("custom",_easycom_custom)\nconst _component_custom1 = resolveEasyComponent("custom1",_easycom_custom1)\nconst _component_index = resolveEasyComponent("index",_easycom_index)\nconst _component_index1 = resolveComponent("index1")\n\n  return createElementVNode("view", null, [\n    createVNode(_component_custom),\n    createVNode(_component_custom),\n    createVNode(_component_custom1),\n    createVNode(_component_index),\n    createVNode(_component_index1)\n  ])\n}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
        matchEasyCom(tag) {
          if (tag.startsWith('custom') || tag === 'index') {
            return `@/components/${tag}/${tag}.vue`
          }
        },
      }
    )
    assert(
      `<index/>`,
      `function PagesIndexIndexRender(): VNode | null {
const _ctx = this
const _component_index = resolveComponent("index", true)

  return createVNode(_component_index)
}`,
      {
        targetLanguage: 'kotlin',
        mode: 'function',
      }
    )
  })
})
