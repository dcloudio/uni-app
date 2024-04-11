import { compileTemplate } from '@vue/compiler-sfc'

import { uniAppPlugin } from '../../../uni-app-vite/src/plugin'
import {
  createBlock as _createBlock,
  createCommentVNode as _createCommentVNode,
  createVNode as _createVNode,
  openBlock as _openBlock,
  withModifiers as _withModifiers,
  createApp,
  nextTick,
  ref,
} from '../../../uni-app-vue/lib/service.runtime.esm'

import { createPageNode } from '../../src/service/framework/dom/Page'

process.env.UNI_INPUT_DIR = __dirname

const defaultPageNodeOptions = {
  css: true,
  route: 'pages/index/index',
  version: 1,
  locale: 'zh_CN',
  platform: 'ios',
  pixelRatio: 1,
  windowWidth: 375,
  disableScroll: false,
  onPageScroll: false,
  onPageReachBottom: false,
  onReachBottomDistance: 50,
  statusbarHeight: 24,
  windowTop: 0,
  windowBottom: 0,
}

const { uni } = uniAppPlugin()

function compile(source: string) {
  return compileTemplate({
    source,
    filename: 'demo',
    id: 'test',
    compilerOptions: { mode: 'module', ...uni!.compilerOptions },
  }).code
}

console.log(
  compile(
    `<view class="a" @click.stop="handleClick"><view v-if="show" style="color:red">123</view></view>`
  )
)

describe('vue', () => {
  test('vdom', () => {
    const show = ref(true)
    let handleClick: Function | null = _withModifiers(() => {}, [
      'stop',
      'self',
    ])
    const Page = {
      setup() {
        return () => {
          return (
            _openBlock(),
            _createBlock(
              'view',
              {
                class: 'a',
                onClickPassiveCaptureOnce: handleClick,
              },
              [
                show.value
                  ? (_openBlock(),
                    _createBlock(
                      'view',
                      {
                        key: 0,
                        style: { color: 'red' },
                      },
                      '123'
                    ))
                  : _createCommentVNode('v-if', true),
              ],
              8 /* PROPS */,
              ['onClickPassiveCaptureOnce']
            )
          )
        }
      },
    }
    const pageNode = createPageNode(1, defaultPageNodeOptions, true)
    createApp(Page).mount(pageNode as unknown as Element)
    show.value = false
    handleClick = null
    nextTick(() => {
      pageNode.update()
    })
  })
})
