import { computed, onBeforeUnmount, ref } from 'vue'

// Native editors do not inherit their wrapper's CSS text color. Keep a
// fallback even when useComputedStyle has no external class/style to observe.
const dark = ref(false)
let users = 0
let themeListener: number | null = null

export function resolveEditorColor(color: unknown, isDark: boolean): string {
  return typeof color === 'string' && color.length > 0
    ? color
    : isDark ? '#ffffff' : '#000000'
}

export function useEditorColor(style: Map<string, any | null>) {
  if (users++ === 0) {
    const info = uni.getSystemInfoSync()
    dark.value = info.appTheme === 'dark'
      || (info.appTheme === 'auto' && info.osTheme === 'dark')
    themeListener = uni.onAppThemeChange(result => {
      dark.value = result.appTheme === 'dark'
    })
  }
  onBeforeUnmount(() => {
    if (--users === 0 && themeListener != null) {
      uni.offAppThemeChange(themeListener)
      themeListener = null
    }
  })
  return computed(() => resolveEditorColor(style.get('color'), dark.value))
}
