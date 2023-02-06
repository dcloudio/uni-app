import path from 'path'
import { parseUTSSwiftPluginStacktrace } from '../src/stacktrace'
const stacktrace = `/uts-development-ios/dependences/buildFramework/template/xcode_ust_template/unimoduleTestUTS1/src/index.swift:3:12: error: cannot convert return expression of type 'Int' to return type 'String'
/uts-development-ios/dependences/buildFramework/template/xcode_ust_template/unimoduleTestUTS1/src/index.swift:6:12: error: cannot convert return expression of type 'Int' to return type 'String'
`

describe('uts:stacktrace', () => {
  test('parseUTSSwiftPluginStacktrace', async () => {
    const codes = await parseUTSSwiftPluginStacktrace({
      stacktrace,
      sourceMapFile: path.resolve(
        __dirname,
        './examples/sourcemap/index.swift.map'
      ),
      sourceRoot: '/Users/fxy/DCloud/test-uts',
    })
    expect(codes).toContain(
      `uni_modules/test-uts1/utssdk/app-ios/index.uts:2:10`
    )
    expect(codes).toContain(
      `uni_modules/test-uts1/utssdk/app-ios/index.uts:5:10`
    )
  })
})
