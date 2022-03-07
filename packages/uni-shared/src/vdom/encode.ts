export const EventOptionFlags = /*#__PURE__*/ (() => {
  return {
    capture: 1,
    once: 1 << 1,
    passive: 1 << 2,
  }
})()

export function encodeOptions(options?: AddEventListenerOptions) {
  let flag = 0
  if (options) {
    if (options.capture) {
      flag |= EventOptionFlags.capture
    }
    if (options.once) {
      flag |= EventOptionFlags.once
    }
    if (options.passive) {
      flag |= EventOptionFlags.passive
    }
  }
  return flag
}

export const EventModifierFlags = /*#__PURE__*/ (() => {
  return {
    stop: 1,
    prevent: 1 << 1,
    self: 1 << 2,
  }
})()

export function encodeModifier(modifiers: string[]) {
  let flag = 0
  if (modifiers.includes('stop')) {
    flag |= EventModifierFlags.stop
  }
  if (modifiers.includes('prevent')) {
    flag |= EventModifierFlags.prevent
  }
  if (modifiers.includes('self')) {
    flag |= EventModifierFlags.self
  }
  return flag
}
