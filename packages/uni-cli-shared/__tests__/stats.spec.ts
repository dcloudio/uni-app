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

  afterEach(() => {
    process.env.UNI_APP_X = originalAppX
    process.env.UNI_PLATFORM = originalPlatform
    process.env.UNI_APP_X_DOM2 = originalDom2
    process.env.UNI_APP_X_VAPOR_RENDER_TARGET = originalVaporRenderTarget
    jest.restoreAllMocks()
  })

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
})
