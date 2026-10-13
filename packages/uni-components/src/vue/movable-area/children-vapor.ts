import { type Ref, type SetupContext, markRaw, provide } from 'vue'
import type {
  AddMovableViewContext,
  MovableViewContext,
  RemoveMovableViewContext,
} from './index'

export function useMovableAreaChildren(
  rootRef: Ref<HTMLElement | null>,
  slots: SetupContext['slots'],
  setContexts: (contexts: MovableViewContext[]) => void
) {
  // 子组件挂载时 DOM 已插入；只接收直接子节点，不遍历 Block 或监听 slot 更新。
  // 重排不改变成员关系，缩放与尺寸更新也不依赖上下文顺序。
  const contexts: MovableViewContext[] = []
  setContexts(contexts)
  const add: AddMovableViewContext = (context) => {
    if (context.rootRef.value?.parentElement === rootRef.value) {
      contexts.push(markRaw(context))
    }
  }
  const remove: RemoveMovableViewContext = (context) => {
    const index = contexts.indexOf(context)
    if (index >= 0) {
      contexts.splice(index, 1)
    }
  }
  provide('addMovableViewContext', add)
  provide('removeMovableViewContext', remove)

  return () => slots.default && slots.default()
}
