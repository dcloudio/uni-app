export * from './jsonFile'
export { AppJson, ComponentJson, MiniProgramComponentsType } from './types'
export { mergeMiniProgramAppJson, parseMiniProgramPagesJson } from './pages'
export { parseMiniProgramProjectJson } from './project'
export {
  MP_INDEPENDENT_ROOT_QUERY,
  MP_INDEPENDENT_MAIN_PREFIX,
  MP_INDEPENDENT_VIRTUAL_ROOT_QUERY,
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
  parseIndependentSubPackages,
  parseIndependentVirtualRoot,
  resolveIndependentRoot,
  setIndependentSubPackages,
  stringifyIndependentRoots,
  withIndependentRoot,
  withIndependentRootIfNeeded,
  withoutIndependentRoot,
} from './subpackage'
export type { IndependentSubPackage } from './subpackage'
