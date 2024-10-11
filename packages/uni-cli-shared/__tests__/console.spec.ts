import { rewriteConsoleExpr } from '../src/logs/console'
const filename = 'foo.vue'
const METHOD = '__f__'
describe('console', () => {
  test('console.log', () => {
    expect(
      rewriteConsoleExpr(
        METHOD,
        filename,
        filename,
        `const a = 1;console.log(a, JSON.stringify(1));`
      ).code
    ).toMatchSnapshot()
  })
  test('console.log multiline', () => {
    expect(
      rewriteConsoleExpr(
        METHOD,
        filename,
        filename,
        `const a = 1;

console.log(a);
const b = 2
console.log(a,b);
console.log(a,b,c);
`
      ).code
    ).toMatchSnapshot()
  })
  test('console.info', () => {
    expect(
      rewriteConsoleExpr(METHOD, filename, filename, `console.info(a,b,c);`)
        .code
    ).toMatchSnapshot()
  })
  test('console.debug', () => {
    expect(
      rewriteConsoleExpr(METHOD, filename, filename, `console.info(a,b,c);`)
        .code
    ).toMatchSnapshot()
  })
  test('console.warn', () => {
    expect(
      rewriteConsoleExpr(METHOD, filename, filename, `console.info(a,b,c);`)
        .code
    ).toMatchSnapshot()
  })
  test('console.error', () => {
    expect(
      rewriteConsoleExpr(METHOD, filename, filename, `console.info(a,b,c);`)
        .code
    ).toMatchSnapshot()
  })
})
