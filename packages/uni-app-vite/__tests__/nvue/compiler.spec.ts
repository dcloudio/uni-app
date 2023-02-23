import { NVUE_U_BUILT_IN_TAGS } from '@dcloudio/uni-shared'
import {
  ElementNode,
  ElementTypes,
  findDir,
  SimpleExpressionNode,
} from '@vue/compiler-core'
import { compileTemplate } from '@vue/compiler-sfc'
import { uniOptions } from '../../src/plugin/uni/index'
const { compilerOptions } = uniOptions('nvue')!
const filename = 'foo.vue'

function compile(source: string) {
  return compileTemplate({
    source,
    filename,
    id: filename,
    compilerOptions: {
      ...compilerOptions,
    },
  })
}

function genAst(source: string) {
  return compile(source).ast!.children[0] as ElementNode
}

function genCode(source: string) {
  return compile(source).code
}

const codes = [
  `<view>hello</view>`,
  `<view><text>hello</text></view>`,
  `<view>hello{{a}}<view>aaa{{a}}</view>{{b}}</view>`,
  `<video></video>`,
  `<video><view></view></video>`,
  `<input v-model="text"/>`,
  `<textarea v-model="text"/>`,
  `<slider/>`,
  `<scroll-view data-id="id" scroll-x="true" :show-scrollbar="true"/>`,
]

describe('app-nvue: compiler', () => {
  codes.forEach((code) => {
    test(code, () => {
      expect(genCode(code)).toMatchSnapshot()
    })
  })
  test('u-tags', () => {
    NVUE_U_BUILT_IN_TAGS.forEach((tag) => {
      expect(genAst(`<${tag}></${tag}>`).tagType).toBe(ElementTypes.ELEMENT)
    })
  })

  test('scroll-view', () => {
    genAst(`<view></view>`)
  })
  // test('render-whole', () => {
  //   expect(
  //     (
  //       (
  //         findProp(
  //           genAst(`<view :render-whole="true">hello</view>`),
  //           'appendAsTree',
  //           true,
  //           false
  //         ) as DirectiveNode
  //       ).arg as SimpleExpressionNode
  //     ).content
  //   ).toBe('appendAsTree')
  // })
  // test('unitary tag', () => {
  //   expect(
  //     findProp(genAst(`<text>hello</text>`), 'appendAsTree', true, false)
  //   ).toBeTruthy()
  // })
  test('tap=>click', () => {
    expect(
      (
        findDir(genAst(`<view @tap="click"></view>`), 'on')!
          .arg as SimpleExpressionNode
      ).content
    ).toBe('click')
  })
})
