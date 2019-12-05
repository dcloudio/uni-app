import {
  camelize
} from 'uni-shared'

export function parseExternalClasses (externalClasses, vueComponentOptions) {
  if (!externalClasses) {
    return
  }
  if (!Array.isArray(externalClasses)) {
    externalClasses = [externalClasses]
  }
  vueComponentOptions.mpOptions.externalClasses = externalClasses
  if (!vueComponentOptions.mpOptions.properties) {
    vueComponentOptions.mpOptions.properties = Object.create(null)
  }
  externalClasses.forEach(externalClass => {
    vueComponentOptions.mpOptions.properties[camelize(externalClass)] = {
      type: String,
      value: ''
    }
  })
}
