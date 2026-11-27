import { type Ref, watch } from 'vue'

const fillWidthAttribute = 'uni-input-fill-width'
const blockContainers = /*#__PURE__*/ new Set([
  'block',
  'flow-root',
  'inline-block',
  'list-item',
  'table-cell',
  'table-caption',
])
const blockAlignmentSupport = /*#__PURE__*/ new WeakMap<Document, boolean>()

function supportsBlockAlignment(document: Document) {
  const cached = blockAlignmentSupport.get(document)
  if (cached !== undefined) return cached

  // 旧浏览器可能接受 justify-items，但只在 Grid 布局中应用。
  const container = document.createElement('div')
  const child = document.createElement('div')
  container.style.cssText =
    'all:initial;position:absolute;top:0;left:0;visibility:hidden;display:block;width:4px;justify-items:center'
  child.style.cssText = 'all:initial;display:block;width:2px'
  container.appendChild(child)
  const root = document.body || document.documentElement
  root.appendChild(container)
  const supported = child.offsetLeft === 1
  container.remove()
  blockAlignmentSupport.set(document, supported)
  return supported
}

export function useInputLayout(fieldRef: Readonly<Ref<HTMLElement | null>>) {
  watch(
    fieldRef,
    (field, _, onCleanup) => {
      const view = field?.ownerDocument.defaultView
      if (!field || !view) return

      const observer = new view.MutationObserver(() => update())
      const update = () => {
        observer.disconnect()
        let fillWidth = false
        let parent = field.parentElement
        while (parent) {
          observer.observe(parent, { attributes: true, childList: true })
          const { display, justifyItems } = view.getComputedStyle(parent)
          if (display !== 'contents') {
            // 原生 input 在普通块中使用固有宽度，只为默认对齐的块布局补齐宽度。
            fillWidth =
              blockContainers.has(display) &&
              (!justifyItems ||
                justifyItems === 'normal' ||
                justifyItems === 'legacy' ||
                justifyItems === 'stretch' ||
                !supportsBlockAlignment(field.ownerDocument))
            break
          }
          parent = parent.parentElement
        }
        if (fillWidth !== field.hasAttribute(fillWidthAttribute)) {
          if (fillWidth) field.setAttribute(fillWidthAttribute, '')
          else field.removeAttribute(fillWidthAttribute)
        }
      }

      update()
      view.addEventListener('resize', update)
      onCleanup(() => {
        observer.disconnect()
        view.removeEventListener('resize', update)
        field.removeAttribute(fillWidthAttribute)
      })
    },
    { flush: 'post' }
  )
}
