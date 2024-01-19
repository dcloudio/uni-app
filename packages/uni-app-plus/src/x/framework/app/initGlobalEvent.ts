import { IApp } from '@dcloudio/uni-app-x/types/native'
import { backbuttonListener } from '../../../service/framework/app/utils'

export function initGlobalEvent(app: IApp) {
  app.addKeyEventListener('onBackButton', () => {
    backbuttonListener()
    return true
  })
}
