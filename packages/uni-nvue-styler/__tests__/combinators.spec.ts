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
      ` .bar {left:5!important;}.foo     .bar {left: 0!important;}.foo .bar{left:5;right:5;right:10!important}.bar .bar{left:2}.foo .bar .foobar{left:1}`
    )
    expect(json).toEqual({
      bar: {
        '!left': 5,
      },
      '.bar': {
        '.foo': {
          '!left': 0,
          '!right': 10,
        },
        '.bar': {
          left: 2,
        },
      },
      '.foobar': { '.foo .bar': { left: 1 } },
    })
    expect(messages.length).toBe(0)
  })
  test('other', async () => {
    const types = ['>', '+', '~']
    for (const type of types) {
      const { json, messages } = await objectifierRule(
        ` .bar {left:5;}.foo   ${type}  .bar {left: 0;}.foo${type} .bar{left:5;right:10;}.bar ${type}.bar{left:2}.foo ${type}.bar ${type}.foobar{left:1}`
      )
      expect(json).toEqual({
        bar: {
          left: 5,
        },
        '.bar': {
          [`.foo${type}`]: {
            left: 5,
            right: 10,
          },
          [`.bar${type}`]: {
            left: 2,
          },
        },
        '.foobar': { [`.foo${type}.bar${type}`]: { left: 1 } },
      })
      expect(messages.length).toBe(0)
    }
  })
})
