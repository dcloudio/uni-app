import { initCreateIndependentSubpackageApp } from '../../src/runtime/app'
import {
  getRuntimeSubpackageRoot,
  getSubpackageAppVm,
  setRuntimeSubpackageRoot,
} from '../../src/runtime/subpackage'

describe('runtime/app', () => {
  const originalGlobal = (global as any).__GLOBAL__
  const originalGetApp = (global as any).getApp
  const originalWx = (global as any).wx

  afterEach(() => {
    ;(global as any).__GLOBAL__ = originalGlobal
    restoreGlobal('getApp', originalGetApp)
    restoreGlobal('wx', originalWx)
    setRuntimeSubpackageRoot(undefined)
  })

  test('registers independent subpackage app without app lifecycle', () => {
    const vm = {}
    const createIndependentSubpackageApp = initCreateIndependentSubpackageApp()
    ;(global as any).__GLOBAL__ = {}
    ;(global as any).getApp = jest.fn(() => ({
      globalData: {},
    }))
    ;(global as any).wx = {
      getLaunchOptionsSync: jest.fn(),
      onAppShow: jest.fn(),
      onAppHide: jest.fn(),
    }

    createIndependentSubpackageApp(vm as any, '/package-a/')

    expect(getRuntimeSubpackageRoot()).toBe('package-a')
    expect(getSubpackageAppVm()).toBe(vm)
    expect((global as any).__GLOBAL__.$subpackages).toBeUndefined()
    expect((global as any).getApp).not.toHaveBeenCalled()
    expect((global as any).wx.getLaunchOptionsSync).not.toHaveBeenCalled()
    expect((global as any).wx.onAppShow).not.toHaveBeenCalled()
    expect((global as any).wx.onAppHide).not.toHaveBeenCalled()
  })

  function restoreGlobal(name: string, value: unknown) {
    if (value === undefined) {
      delete (global as any)[name]
    } else {
      ;(global as any)[name] = value
    }
  }
})
