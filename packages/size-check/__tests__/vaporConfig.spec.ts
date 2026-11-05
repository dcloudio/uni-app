import type { Plugin } from 'vite'
import config from '../vite.vapor.config'

jest.mock('@dcloudio/vite-plugin-uni', () => {
  const filter = jest.fn((id: string) => id !== '/excluded.js')
  return {
    __esModule: true,
    filter,
    default: () => [{ name: 'unplugin-auto-import', transformInclude: filter }],
  }
})

const plugin = (config.plugins as Plugin[])[0] as Plugin & {
  transformInclude: (id: string) => boolean
}
const originalFilter = jest.requireMock('@dcloudio/vite-plugin-uni')
  .filter as jest.Mock

describe('Web Vapor 体积基准的工作区排除', () => {
  beforeEach(() => originalFilter.mockClear())

  test.each([
    '/repo [size]/packages/uni-h5/dist-x-vapor/uni-h5.es.js',
    'C:\\repo [size]\\packages\\uni-shared\\dist\\uni-shared.es.js',
    'C:/repo [size]/packages/uni-h5/dist-x-vapor/uni-h5.es.js',
    '\\\\server\\repo\\packages\\uni-h5\\dist-x-vapor\\uni-h5.es.js',
  ])('框架产物不进入自动导入：%s', (id) => {
    expect(plugin.transformInclude(id)).toBe(false)
    expect(originalFilter).not.toHaveBeenCalled()
  })

  test.each([
    '/repo/packages/size-check/vapor/main.ts',
    '/repo/packages/size-check/vapor/App.uvue?vue&type=script',
    '/repo/packages/uni-h5/src/index.ts',
    '/repo/node_modules/example/index.js',
  ])('其他模块保留原过滤规则：%s', (id) => {
    expect(plugin.transformInclude(id)).toBe(true)
    expect(originalFilter).toHaveBeenCalledWith(id)
  })

  test('原规则排除的模块仍被排除', () => {
    expect(plugin.transformInclude('/excluded.js')).toBe(false)
    expect(originalFilter).toHaveBeenCalledWith('/excluded.js')
  })
})
