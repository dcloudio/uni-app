import { parseProgram } from '../src/mp/ast'
import { parseExternalClasses } from '../src/mp/externalClasses'

describe('externalClasses', () => {
  const filename = '/usr/xxx/projects/test/src/components/test/test.vue'
  test(`basic`, async () => {
    const source = `
export default {
  externalClasses: ['my-class']
}
`
    const program = parseProgram(source, filename, {})
    expect(parseExternalClasses(program)).toEqual(['my-class'])
  })
})
