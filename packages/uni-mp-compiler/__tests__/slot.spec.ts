import { assert } from './testUtils'

describe('compiler: transform slot', () => {
  test('basic', () => {
    assert(
      `<button><slot/></button>`,
      `<button><slot/></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('fallback content', () => {
    assert(
      `<button><slot>Submit</slot></button>`,
      `<button><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('names slots', () => {
    assert(
      `<button><slot name="text"/></button>`,
      `<button><slot name="text"/></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('names slots with fallback content', () => {
    assert(
      `<button><slot name="text">Submit</slot></button>`,
      `<button><block wx:if="{{$slots.text}}"><slot name="text"></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
