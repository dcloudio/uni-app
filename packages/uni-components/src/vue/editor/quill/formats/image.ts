import QuillClass from 'quill'
import { getRealPath } from '@dcloudio/uni-platform'

export default function (Quill: typeof QuillClass) {
  const Image = Quill.import('formats/image')
  const ATTRIBUTES = [
    'alt',
    'height',
    'width',
    'data-custom',
    'class',
    'data-local',
  ]
  Image.sanitize = (url: string) => (url ? getRealPath(url) : url)
  Image.formats = function formats(domNode: Element) {
    return ATTRIBUTES.reduce(function (
      formats: Record<string, any>,
      attribute
    ) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    },
    {})
  }
  const format = Image.prototype.format
  Image.prototype.format = function (name: string, value: string) {
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
