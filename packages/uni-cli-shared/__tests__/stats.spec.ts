import fs from 'fs'
import os from 'os'
import path from 'path'
import { M } from '../src/messages'
import { uniStatsPlugin } from '../src/vite/plugins/stats'

describe('stats', () => {
  const originalAppX = process.env.UNI_APP_X
  const originalPlatform = process.env.UNI_PLATFORM
  const originalDom2 = process.env.UNI_APP_X_DOM2

  afterEach(() => {
    process.env.UNI_APP_X = originalAppX
    process.env.UNI_PLATFORM = originalPlatform
    process.env.UNI_APP_X_DOM2 = originalDom2
    jest.restoreAllMocks()
  })

  function createManifest(vapor: boolean) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-stats-'))
    const file = path.join(dir, 'manifest.json')
    fs.writeFileSync(
      file,
      JSON.stringify({
        'uni-app-x': {
          vapor,
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
    const plugin = uniStatsPlugin()

    watchChange(plugin, createManifest(true))

    expect(warnSpy).toHaveBeenCalledWith(M['dev.watching.restart.vapor'])
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
})
