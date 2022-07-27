import { extend } from '@vue/shared'
import {
  API_CREATE_PUSH_MESSAGE,
  API_TYPE_CREATE_PUSH_MESSAGE,
  CreatePushMessageOptions,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getAppAuthorizeSetting } from '../device/getAppAuthorizeSetting'
export const createPushMessage = defineAsyncApi<API_TYPE_CREATE_PUSH_MESSAGE>(
  API_CREATE_PUSH_MESSAGE,
  (opts, { resolve, reject }) => {
    const setting = getAppAuthorizeSetting()
    if (setting.notificationAuthorized !== 'authorized') {
      return reject(`notificationAuthorized: ` + setting.notificationAuthorized)
    }
    const options = extend({}, opts)
    delete (options as any).content
    delete options.payload
    plus.push.createMessage(opts.content, opts.payload as string, options)
    resolve()
  },
  undefined,
  CreatePushMessageOptions
)
