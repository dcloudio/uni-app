import { HTML_TO_MINI_PROGRAM_TAGS } from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

describe('compiler: transform tag', () => {
  test('html', () => {
    Object.keys(HTML_TO_MINI_PROGRAM_TAGS).forEach((htmlTag) => {
      // 自闭合
      assert(
        `<${htmlTag}/>`,
        `<${HTML_TO_MINI_PROGRAM_TAGS[htmlTag]}/>`,
        `(_ctx, _cache) => {
  return {}
}`
      )
      // 成对标签
      assert(
        `<${htmlTag}></${htmlTag}>`,
        `<${HTML_TO_MINI_PROGRAM_TAGS[htmlTag]}></${HTML_TO_MINI_PROGRAM_TAGS[htmlTag]}>`,
        `(_ctx, _cache) => {
  return {}
}`
      )
    })
  })
  test('built-in custom elements', () => {
    assert(
      `<uni-cloud-db-element/>`,
      `<uni-cloud-db-element u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('built-in custom elements (x)', () => {
    assert(
      `<uni-cloud-db-element ref="udb"/>`,
      `<view u-t="uni-cloud-db-element" ref="udb" id="r0-2a9ec0b0" style="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', { "name": "uni-cloud-db-element", "type": 2 }, 'udb'), b: _s(_ses('r0-2a9ec0b0')) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
})
