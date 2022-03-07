import { provide } from 'vue'
import { PolySymbol } from '@dcloudio/uni-core'
export const labelProps = {
  for: {
    type: String,
    default: '',
  },
}
export const uniLabelKey = PolySymbol(__DEV__ ? 'uniLabel' : 'ul')
export interface UniLabelCtx {
  addHandler: (handler: UniLabelHandlerCtx) => void
  removeHandler: (handler: UniLabelHandlerCtx) => void
}
export type UniLabelHandlerCtx = ($event: Event, b: boolean) => void
export function useProvideLabel() {
  const handlers: UniLabelHandlerCtx[] = []

  provide<UniLabelCtx>(uniLabelKey, {
    addHandler(handler: UniLabelHandlerCtx) {
      handlers.push(handler)
    },
    removeHandler(handler: UniLabelHandlerCtx) {
      handlers.splice(handlers.indexOf(handler), 1)
    },
  })

  return handlers
}
