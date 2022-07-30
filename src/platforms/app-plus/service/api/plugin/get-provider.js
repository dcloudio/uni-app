import {
  invoke
} from '../../bridge'

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
            if (typeof provider.serviceReady === 'boolean') {
              provider.isAppExist = provider.serviceReady
            }
            if (typeof provider.nativeClient === 'boolean') {
              provider.isAppExist = provider.nativeClient
            }
            return provider
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
