import { assert } from './testUtils'

describe('compiler:codegen', () => {
  test('default', () => {
    assert(`<view/>`, `_cE("view")`)
    assert(
      `<view style="width:100px;height:100px;"/>`,
      `_cE("view", _uM({
  style: _nS(_uM({"width":"100px","height":"100px"}))
}), null, 4 /* STYLE */)`
    )
    assert(
      `<text>{{msg}}</text>`,
      `_cE("text", null, _tD(_ctx.msg), 1 /* TEXT */)`
    )
  })
  test('remove comments', () => {
    assert(
      `<view>
  <!-- comment -->
</view>`,
      `_cE("view")`
    )
    assert(
      `<view>
  <!-- comment1 -->
  <text>test</text>
  <!-- comment2 -->
</view>`,
      `_cE("view", null, [
  _cE("text", null, "test")
])`
    )
  })
  test(`function:kotlin`, () => {
    assert(
      `<view/>`,
      `function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view")
}`,
      {
        mode: 'module',
      }
    )
  })
  test(`UTSComponents`, () => {
    assert(
      `<view><uts-hello/><uts-hello/></view>`,
      `import { UtsHelloComponent } from '@/uni_modules/uts-hello'
function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", null, [
    _cE(UtsHelloComponent.name),
    _cE(UtsHelloComponent.name)
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
      }
    )
    assert(
      `<view><uts-hello/><uts-hello/><uts-hello1/></view>`,
      `import { UtsHelloComponent } from '@/uni_modules/uts-hello'
import { UtsHello1Component } from '@/uni_modules/uts-hello'
function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", null, [
    _cE(UtsHelloComponent.name),
    _cE(UtsHelloComponent.name),
    _cE(UtsHello1Component.name)
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
      `import _easycom_custom from '@/components/custom/custom.vue'
import _easycom_custom1 from '@/components/custom1/custom1.vue'
import _easycom_index from '@/components/index/index.vue'
function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_custom = resolveEasyComponent("custom",_easycom_custom)
const _component_custom1 = resolveEasyComponent("custom1",_easycom_custom1)
const _component_index = resolveEasyComponent("index",_easycom_index)
const _component_index1 = resolveComponent("index1")

  return _cE("view", null, [
    _cV(_component_custom),
    _cV(_component_custom),
    _cV(_component_custom1),
    _cV(_component_index),
    _cV(_component_index1)
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
      `function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_index = resolveComponent("index", true)

  return _cV(_component_index)
}`,
      {
        mode: 'module',
      }
    )
  })
  test(`UTSComponents and easycom`, () => {
    assert(
      `<view><uts-hello/><uts-hello/><custom/><custom/><custom1/><index/><index1/></view>`,
      `import _easycom_custom from '@/components/custom/custom.vue'
import _easycom_custom1 from '@/components/custom1/custom1.vue'
import _easycom_index from '@/components/index/index.vue'
import { UtsHelloComponent } from '@/uni_modules/uts-hello'
function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_custom = resolveEasyComponent("custom",_easycom_custom)
const _component_custom1 = resolveEasyComponent("custom1",_easycom_custom1)
const _component_index = resolveEasyComponent("index",_easycom_index)
const _component_index1 = resolveComponent("index1")

  return _cE("view", null, [
    _cE(UtsHelloComponent.name),
    _cE(UtsHelloComponent.name),
    _cV(_component_custom),
    _cV(_component_custom),
    _cV(_component_custom1),
    _cV(_component_index),
    _cV(_component_index1)
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
      `import _imports_0 from './logo.png'
function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE(\"image\", _uM({ src: _imports_0 }))
}`,
      {
        mode: 'module',
      }
    )
  })
})
