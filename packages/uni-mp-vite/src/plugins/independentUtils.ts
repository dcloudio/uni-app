import {
  type IndependentSubPackage,
  MP_INDEPENDENT_MAIN_PREFIX,
  MP_INDEPENDENT_ROOT_QUERY,
  MP_INDEPENDENT_VIRTUAL_ROOT_QUERY,
  setIndependentSubPackages,
  stringifyIndependentRoots,
} from '@dcloudio/uni-cli-shared'

export const INDEPENDENT_SUBPACKAGE_PLUGIN_NAME =
  'uni:mp-independent-subpackage'
export const INDEPENDENT_MAIN_PREFIX = MP_INDEPENDENT_MAIN_PREFIX
export const VUE_EXPORT_HELPER_ID = '\0plugin-vue:export-helper'
export const UNI_MP_RUNTIME_ID = 'uni-mp-runtime'
export const INDEPENDENT_ROOT_QUERY = MP_INDEPENDENT_ROOT_QUERY
export const INDEPENDENT_ROOT_PARAM = MP_INDEPENDENT_VIRTUAL_ROOT_QUERY

let initialIndependentRootsSignature: string | undefined

export interface UpdateIndependentSubPackagesResult {
  rootsChanged: boolean
  initialRoots: string
  currentRoots: string
}

export function initIndependentSubPackages(
  packages: IndependentSubPackage[]
): void {
  setIndependentSubPackages(packages)
  initialIndependentRootsSignature = stringifyIndependentRoots(packages)
}

export function updateIndependentSubPackages(
  packages: IndependentSubPackage[]
): UpdateIndependentSubPackagesResult {
  const currentRoots = stringifyIndependentRoots(packages)
  if (initialIndependentRootsSignature === undefined) {
    initialIndependentRootsSignature = currentRoots
  }
  const rootsChanged = currentRoots !== initialIndependentRootsSignature
  if (!rootsChanged) {
    setIndependentSubPackages(packages)
  }
  return {
    rootsChanged,
    initialRoots: initialIndependentRootsSignature,
    currentRoots,
  }
}

export {
  formatIndependentVirtualId,
  getIndependentRootByFilename,
  getIndependentRoots,
  getIndependentSubPackages,
  hasIndependentRoot,
  isAppPagesJson,
  isInIndependentRoot,
  normalizeIndependentRoot,
  parseIndependentMainRoot,
  parseIndependentRoot,
  parseIndependentVirtualRoot,
  withIndependentRoot,
  withoutIndependentRoot,
} from '@dcloudio/uni-cli-shared'
