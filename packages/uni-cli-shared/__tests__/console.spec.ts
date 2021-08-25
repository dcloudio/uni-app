import { rewriteConsoleExpr } from '../src/logs/console'
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
})
