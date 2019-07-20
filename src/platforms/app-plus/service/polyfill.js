import {
  invokeCallbackHandler
} from 'uni-helpers/api'

UniServiceJSBridge.publishHandler = UniServiceJSBridge.emit
UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler
