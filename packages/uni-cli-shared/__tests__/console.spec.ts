import { rewriteConsoleExpr } from '../src/logs/console'
import { normalizeLog } from '../src/hbx/formatLog'
const filename = 'foo.vue'
describe('console', () => {
  test('console.log', () => {
    expect(
      rewriteConsoleExpr(filename, `const a = 1;console.log(a);`)
    ).toMatchSnapshot()
  })
  test('console.log multiline', () => {
    expect(
      rewriteConsoleExpr(
        filename,
        `const a = 1;

console.log(a);
const b = 2
console.log(a,b);
console.log(a,b,c);
`
      )
    ).toMatchSnapshot()
  })
  test('console.info', () => {
    expect(
      rewriteConsoleExpr(filename, `console.info(a,b,c);`)
    ).toMatchSnapshot()
  })
  test('console.debug', () => {
    expect(
      rewriteConsoleExpr(filename, `console.info(a,b,c);`)
    ).toMatchSnapshot()
  })
  test('console.warn', () => {
    expect(
      rewriteConsoleExpr(filename, `console.info(a,b,c);`)
    ).toMatchSnapshot()
  })
  test('console.error', () => {
    expect(
      rewriteConsoleExpr(filename, `console.info(a,b,c);`)
    ).toMatchSnapshot()
  })
  test('console.log format', () => {
    expect(
      normalizeLog('log', 'at ' + filename + ':1', ['a', 'b', { a: 1 }])
    ).toBe(
      `a---COMMA---b---COMMA------BEGIN:JSON---{"a":1}---END:JSON--- at foo.vue:1`
    )
  })
})
