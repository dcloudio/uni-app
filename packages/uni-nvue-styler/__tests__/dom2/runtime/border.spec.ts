import { toSharedDataStyle } from '../../../src/dom2/processors/runtime'
import { parseStyleDecl } from './utils'

const borders: [string, string][] = [
  ['border', '1px solid red'],
  ['border-width', 'thin'],
  ['border-width', 'medium'],
  ['border-width', 'thick'],
]
borders.forEach(([prop, value]) => {
  test(`${prop}: ${value}`, () => {
    const result = toSharedDataStyle(parseStyleDecl(prop, value))
    expect(result).toMatchSnapshot()
  })
})
