<template>
  <div class="uni-map-control">
    <img
      :src="imgPath"
      :style="positionStyle"
      class="uni-map-control-icon"
      @click="handleClick"
    >
  </div>
</template>

<script>
import getRealPath from 'uni-platform/helpers/get-real-path'
export default {
  props: {
    id: {
      type: [Number, String],
      default: ''
    },
    position: {
      type: Object,
      required: true
    },
    iconPath: {
      type: String,
      required: true
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgPath () {
      return getRealPath(this.iconPath)
    },
    positionStyle () {
      let positionStyle = `top:${this.position.top || 0}px;left:${this.position.left || 0}px;`

      if (this.position.width) {
        positionStyle += `width:${this.position.width}px;`
      }
      if (this.position.height) {
        positionStyle += `height:${this.position.height}px;`
      }

      return positionStyle
    }
  },
  methods: {
    handleClick ($event) {
      if (this.clickable) {
        this.$parent.$trigger('controltap', $event, {
          controlId: this.id
        })
      }
      $event.stopPropagation()
    }
  }
}
</script>

<style>
.uni-map-control{
  position:absolute;
  width:0;
  height:0;
  top:0;
  left:0;
  z-index:999;
}
.uni-map-control-icon{
  position:absolute;
  max-width:initial;
}
</style>
