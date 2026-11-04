import { ref, watch, watchEffect } from 'vue'
import type { Component } from 'vue'
//#if _X_VAPOR_
import { createVaporApp } from 'vue'
//#else
import {
  createApp,
  createBlock,
  createVNode,
  defineComponent,
  openBlock,
} from 'vue'
//#endif

import { useKeyboard } from '../../../../helpers/useKeyboard'

//#if !_X_VAPOR_
export const VNODE_MASK = /*#__PURE__*/ createVNode(
  'div',
  { class: 'uni-mask' },
  null,
  -1 /* HOISTED */
)
//#endif

export function createRootApp(
  component: Component,
  rootState: Record<string, any>,
  callback: (...args: any[]) => void
) {
  rootState.onClose = (...args: any[]) => (
    (rootState.visible = false), callback.apply(null, args)
  )
  //#if _X_VAPOR_
  return createVaporApp(component as any, {
    $: [() => rootState],
  })
  //#else
  return createApp(
    defineComponent({
      setup() {
        return () => (
          openBlock(),
          createBlock(component, rootState, null, 16 /* FULL_PROPS */)
        )
      },
    })
  )
  //#endif
}

export function ensureRoot(id: string) {
  let rootEl = document.getElementById(id)
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.id = id
    document.body.append(rootEl)
  }
  return rootEl
}

export function usePopup(
  props: { visible: boolean },
  {
    onEsc,
    onEnter,
  }: {
    onEsc?: () => void
    onEnter?: () => void
  }
) {
  const visible = ref(props.visible)
  const { key, disable } = useKeyboard()
  watch(
    () => props.visible,
    (value) => (visible.value = value)
  )
  watch(
    () => visible.value,
    (value) => (disable.value = !value)
  )
  watchEffect(() => {
    const { value } = key
    if (value === 'esc') {
      onEsc && onEsc()
    } else if (value === 'enter') {
      onEnter && onEnter()
    }
  })
  return visible
}
