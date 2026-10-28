const testGlobal = global as any
const originalPlatform = testGlobal.__PLATFORM__
const originalVueOptionsApi = testGlobal.__VUE_OPTIONS_API__
const originalX = testGlobal.__X__

testGlobal.__PLATFORM__ = 'mp-toutiao'
testGlobal.__VUE_OPTIONS_API__ = true
testGlobal.__X__ = false

const findVmByVueId = jest.fn(
  (vm: TestVm, vuePid: string) => vm.descendants?.[vuePid]
)
const nextSetDataTick = jest.fn((_instance: unknown, callback: () => void) => {
  callback()
})

jest.mock('@dcloudio/uni-mp-core', () => ({
  findVmByVueId,
  nextSetDataTick,
}))

import type { ComponentPublicInstance } from 'vue'
import type {
  MPComponentInstance,
  MPComponentOptions,
} from '@dcloudio/uni-mp-core'
import {
  createPendingComponent,
  isComponentVirtualHost,
  registerPendingComponent,
  removePendingComponent,
} from '../src/runtime/componentLifetimes'
import {
  handleLink,
  initRelation,
  instances,
  parse,
} from '../src/runtime/parseComponentOptions'

interface TestVm {
  $: { parent?: object }
  $children: TestVm[]
  $callCreatedHook: jest.Mock
  $callHook: jest.Mock
  $options: Record<string, any>
  descendants?: Record<string, TestVm>
}

function createVm(): TestVm {
  return {
    $: {},
    $children: [],
    $callCreatedHook: jest.fn(),
    $callHook: jest.fn(),
    $options: {},
  }
}

function createMPInstance(
  nodeId: number,
  webviewId = '1'
): MPComponentInstance {
  return {
    __nodeId__: nodeId,
    __webviewId__: webviewId,
    triggerEvent: jest.fn(),
  } as unknown as MPComponentInstance
}

function registerComponent(
  mpInstance: MPComponentInstance,
  vm: TestVm,
  calls: string[] = [],
  name = 'setup',
  virtualHost = false
) {
  registerPendingComponent(
    mpInstance,
    (parent) => {
      calls.push(name)
      expect(parent).toBeDefined()
      vm.$.parent = parent!.$
      ;(parent as any).$children.push(vm)
      mpInstance.$vm = vm as unknown as ComponentPublicInstance
      return mpInstance.$vm
    },
    virtualHost
  )
}

describe('mp-toutiao component relation', () => {
  afterEach(() => {
    Object.keys(instances).forEach((key) => delete instances[key])
    findVmByVueId.mockClear()
    nextSetDataTick.mockClear()
    testGlobal.__PLATFORM__ = 'mp-toutiao'
  })

  afterAll(() => {
    testGlobal.__PLATFORM__ = originalPlatform
    testGlobal.__VUE_OPTIONS_API__ = originalVueOptionsApi
    testGlobal.__X__ = originalX
  })

  test('passes the parent before creating the child', () => {
    const parentVm = createVm()
    const parentMPInstance = createMPInstance(1)
    parentMPInstance.$vm = parentVm as unknown as ComponentPublicInstance
    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm)
    instances['1_2'] = childMPInstance

    handleLink.call(parentMPInstance, {
      detail: { vuePid: '', nodeId: 2, webviewId: '1' },
    })

    expect(childVm.$.parent).toBe(parentVm.$)
    expect(parentVm.$children).toEqual([childVm])
    expect(childVm.$callCreatedHook).toHaveBeenCalledTimes(1)
    expect(childVm.$callHook.mock.calls).toEqual([['mounted'], ['onReady']])
  })

  test('resolves duplicate vue ids inside the actual event receiver', () => {
    const firstProvider = createVm()
    const secondProvider = createVm()
    const firstOwner = createVm()
    const secondOwner = createVm()
    firstOwner.descendants = { repeated: firstProvider }
    secondOwner.descendants = { repeated: secondProvider }

    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm)
    instances['1_2'] = childMPInstance

    const receiver = createMPInstance(1)
    receiver.$vm = secondOwner as unknown as ComponentPublicInstance
    handleLink.call(receiver, {
      detail: { vuePid: 'repeated', nodeId: 2, webviewId: '1' },
    })

    expect(findVmByVueId).toHaveBeenCalledWith(secondOwner, 'repeated')
    expect(findVmByVueId).not.toHaveBeenCalledWith(firstOwner, 'repeated')
    expect(childVm.$.parent).toBe(secondProvider.$)
  })

  test('uses the Vue event receiver across a native component wrapper', () => {
    const pageVm = createVm()
    const ownerVm = createVm()
    instances['1_0'] = pageVm as unknown as ComponentPublicInstance

    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm)
    instances['1_2'] = childMPInstance

    const receiver = createMPInstance(1)
    receiver.$vm = ownerVm as unknown as ComponentPublicInstance
    handleLink.call(receiver, {
      detail: { vuePid: '', nodeId: 2, webviewId: '1' },
    })

    expect(childVm.$.parent).toBe(ownerVm.$)
    expect(childVm.$.parent).not.toBe(pageVm.$)
  })

  test('falls back to the Vue owner for a native wrapper vue id', () => {
    const pageVm = createVm()
    const ownerVm = createVm()
    pageVm.descendants = { owner: ownerVm }
    instances['1_0'] = pageVm as unknown as ComponentPublicInstance

    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm)
    instances['1_2'] = childMPInstance

    const receiver = createMPInstance(1)
    receiver._$vuePid = 'owner'
    handleLink.call(receiver, {
      detail: { vuePid: 'native-wrapper', nodeId: 2, webviewId: '1' },
    })

    expect(childVm.$.parent).toBe(ownerVm.$)
  })

  test('keeps a native wrapper relation pending while its owner is pending', () => {
    const pageVm = createVm()
    instances['1_0'] = pageVm as unknown as ComponentPublicInstance

    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm)
    instances['1_2'] = childMPInstance

    const receiver = createMPInstance(1)
    receiver._$vuePid = 'pending-owner'
    handleLink.call(receiver, {
      detail: { vuePid: 'native-wrapper', nodeId: 2, webviewId: '1' },
    })

    expect(childMPInstance.$vm).toBeUndefined()
    expect(childVm.$callCreatedHook).not.toHaveBeenCalled()
  })

  test('resolves a parent when the relation id belongs to the receiver', () => {
    const parentVm = createVm()
    ;(parentVm as any).$scope = { _$vueId: 'parent' }
    const parentMPInstance = createMPInstance(1)
    parentMPInstance.$vm = parentVm as unknown as ComponentPublicInstance
    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm)
    instances['1_2'] = childMPInstance

    handleLink.call(parentMPInstance, {
      detail: { vuePid: 'parent', nodeId: 2, webviewId: '1' },
    })

    expect(childVm.$.parent).toBe(parentVm.$)
  })

  test('ignores duplicate relation events after the child is created', () => {
    const parentVm = createVm()
    const parentMPInstance = createMPInstance(1)
    parentMPInstance.$vm = parentVm as unknown as ComponentPublicInstance
    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm)
    instances['1_2'] = childMPInstance
    const event = {
      detail: { vuePid: '', nodeId: 2, webviewId: '1' },
    }

    handleLink.call(parentMPInstance, event)
    handleLink.call(parentMPInstance, event)

    expect(childVm.$callCreatedHook).toHaveBeenCalledTimes(1)
    expect(childVm.$callHook).toHaveBeenCalledTimes(2)
    expect(parentVm.$children).toEqual([childVm])
  })

  test('creates a queued child after its parent created hook', () => {
    const calls: string[] = []
    const pageVm = createVm()
    const pageMPInstance = createMPInstance(0)
    pageMPInstance.$vm = pageVm as unknown as ComponentPublicInstance

    const parentMPInstance = createMPInstance(1)
    const parentVm = createVm()
    parentVm.$callCreatedHook.mockImplementation(() =>
      calls.push('parent-created')
    )
    registerComponent(parentMPInstance, parentVm, calls, 'parent-setup')
    instances['1_1'] = parentMPInstance

    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    childVm.$callCreatedHook.mockImplementation(() =>
      calls.push('child-created')
    )
    registerComponent(childMPInstance, childVm, calls, 'child-setup')
    instances['1_2'] = childMPInstance

    handleLink.call(parentMPInstance, {
      detail: { vuePid: '', nodeId: 2, webviewId: '1' },
    })
    expect(childMPInstance.$vm).toBeUndefined()

    handleLink.call(pageMPInstance, {
      detail: { vuePid: '', nodeId: 1, webviewId: '1' },
    })

    expect(calls).toEqual([
      'parent-setup',
      'parent-created',
      'child-setup',
      'child-created',
    ])
    expect(childVm.$.parent).toBe(parentVm.$)
    expect(parentVm.$children).toEqual([childVm])
  })

  test('uses the page fallback for virtualHost without triggering an event', () => {
    const pageVm = createVm()
    instances['1_0'] = pageVm as unknown as ComponentPublicInstance
    const childMPInstance = createMPInstance(2)
    const childVm = createVm()
    registerComponent(childMPInstance, childVm, [], 'setup', true)

    initRelation(childMPInstance, { vuePid: '' })

    expect(childMPInstance.triggerEvent).not.toHaveBeenCalled()
    expect(childVm.$.parent).toBe(pageVm.$)
  })

  test('uses the effective native virtualHost option', () => {
    const attached = jest.fn()
    const componentOptions = {
      options: { virtualHost: true },
      lifetimes: { attached },
      methods: {},
    } as unknown as MPComponentOptions
    const mpInstance = createMPInstance(1)

    parse(componentOptions, { handleLink })
    componentOptions.lifetimes!.attached!.call(mpInstance)

    expect(attached).toHaveBeenCalledTimes(1)
    expect(isComponentVirtualHost(mpInstance)).toBe(true)
    removePendingComponent(mpInstance)
  })

  test('keeps the legacy Lark relation behavior', () => {
    testGlobal.__PLATFORM__ = 'mp-lark'
    const rootVm = createVm()
    const parentVm = createVm()
    rootVm.descendants = { parent: parentVm }
    const receiver = createMPInstance(1)
    receiver.$vm = rootVm as unknown as ComponentPublicInstance
    const childVm = createVm()
    instances['1_2'] = childVm as unknown as ComponentPublicInstance

    handleLink.call(receiver, {
      detail: { vuePid: 'parent', nodeId: 2, webviewId: '1' },
    })

    expect(childVm.$.parent).toBe(parentVm.$)
    expect(parentVm.$children).toEqual([childVm])
    expect(childVm.$callCreatedHook).toHaveBeenCalledTimes(1)
  })

  test('drops queued state when a pending component is detached', () => {
    const mpInstance = createMPInstance(1)
    const vm = createVm()
    registerComponent(mpInstance, vm)
    removePendingComponent(mpInstance)

    expect(createPendingComponent(mpInstance)).toBeUndefined()
  })
})
