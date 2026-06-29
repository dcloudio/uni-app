import {
  getRuntimeSubpackageRoot,
  getSubpackageAppVm,
  resolveSubpackageRoot,
  setRuntimeSubpackageRoot,
  setSubpackageAppVm,
} from '../../src/runtime/subpackage'

describe('runtime/subpackage', () => {
  const originalSubpackage = process.env.UNI_SUBPACKAGE
  const originalGlobal = (global as any).__GLOBAL__
  const originalGetCurrentPages = (global as any).getCurrentPages

  afterEach(() => {
    if (originalSubpackage === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_SUBPACKAGE
    } else {
      process.env.UNI_SUBPACKAGE = originalSubpackage
    }
    ;(global as any).__GLOBAL__ = originalGlobal
    if (originalGetCurrentPages === undefined) {
      delete (global as any).getCurrentPages
    } else {
      ;(global as any).getCurrentPages = originalGetCurrentPages
    }
    setRuntimeSubpackageRoot(undefined)
  })

  test('resolves root from parameter and env', () => {
    delete (process.env as Record<string, string | undefined>).UNI_SUBPACKAGE

    expect(resolveSubpackageRoot('/package-a/')).toBe('package-a')
    process.env.UNI_SUBPACKAGE = 'package-c'
    expect(resolveSubpackageRoot()).toBe('package-c')
  })

  test('sets runtime root with normalized root', () => {
    setRuntimeSubpackageRoot('/package-a/')

    expect(getRuntimeSubpackageRoot()).toBe('package-a')
  })

  test('gets subpackage app vm by runtime root only', () => {
    const appVmA = {}
    const appVmB = {}
    ;(global as any).__GLOBAL__ = {}
    setSubpackageAppVm('package-a', appVmA as any)
    setSubpackageAppVm('package-b', appVmB as any, true)
    setRuntimeSubpackageRoot(undefined)
    process.env.UNI_SUBPACKAGE = 'package-a'
    ;(global as any).getCurrentPages = () => [
      { route: 'package-b/pages/index/index' },
    ]

    expect(getSubpackageAppVm()).toBeUndefined()
    setRuntimeSubpackageRoot('package-b')
    expect(getSubpackageAppVm()).toBe(appVmB)
    setRuntimeSubpackageRoot('package-a')
    expect(getSubpackageAppVm()).toBe(appVmA)
  })

  test('sets subpackage app vm with normalized root', () => {
    const appVm = {}
    ;(global as any).__GLOBAL__ = {}

    setSubpackageAppVm('/package-a/', appVm as any)

    expect(getRuntimeSubpackageRoot()).toBe('package-a')
    expect(getSubpackageAppVm()).toBe(appVm)
    expect((global as any).__GLOBAL__.$subpackages).toEqual({
      'package-a': { $vm: appVm },
    })
  })

  test('keeps independent app vm when global object is replaced', () => {
    const appVm = {}
    ;(global as any).__GLOBAL__ = {}

    setSubpackageAppVm('package-a', appVm as any, true)
    ;(global as any).__GLOBAL__ = {}

    expect(getSubpackageAppVm()).toBe(appVm)
    expect((global as any).__GLOBAL__.$subpackages).toBeUndefined()
  })
})
