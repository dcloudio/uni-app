import type { Slots } from 'vue'

export function renderComponentSlot(
  slots: Slots,
  name: string,
  props: any | null = null
): any | null {
  if (slots[name]) {
    return slots[name]!(props)
  }
  return null
}
