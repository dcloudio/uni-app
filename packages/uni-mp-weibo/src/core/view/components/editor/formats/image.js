import getRealPath from 'uni-platform/helpers/get-real-path'

export default function (Quill) {
  const Image = Quill.import('formats/image')
  const ATTRIBUTES = [
    'alt',
    'height',
    'width',
    'data-custom',
    'class',
    'data-local'
  ]
  Image.sanitize = url => url ? getRealPath(url) : url
  Image.formats = function formats (domNode) {
    return ATTRIBUTES.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }
  const format = Image.prototype.format
  Image.prototype.format = function (name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      format.call(this, name, value)
    }
  }
}
