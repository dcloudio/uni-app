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
})
