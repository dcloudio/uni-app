import type { ComponentPublicInstance } from 'vue'

export class DialogPage {
  route: string = ''
  component?: any
  $getParentPage: () => ComponentPublicInstance | null
  $disableEscBack: boolean = false
  $vm?: ComponentPublicInstance

  constructor({
    route,
    component,
    $getParentPage,
    $disableEscBack = false,
  }: {
    route: string
    component: any
    $getParentPage: () => ComponentPublicInstance | null
    $disableEscBack?: boolean
  }) {
    this.route = route
    this.component = component
    this.$getParentPage = $getParentPage
    this.$disableEscBack = $disableEscBack
  }
}

export type UniDialogPage = DialogPage

export const homeDialogPages = [] as UniDialogPage[]
