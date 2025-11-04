const APP_NATIVE_TAGS = ['view', 'text', 'image', 'scroll-view', 'native-view']
export function isDom2AppHarmonyNativeTag(tag: string) {
  return APP_NATIVE_TAGS.includes(tag)
}
