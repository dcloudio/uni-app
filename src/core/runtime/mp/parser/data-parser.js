export function parseData (data, vueComponentOptions) {
  if (!data) {
    return
  }
  vueComponentOptions.mpOptions.data = data
}
