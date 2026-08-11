import * as ts from 'typescript'
import { collectExtApiUsageAst } from '../src/uts/extApi'

function collect(code: string) {
  const sourceFile = ts.createSourceFile(
    '/src/module.ts',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )
  return collectExtApiUsageAst(sourceFile, ts)
}

describe('collectExtApiUsageAst', () => {
  test('collects and deduplicates uni and uniCloud calls', () => {
    expect(
      collect(`
        uni.request({ url: 'https://example.com' })
        uniCloud.callFunction({ name: 'test' })
        uni.request({ url: 'https://example.com/again' })
      `)
    ).toEqual(['uni.request', 'uniCloud.callFunction'])
  })

  test('keeps the existing post-order traversal', () => {
    expect(collect('uni.showModal(uni.getSystemInfoSync())')).toEqual([
      'uni.getSystemInfoSync',
      'uni.showModal',
    ])
  })

  test('ignores non-call and computed member access', () => {
    expect(
      collect(`
        const request = uni.request
        uni['request']()
        service.uni.request()
        other.request()
      `)
    ).toBeUndefined()
  })
})
