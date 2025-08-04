import { initUni } from '@dcloudio/uni-mp-core'
import { initWx } from '../../api/wx'
import * as shims from '../../api/shims'
import * as protocols from '../../api/protocols'
export const wx = initWx()
export default initUni(shims, protocols, wx)
