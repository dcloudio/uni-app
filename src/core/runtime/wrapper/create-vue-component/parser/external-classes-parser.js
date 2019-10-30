export function parseExternalClasses (externalClasses, vueComponentOptions) {
  if (!externalClasses) {
    return
  }
  vueComponentOptions.mpExternalClasses = externalClasses
}
