const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const ts = require('typescript')
const rpt2 = require('rollup-plugin-typescript2')
const { createBuildTypeScriptPlugin } = require('../buildTypeScript')

function selectConfig(options, include, watch = false) {
  let received
  const build = createBuildTypeScriptPlugin((options) => {
    received = options
    return { options() {} }
  }, ts)
  build(options, '/entry.ts', watch, include)
  return received
}

function readConfig(filename, include) {
  const { config, error } = ts.readConfigFile(filename, ts.sys.readFile)
  if (error)
    throw new Error(ts.flattenDiagnosticMessageText(error.messageText, '\n'))
  return ts.parseJsonConfigFileContent(
    include ? { ...config, include } : config,
    ts.sys,
    path.dirname(filename),
    {},
    filename
  )
}

function parsePluginConfig(filename, include) {
  let parsed
  let service
  const build = createBuildTypeScriptPlugin(rpt2, {
    ...ts,
    parseJsonConfigFileContent(...args) {
      parsed = ts.parseJsonConfigFileContent(...args)
      return parsed
    },
    createLanguageService(...args) {
      service = ts.createLanguageService(...args)
      return service
    },
  })
  try {
    build(
      {
        tsconfig: filename,
        check: false,
        tsconfigOverride: { compilerOptions: { declaration: false } },
        verbosity: 0,
      },
      '',
      false,
      include
    ).options({})
    expect(parsed.errors).toEqual([])
    return parsed
  } finally {
    if (service) service.dispose()
  }
}

describe('构建专用 TypeScript 范围', () => {
  test.each([
    '/work/中文 [仓库](test)/tsconfig.json',
    'C:\\中文 [仓库](test)\\tsconfig.json',
    '\\\\server\\share\\中文 [仓库](test)\\tsconfig.json',
  ])('只覆盖 include，保留配置路径和其他选项：%s', (filename) => {
    const options = {
      tsconfig: filename,
      check: false,
      tsconfigOverride: {
        compilerOptions: { declaration: false },
        exclude: ['**/__tests__'],
      },
    }
    const include = ['src/runtime', 'src/**/*.d.ts']
    expect(selectConfig(options, include)).toMatchObject({
      ...options,
      tsconfigOverride: { ...options.tsconfigOverride, include },
    })
    expect(options.tsconfigOverride.include).toBeUndefined()
  })

  test.each([
    'check',
    'declaration',
    'watch',
    'unknownDeclaration',
    'defaultCheck',
  ])('%s 保留完整包配置', (mode) => {
    const options = {
      tsconfig: '/tsconfig.json',
      check: mode === 'check',
      tsconfigOverride: {
        compilerOptions: {
          declaration:
            mode === 'unknownDeclaration' ? undefined : mode === 'declaration',
        },
      },
    }
    if (mode === 'defaultCheck') delete options.check
    expect(
      selectConfig(options, ['src/runtime'], mode === 'watch').tsconfigOverride
    ).toEqual(options.tsconfigOverride)
  })

  test.each(['uni-app-plus', 'uni-app-harmony'])(
    '%s 的 service 范围独立提供高德地图声明',
    (target) => {
      const directory = fs.mkdtempSync(
        path.join(os.tmpdir(), '地图 [类型](test)-')
      )
      try {
        const packageDir = path.resolve(__dirname, '../../packages', target)
        const group = fs
          .readJsonSync(path.join(packageDir, 'build.json'))
          .find((group) => group.transpileInclude?.includes('src/service'))
        const config = parsePluginConfig(
          path.join(packageDir, 'tsconfig.json'),
          group.transpileInclude
        )
        const declaration = path.join(packageDir, 'src/service/map-types.d.ts')
        expect(config.fileNames.map((name) => path.normalize(name))).toContain(
          declaration
        )
        const probe = path.join(directory, 'probe.ts')
        fs.writeFileSync(
          probe,
          'export type Point = AMap.LngLat; export const sdk = window.AMap'
        )
        const program = ts.createProgram([probe, declaration], {
          noEmit: true,
          strict: true,
          skipLibCheck: true,
          types: [],
          moduleResolution: ts.ModuleResolutionKind.Node10,
        })
        expect(ts.getPreEmitDiagnostics(program)).toEqual([])
      } finally {
        fs.removeSync(directory)
      }
    }
  )

  test('真实 rpt2 的分组根文件符合预期，保留入口、声明及原编译选项', () => {
    const packages = path.resolve(__dirname, '../../packages')
    let selected = 0
    for (const name of fs.readdirSync(packages)) {
      const directory = path.join(packages, name)
      const buildFile = path.join(directory, 'build.json')
      if (!fs.existsSync(buildFile)) continue
      const json = fs.readJsonSync(buildFile)
      const groups = (Array.isArray(json) ? json : [json]).filter(
        (group) => group.transpileInclude
      )
      if (!groups.length) continue
      const filename = path.join(directory, 'tsconfig.json')
      const full = parsePluginConfig(filename)
      for (const group of groups) {
        selected++
        const scoped = parsePluginConfig(filename, group.transpileInclude)
        // rpt2 按下标合并数组；确保原 include 的尾部不会额外引入其他入口。
        const expected = readConfig(filename, group.transpileInclude)
        expect(scoped.fileNames.slice().sort()).toEqual(
          expected.fileNames.slice().sort()
        )
        expect(scoped.options).toEqual(full.options)
        const names = new Set(
          scoped.fileNames.map((name) => path.normalize(name))
        )
        for (const entry of Object.keys(group.input))
          expect(names).toContain(path.resolve(directory, entry))
        for (const declaration of full.fileNames.filter((name) =>
          name.endsWith('.d.ts')
        ))
          expect(names).toContain(path.normalize(declaration))
      }
    }
    expect(selected).toBeGreaterThan(0)
  })
})
