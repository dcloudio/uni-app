import {
  invoke
} from '../../bridge'

import {
  showPage
} from '../../../helpers/page.js'

import { getLocale } from 'uni-core/helpers/i18n'

export function openLocation (data, callbackId) {
  showPage({
    url: '__uniappopenlocation',
    data: Object.assign({}, data, {
      locale: getLocale()
    }),
    style: {
      titleNView: {
        type: 'transparent'
      },
      popGesture: 'close',
      backButtonAutoControl: 'close'
    },
    onClose () {
      invoke(callbackId, {
        errMsg: 'openLocation:fail cancel'
      })
    }
  })
  return {
    errMsg: 'openLocation:ok'
  }
}
