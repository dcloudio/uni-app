export function parseExternalClasses (externalClasses, vueComponentOptions) {
  if (!externalClasses) {
    return
  }
  vueComponentOptions.mpOptions.externalClasses = externalClasses
}
