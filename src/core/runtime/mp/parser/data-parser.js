export function parseData (data, vueComponentOptions) {
  if (!data) {
    return
  }
  const dataJson = JSON.stringify(data)
  vueComponentOptions.data = function () {
    return JSON.parse(dataJson)
  }
}
