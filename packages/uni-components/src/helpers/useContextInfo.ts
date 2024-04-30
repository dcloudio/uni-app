import { getCurrentInstance, onMounted } from 'vue'
import { useCurrentPageId } from '@dcloudio/uni-core'

type ContextType = 'canvas' | 'map' | 'video' | 'editor'

export interface ContextInfo {
  id: string
  type: ContextType
  page: number
}

export interface HTMLElementWithContextInfo extends HTMLElement {
  __uniContextInfo?: ContextInfo
}
let index = 0
export function useContextInfo(_id?: string) {
  const page = useCurrentPageId()
  const instance = getCurrentInstance()!
  const vm = instance.proxy!
  const type = vm.$options.name!.toLowerCase() as ContextType
  const id = _id || (vm as any).id || `context${index++}`
  onMounted(() => {
    const el = vm.$el as HTMLElementWithContextInfo
    el.__uniContextInfo = {
      id,
      type,
      page,
    }
  })
  return `${type}.${id}`
}
export function getContextInfo(el: HTMLElement | HTMLElementWithContextInfo) {
  return (el as HTMLElementWithContextInfo).__uniContextInfo
}
