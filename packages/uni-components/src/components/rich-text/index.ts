import parseHtml from './html-parser'

const props = {
  nodes: {
    type: [Array, String],
    default: function () {
      return []
    },
  },
  /** @deprecated 请使用 user-select */
  selectable: {
    type: [Boolean, String],
    default: false,
  },
  userSelect: {
    type: [Boolean, String],
    default: false,
  },
}

export { props, parseHtml }
