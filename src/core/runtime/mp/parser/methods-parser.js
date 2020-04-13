export function parseMethods (methods, vueComponentOptions) {
  if (!methods) {
    return
  }
  if (methods.$emit) {
    console.warn('Method "$emit" conflicts with an existing Vue instance method')
    delete methods.$emit
  }
  vueComponentOptions.methods = methods
}
