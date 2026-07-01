export * from './jsonFile'
export { AppJson, ComponentJson, MiniProgramComponentsType } from './types'
export { mergeMiniProgramAppJson, parseMiniProgramPagesJson } from './pages'
export { parseMiniProgramProjectJson } from './project'
export {
  MP_INDEPENDENT_ROOT_QUERY,
  parseIndependentRoot,
  parseIndependentSubPackages,
  withIndependentRoot,
  withoutIndependentRoot,
} from './subpackage'
export type { IndependentSubPackage } from './subpackage'
