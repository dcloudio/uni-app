const transformAssetUrls = {
  'audio': 'src',
  'video': ['src', 'poster'],
  'img': 'src',
  'image': 'src',
  'cover-image': 'src',
  // h5
  'v-uni-audio': 'src',
  'v-uni-video': ['src', 'poster'],
  'v-uni-image': 'src',
  'v-uni-cover-image': 'src',
  // nvue
  'u-image': 'src',
  'u-video': ['src', 'poster']
}

function rewrite (attr, name) {
  if (attr.name === name) {
    const value = attr.value
    // only transform static URLs
    if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      attr.value = attr.value
        .replace('"@/', '"/')
        .replace('"~@/', '"/')
      return true
    }
  }
  return false
}
module.exports = {
  postTransformNode: (node) => {
    if (!node.attrs) {
      return
    }
    const attributes = transformAssetUrls[node.tag]
    if (!attributes) {
      return
    }
    if (typeof attributes === 'string') {
      node.attrs.some(attr => rewrite(attr, attributes))
    } else if (Array.isArray(attributes)) {
      attributes.forEach(item => node.attrs.some(attr => rewrite(attr, item)))
    }
  }
}
