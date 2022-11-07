import path from 'path'
import { parseUtsSwiftPluginStacktrace } from '../src/stacktrace'
const stacktrace = `/uts-development-ios/dependences/buildFramework/template/xcode_ust_template/unimoduleTestUts1/src/index.swift:3:12: error: cannot convert return expression of type 'Int' to return type 'String'\n    return 1;\n           ^\nnote: Building targets in dependency order\n/Applications/HBuilderX-Alpha.app/Contents/HBuilderX/plugins/uts-development-ios/dependences/buildFramework/template/xcode_ust_template/unimoduleTestUts1/UTS.xcodeproj: warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 9.0, but the range of supported deployment target versions is 11.0 to 16.1.99. (in target 'unimoduleTestUts1' from project 'UTS')\n`

describe('uts:stacktrace', () => {
  test('parseUtsSwiftPluginStacktrace', async () => {
    const codes = await parseUtsSwiftPluginStacktrace({
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
  })
})
