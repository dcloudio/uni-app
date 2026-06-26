import {
  findSubpackageRootByRoute,
  getSubpackageAppVm,
  resolveSubpackageRoot,
  setSubpackageAppVm,
} from '../../src/runtime/subpackage'

describe('runtime/subpackage', () => {
  const originalSubpackage = process.env.UNI_SUBPACKAGE
  const originalRuntimeRoot = (globalThis as any).__uniSubpackageRoot
  const originalGlobal = (global as any).__GLOBAL__
  const originalGetCurrentPages = (global as any).getCurrentPages

  afterEach(() => {
    if (originalSubpackage === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_SUBPACKAGE
    } else {
      process.env.UNI_SUBPACKAGE = originalSubpackage
    }
    if (originalRuntimeRoot === undefined) {
      delete (globalThis as any).__uniSubpackageRoot
    } else {
      ;(globalThis as any).__uniSubpackageRoot = originalRuntimeRoot
    }
    ;(global as any).__GLOBAL__ = originalGlobal
    if (originalGetCurrentPages === undefined) {
      delete (global as any).getCurrentPages
    } else {
      ;(global as any).getCurrentPages = originalGetCurrentPages
    }
  })

  test('resolves root from parameter, runtime marker and env', () => {
    delete (process.env as Record<string, string | undefined>).UNI_SUBPACKAGE
    delete (globalThis as any).__uniSubpackageRoot

    expect(resolveSubpackageRoot('/package-a/')).toBe('package-a')
    ;(globalThis as any).__uniSubpackageRoot = 'package-b'
    expect(resolveSubpackageRoot()).toBe('package-b')

    delete (globalThis as any).__uniSubpackageRoot
    process.env.UNI_SUBPACKAGE = 'package-c'
    expect(resolveSubpackageRoot()).toBe('package-c')
  })

  test('finds root by current page route', () => {
    const subpackages = {
      'package-a': {},
      'package-b/nested': {},
    }

    expect(findSubpackageRootByRoute(subpackages, 'package-a')).toBe(
      'package-a'
    )
    expect(
      findSubpackageRootByRoute(subpackages, '/package-a/pages/index/index')
    ).toBe('package-a')
    expect(
      findSubpackageRootByRoute(
        subpackages,
        'package-b/nested/pages/index/index'
      )
    ).toBe('package-b/nested')
    expect(findSubpackageRootByRoute(subpackages, 'pages/index/index')).toBe(
      undefined
    )
  })

  test('gets subpackage app vm by route before env fallback', () => {
    const appVmA = {}
    const appVmB = {}
    ;(global as any).__GLOBAL__ = {
      $subpackages: {
        'package-a': { $vm: appVmA },
        'package-b': { $vm: appVmB },
      },
    }
    process.env.UNI_SUBPACKAGE = 'package-a'
    ;(global as any).getCurrentPages = () => [
      { route: 'package-b/pages/index/index' },
    ]

    expect(getSubpackageAppVm()).toBe(appVmB)
    ;(global as any).getCurrentPages = () => []
    expect(getSubpackageAppVm()).toBe(appVmA)
  })

  test('sets subpackage app vm with normalized root', () => {
    const appVm = {}
    ;(global as any).__GLOBAL__ = {}

    setSubpackageAppVm('/package-a/', appVm as any)

    expect((global as any).__GLOBAL__.$subpackages).toEqual({
      'package-a': { $vm: appVm },
    })
  })
})
