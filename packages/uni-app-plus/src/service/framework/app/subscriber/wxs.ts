import { formatLog } from '@dcloudio/uni-shared'
import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import { findNodeById } from '../../dom/Page'

export function onWxsInvokeCallMethod(
  {
    nodeId,
    ownerId,
    method,
    args,
  }: { nodeId: number; ownerId: number; method: string; args: unknown },
  pageId: string
) {
  const node = findNodeById(nodeId, parseInt(pageId))
  if (!node) {
    if (__DEV__) {
      console.error(formatLog('Wxs', 'CallMethod', nodeId, 'not found'))
    }
    return
  }
  const vm = resolveOwnerVm(ownerId, node.__vueParentComponent)
  if (!vm) {
    if (__DEV__) {
      console.error(formatLog('Wxs', 'CallMethod', 'vm not found'))
    }
    return
  }
  if (!(vm as any)[method]) {
    if (__DEV__) {
      console.error(formatLog('Wxs', 'CallMethod', method, ' not found'))
    }
    return
  }
  ;((vm as any)[method] as unknown as Function)(args)
}

function resolveOwnerVm(
  ownerId: number,
  vm?: ComponentInternalInstance
): ComponentPublicInstance | null {
  if (!vm) {
    return null
  }
  if (vm.uid === ownerId) {
    return vm.proxy
  }
  let parent = vm.parent
  while (parent) {
    if (parent.uid === ownerId) {
      return parent.proxy
    }
    parent = parent.parent
  }
  return vm.proxy
}
