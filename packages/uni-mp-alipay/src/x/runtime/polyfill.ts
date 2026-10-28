import {
  UTS,
  UTSJSONObject,
  UTSValueIterable,
  UniError,
  getGlobal,
} from '@dcloudio/uni-shared'
import { initWindowInfo } from './windowInfo'

initWindowInfo()

const realGlobal = getGlobal()
realGlobal.UTS = UTS
realGlobal.UTSJSONObject = UTSJSONObject
realGlobal.UTSValueIterable = UTSValueIterable
realGlobal.UniError = UniError
