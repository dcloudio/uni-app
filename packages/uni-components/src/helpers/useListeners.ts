import { isPlainObject } from '@vue/shared'
import { watch, onUnmounted } from 'vue'
import { useCurrentPageId } from '@dcloudio/uni-core'

export function useListeners(
  props: { id: string },
  listeners: Record<string, (...args: any[]) => void>
) {
  if (__NODE_JS__) {
    return
  }
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
  listeners: Record<string, (...args: any[]) => void>,
  watch?: boolean
) {
  const pageId = useCurrentPageId()

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
        UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name])
      }
    } else {
      if (name.indexOf('uni-') === 0) {
        // 完全限定
        UniViewJSBridge.on(name, listeners[name])
      } else if (id) {
        // scoped
        UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name])
      }
    }
  })
}

function _removeListeners(
  id: string,
  listeners: Record<string, (...args: any[]) => void>,
  watch?: boolean
) {
  const pageId = useCurrentPageId()

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
        UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name])
      }
    } else {
      if (name.indexOf('uni-') === 0) {
        // 完全限定
        UniViewJSBridge.off(name, listeners[name])
      } else if (id) {
        // scoped
        UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name])
      }
    }
  })
}
