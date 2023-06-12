import {
  ref,
  watch,
  watchEffect,
  createVNode,
  Component,
  defineComponent,
  createApp,
  openBlock,
  createBlock,
} from 'vue'

import { useKeyboard } from '../../../../helpers/useKeyboard'

export const VNODE_MASK = /*#__PURE__*/ createVNode(
  'div',
  { class: 'uni-mask' },
  null,
  -1 /* HOISTED */
)

export function createRootApp(
  component: Component,
  rootState: Record<string, any>,
  callback: (...args: any[]) => void
) {
  rootState.onClose = (...args: any[]) => (
    (rootState.visible = false), callback.apply(null, args)
  )
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
