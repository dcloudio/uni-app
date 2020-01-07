export function parseProperties (properties, vueComponentOptions) {
  if (!properties) {
    return
  }
  vueComponentOptions.mpOptions.properties = properties
}
