export * from './jsonFile'
export { AppJson, ComponentJson, MiniProgramComponentsType } from './types'
export { mergeMiniProgramAppJson, parseMiniProgramPagesJson } from './pages'
export { parseMiniProgramProjectJson } from './project'
export {
  MP_INDEPENDENT_ROOT_QUERY,
  getIndependentRootByFilename,
  getIndependentRoots,
  getIndependentSubPackages,
  hasIndependentRoot,
  isAppPagesJson,
  isInIndependentRoot,
  normalizeIndependentRoot,
  parseIndependentRoot,
  parseIndependentSubPackages,
  resolveIndependentRoot,
  setIndependentSubPackages,
  stringifyIndependentRoots,
  withIndependentRoot,
  withIndependentRootIfNeeded,
  withoutIndependentRoot,
} from './subpackage'
export type { IndependentSubPackage } from './subpackage'
