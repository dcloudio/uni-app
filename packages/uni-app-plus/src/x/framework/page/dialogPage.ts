import {
  type EmitterEmit,
  type EmitterOff,
  type EmitterOn,
  type EmitterOnce,
  EventBus,
} from '@dcloudio/uni-api'
import type { ComponentPublicInstance } from 'vue'

export class DialogPage {
  route: string = ''
  component?: any
  $getParentPage: () => ComponentPublicInstance | null
  $on: EmitterOn
  $once: EmitterOnce
  $off: EmitterOff
  $emit: EmitterEmit
  $disableEscBack: boolean = false
  $vm?: ComponentPublicInstance

  constructor({
    route,
    component,
    $getParentPage,
  }: {
    route: string
    component: any
    $getParentPage: () => ComponentPublicInstance | null
  }) {
    this.route = route
    this.component = component
    this.$getParentPage = $getParentPage
    const { $on, $once, $emit, $off } = new EventBus()
    this.$on = $on
    this.$once = $once
    this.$off = $off
    this.$emit = $emit
  }
}

export type UniDialogPage = DialogPage

export const homeDialogPages = [] as UniDialogPage[]
