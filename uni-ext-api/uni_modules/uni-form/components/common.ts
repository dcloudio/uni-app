import { ActivatableChild } from './types.ts'

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
  // #ifdef WEB
  return new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX: event.clientX,
    clientY: event.clientY,
    screenX: event.screenX,
    screenY: event.screenY
  })
  // #endif
  // #ifndef WEB
  const { type, x, y, clientX, clientY, pageX, pageY, screenX, screenY } = event
  return new UniPointerEvent(type, x, y, clientX, clientY, pageX, pageY, screenX, screenY)
  // #endif
}

export function dispatchLabelClick(element: UniElement, event: UniPointerEvent) {
  // #ifdef WEB
  element.dispatchEvent(buildPointerEvent(event))
  // #endif
  // #ifndef WEB
  element.dispatchEvent('click', buildPointerEvent(event))
  // #endif
}

export function toStringOrEmpty(val : unknown) : string {
  if (val == null) {
    return ''
  }
  return val + ''
}

export type ClassName = string.ClassString | string | undefined | null
export type ClassItem = ClassName | [boolean, ClassName, ClassName?]

export function classes(...classList : Array<ClassItem>) : Array<string.ClassString | string> {
  return classList.map((className) : string.ClassString | string => {
    if (Array.isArray(className)) {
      const classNames = className as Array<any | undefined | null>
      const condition = classNames[0] as boolean
      const truthy = classNames[1] as ClassName
      const falsy = classNames.length > 2 ? classNames[2] as ClassName : ''
      return (condition ? truthy : falsy) ?? ''
    }

    return className ?? ''
  })
}

// #ifdef WEB
// Only activate the focused root. Slotted inputs and nested controls own their keys.
export function createSpaceKeyHandlers(isDisabled: () => boolean) {
  let spacePressed = false

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== ' ' || event.target !== event.currentTarget || event.defaultPrevented ||
        event.altKey || event.ctrlKey || event.metaKey) {
      return
    }
    event.preventDefault()
    if (!event.repeat) {
      spacePressed = !isDisabled()
    }
  }

  function handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ' || event.target !== event.currentTarget) {
      return
    }
    const shouldActivate = spacePressed
    spacePressed = false
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return
    }
    event.preventDefault()
    if (shouldActivate && !isDisabled()) {
      // Dispatch through click so business listeners, groups and labels share one path.
      event.currentTarget?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    }
  }

  function handleBlur() {
    spacePressed = false
  }

  return { handleKeydown, handleKeyup, handleBlur }
}
// #endif
