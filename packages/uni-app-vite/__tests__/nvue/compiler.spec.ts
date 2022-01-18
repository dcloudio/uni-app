import {
  DirectiveNode,
  ElementNode,
  findDir,
  findProp,
  SimpleExpressionNode,
} from '@vue/compiler-core'
import { compileTemplate } from '@vue/compiler-sfc'
import { uniOptions } from '../../src/plugin/uni/index'
process.env.UNI_COMPILER = 'nvue'
const { compilerOptions } = uniOptions()!
const filename = 'foo.vue'

function compile(source: string) {
  return compileTemplate({
    source,
    filename,
    id: filename,
    compilerOptions: {
      ...compilerOptions,
    },
  }).ast!.children[0] as ElementNode
}
describe('app-nvue: compiler', () => {
  test('u-tags', () => {
    ;[
      'text',
      'image',
      'input',
      'textarea',
      'video',
      'web-view',
      'slider',
    ].forEach((tag) => {
      expect(compile(`<${tag}></${tag}>`).tag).toBe(`u-${tag}`)
    })
  })
  test('video', () => {
    expect(compile(`<video></video>`).children.length).toBe(0)
    expect(
      (compile(`<video><view></view></video>`).children[0] as ElementNode).tag
    ).toBe('u-scalable')
  })
  test('scroll-view', () => {
    compile(`<view></view>`)
  })
  test('render-whole', () => {
    expect(
      (
        (
          findProp(
            compile(`<view :render-whole="true">hello</view>`),
            'appendAsTree',
            true,
            false
          ) as DirectiveNode
        ).arg as SimpleExpressionNode
      ).content
    ).toBe('appendAsTree')
  })
  test('unitary tag', () => {
    expect(
      findProp(compile(`<text>hello</text>`), 'appendAsTree', true, false)
    ).toBeTruthy()
  })
  test('tap=>click', () => {
    expect(
      (
        findDir(compile(`<view @tap="click"></view>`), 'on')!
          .arg as SimpleExpressionNode
      ).content
    ).toBe('click')
  })
})
