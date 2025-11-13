import { toSharedDataStyle } from '../../../src/dom2/processors/runtime'
import { parseStyleDecl } from './utils'

const fontWeights: [string, string][] = [
  ['font-weight', 'normal'],
  ['font-weight', 'bold'],
  ['font-weight', 'lighter'],
  ['font-weight', 'bolder'],
  ['font-weight', '400'],
  ['font-weight', '700'],
]
fontWeights.forEach(([prop, value]) => {
  test(`${prop}: ${value}`, () => {
    const result = toSharedDataStyle(parseStyleDecl(prop, value))
    expect(result).toMatchSnapshot()
  })
})
