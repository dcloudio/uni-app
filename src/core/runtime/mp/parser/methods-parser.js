export function parseMethods (methods, vueComponentOptions) {
  if (!methods) {
    return
  }
  vueComponentOptions.methods = methods
}
