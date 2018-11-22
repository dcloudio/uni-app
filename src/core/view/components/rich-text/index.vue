<template>
  <uni-rich-text v-on="$listeners">
    <div />
  </uni-rich-text>
</template>
<script>
import parseHtml from './html-parser'
import parseNodes from './nodes-parser'

export default {
  name: 'RichText',
  props: {
    nodes: {
      type: [Array, String],
      default: function () {
        return []
      }
    }
  },
  watch: {
    nodes (value) {
      this._renderNodes(value)
    }
  },
  mounted () {
    this._renderNodes(this.nodes)
  },
  methods: {
    _renderNodes (nodes) {
      if (typeof nodes === 'string') {
        nodes = parseHtml(nodes)
      }
      const nodeList = parseNodes(nodes, document.createDocumentFragment())
      this.$el.firstChild.innerHTML = ''
      this.$el.firstChild.appendChild(nodeList)
    }
  }
}
</script>
<style></style>
