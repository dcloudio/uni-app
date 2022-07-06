import {
  invoke
} from '../../bridge'
import { isPlainObject } from 'uni-shared'

const providers = {
  oauth (callback) {
    plus.oauth.getServices(services => {
      const provider = []
      services.forEach(({
        id
      }) => {
        provider.push(id)
      })
      callback(null, provider, services)
    }, err => {
      callback(err)
    })
  },
  share (callback) {
    plus.share.getServices(services => {
      const provider = []
      services.forEach(({
        id
      }) => {
        provider.push(id)
      })
      callback(null, provider, services)
    }, err => {
      callback(err)
    })
  },
  payment (callback) {
    plus.payment.getChannels(services => {
      const provider = []
      services.forEach(({
        id
      }) => {
        provider.push(id)
      })
      callback(null, provider, services)
    }, err => {
      callback(err)
    })
  },
  push (callback) {
    if (typeof weex !== 'undefined' || typeof plus !== 'undefined') {
      const clientInfo = plus.push.getClientInfo()
      callback(null, [clientInfo.id], [clientInfo])
    } else {
      callback(null, [])
    }
  }
}

export function getProvider ({
  service
}, callbackId) {
  if (providers[service]) {
    providers[service]((err, provider, providers) => {
      if (err) {
        invoke(callbackId, {
          errMsg: 'getProvider:fail ' + err.message
        })
      } else {
        invoke(callbackId, {
          errMsg: 'getProvider:ok',
          service,
          provider,
          providers: providers.map((provider) => {
            const returnProvider = {}
            if (isPlainObject(provider)) {
              for (const key in provider) {
                if (Object.hasOwnProperty.call(provider, key)) {
                  const item = provider[key]
                  if (typeof item !== 'undefined') {
                    const _key =
                      key === 'nativeClient' || key === 'serviceReady'
                        ? 'isAppExist'
                        : key
                    returnProvider[_key] = item
                  }
                }
              }
            }
            return returnProvider
          })
        })
      }
    })
  } else {
    invoke(callbackId, {
      errMsg: 'getProvider:fail service not found'
    })
  }
}
