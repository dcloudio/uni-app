import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import { UniBasePageImpl } from '../../../service/framework/page/getCurrentPages'
import type { ComponentPublicInstance } from 'vue'

export class UniDialogPageImpl
  extends UniBasePageImpl
  implements UniDialogPage
{
  vm: ComponentPublicInstance | null = null
  $vm: ComponentPublicInstance | null = null
  $component: any | null = null
  $disableEscBack: boolean = false
  constructor({
    route,
    options,
    getParentPage,
  }: {
    route: string
    options: Map<string, string | null>
    getParentPage: () => UniPage | null
  }) {
    super({ route, options })
    this.getParentPage = getParentPage
  }
}

export const homeDialogPages: UniDialogPage[] = []
