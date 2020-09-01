import UniServiceJSBridge from '../../service/bridge'
import UniViewJSBridge from '../../view/bridge'

export function initBridge() {
  global.UniServiceJSBridge = UniServiceJSBridge
  global.UniViewJSBridge = UniViewJSBridge
}
