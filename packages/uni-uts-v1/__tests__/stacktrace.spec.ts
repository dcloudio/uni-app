import path from 'path'
import {
  parseCompileStacktrace,
  parseUTSArkTSPluginStacktrace,
  parseUTSKotlinStacktrace,
  parseUTSSwiftPluginStacktrace,
} from '../src/stacktrace'
import { hbuilderKotlinCompileErrorFormatter } from '../src/stacktrace/kotlin'
import { normalizePath } from '../src/shared'
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
      sourceRoot: '/Users/xxx/DCloud/test-uts',
    })
    expect(codes).toContain(
      `uni_modules/test-uts1/utssdk/app-ios/index.uts:2:10`
    )
    expect(codes).toContain(
      `uni_modules/test-uts1/utssdk/app-ios/index.uts:5:10`
    )

    const codes2 = await parseCompileStacktrace(stacktrace, {
      platform: 'app-ios',
      language: 'swift',
      sourceMapFile: path.resolve(
        __dirname,
        './examples/sourcemap/index.swift.map'
      ),
      sourceRoot: '/Users/xxx/DCloud/test-uts',
    })
    expect(codes2).toContain(
      `uni_modules/test-uts1/utssdk/app-ios/index.uts:2:10`
    )
    expect(codes2).toContain(
      `uni_modules/test-uts1/utssdk/app-ios/index.uts:5:10`
    )
  })
  test('parseUTSKotlinStacktrace', async () => {
    const inputDir = `/Users/xxx/HBuilderProjects/test-x/unpackage/dist/dev/.kotlin/src`
    const sourceMapDir = path.resolve(
      __dirname,
      'examples/uts/unpackage/dist/dev/.sourcemap/app'
    )
    expect(
      await parseUTSKotlinStacktrace(
        [
          {
            type: 'warning',
            message:
              'Classpath entry points to a non-existent location: /Users/xxx/HBuilderProjects/test-x/unpackage/dist/dev/.kotlin/class',
          },
          {
            type: 'error',
            message: 'Unresolved reference: test',
            file: `${inputDir}/components/test/test.kt`,
            line: 33,
            column: 21,
          },
        ],
        {
          inputDir,
          sourceMapDir,
          replaceTabsWithSpace: true,
          format: hbuilderKotlinCompileErrorFormatter,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseUTSKotlinStacktrace(
        [
          {
            type: 'warning',
            message:
              'Classpath entry points to a non-existent location: /Users/xxx/HBuilderProjects/test-x/unpackage/dist/dev/.kotlin/class',
          },
          {
            type: 'error',
            message: 'Unresolved reference: test',
            file: `${inputDir}/index.kt`,
            line: 19,
            column: 39,
          },
        ],
        {
          inputDir,
          sourceMapDir,
          replaceTabsWithSpace: true,
          format: hbuilderKotlinCompileErrorFormatter,
        }
      )
    ).toMatchSnapshot()
  })
  test('parseUTSArkTSPluginStacktrace', async () => {
    const inputDir = normalizePath(path.resolve(__dirname, 'examples/uts'))
    const outputDir = normalizePath(
      path.resolve(__dirname, 'examples/uts/unpackage/dist/dev/app-harmony')
    )
    expect(
      await parseUTSArkTSPluginStacktrace(
        `1 ERROR: ArkTS:ERROR File: ${inputDir}/unpackage/debug/app-harmony-9ed02395/uni_modules/native-button/utssdk/app-harmony/index.ets:74:48
 Argument of type 'UniNativeViewElement | null' is not assignable to parameter of type 'UniNativeViewElement'.
  Type 'null' is not assignable to type 'UniNativeViewElement'.`,
        {
          inputDir,
          outputDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseCompileStacktrace(
        `2 ERROR: ArkTS:ERROR File: ${inputDir}/unpackage/debug/app-harmony-9ed02395/uni_modules/native-button/utssdk/app-harmony/builder.ets:8:9
 Cannot find name 'param'. Did you mean 'params'?`,
        {
          platform: 'app-harmony',
          language: 'arkts',
          inputDir,
          outputDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseUTSArkTSPluginStacktrace(
        `3 ERROR: ArkTS:ERROR File: ${inputDir}/unpackage/debug/app-harmony-9ed02395/uni_modules/native-button/utssdk/app-harmony/index.ets:73:17
 Cannot find name 'nativeViewElemen'. Did you mean 'nativeViewElement'?`,
        {
          inputDir,
          outputDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseUTSArkTSPluginStacktrace(
        `1 WARN: ArkTS:WARN File: D:/demo-projects/demo-app-x/unpackage/debug/app-harmony-fde54b25/oh_modules/.ohpm/@dcloudio+uni-app-x-runtime@8kwvevyo0ovlx9ebtjtkdkzydpkx+j5qpbuuwz5vjge=/oh_modules/@dcloudio/uni-app-x-runtime/src/main/ets/runtime/dom/NamedNodeMap.ets:16:45`,
        {
          inputDir: 'D:/demo-projects/demo-app-x/',
          outputDir:
            'D:/demo-projects/demo-app-x/unpackage/dist/dev/app-harmony',
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseUTSArkTSPluginStacktrace(
        `Error Message: Cannot find name 'nativeViewElemen'. Did you mean 'nativeViewElement'?. At File: ${inputDir}/unpackage/debug/app-harmony-9ed02395/uni_modules/native-button/utssdk/app-harmony/index.ets:73:17`,
        {
          inputDir,
          outputDir,
        }
      )
    ).toMatchSnapshot()
  })
})
