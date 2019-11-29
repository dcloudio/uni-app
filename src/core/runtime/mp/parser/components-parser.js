export function parseComponents (vueComponentOptions) {
  vueComponentOptions.components = global['__wxUsingComponents'].pop()
}
