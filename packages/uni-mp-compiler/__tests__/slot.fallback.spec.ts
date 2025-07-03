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
})
