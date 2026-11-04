//#if !_X_VAPOR_
import * as vdom from './UniElement-vdom'
//#else
import * as vapor from './UniElement-vapor'
//#endif

// 仅在构建时选择实现，保持组件现有的导入及继承入口不变。
export type UniElement = InstanceType<typeof UniElement>
// prettier-ignore
export const UniElement =
//#if !_X_VAPOR_
  vdom.UniElement
//#else
vapor.UniElement
//#endif
