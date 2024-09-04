import { EventBus } from '@dcloudio/uni-api'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import type { ComponentPublicInstance } from 'vue'

export class DialogPageImpl extends EventBus implements UniDialogPage {
  route: string = ''
  options: Map<string, string | null> = new Map()
  getParentPage: () => ComponentPublicInstance | null
  vm: ComponentPublicInstance | null = null
  $vm: ComponentPublicInstance | null = null
  $component: any | null = null
  $disableEscBack: boolean = false

  constructor({
    route,
    getParentPage,
  }: {
    route: string
    getParentPage: () => ComponentPublicInstance | null
  }) {
    super()
    this.route = route
    this.getParentPage = getParentPage
  }
}

export const homeDialogPages: UniDialogPage[] = []
