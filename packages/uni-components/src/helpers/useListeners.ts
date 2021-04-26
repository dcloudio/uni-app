import { isPlainObject } from '@vue/shared'
import { watch, onUnmounted, getCurrentInstance } from 'vue'

export function /*#__PURE__*/ useListeners(
  props: { id: string },
  listeners: Record<string, Function>
) {
  _addListeners(props.id, listeners)

  watch(
    () => props.id,
    (newId, oldId) => {
      _removeListeners(oldId, listeners, true)
      _addListeners(newId, listeners, true)
    }
  )

  onUnmounted(() => {
    _removeListeners(props.id, listeners)
  })
}

function _addListeners(
  id: string,
  listeners: Record<string, Function>,
  watch?: boolean
) {
  const $page = getCurrentInstance()!.proxy?.$page

  if (watch && !id) {
    // id被置空
    return
  }

  if (!isPlainObject(listeners)) {
    return
  }
  Object.keys(listeners).forEach((name) => {
    if (watch) {
      // watch id
      if (name.indexOf('@') !== 0 && name.indexOf('uni-') !== 0) {
        UniViewJSBridge.on(`uni-${name}-${$page!.id}-${id}`, listeners[name])
      }
    } else {
      if (name.indexOf('uni-') === 0) {
        // 完全限定
        UniViewJSBridge.on(name, listeners[name])
      } else if (id) {
        // scoped
        UniViewJSBridge.on(`uni-${name}-${$page!.id}-${id}`, listeners[name])
      }
    }
  })
}

function _removeListeners(
  id: string,
  listeners: Record<string, Function>,
  watch?: boolean
) {
  const $page = getCurrentInstance()!.proxy?.$page

  if (watch && !id) {
    // id之前不存在
    return
  }
  if (!isPlainObject(listeners)) {
    return
  }
  Object.keys(listeners).forEach((name) => {
    if (watch) {
      // watch id
      if (name.indexOf('@') !== 0 && name.indexOf('uni-') !== 0) {
        UniViewJSBridge.off(`uni-${name}-${$page!.id}-${id}`, listeners[name])
      }
    } else {
      if (name.indexOf('uni-') === 0) {
        // 完全限定
        UniViewJSBridge.off(name, listeners[name])
      } else if (id) {
        // scoped
        UniViewJSBridge.off(`uni-${name}-${$page!.id}-${id}`, listeners[name])
      }
    }
  })
}
