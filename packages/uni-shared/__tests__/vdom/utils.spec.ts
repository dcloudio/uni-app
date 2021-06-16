import {
  ATTR_MAP,
  COMPONENT_MAP,
  encodeTag,
  encodeAttr,
} from '../../src/vdom/encode'
import { decodeTag, decodeAttr } from '../../src/vdom/decode'

describe('encode', () => {
  test('tag', () => {
    Object.keys(COMPONENT_MAP).forEach((tag) => {
      const encodedTag = encodeTag(tag)
      expect(decodeTag(encodedTag)).toBe(tag.toLowerCase())
    })
    const encodedTag = encodeTag('unicloud-db')
    expect(decodeTag(encodedTag)).toBe(encodedTag)
  })
  test('attr', () => {
    Object.keys(ATTR_MAP).forEach((name) => {
      const encodedAttr = encodeAttr(name)
      expect(decodeAttr(encodedAttr)).toBe(name)
    })
    const encodedAttr = encodeAttr('id')
    expect(decodeAttr(encodedAttr)).toBe(encodedAttr)
  })
})
