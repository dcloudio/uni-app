import { readFileSync } from 'fs'
import path from 'path'
import * as ts from 'typescript'
import { collectExtApiUsageAst } from '../src/uts/extApi'

function collectAst(sourceFile: ts.SourceFile) {
  // 收集结果无顺序约定；排序比较仍能发现遗漏、多收集或重复结果。
  return collectExtApiUsageAst(sourceFile, ts)?.sort()
}

function collect(code: string, filename = '/src/module.ts') {
  const sourceFile = ts.createSourceFile(
    filename,
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )
  return collectAst(sourceFile)
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

  test('collects both outer and nested calls', () => {
    expect(collect('uni.showModal(uni.getSystemInfoSync())')).toEqual([
      'uni.getSystemInfoSync',
      'uni.showModal',
    ])
  })

  test('collects API references used by the statistics runtime', () => {
    expect(
      collect(`
        const out = {}
        const pick = (name, fn) => {
          if (typeof fn === 'function') out[name] = fn
        }
        pick('request', uni.request)
        pick('getNetworkType', uni.getNetworkType)
        pick('getDeviceInfo', uni.getDeviceInfo)
        const request = uni.request
        request({})
      `)
    ).toEqual(['uni.getDeviceInfo', 'uni.getNetworkType', 'uni.request'])
  })

  test.each(['uni-stat-public.es.js', 'uni-cloud-stat-vapor.es.js'])(
    'collects native dependencies from the complete %s entry',
    (entry) => {
      const filename = path.resolve(__dirname, '../../uni-stat/dist', entry)
      expect(collect(readFileSync(filename, 'utf8'), filename)).toEqual(
        expect.arrayContaining([
          'uni.getStorageSync',
          'uni.setStorageSync',
          'uni.removeStorageSync',
          'uni.getSystemInfoSync',
          'uni.getWindowInfo',
          'uni.getDeviceInfo',
          'uni.getAppBaseInfo',
          'uni.getNetworkType',
          'uni.request',
          'uni.getPushClientId',
        ])
      )
    }
  )

  test.each([
    'uni.request',
    "uni['request']({})",
    'uni[`request`]({})',
    'uni?.request?.({})',
    "uni?.['request']?.({})",
    '(uni as any).request({})',
    '(<any>uni).request({})',
    '(uni satisfies any).request({})',
    'uni!.request!({})',
    '(uni).request({})',
    '(uni.request)({})',
    'uni.request.call(uni, {})',
    'uni.request.apply(uni, [{}])',
    'uni.request.bind(uni)',
    'typeof uni.request',
    'const request = uni.request<Options>',
    '(uni<any>).request({})',
    'class C extends uni.request {}',
    'delete [uni.request]',
    'delete ({ request: uni.request })',
  ])('collects a static reference: %s', (code) => {
    expect(collect(code)).toEqual(['uni.request'])
  })

  test.each([
    'const { request } = uni',
    'let { request: send } = uni',
    "const { ['request']: send } = uni",
    'const { [`request`]: send } = uni',
    'const { request = fallback } = (uni as any)',
    '({ request } = uni)',
    '({ request: send } = uni)',
    "({ ['request']: send } = uni)",
    'const { request, ...rest } = uni',
    'function f({ request } = uni) {}',
    'const f = ({ request: send } = uni) => send({})',
    'const { x: { request } = uni } = other',
    'const [{ request } = uni] = other',
    '({ x: { request } = uni } = other)',
    '[{ request } = uni] = other',
    'function f({ x: { request } = uni }) {}',
    'function f([{ request } = uni]) {}',
  ])('collects static destructuring: %s', (code) => {
    expect(collect(code)).toEqual(['uni.request'])
  })

  test('applies the same reference rules to uniCloud', () => {
    expect(
      collect(`
        pick('callFunction', uniCloud.callFunction)
        const { importObject: load } = uniCloud
        uniCloud['init']({})
      `)
    ).toEqual([
      'uniCloud.callFunction',
      'uniCloud.importObject',
      'uniCloud.init',
    ])
  })

  test('ignores aliases and dynamic property names', () => {
    expect(
      collect(`
        const u = uni
        u.request()
        const name = 'request'
        uni[name]()
        const { [name]: send, ...rest } = uni
        service.uni.request()
        globalThis.uni.request()
        other.request()
      `)
    ).toBeUndefined()
  })

  test.each([
    'type Request = typeof uni.request',
    'let request: typeof uni.request',
    'function f(request: typeof uni.request) {}',
    'interface Request extends uni.RequestOptions {}',
    'class Request implements uni.RequestOptions {}',
    'uni.request = customRequest',
    '(uni as any).request = customRequest',
    "uni['request'] = customRequest",
    'delete uni.request',
    '({ request: uni.request } = other)',
    '[uni.request] = other',
    '[...uni.request] = other',
    'for (uni.request of items) {}',
    'for (uni.request in items) {}',
  ])('ignores types and write targets: %s', (code) => {
    expect(collect(code)).toBeUndefined()
  })

  test('retains reads inside assignments and destructuring defaults', () => {
    expect(
      collect(`
        uni.request = uni.uploadFile
        uni.request.extra = value
        const { getNetworkType = uni.getSystemInfoSync } = uni
      `)
    ).toEqual([
      'uni.getNetworkType',
      'uni.getSystemInfoSync',
      'uni.request',
      'uni.uploadFile',
    ])
  })

  test.each([
    'uni.request ||= fallback',
    'uni.request ??= fallback',
    'uni.request += fallback',
    'uni.request++',
    '({ [uni.request]: uni.uploadFile } = other)',
  ])('retains reads in write contexts: %s', (code) => {
    expect(collect(code)).toEqual(['uni.request'])
  })

  test.each([
    'function f(uni) { uni.request() }',
    'function f({ uni }) { uni.request() }',
    'function f() { uni.request(); var uni = custom }',
    '{ uni.request(); const uni = custom }',
    'try {} catch (uni) { uni.request() }',
    'for (const uni of items) { uni.request() }',
    'for (let uni = custom; ready; ) { uni.request() }',
    'const f = function uni() { return uni.request }',
    'const C = class uni { method() { return uni.request } }',
    'uni.request(); function uni() {}',
    'uni.request(); class uni {}',
    "import uni from 'custom'; uni.request()",
    "import { api as uni } from 'custom'; uni.request()",
    "import * as uni from 'custom'; uni.request()",
    "import uni = require('custom'); uni.request()",
    'declare const uni: Uni; uni.request()',
  ])('preserves name-based collection regardless of bindings: %s', (code) => {
    expect(collect(code)).toEqual(['uni.request'])
  })

  test('preserves calls in local and outer scopes', () => {
    expect(
      collect(`
        function f(uni) { uni.uploadFile() }
        { const uni = custom; uni.downloadFile() }
        for (const uni of items) { uni.connectSocket() }
        type uni = unknown
        uni.request()
      `)
    ).toEqual([
      'uni.connectSocket',
      'uni.downloadFile',
      'uni.request',
      'uni.uploadFile',
    ])
  })

  test('collects ASTs without parent pointers', () => {
    const sourceFile = ts.createSourceFile(
      '/src/module.ts',
      "pick('request', uni.request); function f(uni) { uni.uploadFile() }",
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS
    )
    expect(collectAst(sourceFile)).toEqual(['uni.request', 'uni.uploadFile'])
  })

  test('collects deeply nested ASTs without overflowing the call stack', () => {
    const sourceFile = ts.createSourceFile(
      '/src/deep.ts',
      `uni.request()${'.value'.repeat(10000)}; uni.uploadFile()`,
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS
    )
    expect(collectAst(sourceFile)).toEqual(['uni.request', 'uni.uploadFile'])
  })

  test('collects references together with calls across scopes', () => {
    expect(
      collect(`
        function f(request = uni.request) {
          var uni = custom
          uni.uploadFile()
        }
        namespace customApi { const uni = custom; uni.downloadFile() }
        class C { static { var uni = custom; uni.connectSocket() } }
        uni.getNetworkType()
      `)
    ).toEqual([
      'uni.connectSocket',
      'uni.downloadFile',
      'uni.getNetworkType',
      'uni.request',
      'uni.uploadFile',
    ])
  })

  test.each([
    'class C { [uni.request()](uni) {} }',
    'class C { constructor(@register(uni.request()) uni) {} }',
    'type T = { [uni.request()]: string }',
    'factory<{ [uni.request()]: string }>()',
    'value as { [uni.request()]: string }',
  ])('retains legacy calls in every subtree: %s', (code) => {
    expect(collect(code)).toEqual(['uni.request'])
  })

  test('collects compiler-generated ASTs with reused nodes and no parents', () => {
    const member = ts.factory.createPropertyAccessExpression(
      ts.factory.createIdentifier('uni'),
      'request'
    )
    const source = ts.factory.createSourceFile(
      [
        ts.factory.createExpressionStatement(
          ts.factory.createAssignment(member, member)
        ),
        ts.factory.createExpressionStatement(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createPartiallyEmittedExpression(
              ts.factory.createIdentifier('uni')
            ),
            'getNetworkType'
          )
        ),
      ],
      ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
      ts.NodeFlags.None
    )
    source.fileName = '/src/generated.ts'
    expect(collectAst(source)).toEqual(['uni.getNetworkType', 'uni.request'])
  })

  test.each(['in', 'of'])(
    'retains reads when a generated for-%s loop reuses its target node',
    (kind) => {
      const member = ts.factory.createPropertyAccessExpression(
        ts.factory.createIdentifier('uni'),
        'request'
      )
      const body = ts.factory.createBlock([])
      const source = ts.factory.createSourceFile(
        [
          kind === 'in'
            ? ts.factory.createForInStatement(member, member, body)
            : ts.factory.createForOfStatement(undefined, member, member, body),
        ],
        ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
        ts.NodeFlags.None
      )
      source.fileName = '/src/generated.ts'
      expect(collectAst(source)).toEqual(['uni.request'])
    }
  )

  test.each([
    'uni.',
    'uni[]',
    'uni?.',
    "uni['request'",
    'const { request: } = uni',
    'pick(uni.request,',
    'const value = (uni as',
  ])('does not throw on incomplete syntax: %s', (code) => {
    expect(() => collect(code)).not.toThrow()
  })

  test.each([
    '/project/[demo]/node_modules/@dcloudio/uni-cloud/dist/uni-cloud-x.es.js',
    'C:\\project\\[demo]\\node_modules\\@dcloudio\\uni-cloud\\dist\\uni-cloud-x-vapor.es.js',
    '\\\\server\\share\\[demo]\\uni-cloud-x-vapor.es.js',
  ])('preserves the uni-cloud-x push exclusion for %s', (filename) => {
    expect(
      collect(
        `
          pick('getPushClientId', uni.getPushClientId)
          uni['onPushMessage'](() => {})
          const { offPushMessage } = uni
          pick('request', uni.request)
        `,
        filename
      )
    ).toEqual(['uni.request'])
  })

  test('does not exclude explicit push references from other modules', () => {
    expect(collect('uni.getPushClientId')).toEqual(['uni.getPushClientId'])
  })
})
