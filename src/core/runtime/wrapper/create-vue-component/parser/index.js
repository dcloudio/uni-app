import {
  parseProperties
} from './parser'

export function parseComponentOptions (mpComponentOptions) {
  const vueComponentOptions = {
    watch: {},
    mpObservers: []
  }

  parseProperties(mpComponentOptions.properties, vueComponentOptions)

  return vueComponentOptions
}
