import fs from 'fs'
import os from 'os'
import path from 'path'
import { M } from '../src/messages'
import { uniStatsPlugin } from '../src/vite/plugins/stats'

describe('stats', () => {
  const originalAppX = process.env.UNI_APP_X
  const originalPlatform = process.env.UNI_PLATFORM
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalVaporRenderTarget = process.env.UNI_APP_X_VAPOR_RENDER_TARGET
  const originalChangedFiles = process.env.UNI_APP_CHANGED_FILES

  afterEach(() => {
    restoreEnv('UNI_APP_X', originalAppX)
    restoreEnv('UNI_PLATFORM', originalPlatform)
    restoreEnv('UNI_APP_X_DOM2', originalDom2)
    restoreEnv('UNI_APP_X_VAPOR_RENDER_TARGET', originalVaporRenderTarget)
    restoreEnv('UNI_APP_CHANGED_FILES', originalChangedFiles)
    jest.restoreAllMocks()
  })

  function restoreEnv(name: string, value: string | undefined) {
    if (value === undefined) {
      Reflect.deleteProperty(process.env, name)
    } else {
      process.env[name] = value
    }
  }

  function createManifest(vapor: boolean, vaporRenderTarget?: string) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-stats-'))
    const file = path.join(dir, 'manifest.json')
    fs.writeFileSync(
      file,
      JSON.stringify({
        'uni-app-x': {
          vapor,
          'vapor-render-target': vaporRenderTarget,
        },
      })
    )
    return file
  }

  function watchChange(plugin: ReturnType<typeof uniStatsPlugin>, id: string) {
    const hook = plugin.watchChange as any
    if (typeof hook === 'function') {
      hook(id)
      return
    }
    hook?.handler(id, { event: 'update' })
  }

  function writeBundle(
    plugin: ReturnType<typeof uniStatsPlugin>,
    bundle: Record<string, any>
  ) {
    ;(plugin.writeBundle as any)({}, bundle)
  }

  function createChunk(code: string, imports: string[] = []) {
    return {
      type: 'chunk',
      code,
      imports,
      dynamicImports: [],
    }
  }

  test('app x watches vapor toggle and prompts restart', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_APP_X_DOM2 = 'false' as any

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      return undefined as never
    })
    const plugin = uniStatsPlugin()

    watchChange(plugin, createManifest(true))

    expect(warnSpy).toHaveBeenCalledWith(M['dev.watching.restart.vapor'])
    expect(exitSpy).toHaveBeenCalledWith(0)
  })

  test('non app platform ignores vapor toggle restart prompt', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_APP_X_DOM2 = 'false' as any

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const plugin = uniStatsPlugin()

    watchChange(plugin, createManifest(true))

    expect(warnSpy).not.toHaveBeenCalled()
  })

  test('app x warns when manifest vapor render target differs from running target', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'nativecode'

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const plugin = uniStatsPlugin()

    watchChange(plugin, createManifest(true, 'bytecode'))

    expect(warnSpy).toHaveBeenCalledWith(
      M['dev.watching.vapor.render.target']
        .replace('{manifestTarget}', M['view.render.compiler.target.bytecode'])
        .replace('{runtimeTarget}', M['view.render.compiler.target.nativecode'])
    )
  })

  test('app x skips vapor render target warning when it matches running target', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const plugin = uniStatsPlugin()

    watchChange(plugin, createManifest(true, 'bytecode'))

    expect(warnSpy).not.toHaveBeenCalled()
  })

  test('manifest only mode skips changed files collection', () => {
    process.env.UNI_APP_CHANGED_FILES = 'previous'
    const plugin = uniStatsPlugin({ manifestOnly: true })

    ;(plugin.configResolved as any)({ isProduction: false })
    ;(plugin.writeBundle as any)(
      {},
      {
        'app.js': {
          type: 'chunk',
          code: 'console.log(1)',
        },
      }
    )

    expect(process.env.UNI_APP_CHANGED_FILES).toBe('previous')
  })

  test('app harmony changed files include recursive static importers', () => {
    process.env.UNI_PLATFORM = 'app-harmony'
    const plugin = uniStatsPlugin()
    const bundle = {
      'a.js': createChunk('import "./b.js"', ['b.js']),
      'b.js': createChunk('import "./c.js"', ['c.js']),
      'c.js': createChunk('export const c = 1'),
    }

    ;(plugin.configResolved as any)({ isProduction: false })
    writeBundle(plugin, bundle)
    bundle['c.js'] = createChunk('export const c = 2')
    writeBundle(plugin, bundle)

    expect(JSON.parse(process.env.UNI_APP_CHANGED_FILES)).toEqual([
      'c.js',
      'b.js',
      'a.js',
    ])
  })

  test('app harmony recursive importers skip circular dependencies', () => {
    process.env.UNI_PLATFORM = 'app-harmony'
    const plugin = uniStatsPlugin()
    const bundle = {
      'a.js': createChunk('import "./b.js"', ['b.js']),
      'b.js': createChunk('import "./a.js"; export const b = 1', ['a.js']),
    }

    ;(plugin.configResolved as any)({ isProduction: false })
    writeBundle(plugin, bundle)
    bundle['b.js'] = createChunk('import "./a.js"; export const b = 2', [
      'a.js',
    ])
    writeBundle(plugin, bundle)

    expect(JSON.parse(process.env.UNI_APP_CHANGED_FILES)).toEqual([
      'b.js',
      'a.js',
    ])
  })

  test('non app harmony changed files do not include importers', () => {
    process.env.UNI_PLATFORM = 'app'
    const plugin = uniStatsPlugin()
    const bundle = {
      'a.js': createChunk('import "./b.js"', ['b.js']),
      'b.js': createChunk('export const b = 1'),
    }

    ;(plugin.configResolved as any)({ isProduction: false })
    writeBundle(plugin, bundle)
    bundle['b.js'] = createChunk('export const b = 2')
    writeBundle(plugin, bundle)

    expect(JSON.parse(process.env.UNI_APP_CHANGED_FILES)).toEqual(['b.js'])
  })
})
