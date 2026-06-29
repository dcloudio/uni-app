import {
  $createComponent,
  $destroyComponent,
} from '../../src/runtime/component'

describe('runtime/component', () => {
  const originalGlobal = (global as any).__GLOBAL__
  const originalGetCurrentPages = (global as any).getCurrentPages
  const originalMpPlugin = process.env.UNI_MP_PLUGIN

  afterEach(() => {
    ;(global as any).__GLOBAL__ = originalGlobal
    if (originalGetCurrentPages === undefined) {
      delete (global as any).getCurrentPages
    } else {
      ;(global as any).getCurrentPages = originalGetCurrentPages
    }
    if (originalMpPlugin === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_MP_PLUGIN
    } else {
      process.env.UNI_MP_PLUGIN = originalMpPlugin
    }
  })

  test('destroys component with the app vm that created it', () => {
    delete (process.env as Record<string, string | undefined>).UNI_MP_PLUGIN
    const componentA = { $: {} }
    const componentB = { $: {} }
    const appVmA = {
      $createComponent: jest.fn(() => componentA),
      $destroyComponent: jest.fn(),
    }
    const appVmB = {
      $createComponent: jest.fn(() => componentB),
      $destroyComponent: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = {
      $subpackages: {
        'package-a': { $vm: appVmA },
        'package-b': { $vm: appVmB },
      },
    }
    ;(global as any).getCurrentPages = () => [
      { route: 'package-a/pages/index/index' },
    ]

    const instance = $createComponent({} as any, {} as any)

    ;(global as any).getCurrentPages = () => [
      { route: 'package-b/pages/index/index' },
    ]
    $destroyComponent(instance as any)

    expect(appVmA.$createComponent).toHaveBeenCalled()
    expect(appVmA.$destroyComponent).toHaveBeenCalledWith(instance)
    expect(appVmB.$destroyComponent).not.toHaveBeenCalled()
  })

  test('creates component with mp instance route before current page route', () => {
    delete (process.env as Record<string, string | undefined>).UNI_MP_PLUGIN
    const componentA = { $: {} }
    const componentB = { $: {} }
    const appVmA = {
      $createComponent: jest.fn(() => componentA),
      $destroyComponent: jest.fn(),
    }
    const appVmB = {
      $createComponent: jest.fn(() => componentB),
      $destroyComponent: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = {
      $subpackages: {
        'package-a': { $vm: appVmA },
        'package-b': { $vm: appVmB },
      },
    }
    ;(global as any).getCurrentPages = () => [
      { route: 'package-b/pages/index/index' },
    ]

    const instance = $createComponent(
      {} as any,
      {
        mpInstance: {
          route: 'package-a/pages/index/index',
        },
      } as any
    )

    expect(instance).toBe(componentA)
    expect(appVmA.$createComponent).toHaveBeenCalled()
    expect(appVmB.$createComponent).not.toHaveBeenCalled()
  })
})
