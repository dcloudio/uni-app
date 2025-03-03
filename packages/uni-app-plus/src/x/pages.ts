import UniActionSheetPage from '@dcloudio/uni-ext-api/uni-actionSheet/pages/actionSheet/actionSheet.vue'
import UniChooseLocationPage from '@dcloudio/uni-ext-api/uni-chooseLocation/pages/chooseLocation/chooseLocation.vue'
import { registerSystemRoute } from './framework/route'

export function registerSystemPages() {
  registerSystemRoute('uni:actionSheet', UniActionSheetPage, {
    disableSwipeBack: false,
  })
  registerSystemRoute('uni:chooseLocation', UniChooseLocationPage, {
    disableSwipeBack: false,
  })
}
