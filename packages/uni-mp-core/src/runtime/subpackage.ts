import type { ComponentPublicInstance } from 'vue'

interface SubpackageApp {
  $vm?: ComponentPublicInstance
}

type Subpackages = Record<string, SubpackageApp>

let runtimeSubpackageRoot: string | undefined

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
  vm: ComponentPublicInstance
) {
  const subpackageRoot = normalizeSubpackageRoot(root)
  if (!subpackageRoot) {
    return
  }
  setRuntimeSubpackageRoot(subpackageRoot)
  const globalObject = __GLOBAL__ as any
  ;(globalObject.$subpackages || (globalObject.$subpackages = {}))[
    subpackageRoot
  ] = {
    $vm: vm,
  }
}

export function getSubpackageAppVm() {
  const subpackageRoot = getRuntimeSubpackageRoot()
  if (!subpackageRoot) {
    return
  }
  const globalObject = __GLOBAL__ as any
  const subpackages = globalObject.$subpackages as Subpackages | undefined
  if (!subpackages) {
    return
  }
  return subpackages[subpackageRoot]?.$vm
}

function normalizeSubpackageRoot(root: string | undefined) {
  return typeof root === 'string' ? root.replace(/^\/+|\/+$/g, '') : undefined
}
