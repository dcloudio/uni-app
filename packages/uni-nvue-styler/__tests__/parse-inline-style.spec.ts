import { parseInlineStyleSync } from '../src/index'

describe('inline style', () => {
  test('app-harmony', () => {
    const code = parseInlineStyleSync(
      `
        background-color: red;border:1px solid red;
      `,
      { type: 'uvue', platform: 'app-harmony' }
    )
    expect(code).toMatchSnapshot()
  })
})
