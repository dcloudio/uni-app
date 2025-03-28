import * as uni from './api/index'
import { registerApp as __registerApp, initApp } from './framework/app'
import {
  definePage as __definePage,
  getCurrentPages,
} from '../service/framework/page'
import * as components from './components'

import { systemRoutes as __uniSystemRoutes } from './framework/route'

//#if _APP_IOS_
import { registerSystemPages as registerSystemPagesIOS } from './pages.ios'
//#endif

//#if _APP_HARMONY_
import { registerSystemPages as registerSystemPagesHarmony } from './pages.harmony'
//#endif

import {
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
} from '@dcloudio/uni-api'

//#if _APP_IOS_
registerSystemPagesIOS()
//#endif

//#if _APP_HARMONY_
registerSystemPagesHarmony()
//#endif

export {
  uni,
  getCurrentPages,
  __definePage,
  __registerApp,
  __uniSystemRoutes,
  initApp,
  components,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
}
