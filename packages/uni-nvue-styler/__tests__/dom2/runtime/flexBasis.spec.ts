import { toSharedDataStyle } from '../../../src/dom2/processors/runtime'
import { parseStyleDecl } from './utils'

const flexBasis: [string, string][] = [
  ['flex-basis', '100px'],
  ['flex-basis', '100%'],
  ['flex-basis', 'auto'],
]
flexBasis.forEach(([prop, value]) => {
  test(`${prop}: ${value}`, () => {
    const result = toSharedDataStyle(parseStyleDecl(prop, value))
    expect(result).toMatchSnapshot()
  })
})
