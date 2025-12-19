import { parse } from '../src'

async function objectifierRule(input: string) {
  const { code, messages } = await parse(input, {
    logLevel: 'NOTE',
  })
  return {
    json: JSON.parse(code),
    messages,
  }
}

describe('nvue-styler: combinators', () => {
  test('compound', async () => {
    const { json, messages } = await objectifierRule(`.a.b{left:0}`)
    expect(json).toEqual({ b: { '.a': { left: 0 } } })
    expect(messages.length).toBe(0)
    const res = await objectifierRule(`.a .b.c.d{left:0}`)
    expect(res.json).toEqual({ d: { '.a .b.c': { left: 0 } } })
    expect(res.messages.length).toBe(0)
    const res1 = await objectifierRule(
      `.a .b .d.e.c{left:0} .c{left:1} .a .c{left:2}`
    )
    expect(res1.json).toEqual({
      c: { '.a .b .d.e': { left: 0 }, '': { left: 1 }, '.a ': { left: 2 } },
    })
    expect(res1.messages.length).toBe(0)
    const res2 = await objectifierRule(`.a .b .c.d.e .f{left:0}`)
    expect(res2.json).toEqual({ f: { '.a .b .c.d.e ': { left: 0 } } })
    expect(res2.messages.length).toBe(0)
  })
  test('descendant', async () => {
    const { json, messages } = await objectifierRule(
      ` .bar {left:5!important;}.foo     .bar {left: 0!important;}.foo .bar{left:5;right:5;right:10!important}.bar .bar{left:2}.foo .bar .foobar{left:1}`
    )

    expect(json).toEqual({
      bar: {
        '': {
          '!left': 5,
        },
        '.foo ': {
          '!left': 0,
          '!right': 10,
        },
        '.bar ': {
          left: 2,
        },
      },
      foobar: { '.foo .bar ': { left: 1 } },
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
          '': {
            left: 5,
          },
          [`.foo${type}`]: {
            left: 5,
            right: 10,
          },
          [`.bar${type}`]: {
            left: 2,
          },
        },
        foobar: { [`.foo${type}.bar${type}`]: { left: 1 } },
      })
      expect(messages.length).toBe(0)
    }
  })
})
