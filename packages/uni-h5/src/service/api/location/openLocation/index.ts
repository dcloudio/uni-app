import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import {
  API_OPEN_LOCATION,
  API_TYPE_OPEN_LOCATION,
  defineAsyncApi,
  OpenLocationProtocol,
  OpenLocationOptions,
} from '@dcloudio/uni-api'
import { ensureRoot, createRootApp } from '../../ui/popup/utils'
import LocationView, { Props } from './LocationView'

let state: Props | null = null

export const openLocation = defineAsyncApi<API_TYPE_OPEN_LOCATION>(
  API_OPEN_LOCATION,
  (args, { resolve }) => {
    if (!state) {
      state = reactive(args) as Props
      // 异步执行，避免干扰 getCurrentInstance
      nextTick(() => {
        const app = createRootApp(LocationView, state as Props, () => {
          state = null
          nextTick(() => {
            app.unmount()
          })
        })
        app.mount(ensureRoot('u-a-o'))
      })
    } else {
      extend(state, args)
    }
    resolve()
  },
  OpenLocationProtocol,
  OpenLocationOptions
)
