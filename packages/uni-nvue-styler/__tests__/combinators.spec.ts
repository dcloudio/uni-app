import { parse } from '../src'

async function objectifierRule(input: string) {
  const { code, messages } = await parse(input, {
    combinators: true,
    logLevel: 'NOTE',
  })
  return {
    json: JSON.parse(code),
    messages,
  }
}

describe('nvue-styler: combinators', () => {
  test('descendant', async () => {
    const { json, messages } = await objectifierRule(
      ` .bar {left:5;}.foo     .bar {left: 0;}.foo .bar{left:5;right:10;}.bar .bar{left:2}.foo .bar .foobar{left:1}`
    )
    console.log(json, messages)
    expect(json).toEqual({
      bar: {
        left: 5,
      },
      '.bar': {
        '.foo': {
          left: 5,
          right: 10,
        },
        '.bar': {
          left: 2,
        },
      },
      '.foobar': { '.foo .bar': { left: 1 } },
    })
    expect(messages.length).toBe(0)
  })
})
