import {
  invokeCallbackHandler
} from 'uni-helpers/api'
// 尽早将 invokeCallbackHandler 挂在 UniServiceJSBridge 中
UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler
