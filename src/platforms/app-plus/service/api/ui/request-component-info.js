import {
  requestComponentInfo as requestVueComponentInfo
} from 'uni-platforms/h5/service/api/ui/request-component-info'

import {
  requestComponentInfo as requestNVueComponentInfo
} from 'uni-platforms/app-plus-nvue/service/api/ui/request-component-info'

export function requestComponentInfo (pageInstance, queue, callback) {
  pageInstance.$page.meta.isNVue
    ? requestNVueComponentInfo(pageInstance, queue, callback)
    : requestVueComponentInfo(pageInstance, queue, callback)
}
