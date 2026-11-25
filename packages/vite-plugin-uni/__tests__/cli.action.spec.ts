import { M, output } from '@dcloudio/uni-cli-shared'
import { runDev } from '../src/cli/action'
import { build } from '../src/cli/build'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  isUniAppXAndroidNative: () => false,
  isUniAppXVapor: () => true,
  output: jest.fn(),
}))
jest.mock('../src/cli/build', () => ({ build: jest.fn() }))
jest.mock('../src/cli/utils', () => ({ initEnv: jest.fn() }))
jest.mock('../src/utils/easycom', () => ({ initEasycom: jest.fn() }))

test.each([false, true])(
  '字节码模式只在首轮产物生成时补充编译提示（首轮失败=%s）',
  async (firstBuildFailed) => {
    const originalEnv = process.env
    process.env = {
      ...originalEnv,
      UNI_APP_X_DOM2_DYNAMIC: 'true',
      HX_IS_CLEAN_CACHE: 'true',
    }
    delete process.env.UNI_COMPILE_TARGET
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    try {
      await runDev({ platform: 'app' })
      const [, onBuildEvent, onRenderStart] = jest.mocked(build).mock.calls[0]
      const start = {
        code: 'BUNDLE_START',
        input: 'main.js',
        output: [],
      } as const

      await onBuildEvent!(start)
      expect(process.env.HX_IS_CLEAN_CACHE).toBe('true')
      if (!firstBuildFailed) {
        onRenderStart!()
        onRenderStart!()
      }
      expect(output).not.toHaveBeenCalled()
      expect(log.mock.calls).toEqual(firstBuildFailed ? [] : [[M.compiling]])

      log.mockClear()
      await onBuildEvent!(start)
      onRenderStart!()

      expect(process.env.HX_IS_CLEAN_CACHE).toBe('false')
      expect(output).toHaveBeenCalledWith('log', M['dev.watching.start'])
      expect(log).not.toHaveBeenCalled()
    } finally {
      process.env = originalEnv
      log.mockRestore()
      jest.clearAllMocks()
    }
  }
)
