import fs from 'fs-extra'
import { tmpdir } from 'os'
import path from 'path'
import { uniAppXAndroidEngineDevPlugin } from '../../src/plugins/android-dom2/devPlugin'

const mockCompileVaporApp = jest.fn()
const mockCompileCpp = jest.fn()

jest.mock('@dcloudio/uni-cli-shared', () => ({
  parseManifestJsonOnce: () => ({ appid: '__UNI__TEST' }),
  requireUniHelpers: () => ({ UKF: () => ({ changed: [], files: [] }) }),
  resolveUTSCompiler: () => ({
    compileVaporApp: mockCompileVaporApp,
    getKotlinCompilerServer: () => ({ compileCpp: mockCompileCpp }),
  }),
  uvueOutDir: () => process.env.UNI_OUTPUT_DIR,
}))

describe('Android 蒸汽原生编译产物', () => {
  const originalEnv = process.env
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(tmpdir(), 'uni-原生产物 [Android]-'))
    process.env = {
      ...originalEnv,
      UNI_OUTPUT_DIR: path.join(root, 'output'),
      UNI_COMPILE_SNAPSHOT_DIR: path.join(root, 'snapshot'),
      UNI_APP_X_DOM2_SO_DIR: path.join(root, 'native'),
      UNI_APP_UTS_CHANGED_FILES: '["uni_modules/demo/classes.dex"]',
    }
    delete process.env.UNI_APP_X_DOM2_CPP_CHANGED
  })

  afterEach(() => {
    process.env = originalEnv
    fs.removeSync(root)
    jest.resetAllMocks()
  })

  test.each([
    [true, false],
    [true, true],
    [false, true],
    [false, false],
  ])(
    '发布应用编译产物（快照=%s，C++ 变更=%s）',
    async (snapshot, cppChanged) => {
      if (!snapshot) {
        delete process.env.UNI_COMPILE_SNAPSHOT_DIR
      }
      mockCompileVaporApp.mockResolvedValue({
        kotlinc: true,
        changed: ['index/classes.dex'],
      })
      mockCompileCpp.mockResolvedValue({
        code: 0,
        data: { soList: cppChanged ? ['libdemo.so'] : [] },
      })
      if (cppChanged) {
        fs.outputFileSync(path.join(root, 'native', 'libdemo.so'), 'C++ 产物')
      }

      const { writeBundle } = uniAppXAndroidEngineDevPlugin()
      expect(typeof writeBundle).toBe('function')
      if (typeof writeBundle === 'function') {
        await Reflect.apply(writeBundle, undefined, [])
      }

      if (cppChanged) {
        expect(
          fs.readFileSync(path.join(root, 'output', 'libdemo.so'), 'utf8')
        ).toBe('C++ 产物')
      }
      expect(process.env.UNI_APP_UTS_CHANGED_FILES).toBe(
        !cppChanged
          ? '["uni_modules/demo/classes.dex","index/classes.dex"]'
          : '["uni_modules/demo/classes.dex"]'
      )
      expect(process.env.UNI_APP_X_DOM2_CPP_CHANGED).toBe(
        cppChanged ? 'true' : undefined
      )
    }
  )
})
