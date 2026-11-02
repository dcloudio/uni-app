import fs from 'fs'
import type { ResolvedConfig } from 'vite'
import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'
import {
  getMouseToTouchScript,
  uniMouseToTouchPlugin,
} from '../src/plugins/mouseToTouch'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  parseManifestJsonOnce: jest.fn(),
}))

describe('manifest mouseToTouch', () => {
  afterEach(() => {
    jest.mocked(parseManifestJsonOnce).mockReset()
  })

  function createPlugin(config: Partial<ResolvedConfig> = {}) {
    const plugin = uniMouseToTouchPlugin()
    ;(plugin.configResolved as Function)({
      command: 'build',
      base: '/',
      build: { assetsDir: 'assets' },
      ...config,
    })
    return plugin
  }

  function transform(plugin: ReturnType<typeof uniMouseToTouchPlugin>) {
    return (plugin.transformIndexHtml as { handler: Function }).handler()
  }

  function buildStart(
    plugin: ReturnType<typeof uniMouseToTouchPlugin>,
    fileName = 'assets/touch-emulator-Cc61YsKX.js'
  ) {
    const emitFile = jest.fn().mockReturnValue('touch-emulator-reference')
    const getFileName = jest.fn().mockReturnValue(fileName)
    ;(plugin.buildStart as Function).call({ emitFile, getFileName })
    ;(plugin.renderStart as Function).call({ getFileName })
    return { emitFile, getFileName }
  }

  test.each(['web', 'h5'])(
    '%s 配置在开发和生产环境引入独立脚本',
    (platform) => {
      jest.mocked(parseManifestJsonOnce).mockReturnValue({
        [platform]: { mouseToTouch: true },
      })
      for (const command of ['serve', 'build'] as const) {
        const plugin = createPlugin({ command })
        buildStart(plugin)
        expect(transform(plugin)).toEqual([
          {
            tag: 'script',
            attrs: {
              src: `/assets/${
                command === 'build'
                  ? 'touch-emulator-Cc61YsKX.js'
                  : 'touch-emulator.js'
              }`,
            },
            injectTo: 'head-prepend',
          },
        ])
      }
    }
  )

  test.each([
    {},
    { web: { mouseToTouch: false } },
    { web: { mouseToTouch: 'true' } },
    { web: {}, h5: { mouseToTouch: true } },
  ])('默认关闭且保持 web 优先级：%p', (manifest) => {
    jest.mocked(parseManifestJsonOnce).mockReturnValue(manifest)
    const plugin = createPlugin()
    expect(transform(plugin)).toBeUndefined()
    const emitFile = jest.fn()
    ;(plugin.buildStart as Function).call({ emitFile })
    expect(emitFile).not.toHaveBeenCalled()
  })

  test.each(['/', '/app/', './', 'https://cdn.example.com/app/'])(
    '脚本引用遵循 base %s 和自定义资源目录',
    (base) => {
      jest.mocked(parseManifestJsonOnce).mockReturnValue({
        web: { mouseToTouch: true },
      })
      const plugin = createPlugin({
        base,
        build: { assetsDir: 'static/js' } as ResolvedConfig['build'],
      })
      const fileName = 'static/js/touch-emulator-Cc61YsKX.js'
      const { emitFile, getFileName } = buildStart(plugin, fileName)
      const tags = transform(plugin)
      expect(tags[0].attrs.src).toBe(base + fileName)
      expect(tags[0].children).toBeUndefined()
      expect(getFileName).toHaveBeenCalledWith('touch-emulator-reference')
      expect(emitFile).toHaveBeenCalledWith({
        type: 'asset',
        name: 'touch-emulator.js',
        source: getMouseToTouchScript(),
      })
    }
  )

  test('HTML 使用 Rollup 最终文件名并在重复构建时更新引用', () => {
    jest.mocked(parseManifestJsonOnce).mockReturnValue({
      web: { mouseToTouch: true },
    })
    const plugin = createPlugin()
    for (const fileName of [
      'assets/touch-emulator-Cc61YsKX.js',
      'custom/touch-emulator.DsC_uUsI.js',
    ]) {
      buildStart(plugin, fileName)
      expect(transform(plugin)[0].attrs.src).toBe('/' + fileName)
    }
  })

  test.each([
    { command: 'serve' },
    { build: { assetsDir: 'assets', ssr: true } },
  ])('开发服务和 SSR 服务端构建不输出资源文件：%p', (config) => {
    jest.mocked(parseManifestJsonOnce).mockReturnValue({
      web: { mouseToTouch: true },
    })
    const emitFile = jest.fn()
    ;(
      createPlugin(config as Partial<ResolvedConfig>).buildStart as Function
    ).call({ emitFile })
    expect(emitFile).not.toHaveBeenCalled()
  })

  test('开发服务提供带 base 路径的脚本，关闭配置后不再提供', () => {
    jest.mocked(parseManifestJsonOnce).mockReturnValue({
      web: { mouseToTouch: true },
    })
    const plugin = createPlugin({ command: 'serve', base: '/app/' })
    const use = jest.fn()
    ;(plugin.configureServer as Function)({ middlewares: { use } })
    const middleware = use.mock.calls[0][0]
    const response = { setHeader: jest.fn(), end: jest.fn() }
    const next = jest.fn()
    middleware(
      { method: 'GET', url: '/app/assets/touch-emulator.js?v=1' },
      response,
      next
    )
    expect(response.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'text/javascript; charset=utf-8'
    )
    expect(response.end).toHaveBeenCalledWith(getMouseToTouchScript())
    expect(next).not.toHaveBeenCalled()
    response.end.mockClear()
    middleware(
      { method: 'HEAD', url: '/app/assets/touch-emulator.js' },
      response,
      next
    )
    expect(response.end).toHaveBeenCalledWith(undefined)
    middleware(
      { method: 'GET', url: '/assets/touch-emulator.js' },
      response,
      next
    )
    expect(next).toHaveBeenCalledTimes(1)
    jest.mocked(parseManifestJsonOnce).mockReturnValue({ web: {} })
    middleware(
      { method: 'GET', url: '/app/assets/touch-emulator.js' },
      response,
      next
    )
    expect(next).toHaveBeenCalledTimes(2)
  })
})

describe('Touch Emulator 脚本注入', () => {
  test('仅注入原始库源码和初始化调用', () => {
    const source = fs.readFileSync(
      require.resolve('hammer-touchemulator/touch-emulator.js'),
      'utf8'
    )
    expect(getMouseToTouchScript()).toBe(`${source}\n;window.TouchEmulator();`)
  })
})
