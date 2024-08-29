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
    const eventBus = new EventBus()
    this.$on = (eventName: string, callback: (result: any) => void) => {
      eventBus.$on(eventName, callback)
    }
    this.$once = (eventName: string, callback: (result: any) => void) => {
      eventBus.$once(eventName, callback)
    }
    this.$off = (
      eventName?: string | string[],
      callback?: (result: any) => void
    ) => {
      eventBus.$off(eventName, callback)
    }
    this.$emit = (eventName: string, ...args: any[]) => {
      eventBus.$emit(eventName, ...args)
    }
  }
}

export type UniDialogPage = DialogPage

export const homeDialogPages = [] as UniDialogPage[]
