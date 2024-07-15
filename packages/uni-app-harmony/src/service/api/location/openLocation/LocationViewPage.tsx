// @ts-nocheck
// TODO 优化此处代码
import { definePage } from '@dcloudio/uni-app-plus/service/framework/page/define'
import { createCommentVNode, createElementBlock, openBlock } from 'vue'

const LocationPickerPage = {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      loaded: false,
    }
  },
  onLoad(e) {
    this.latitude = e.latitude
    this.longitude = e.longitude
    this.loaded = true
  },
  methods: {
    onClose(e) {
      this.channel.emit('close', e)
      uni.navigateBack()
    },
  },
  render: function (_ctx, _cache, $props, $setup, $data, $options) {
    return $data.loaded
      ? (openBlock(),
        createElementBlock(
          'location-view',
          {
            key: 0,
            style: { width: '100%', height: '100%' },
            latitude: $data.latitude,
            longitude: $data.longitude,
          },
          null,
          40,
          ['latitude', 'longitude']
        ))
      : createCommentVNode('v-if', true)
  },
}

definePage('__uniappopenlocation', LocationPickerPage)
