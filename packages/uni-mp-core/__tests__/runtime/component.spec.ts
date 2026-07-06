import {
  $createComponent,
  $destroyComponent,
} from '../../src/runtime/component'
import {
  setRuntimeSubpackageRoot,
  setSubpackageAppVm,
} from '../../src/runtime/subpackage'

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
    setRuntimeSubpackageRoot(undefined)
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
    setSubpackageAppVm('package-a', appVmA as any, true)
    setSubpackageAppVm('package-b', appVmB as any, true)
    setRuntimeSubpackageRoot('package-a')

    const instance = $createComponent({} as any, {} as any)

    $destroyComponent(instance as any)

    expect(appVmA.$createComponent).toHaveBeenCalled()
    expect(appVmA.$destroyComponent).toHaveBeenCalledWith(instance)
    expect(appVmB.$destroyComponent).not.toHaveBeenCalled()
  })

  test('creates component with runtime root before route fallbacks', () => {
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
    setSubpackageAppVm('package-a', appVmA as any, true)
    setSubpackageAppVm('package-b', appVmB as any, true)
    ;(global as any).getCurrentPages = () => [
      { route: 'package-b/pages/index/index' },
    ]
    setRuntimeSubpackageRoot('package-a')

    const instance = $createComponent(
      {} as any,
      {
        mpInstance: {
          route: 'package-b/pages/index/index',
        },
      } as any
    )

    expect(instance).toBe(componentA)
    expect(appVmA.$createComponent).toHaveBeenCalled()
    expect(appVmB.$createComponent).not.toHaveBeenCalled()
  })
})
