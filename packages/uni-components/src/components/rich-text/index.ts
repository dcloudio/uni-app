import parseHtml from './html-parser'

const props = {
  nodes: {
    type: [Array, String],
    default: function () {
      return []
    },
  },
}

export { props, parseHtml }
