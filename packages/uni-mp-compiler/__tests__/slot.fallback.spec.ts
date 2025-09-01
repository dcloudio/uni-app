import { assert, miniProgram } from './testUtils'

const options = {
  miniProgram: {
    ...miniProgram,
    slot: {
      fallbackContent: true,
    },
  },
}
describe('compiler: transform slot', () => {
  test('basic', () => {
    assert(
      `<button><slot/></button>`,
      `<button><slot/></button>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
  test('fallback content', () => {
    assert(
      `<button><slot>Submit</slot></button>`,
      `<button><slot>Submit</slot></button>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
  test('default slot with fallback content and props', () => {
    assert(
      `<button><slot :title="title">fallback</slot></button>`,
      `<button><block wx:if="{{$slots.d}}"><slot name="d"></slot><slot/></block><block wx:else><slot>fallback</slot></block></button>`,
      `(_ctx, _cache) => {
  return { a: _r("d", { title: _ctx.title }) }
}`,
      options
    )
  })
  test('names slots', () => {
    assert(
      `<button><slot name="text"/></button>`,
      `<button><slot name="text"/></button>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
  test('names slots with fallback content', () => {
    assert(
      `<button><slot name="text">Submit</slot></button>`,
      `<button><slot name="text">Submit</slot></button>`,
      `(_ctx, _cache) => {
  return {}
}`,
      options
    )
  })
  test('slot with fallback content and v-if', () => {
    assert(
      `<view><text v-if="ok">123</text><slot v-else :item="item"></slot></view>`,
      `<view><text wx:if="{{a}}">123</text><block wx:else><slot name="d"></slot><slot></slot></block></view>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : { b: _r("d", { item: _ctx.item }) })
}`,
      options
    )
    assert(
      `<view><text v-if="ok">123</text><slot v-else name="test" :item="item"></slot></view>`,
      `<view><text wx:if="{{a}}">123</text><slot wx:else name="test"></slot></view>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : { b: _r("test", { item: _ctx.item }) })
}`,
      options
    )
  })
})
