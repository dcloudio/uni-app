import type { IApp } from '@dcloudio/uni-app-x/types/native'
import { backbuttonListener } from '../../../service/framework/app/utils'
import { ON_BACK_BUTTON } from '../../constants'

export function initGlobalEvent(app: IApp) {
  app.addKeyEventListener(ON_BACK_BUTTON, () => {
    backbuttonListener()
    return true
  })
}
