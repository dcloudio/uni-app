import {
  findVmByVueId,
  findVmByVueIdPath,
  initVueIds,
} from '../../src/runtime/util'

describe('runtime: util', () => {
  test('init vue parent id from the host component', () => {
    const mpInstance = {} as any

    initVueIds('child', mpInstance, 'parent,grandparent')

    expect(mpInstance._$vueId).toBe('child')
    expect(mpInstance._$vuePid).toBe('parent')
    expect(mpInstance._$vuePids).toBe('parent,grandparent')
  })

  test('merge template and host parent paths', () => {
    const mpInstance = {} as any

    initVueIds('child,parent,grandparent', mpInstance, 'host-parent')

    expect(mpInstance._$vueId).toBe('child')
    expect(mpInstance._$vuePid).toBe('parent')
    expect(mpInstance._$vuePids).toBe('parent,grandparent,host-parent')
  })

  test('find parent by its instance path', () => {
    const createVm = (vueId: string, $children: any[] = []) =>
      ({ $scope: { _$vueId: vueId }, $children } as any)
    const providerA = createVm('provider')
    const providerB = createVm('provider')
    const wrapperA = createVm('wrapper-a', [providerA])
    const wrapperB = createVm('wrapper-b', [providerB])
    const page = createVm('page', [wrapperA, wrapperB])

    expect(findVmByVueId(page, 'provider')).toBe(providerB)
    expect(findVmByVueIdPath(page, 'provider,wrapper-a')).toBe(providerA)
    expect(findVmByVueIdPath(page, 'provider,wrapper-b')).toBe(providerB)
  })
})
