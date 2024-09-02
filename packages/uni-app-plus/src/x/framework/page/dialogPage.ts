import { UniEventBus } from '@dcloudio/uni-api'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/uni'
import type { ComponentPublicInstance } from 'vue'

export class DialogPage implements UniDialogPage {
  route: string = ''
  $component: any | null = null
  $getParentPage: () => ComponentPublicInstance | null
  private $eventBus = new UniEventBus()
  on = (eventName: string, callback: Function) => {
    this.$eventBus.on(eventName, callback)
  }
  once = (eventName: string, callback: Function) => {
    this.$eventBus.once(eventName, callback)
  }
  off = (eventName?: string, callback?: Function | null) => {
    this.$eventBus.off(eventName, callback)
  }
  emit = (eventName: string, ...args: any[]) => {
    this.$eventBus.emit(eventName, ...args)
  }
  $disableEscBack: boolean = false
  $vm: ComponentPublicInstance | null = null

  constructor({
    route,
    $getParentPage,
  }: {
    route: string
    $getParentPage: () => ComponentPublicInstance | null
  }) {
    this.route = route
    this.$getParentPage = $getParentPage
  }
}

export const homeDialogPages: UniDialogPage[] = []
