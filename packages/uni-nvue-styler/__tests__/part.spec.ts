import { parse } from '../src'

async function objectifierRule(input: string) {
  const { code, messages } = await parse(input, {
    logLevel: 'NOTE',
    type: 'uvue',
    platform: 'app-ios',
  })
  return {
    json: JSON.parse(code),
    messages,
  }
}

describe('nvue-styler: part', () => {
  test('basic', async () => {
    const { json, messages } = await objectifierRule(
      `.root .test-comp::part(square){left:0;}`
    )
    expect(json).toEqual({
      '::part(square)': { '.root .test-comp': { left: 0 } },
    })
    expect(messages.length).toBe(0)
  })
  test('multi class', async () => {
    const { json, messages } = await objectifierRule(
      `.root .test-comp.test-comp-dark::part(square){left:0}`
    )
    expect(json).toEqual({
      '::part(square)': { '.root .test-comp.test-comp-dark': { left: 0 } },
    })
    expect(messages.length).toBe(0)
  })
})
