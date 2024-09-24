// @ts-nocheck
// TODO 优化此处代码，此页面无对应的css
import { definePage } from '../../framework/page/define'
import { createCommentVNode, createElementBlock, openBlock } from 'vue'
import { once } from '@dcloudio/uni-shared'

const LocationPickerPage = {
  data() {
    return {
      keyword: '',
      latitude: 0,
      longitude: 0,
      loaded: false,
      channel: void 0,
      closed: false,
    }
  },
  onLoad(e) {
    this.latitude = e.latitude
    this.longitude = e.longitude
    this.keyword = e.keyword
    this.loaded = true
    this.channel = this.getOpenerEventChannel()
  },
  onUnload() {
    if (this.closed) {
      return
    }
    this.channel.emit('close', {})
  },
  methods: {
    onClose(e) {
      this.closed = true
      this.channel.emit('close', e.detail)
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

export const ROUTE_LOCATION_PICKER_PAGE = '__uniappchooselocation'

export const initLocationPickerPageOnce = once(() => {
  definePage(ROUTE_LOCATION_PICKER_PAGE, LocationPickerPage)
  __uniRoutes.push({
    meta: {
      navigationBar: {
        style: 'custom',
      },
      isNVue: false,
      route: ROUTE_LOCATION_PICKER_PAGE,
    },
    path: '/' + ROUTE_LOCATION_PICKER_PAGE,
  })
})
