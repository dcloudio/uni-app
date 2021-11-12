import { defineAsyncApi } from '@dcloudio/uni-api'
import { sendNativeEvent } from './requireNativePlugin'

export const sendHostEvent = sendNativeEvent

const API_NAVIGATE_TO_MINI_PROGRAM = 'navigateToMiniProgram'

interface NavigateToMiniProgramOpitons {
  success?: (result: any) => void
  fail?: (result: any) => void
  complete?: (result: any) => void
}
type API_TYPE_NAVIGATE_TO_MINI_PROGRAM = (
  options: NavigateToMiniProgramOpitons
) => void

export const navigateToMiniProgram =
  defineAsyncApi<API_TYPE_NAVIGATE_TO_MINI_PROGRAM>(
    API_NAVIGATE_TO_MINI_PROGRAM,
    (data, { resolve, reject }) => {
      sendHostEvent(
        API_NAVIGATE_TO_MINI_PROGRAM,
        data,
        (res: { errMsg: string }) => {
          if (res.errMsg && res.errMsg.indexOf(':ok') === -1) {
            return reject(res.errMsg.split(' ')[1])
          }
          resolve()
        }
      )
    }
  )
