import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const KEY_MAPS = {
  esc: ['Esc', 'Escape'],
  // tab: ['Tab'],
  enter: ['Enter'],
  // space: [' ', 'Spacebar'],
  // up: ['Up', 'ArrowUp'],
  // left: ['Left', 'ArrowLeft'],
  // right: ['Right', 'ArrowRight'],
  // down: ['Down', 'ArrowDown'],
  // delete: ['Backspace', 'Delete', 'Del'],
}

const KEYS = Object.keys(KEY_MAPS)
export function useKeyboard() {
  const key = ref('')
  const disable = ref(false)
  const onKeyup = (evt: KeyboardEvent) => {
    if (disable.value) {
      return
    }
    const res = KEYS.find(
      (key) => KEY_MAPS[key as keyof typeof KEY_MAPS].indexOf(evt.key) !== -1
    )
    if (res) {
      key.value = res
    }
    // reset key.value
    nextTick(() => (key.value = ''))
  }
  onMounted(() => {
    document.addEventListener('keyup', onKeyup)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyup)
  })
  return {
    key,
    disable,
  }
}
