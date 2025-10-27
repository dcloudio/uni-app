import {
  UTS,
  UTSJSONObject,
  UTSValueIterable,
  UniError,
  getGlobal,
} from '@dcloudio/uni-shared'
const realGlobal = getGlobal()
realGlobal.UTS = UTS
realGlobal.UTSJSONObject = UTSJSONObject
realGlobal.UTSValueIterable = UTSValueIterable
realGlobal.UniError = UniError
export {
  UTS,
  UTSJSONObject,
  UTSValueIterable,
  UniError,
} from '@dcloudio/uni-shared'
export * from '../../runtime'
