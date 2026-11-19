const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const ts = require('typescript')
const { createBuildTypeScriptPlugin } = require('../buildTypeScript')

// 模拟 rpt2 的模块级编译器共享，以及在 options 钩子中创建服务。
function createPlugins(typescript = ts) {
  let compiler
  return createBuildTypeScriptPlugin((options) => {
    compiler = options.typescript
    return {
      options(host) {
        return compiler.createLanguageService(host)
      },
    }
  }, typescript)
}

function createBuildTypeScript(typescript, entry, options = {}) {
  const plugin = createPlugins(typescript)(
    { check: false, ...options },
    entry,
    options.watch
  )
  return { createLanguageService: (host) => plugin.options(host) }
}

describe('按入口构建 TypeScript', () => {
  let directory
  let versions

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), '构建 [源码](test)-'))
    versions = new Map()
  })

  afterEach(() => fs.removeSync(directory))

  function write(name, code) {
    const filename = path.join(directory, name)
    fs.outputFileSync(filename, code)
    versions.set(filename, (versions.get(filename) || 0) + 1)
    return filename
  }

  function createService(compiler, roots, options = {}) {
    const settings = {
      target: ts.ScriptTarget.ES2015,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      noLib: true,
      types: [],
      ...options,
    }
    return compiler.createLanguageService({
      getCompilationSettings: () => settings,
      getScriptFileNames: () => roots,
      getScriptVersion: (name) =>
        String(versions.get(path.normalize(name)) || 0),
      getScriptSnapshot: (name) =>
        fs.existsSync(name)
          ? ts.ScriptSnapshot.fromString(fs.readFileSync(name, 'utf8'))
          : undefined,
      getCurrentDirectory: () => directory,
      getDefaultLibFileName: () => '',
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      readDirectory: ts.sys.readDirectory,
      directoryExists: ts.sys.directoryExists,
      getDirectories: ts.sys.getDirectories,
    })
  }

  test('只在缓存未命中需要 emit 时分析项目，保留全局声明和间接模块补充', () => {
    const entry = write(
      'entry.ts',
      `
      import { Value } from './constants'
      import { type Model, ExtraFlags } from './model'
      export const value = Value.Enabled + GlobalFlags.Enabled + BareFlags.Enabled + ExtraFlags.On
      export const model: Model = { added: true }
    `
    )
    write('constants.ts', 'export const enum Value { Enabled = 1 }')
    write('model.ts', 'export interface Model {}')
    const unused = write(
      'unused.ts',
      "import './augment'; import './augment-model'; export const unused = 1"
    )
    write(
      'augment.ts',
      `
      export {}
      declare global { const enum GlobalFlags { Enabled = 2 } }
    `
    )
    write(
      'augment-model.ts',
      `
      import './model'
      declare module './model' {
        interface Model { added: boolean }
        const enum ExtraFlags { On = 16 }
      }
    `
    )
    const bare = write('bare.ts', 'const enum BareFlags { Enabled = 4 }')
    const roots = [entry, unused, bare]
    const analyze = jest.fn(ts.createProgram)
    const compiler = createBuildTypeScript(
      { ...ts, createProgram: analyze },
      entry
    )
    const actual = createService(compiler, roots)
    const baseline = createService(ts, roots)
    try {
      expect(analyze).not.toHaveBeenCalled()
      expect(actual.getEmitOutput(entry)).toEqual(baseline.getEmitOutput(entry))
      expect(analyze).toHaveBeenCalledTimes(1)
      const program = actual.getProgram()
      const normalizedRoots = program
        .getRootFileNames()
        .map((name) => path.normalize(name))
      expect(normalizedRoots).not.toContain(unused)
      expect(normalizedRoots).toContain(path.join(directory, 'augment.ts'))
      expect(normalizedRoots).toContain(
        path.join(directory, 'augment-model.ts')
      )
      expect(actual.getEmitOutput(entry).outputFiles[0].text).toContain(
        '16 /* ExtraFlags.On */'
      )
      expect(actual.getEmitOutput(entry).outputFiles[0].text).toContain(
        '2 /* GlobalFlags.Enabled */'
      )
      write(
        'augment.ts',
        `
        export {}
        declare global { const enum GlobalFlags { Enabled = 8 } }
      `
      )
      expect(actual.getEmitOutput(entry)).toEqual(baseline.getEmitOutput(entry))
      expect(actual.getEmitOutput(entry).outputFiles[0].text).toContain(
        '8 /* GlobalFlags.Enabled */'
      )
      expect(analyze).toHaveBeenCalledTimes(1)
    } finally {
      actual.dispose()
      baseline.dispose()
    }
  })

  test('Rollup 别名引入的额外文件仍可 emit', () => {
    const entry = write('entry.ts', 'export const value = 1')
    const extra = write('alias.ts', 'export const extra: number = 2')
    const service = createService(createBuildTypeScript(ts, entry), [entry])
    try {
      service.getEmitOutput(entry)
      expect(service.getEmitOutput(extra).outputFiles[0].text).toContain(
        'extra = 2'
      )
    } finally {
      service.dispose()
    }
  })

  test.each(['check', 'declaration', 'watch', 'defaultCheck'])(
    '%s 模式保留全部项目范围，多个入口不会串配置',
    (option) => {
      const entry = write('entry.ts', 'export const value = 1')
      const other = write('other.ts', 'export const other = 2')
      const unused = write('unused.ts', 'export const unused = 3')
      const roots = [entry, other, unused]
      const analyze = jest.fn(ts.createProgram)
      const build = createPlugins({ ...ts, createProgram: analyze })
      // 先创建全部插件，再执行各自的钩子，与 Rollup 多输出配置一致。
      const full = build(
        option === 'defaultCheck' ? {} : { check: option === 'check' },
        entry,
        option === 'watch'
      )
      const first = build({ check: false }, entry)
      const second = build({ check: false }, other)
      const services = [full, first, second].map((plugin, index) =>
        createService(
          { createLanguageService: (host) => plugin.options(host) },
          roots,
          { declaration: index === 0 && option === 'declaration' }
        )
      )
      try {
        services[0].getEmitOutput(entry)
        expect(services[0].getProgram().getRootFileNames()).toEqual(roots)
        expect(analyze).not.toHaveBeenCalled()
        services[1].getEmitOutput(entry)
        services[2].getEmitOutput(other)
        expect(services[1].getProgram().getRootFileNames()).toEqual([entry])
        expect(services[2].getProgram().getRootFileNames()).toEqual([other])
        expect(analyze).toHaveBeenCalledTimes(2)
      } finally {
        services.forEach((service) => service.dispose())
      }
    }
  )

  test('未被入口直接引用的声明文件仍参与 const enum 求值', () => {
    const entry = write('entry.ts', 'export const value = Flags.On')
    const declaration = write(
      'ambient.d.ts',
      'declare const enum Flags { On = 3 }'
    )
    const service = createService(createBuildTypeScript(ts, entry), [
      entry,
      declaration,
    ])
    try {
      expect(service.getEmitOutput(entry).outputFiles[0].text).toContain(
        '3 /* Flags.On */'
      )
    } finally {
      service.dispose()
    }
  })
})
