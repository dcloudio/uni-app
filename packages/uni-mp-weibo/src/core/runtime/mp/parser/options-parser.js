export function parseOptions (options, vueComponentOptions) {
  if (!options) {
    return
  }
  vueComponentOptions.mpOptions.options = options
}
