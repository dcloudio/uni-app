import type { ComponentPublicInstance } from 'vue'

interface SubpackageApp {
  $vm?: ComponentPublicInstance
}

type Subpackages = Record<string, SubpackageApp>

let runtimeSubpackageRoot: string | undefined
const runtimeSubpackages: Subpackages = Object.create(null)

export function resolveSubpackageRoot(root?: string) {
  return (
    normalizeSubpackageRoot(root) ||
    normalizeSubpackageRoot(process.env.UNI_SUBPACKAGE)
  )
}

export function setRuntimeSubpackageRoot(root?: string) {
  runtimeSubpackageRoot = normalizeSubpackageRoot(root)
}

export function getRuntimeSubpackageRoot() {
  return runtimeSubpackageRoot
}

export function setSubpackageAppVm(
  root: string | undefined,
  vm: ComponentPublicInstance,
  independent?: boolean
) {
  const subpackageRoot = normalizeSubpackageRoot(root)
  if (!subpackageRoot) {
    return
  }
  setRuntimeSubpackageRoot(subpackageRoot)
  if (independent) {
    // 独立分包可能先于主包启动，主包 runtime 后续会重建 wx/global，不能把 vm 只挂到全局对象上。
    runtimeSubpackages[subpackageRoot] = {
      $vm: vm,
    }
  } else {
    // 普通分包保留旧的全局存储策略，兼容 UNI_SUBPACKAGE 单独编译等历史路径。
    const globalObject = __GLOBAL__ as any
    ;(globalObject.$subpackages || (globalObject.$subpackages = {}))[
      subpackageRoot
    ] = {
      $vm: vm,
    }
  }
}

export function getSubpackageAppVm() {
  const subpackageRoot = getRuntimeSubpackageRoot()
  if (!subpackageRoot) {
    return
  }
  // 独立分包优先命中 runtime 内缓存；普通分包继续回退到历史的全局缓存。
  return (
    runtimeSubpackages[subpackageRoot]?.$vm ||
    ((__GLOBAL__ as any).$subpackages as Subpackages | undefined)?.[
      subpackageRoot
    ]?.$vm
  )
}

function normalizeSubpackageRoot(root: string | undefined) {
  return typeof root === 'string' ? root.replace(/^\/+|\/+$/g, '') : undefined
}
