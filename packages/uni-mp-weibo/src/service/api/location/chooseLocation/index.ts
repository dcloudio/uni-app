import { nextTick, reactive } from 'vue'
import {
  API_CHOOSE_LOCATION,
  API_TYPE_CHOOSE_LOCATION,
  defineAsyncApi,
  ChooseLocationProtocol,
} from '@dcloudio/uni-api'
import { ensureRoot, createRootApp } from '../../ui/popup/utils'
import LoctaionPicker, { Props, Poi } from './LoctaionPicker'

let state: Props | null = null

export const chooseLocation = defineAsyncApi<API_TYPE_CHOOSE_LOCATION>(
  API_CHOOSE_LOCATION,
  (args, { resolve, reject }) => {
    if (!state) {
      state = reactive(args) as Props
      // 异步执行，避免干扰 getCurrentInstance
      nextTick(() => {
        const app = createRootApp(
          LoctaionPicker,
          state as Props,
          (poi: Poi) => {
            state = null
            nextTick(() => {
              app.unmount()
            })
            poi ? resolve(poi) : reject('cancel')
          }
        )
        app.mount(ensureRoot('u-a-c'))
      })
    } else {
      // 禁止重复调用
      reject('cancel')
    }
  },
  ChooseLocationProtocol
)
