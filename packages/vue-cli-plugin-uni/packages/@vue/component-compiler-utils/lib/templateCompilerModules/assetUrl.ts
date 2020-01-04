// vue compiler module for transforming `<tag>:<attribute>` to `require`

import { urlToRequire, ASTNode, Attr } from './utils'

export interface AssetURLOptions {
  [name: string]: string | string[]
}

const defaultOptions: AssetURLOptions = {
  audio: 'src',
  video: ['src', 'poster'],
  source: 'src',
  img: 'src',
  image: ['xlink:href', 'href'],
  use: ['xlink:href', 'href']
}

export default (userOptions?: AssetURLOptions) => {
  const options = userOptions
    ? Object.assign({}, defaultOptions, userOptions)
    : defaultOptions

  return {
    postTransformNode: (node: ASTNode) => {
      transform(node, options)
    }
  }
}

function transform(node: ASTNode, options: AssetURLOptions) {
  for (const tag in options) {
    if ((tag === '*' || node.tag === tag) && node.attrs) {
      const attributes = options[tag]
      if (typeof attributes === 'string') {
        node.attrs.some(attr => rewrite(attr, attributes))
      } else if (Array.isArray(attributes)) {
        attributes.forEach(item => node.attrs.some(attr => rewrite(attr, item)))
      }
    }
  }
}

function rewrite(attr: Attr, name: string) {
  if (attr.name === name) {
    const value = attr.value
    // only transform static URLs
    if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      attr.value = urlToRequire(value.slice(1, -1))
      return true
    }
  }
  return false
}
