import {
  parseProperties
} from './parser'

export default function createVueComponent (mpComponentOptions) {
  const vueComponentOptions = {
    watch: {},
    mpObservers: []
  }

  parseProperties(mpComponentOptions.properties, vueComponentOptions)

  return vueComponentOptions
}
