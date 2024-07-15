// @ts-nocheck
// TODO 优化此处代码
import { definePage } from '@dcloudio/uni-app-plus/service/framework/page/define'
import { createCommentVNode, createElementBlock, openBlock } from 'vue'

const LocationPickerPage = {
  data() {
    return {
      keyword: '',
      latitude: 0,
      longitude: 0,
      loaded: false,
      channel: void 0,
    }
  },
  onLoad(e) {
    this.latitude = e.latitude
    this.longitude = e.longitude
    this.keyword = e.keyword
    this.loaded = true
    this.channel = this.getOpenerEventChannel()
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
          'location-picker',
          {
            key: 0,
            style: { width: '100%', height: '100%' },
            latitude: $data.latitude,
            longitude: $data.longitude,
            keyword: $data.keyword,
            onClose:
              _cache[0] ||
              (_cache[0] = (...args) =>
                $options.onClose && $options.onClose(...args)),
          },
          null,
          40,
          ['latitude', 'longitude', 'keyword']
        ))
      : createCommentVNode('v-if', true)
  },
}

definePage('__uniappchooselocation', LocationPickerPage)
