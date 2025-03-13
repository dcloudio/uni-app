// TODO 优化此处代码，此页面无对应的css
import { definePage } from '../../framework/page/define'
import { createCommentVNode, createElementBlock, openBlock } from 'vue'
import { once } from '@dcloudio/uni-shared'
import { registerServiceMethod } from '@dcloudio/uni-core'

interface ITencentMapPlaceSearchOptions {
  keyword?: string
  latitude: number
  longitude: number
  pageIndex: number
  pageSize: number
  secure: boolean
}

async function tencentMapPlaceSearch(options: ITencentMapPlaceSearchOptions) {
  // @ts-expect-error access uni
  const cloud = uni.__uniCloud
  if (!cloud) {
    throw new Error(
      '使用uni.chooseLocation且使用腾讯地图时，需搭配uniCloud使用，详情请参考：https://uniapp.dcloud.net.cn/api/location/location.html#chooselocation'
    )
  }
  const { keyword, latitude, longitude, pageIndex, pageSize, secure } = options
  const obj = cloud.importObject('uni-map-co', {
    customUI: true,
    secretMethods: secure
      ? {
          chooseLocation: 'both',
        }
      : {},
  })
  let pois: any[] = []
  if (keyword) {
    const res = await obj.chooseLocation({
      action: 'search',
      data: {
        keyword,
        location: {
          lat: latitude,
          lng: longitude,
        },
        radius: 1000,
        auto_extend: 1,
        get_subpois: 0,
        orderby: 'weight',
        page_index: pageIndex,
        page_size: pageSize,
      },
      provider: 'qqmap',
      needOriginalResult: true,
    })
    pois = res.result.data || []
  } else {
    const res = await obj.chooseLocation({
      action: 'location2address',
      data: {
        location: `${latitude},${longitude}`,
        get_poi: 1,
        poi_options: {
          page_index: pageIndex,
          page_size: pageSize,
        },
      },
      provider: 'qqmap',
      needOriginalResult: true,
    })
    pois = res.result.result.pois || []
  }
  return pois
}

export function subscribeMapPlaceSearch() {
  registerServiceMethod(
    'mapPlaceSearch',
    (args: ITencentMapPlaceSearchOptions, resolve) => {
      tencentMapPlaceSearch(args)
        .then(resolve)
        .catch((err) => {
          console.error(err)
          resolve({ errMsg: 'mapPlaceSearch:fail' })
        })
    }
  )
}

const LocationPickerPage: ThisType<any> = {
  data() {
    return {
      keyword: '',
      latitude: 0,
      longitude: 0,
      useSecureNetwork: false,
      loaded: false,
      channel: void 0,
      closed: false,
    }
  },
  onLoad(e) {
    this.latitude = e.latitude
    this.longitude = e.longitude
    this.keyword = e.keyword
    this.useSecureNetwork = e.useSecureNetwork === 'true'
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
  } as ThisType<any>,
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
            useSecureNetwork: $data.useSecureNetwork,
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
  definePage(ROUTE_LOCATION_PICKER_PAGE, LocationPickerPage as any)
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
