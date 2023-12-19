import { assert } from './testUtils'

describe('compiler:codegen', () => {
  test('default', () => {
    assert(`<view/>`, `createElementVNode("view")`)
    assert(
      `<view style="width:100px;height:100px;"/>`,
      `createElementVNode("view", utsMapOf({
  style: normalizeStyle(utsMapOf({"width":"100px","height":"100px"}))
}), null, 4 /* STYLE */)`
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
      `
function PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\nconst _cache = this.$.renderCache\n  return createElementVNode("view")\n}`,
      {
        mode: 'module',
      }
    )
  })
  test(`UTSComponents`, () => {
    assert(
      `<view><uts-hello/><uts-hello/></view>`,
      `import { UtsHelloElement } from 'uts.sdk.modules.utsHello';\nfunction PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\nconst _cache = this.$.renderCache\n  return createElementVNode("view", null, [\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name),\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name)\n  ])\n}`,
      {
        mode: 'module',
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
    assert(
      `<view><uts-hello/><uts-hello/><uts-hello1/></view>`,
      `import { UtsHelloElement } from 'uts.sdk.modules.utsHello';import { UtsHello1Element } from 'uts.sdk.modules.utsHello';\nfunction PagesIndexIndexRender(): VNode | null {\nconst _ctx = this\nconst _cache = this.$.renderCache\n  return createElementVNode("view", null, [\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name),\n    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name),\n    createElementVNode(uts.sdk.modules.utsHello.UtsHello1Component.name)\n  ])\n}`,
      {
        mode: 'module',
        parseUTSComponent(name) {
          if (name === 'uts-hello') {
            return {
              className: 'UtsHelloComponent',
              namespace: 'uts.sdk.modules.utsHello',
              source: '@/uni_modules/uts-hello',
            }
          } else if (name === 'uts-hello1') {
            return {
              className: 'UtsHello1Component',
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
      `
import _easycom_custom from '@/components/custom/custom.vue'
import _easycom_custom1 from '@/components/custom1/custom1.vue'
import _easycom_index from '@/components/index/index.vue'
function PagesIndexIndexRender(): VNode | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_custom = resolveEasyComponent("custom",_easycom_custom)
const _component_custom1 = resolveEasyComponent("custom1",_easycom_custom1)
const _component_index = resolveEasyComponent("index",_easycom_index)
const _component_index1 = resolveComponent("index1")

  return createElementVNode("view", null, [
    createVNode(_component_custom),
    createVNode(_component_custom),
    createVNode(_component_custom1),
    createVNode(_component_index),
    createVNode(_component_index1)
  ])
}`,
      {
        mode: 'module',
        matchEasyCom(tag) {
          if (tag.startsWith('custom') || tag === 'index') {
            return `@/components/${tag}/${tag}.vue`
          }
        },
      }
    )
    assert(
      `<index/>`,
      `
function PagesIndexIndexRender(): VNode | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_index = resolveComponent("index", true)

  return createVNode(_component_index)
}`,
      {
        mode: 'module',
      }
    )
  })
  test(`UTSComponents and easycom`, () => {
    assert(
      `<view><uts-hello/><uts-hello/><custom/><custom/><custom1/><index/><index1/></view>`,
      `import { UtsHelloElement } from 'uts.sdk.modules.utsHello';
import _easycom_custom from '@/components/custom/custom.vue'
import _easycom_custom1 from '@/components/custom1/custom1.vue'
import _easycom_index from '@/components/index/index.vue'
function PagesIndexIndexRender(): VNode | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_custom = resolveEasyComponent("custom",_easycom_custom)
const _component_custom1 = resolveEasyComponent("custom1",_easycom_custom1)
const _component_index = resolveEasyComponent("index",_easycom_index)
const _component_index1 = resolveComponent("index1")

  return createElementVNode("view", null, [
    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name),
    createElementVNode(uts.sdk.modules.utsHello.UtsHelloComponent.name),
    createVNode(_component_custom),
    createVNode(_component_custom),
    createVNode(_component_custom1),
    createVNode(_component_index),
    createVNode(_component_index1)
  ])
}`,
      {
        mode: 'module',
        parseUTSComponent(name) {
          if (name === 'uts-hello') {
            return {
              className: 'UtsHelloComponent',
              namespace: 'uts.sdk.modules.utsHello',
              source: '@/uni_modules/uts-hello',
            }
          }
        },
        matchEasyCom(tag) {
          if (tag.startsWith('custom') || tag === 'index') {
            return `@/components/${tag}/${tag}.vue`
          }
        },
      }
    )
  })
  test('Import non-static directory resources', () => {
    assert(
      `<image src="./logo.png"></image>`,
      `
import _imports_0 from './logo.png'

function PagesIndexIndexRender(): VNode | null {
const _ctx = this
const _cache = this.$.renderCache
  return createElementVNode(\"image\", utsMapOf({ src: _imports_0 }))
}`,
      {
        mode: 'module',
      }
    )
  })
})
