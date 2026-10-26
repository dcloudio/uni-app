import { type Ref, type SetupContext, type VNode, markRaw, provide } from 'vue'
import { flatVNode } from '../../helpers/flatVNode'
import { useRebuild } from '../../helpers/useRebuild'
import type {
  AddMovableViewContext,
  MovableViewContext,
  RemoveMovableViewContext,
} from './useMovableArea'

export function useMovableAreaChildren(
  rootRef: Ref<HTMLElement | null>,
  slots: SetupContext['slots'],
  setContexts: (contexts: MovableViewContext[]) => void
) {
  let movableViewItems: VNode[] | HTMLCollection = []
  const originMovableViewContexts: MovableViewContext[] = []
  function updateMovableViewContexts() {
    const contexts: MovableViewContext[] = []
    for (let index = 0; index < movableViewItems.length; index++) {
      let movableViewItem: VNode | Element = movableViewItems[index]
      if (!(__PLATFORM__ === 'app' && movableViewItem instanceof Element)) {
        movableViewItem = (movableViewItem as VNode).el as HTMLElement
      }
      const movableViewContext = originMovableViewContexts.find(
        (context) => movableViewItem === context.rootRef.value
      )
      if (movableViewContext) {
        contexts.push(markRaw(movableViewContext))
      }
    }
    setContexts(contexts)
  }
  if (__PLATFORM__ === 'app') {
    useRebuild(() => {
      if (rootRef.value) {
        movableViewItems = (rootRef.value as HTMLElement).children
      }
      updateMovableViewContexts()
    })
  }
  const addMovableViewContext: AddMovableViewContext = (movableViewContext) => {
    originMovableViewContexts.push(movableViewContext)
    updateMovableViewContexts()
  }
  const removeMovableViewContext: RemoveMovableViewContext = (
    movableViewContext
  ) => {
    const index = originMovableViewContexts.indexOf(movableViewContext)
    if (index >= 0) {
      originMovableViewContexts.splice(index, 1)
      updateMovableViewContexts()
    }
  }
  provide('addMovableViewContext', addMovableViewContext)
  provide('removeMovableViewContext', removeMovableViewContext)

  return () => {
    const defaultSlots = slots.default && slots.default()
    if (__PLATFORM__ !== 'app') {
      movableViewItems = flatVNode(defaultSlots)
    }
    return movableViewItems
  }
}
