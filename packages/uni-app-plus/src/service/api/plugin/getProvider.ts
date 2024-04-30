import {
  API_GET_PROVIDER,
  type API_TYPE_GET_PROVIDER,
  GetProviderProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

type Service =
  | PlusShareShareService
  | PlusOauthAuthService
  | PlusPaymentPaymentChannel
  | PlusPushClientInfo
type Provider = Service['id'][]
type Providers = Service[]
type CallBack = (
  err: null | Error,
  provider?: Provider,
  providers?: Providers
) => void

const providers = {
  oauth(callback: CallBack) {
    plus.oauth.getServices(
      (services) => {
        services = services
        const provider: Provider = []
        services.forEach(({ id }) => {
          provider.push(id)
        })
        callback(null, provider, services)
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
        services = services
        const provider: Provider = []
        services.forEach(({ id }) => {
          provider.push(id)
        })
        callback(null, provider, services)
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
        callback(null, provider, services)
      },
      (err) => {
        callback(err)
      }
    )
  },
  push(callback: CallBack) {
    if (typeof weex !== 'undefined' || typeof plus !== 'undefined') {
      const clientInfo = plus.push.getClientInfo()
      callback(null, [clientInfo.id], [clientInfo])
    } else {
      callback(null, [])
    }
  },
}

export const getProvider = defineAsyncApi<API_TYPE_GET_PROVIDER>(
  API_GET_PROVIDER,
  ({ service }, { resolve, reject }) => {
    if (providers[service]) {
      providers[service]((err, provider = [], providers = []) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({
            service,
            // 5+ PlusShareShareService['id'] 类型错误
            provider: provider as any[],
            providers: providers.map((provider: any) => {
              if (typeof provider.serviceReady === 'boolean') {
                provider.isAppExist = provider.serviceReady
              }
              if (typeof provider.nativeClient === 'boolean') {
                provider.isAppExist = provider.nativeClient
              }
              return provider
            }),
          })
        }
      })
    } else {
      reject('service not found')
    }
  },
  GetProviderProtocol
)
