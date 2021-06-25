import {
  defineAsyncApi,
  API_GET_PROVIDER,
  API_TYPE_GET_PROVIDER,
  GetProviderProtocol,
} from '@dcloudio/uni-api'

type Provider = PlusOauthAuthService['id'][]
type CallBack = (err: null | Error, provider?: Provider) => void

const providers = {
  oauth(callback: CallBack) {
    plus.oauth.getServices(
      (services) => {
        services = services as PlusOauthAuthService[]
        const provider: Provider = []
        services.forEach(({ id }) => {
          provider.push(id)
        })
        callback(null, provider)
      },
      (err) => {
        err = err as Error
        callback(err)
      }
    )
  },
  share(callback: CallBack) {
    plus.share.getServices(
      (services) => {
        const provider: Provider = []
        services.forEach(({ id }) => {
          provider.push(id)
        })
        callback(null, provider)
      },
      (err) => {
        callback(err)
      }
    )
  },
  payment(callback: CallBack) {
    plus.payment.getChannels(
      (services) => {
        const provider: Provider = []
        services.forEach(({ id }) => {
          provider.push(id)
        })
        callback(null, provider)
      },
      (err) => {
        callback(err)
      }
    )
  },
  push(callback: CallBack) {
    if (typeof weex !== 'undefined' || typeof plus !== 'undefined') {
      callback(null, [plus.push.getClientInfo().id])
    } else {
      callback(null, [])
    }
  },
}

export const getProvider = defineAsyncApi<API_TYPE_GET_PROVIDER>(
  API_GET_PROVIDER,
  ({ service }, { resolve, reject }) => {
    if (providers[service]) {
      providers[service]((err, provider) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({
            service,
            provider: provider as any[],
          })
        }
      })
    } else {
      reject('service not found')
    }
  },
  GetProviderProtocol
)
