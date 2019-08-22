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
      callback(null, provider)
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
      callback(null, provider)
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
      callback(null, provider)
    }, err => {
      callback(err)
    })
  },
  push (callback) {
    if (typeof weex !== 'undefined' || typeof plus !== 'undefined') {
      callback(null, [plus.push.getClientInfo().id])
    } else {
      callback(null, [])
    }
  }
}

export function getProvider ({
  service
}, callbackId) {
  if (providers[service]) {
    providers[service]((err, provider) => {
      if (err) {
        invoke(callbackId, {
          errMsg: 'getProvider:fail:' + err.message
        })
      } else {
        invoke(callbackId, {
          errMsg: 'getProvider:ok',
          service,
          provider
        })
      }
    })
  } else {
    invoke(callbackId, {
      errMsg: 'getProvider:fail:服务[' + service + ']不支持'
    })
  }
}
