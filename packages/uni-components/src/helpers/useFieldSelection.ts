import { type Ref, ref, watch } from 'vue'

type Field = HTMLInputElement | HTMLTextAreaElement
const selectionProperty = '--uni-selection-background-color'
const selectionAttribute = 'data-uni-selection'
const probeBackgroundProperty = '--uni-selection-probe-background-color'

export const fieldSelectionProps = {
  selectionClass: {
    type: String,
    default: '',
  },
}

export const fieldSelectionProbeStyle = 'display: none !important;'

function clearSelection(field: Field) {
  field.style.removeProperty(selectionProperty)
  field.removeAttribute(selectionAttribute)
}

function resolveSelectionColor(probe: HTMLElement) {
  const color = getComputedStyle(probe).backgroundColor
  if (color === 'transparent' || color.replace(/\s/g, '') === 'rgba(0,0,0,0)') {
    // Only the probe's default rule uses this variable. An explicit transparent
    // background stays transparent; an absent declaration follows the fallback.
    probe.style.setProperty(probeBackgroundProperty, '#000000')
    try {
      return getComputedStyle(probe).backgroundColor === color ? color : ''
    } finally {
      probe.style.removeProperty(probeBackgroundProperty)
    }
  }
  return color
}

function updateSelection(field: Field, color: string) {
  if (!color) {
    clearSelection(field)
    return
  }
  if (field.style.getPropertyValue(selectionProperty) !== color) {
    field.style.setProperty(selectionProperty, color)
  }
  if (!field.hasAttribute(selectionAttribute)) {
    field.setAttribute(selectionAttribute, '')
  }
}

function observeSelection(probe: HTMLElement, field: Field) {
  let refreshFrame: number | null = null

  // Track CSSOM, media queries and theme changes only while this editor is active.
  function refreshSelection() {
    refreshFrame = null
    if (!field.isConnected || field.ownerDocument.activeElement !== field) {
      return
    }
    updateSelection(field, resolveSelectionColor(probe))
    refreshFrame = requestAnimationFrame(refreshSelection)
  }

  function startRefresh() {
    if (refreshFrame === null) {
      refreshSelection()
    }
  }

  function stopRefresh() {
    if (refreshFrame !== null) {
      cancelAnimationFrame(refreshFrame)
      refreshFrame = null
    }
  }

  field.addEventListener('focus', startRefresh)
  field.addEventListener('blur', stopRefresh)
  startRefresh()
  return () => {
    field.removeEventListener('focus', startRefresh)
    field.removeEventListener('blur', stopRefresh)
    stopRefresh()
    clearSelection(field)
  }
}

export function useFieldSelection(
  props: { selectionClass?: string },
  fieldRef: Ref<Field | null>
) {
  const selectionRef = ref<HTMLElement | null>(null)
  watch(
    [() => props.selectionClass, fieldRef, selectionRef],
    ([className, field, probe], _, onCleanup) => {
      if (className && field && probe) {
        onCleanup(observeSelection(probe, field))
      }
    },
    { immediate: true, flush: 'post' }
  )
  return selectionRef
}
