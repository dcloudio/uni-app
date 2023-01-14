import { initUni } from '@dcloudio/uni-mp-core'
import { initWx } from './wx'
import * as shims from './shims'
import * as protocols from './protocols'
export const wx = ((globalThis as any).wx = initWx())
export default initUni(shims, protocols, wx)
