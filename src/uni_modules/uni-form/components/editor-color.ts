import { computed } from 'vue'
import { resolveFormTokens, useFormThemeIsDark } from './theme.ts'

// Native editors do not inherit their wrapper's CSS text color. Apply the dark
// theme fallback; an empty light theme value restores the native default.
export function resolveEditorColor(color: unknown, isDark: boolean): string {
  return typeof color === 'string' && color.length > 0
    ? color
    : resolveFormTokens(isDark).inputText
}

export function resolveEditorCaretColor(color: unknown, cursorColor: string): string {
  return cursorColor || (typeof color === 'string' ? color : '')
}

export function useEditorColor(style: Map<string, any | null>) {
  const dark = useFormThemeIsDark()
  return computed(() => resolveEditorColor(style.get('color'), dark.value))
}
