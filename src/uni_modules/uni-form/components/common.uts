import { ActivatableChild } from './types.uts'

export const FORM_KEY = 'UNI_FORM_CTX'
export const LABEL_KEY = 'UNI_LABEL_CTX'
export const RADIO_GROUP_KEY = 'UNI_RADIO_GROUP_CTX'
export const CHECKBOX_GROUP_KEY = 'UNI_CHECKBOX_GROUP_CTX'
export const PICKER_VIEW_KEY = 'UNI_PICKER_VIEW_CTX'

// Labels may be siblings of their target control. Keep a short-lived registry
// for explicit control ids so `label for="..."` works without a form or a
// parent/child relationship. Entries are removed when the control unmounts.
const labelTargets: Map<string, Array<ActivatableChild>> = new Map()

export function registerLabelTarget(id: string, target: ActivatableChild): () => void {
  if (id.length === 0) {
    return () => {}
  }
  let targets = labelTargets.get(id)
  if (targets == null) {
    targets = []
    labelTargets.set(id, targets)
  }
  targets.push(target)
  return () => {
    const current = labelTargets.get(id)
    if (current == null) return
    const index = current.indexOf(target)
    if (index !== -1) current.splice(index, 1)
    if (current.length === 0) labelTargets.delete(id)
  }
}

export function findLabelTarget(id: string): ActivatableChild | null {
  if (id.length === 0) return null
  const targets = labelTargets.get(id)
  if (targets == null || targets.length === 0) return null
  // The latest mounted target wins deterministically. Unmounting removes its
  // entry so page navigation does not leave stale controls behind.
  return targets[targets.length - 1]
}

let lastEditorTouchAt = 0
const EDITOR_TOUCH_GUARD_MS = 250

export function markEditorTouchStart() {
  lastEditorTouchAt = Date.now()
}

export function hasRecentEditorTouch(): boolean {
  return Date.now() - lastEditorTouchAt <= EDITOR_TOUCH_GUARD_MS
}

export function buildPointerEvent(event: UniPointerEvent) {
  const { type, x, y, clientX, clientY, pageX, pageY, screenX, screenY } = event
  return new UniPointerEvent(type, x, y, clientX, clientY, pageX, pageY, screenX, screenY)
}

export function dispatchLabelClick(element: UniElement, event: UniPointerEvent) {
  element.dispatchEvent('click', buildPointerEvent(event))
}

export function toStringOrEmpty(val : unknown) : string {
  if (val == null) {
    return ''
  }
  return val + ''
}
