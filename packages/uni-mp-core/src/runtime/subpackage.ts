import type { ComponentPublicInstance } from 'vue'

interface SubpackageApp {
  $vm?: ComponentPublicInstance
}

type Subpackages = Record<string, SubpackageApp>

export function resolveSubpackageRoot(root?: string) {
  return (
    normalizeSubpackageRoot(root) ||
    normalizeSubpackageRoot(process.env.UNI_SUBPACKAGE)
  )
}

export function setSubpackageAppVm(
  root: string | undefined,
  vm: ComponentPublicInstance
) {
  const subpackageRoot = normalizeSubpackageRoot(root)
  if (!subpackageRoot) {
    return
  }
  const globalObject = __GLOBAL__ as any
  ;(globalObject.$subpackages || (globalObject.$subpackages = {}))[
    subpackageRoot
  ] = {
    $vm: vm,
  }
}

export function getSubpackageAppVm() {
  const globalObject = __GLOBAL__ as any
  const subpackages = globalObject.$subpackages as Subpackages | undefined
  if (!subpackages) {
    return
  }
  const root =
    findSubpackageRootByRoute(subpackages, getCurrentPageRoute()) ||
    normalizeSubpackageRoot(process.env.UNI_SUBPACKAGE)
  return root && subpackages[root]?.$vm
}

export function findSubpackageRootByRoute(
  subpackages: Subpackages,
  route: string
) {
  const normalizedRoute = normalizeRoute(route)
  if (!normalizedRoute) {
    return
  }
  return Object.keys(subpackages).find((root) => {
    const normalizedRoot = normalizeSubpackageRoot(root)
    return (
      normalizedRoot &&
      (normalizedRoute === normalizedRoot ||
        normalizedRoute.startsWith(`${normalizedRoot}/`))
    )
  })
}

function getCurrentPageRoute() {
  if (typeof getCurrentPages !== 'function') {
    return ''
  }
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] as
    | {
        route?: string
        __route__?: string
      }
    | undefined
  return page?.route || page?.__route__ || ''
}

function normalizeRoute(route: string | undefined) {
  return normalizeSubpackageRoot(route)
}

function normalizeSubpackageRoot(root: string | undefined) {
  return typeof root === 'string' ? root.replace(/^\/+|\/+$/g, '') : undefined
}
