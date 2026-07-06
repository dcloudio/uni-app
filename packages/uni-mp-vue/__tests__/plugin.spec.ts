jest.mock('@dcloudio/uni-vue', () => ({
  initApp: jest.fn(),
}))

import { initApp } from '@dcloudio/uni-vue'
import UniMpVuePlugin from '../src/plugin'

describe('uni-mp-vue: plugin', () => {
  const originalMpPlugin = process.env.UNI_MP_PLUGIN
  const originalSubpackage = process.env.UNI_SUBPACKAGE
  const originalCreateApp = (global as any).createApp
  const originalCreateIndependentSubpackageApp = (global as any)
    .createIndependentSubpackageApp
  const originalCreatePluginApp = (global as any).createPluginApp
  const originalCreateSubpackageApp = (global as any).createSubpackageApp

  afterEach(() => {
    restoreEnv('UNI_MP_PLUGIN', originalMpPlugin)
    restoreEnv('UNI_SUBPACKAGE', originalSubpackage)
    restoreGlobal('createApp', originalCreateApp)
    restoreGlobal(
      'createIndependentSubpackageApp',
      originalCreateIndependentSubpackageApp
    )
    restoreGlobal('createPluginApp', originalCreatePluginApp)
    restoreGlobal('createSubpackageApp', originalCreateSubpackageApp)
    jest.clearAllMocks()
  })

  test('keeps plugin app creation before subpackage root', () => {
    process.env.UNI_MP_PLUGIN = 'true'
    process.env.UNI_SUBPACKAGE = 'package-env'
    ;(global as any).createPluginApp = jest.fn()
    ;(global as any).createSubpackageApp = jest.fn()
    const { app, instance, mount } = createInstalledApp()

    expect(app.mount('#app', 'package-a')).toBe(instance)

    expect(mount).toHaveBeenCalledWith('#app')
    expect((global as any).createPluginApp).toHaveBeenCalledWith(instance)
    expect((global as any).createSubpackageApp).not.toHaveBeenCalled()
  })

  test('passes explicit subpackage root to subpackage app creation', () => {
    restoreEnv('UNI_MP_PLUGIN', undefined)
    restoreEnv('UNI_SUBPACKAGE', undefined)
    ;(global as any).createSubpackageApp = jest.fn()
    const { app, instance } = createInstalledApp()

    app.mount('#app', '/package-a/')

    expect((global as any).createSubpackageApp).toHaveBeenCalledWith(
      instance,
      'package-a'
    )
  })

  test('passes explicit independent root to independent subpackage app creation', () => {
    restoreEnv('UNI_MP_PLUGIN', undefined)
    restoreEnv('UNI_SUBPACKAGE', undefined)
    ;(global as any).createIndependentSubpackageApp = jest.fn()
    ;(global as any).createSubpackageApp = jest.fn()
    const { app, instance } = createInstalledApp()

    app.mount('#app', '/package-a/', { independent: true })

    expect((global as any).createIndependentSubpackageApp).toHaveBeenCalledWith(
      instance,
      'package-a'
    )
    expect((global as any).createSubpackageApp).not.toHaveBeenCalled()
  })

  test('prefers explicit independent app creator before global', () => {
    restoreEnv('UNI_MP_PLUGIN', undefined)
    restoreEnv('UNI_SUBPACKAGE', undefined)
    const localCreateIndependentSubpackageApp = jest.fn()
    ;(global as any).createIndependentSubpackageApp = jest.fn()
    const { app, instance } = createInstalledApp()

    app.mount('#app', '/package-a/', {
      independent: true,
      createApp: localCreateIndependentSubpackageApp,
    })

    expect(localCreateIndependentSubpackageApp).toHaveBeenCalledWith(
      instance,
      'package-a'
    )
    expect(
      (global as any).createIndependentSubpackageApp
    ).not.toHaveBeenCalled()
  })

  test('keeps env subpackage fallback without explicit root', () => {
    restoreEnv('UNI_MP_PLUGIN', undefined)
    process.env.UNI_SUBPACKAGE = 'package-env'
    ;(global as any).createSubpackageApp = jest.fn()
    const { app, instance } = createInstalledApp()

    app.mount('#app')

    expect((global as any).createSubpackageApp).toHaveBeenCalledWith(instance)
  })

  function createInstalledApp(instance: unknown = {}) {
    const mount = jest.fn(() => instance)
    const app = {
      config: {
        globalProperties: {},
      },
      mount,
    }
    UniMpVuePlugin.install(app as any)
    expect(initApp).toHaveBeenCalledWith(app)
    return {
      app: app as typeof app & {
        mount(
          rootContainer: unknown,
          subpackageRoot?: string,
          options?: {
            independent?: boolean
            createApp?: (instance: unknown, root?: string) => void
          }
        ): unknown
      },
      instance,
      mount,
    }
  }

  function restoreEnv(
    name: 'UNI_MP_PLUGIN' | 'UNI_SUBPACKAGE',
    value?: string
  ) {
    if (value === undefined) {
      delete (process.env as Record<string, string | undefined>)[name]
    } else {
      process.env[name] = value
    }
  }

  function restoreGlobal(name: string, value: unknown) {
    if (value === undefined) {
      delete (global as any)[name]
    } else {
      ;(global as any)[name] = value
    }
  }
})
