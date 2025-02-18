import UniActionSheetPage from '@dcloudio/uni-ext-api/uni-actionSheet/pages/actionSheet/actionSheet.vue'
import UniChooseLocationPage from '@dcloudio/uni-ext-api/uni-chooseLocation/pages/chooseLocation/chooseLocation.vue'
import UniUniModalPage from '@dcloudio/uni-ext-api/uni-modal/pages/uniModal/uniModal.vue'
import UniPreviewImagePage from '@dcloudio/uni-ext-api/uni-previewImage/pages/previewImage/previewImage.vue'
import { registerSystemRoute } from './framework/route'

export function registerSystemPages() {
  registerSystemRoute('uni:actionSheet', UniActionSheetPage, {
    disableSwipeBack: false,
  })
  registerSystemRoute('uni:chooseLocation', UniChooseLocationPage, {
    disableSwipeBack: false,
  })
  registerSystemRoute('uni:uniModal', UniUniModalPage, {
    disableSwipeBack: false,
  })
  registerSystemRoute('uni:previewImage', UniPreviewImagePage, {
    disableSwipeBack: false,
  })
}
