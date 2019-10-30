import {
  hasOwn
} from 'uni-shared'

function parseProperty (name, property, watch) {
  const type = [property.type]
  if (Array.isArray(property.optionalTypes)) {
    type.push(...property.optionalTypes)
  }
  const prop = Object.create(null)
  prop.type = type
  if (hasOwn(property, 'value')) {
    prop['default'] = prop.value
  }
  if (hasOwn(property, 'observer')) {
    watch[name] = property.observer
  }
  return prop
}

export function parseProperties (properties, vueComponentOptions) {
  if (!properties) {
    return
  }
  const props = Object.create(null)
  const {
    watch
  } = vueComponentOptions
  Object.keys(properties).forEach(name => {
    props[name] = parseProperty(name, properties[name], watch)
  })
  vueComponentOptions.props = props
}
