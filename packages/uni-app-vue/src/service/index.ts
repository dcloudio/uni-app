export * from '../../lib/service.runtime.esm'
export * from './helpers'
// TODO 临时方案，后续升级到最新vue版本，则不需要这个方法
import { getCurrentInstance } from '../../lib/service.runtime.esm'
export const getCurrentGenericInstance = getCurrentInstance
