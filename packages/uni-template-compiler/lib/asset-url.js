const url = require('url')

const transformAssetUrls = {
  audio: 'src',
  video: ['src', 'poster'],
  img: 'src',
  image: 'src',
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

function urlToRequire (url) {
  const returnValue = `"${url}"`
  // same logic as in transform-require.js
  const firstChar = url.charAt(0)
  if (firstChar === '.' || firstChar === '~' || firstChar === '@') {
    if (firstChar === '~') {
      const secondChar = url.charAt(1)
      url = url.slice(secondChar === '/' ? 2 : 1)
    }
    const uriParts = parseUriParts(url)
    if (!uriParts.hash) { // fixed by xxxxxx (v3 template中需要加/)
      return `require("${url}")`
    } else { // fixed by xxxxxx (v3 template中需要加/)
      // support uri fragment case by excluding it from
      // the require and instead appending it as string;
      // assuming that the path part is sufficient according to
      // the above caseing(t.i. no protocol-auth-host parts expected)
      return `require("${uriParts.path}") + "${uriParts.hash}"`
    }
  }
  return returnValue
}
/**
 * vuejs/component-compiler-utils#22 Support uri fragment in transformed require
 * @param urlString an url as a string
 */
function parseUriParts (urlString) {
  // initialize return value
  /* eslint-disable node/no-deprecated-api */
  const returnValue = url.parse('')
  if (urlString) {
    // A TypeError is thrown if urlString is not a string
    // @see https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
    if (typeof urlString === 'string') {
      // check is an uri
      /* eslint-disable node/no-deprecated-api */
      return url.parse(urlString) // take apart the uri
    }
  }
  return returnValue
}

function rewrite (attr, name, options) {
  if (attr.name === name) {
    const value = attr.value
    // only transform static URLs
    if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      if (!options.h5) { // 非 H5 平台
        attr.value = attr.value
          .replace('"@/', '"/')
          .replace('"~@/', '"/')
      }
      // v3,h5
      const needRequire = options.service || options.view || options.h5
      if (needRequire) {
        attr.value = urlToRequire(attr.value.slice(1, -1))
        if (
          options.h5 &&
          options.publicPath === './' &&
          attr.value.startsWith('require("')
        ) { // require
          // h5 且 publicPath 为 ./ (仅生产模式可能为./)
          attr.value = `(${attr.value}).substr(1)`
        }
      }
      return true
    }
  }
  return false
}

module.exports = {
  postTransformNode: (node, options) => {
    if (!node.attrs) {
      return
    }
    const attributes = transformAssetUrls[node.tag]
    if (!attributes) {
      return
    }
    if (typeof attributes === 'string') {
      if (node.attrs.some(attr => rewrite(attr, attributes, options))) {
        if (options.service || options.view) {
          node.hasBindings = true
        }
      }
    } else if (Array.isArray(attributes)) {
      attributes.forEach(item => {
        if (node.attrs.some(attr => rewrite(attr, item, options))) {
          if (options.service || options.view) {
            node.hasBindings = true
          }
        }
      })
    }
  }
}
