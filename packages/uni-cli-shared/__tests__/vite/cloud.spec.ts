import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { rollup } from 'rollup'
import { uniEncryptUniModulesPlugin } from '../../src/vite/cloud'

test('utssdk module 使用虚拟代理入口，保留插件依赖的 external 行为', async () => {
  const originalEnv = process.env
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-module-entry-'))
  const pluginDir = path.join(root, 'uni_modules/test-uts')
  fs.outputJsonSync(path.join(pluginDir, 'package.json'), {
    id: 'test-uts',
    version: '1.0.0',
  })
  fs.outputFileSync(
    path.join(pluginDir, 'utssdk/index.uts'),
    'export function test() {}'
  )
  process.env = {
    ...originalEnv,
    UNI_INPUT_DIR: root,
    UNI_UTS_PLATFORM: 'app-android',
    UNI_APP_X: 'true',
    UNI_APP_X_DOM2: 'true',
    UNI_APP_X_UVUE_SCRIPT_ENGINE: 'js',
  }
  try {
    const plugin = uniEncryptUniModulesPlugin()
    const config = (plugin.config as Function)()
    const resolvedConfig = {
      ...config,
      assetsInclude: () => false,
      plugins: [],
    }
    ;(plugin.configResolved as Function)(resolvedConfig)
    expect(fs.existsSync(path.join(pluginDir, 'index.module.uts'))).toBe(false)
    const compileProxy = jest.fn(
      () =>
        "import '@/uni_modules/dependency';\nuni.registerUTSPlugin('uni_modules/test-uts', {});"
    )
    const build = await rollup({
      input: config.build.rollupOptions.input,
      external: resolvedConfig.build.rollupOptions.external,
      plugins: [
        plugin,
        {
          name: 'native-proxy-compiler',
          resolveId(id) {
            if (id.endsWith('?uts-proxy')) return id
          },
          load(id) {
            if (id.endsWith('?uts-proxy')) return ''
          },
          transform(_, id) {
            if (id.endsWith('?uts-proxy')) return compileProxy()
          },
        },
      ],
    })
    try {
      const { output } = await build.generate(config.build.rollupOptions.output)
      const proxy = output.find(
        (file) => file.fileName === 'uni_modules/test-uts/index.module.js'
      )
      expect(proxy?.type === 'chunk' && proxy.code).toContain(
        'uni.registerUTSPlugin'
      )
      expect(proxy?.type === 'chunk' && proxy.code).toContain(
        '@/uni_modules/dependency'
      )
      expect(proxy?.type === 'chunk' && proxy.code).not.toContain('?uts-proxy')
      expect(compileProxy).toHaveBeenCalledTimes(1)
    } finally {
      await build.close()
    }
  } finally {
    process.env = originalEnv
    fs.removeSync(root)
  }
})
