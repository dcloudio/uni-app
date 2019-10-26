import {
  requestComponentInfo as requestVueComponentInfo
} from 'uni-platforms/h5/service/api/ui/request-component-info'

import {
  requestComponentInfo as requestNVueComponentInfo
} from 'uni-platforms/app-plus-nvue/service/api/ui/request-component-info'

export function requestComponentInfo (pageVm, queue, callback) {
  pageVm.$page.meta.isNVue
    ? requestNVueComponentInfo(pageVm, queue, callback)
    : requestVueComponentInfo(pageVm, queue, callback)
}
