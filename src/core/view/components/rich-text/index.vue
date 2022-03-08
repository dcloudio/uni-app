<template>
  <uni-rich-text v-on="$listeners">
    <div ref="content">
      <v-uni-resize-sensor
        ref="sensor"
        @resize="_updateView()"
      />
    </div>
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
      let scopeId = ''
      let $vm = this
      while ($vm) {
        !scopeId && (scopeId = $vm.$options._scopeId)
        $vm = $vm.$parent
      }

      const hasItemClick = !!this.$listeners.itemclick

      if (!this._isMounted) {
        return
      }
      if (typeof nodes === 'string') {
        nodes = parseHtml(nodes)
      }
      const nodeList = parseNodes(nodes, document.createDocumentFragment(), scopeId, hasItemClick && this.triggerItemClick)
      nodeList.appendChild(this.$refs.sensor.$el)
      const content = this.$refs.content
      content.innerHTML = ''
      content.appendChild(nodeList)
    },
    _updateView () {
      window.dispatchEvent(new CustomEvent('updateview'))
    },
    triggerItemClick (e, detail = {}) {
      this.$trigger('itemclick', e, detail)
    }
  }
}
</script>
<style></style>
