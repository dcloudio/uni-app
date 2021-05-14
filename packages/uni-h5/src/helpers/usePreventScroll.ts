import { onMounted, onUnmounted } from 'vue'

let index = 0
let overflow = ''

export function preventScroll(prevent: boolean) {
  let before = index
  index += prevent ? 1 : -1
  index = Math.max(0, index)
  if (index > 0) {
    if (before === 0) {
      overflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
  } else {
    document.body.style.overflow = overflow
    overflow = ''
  }
}

export function usePreventScroll() {
  onMounted(() => preventScroll(true))
  onUnmounted(() => preventScroll(false))
}
