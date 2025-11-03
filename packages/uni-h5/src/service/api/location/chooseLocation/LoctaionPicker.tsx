/// <reference types="google.maps" />
import { extend } from '@vue/shared'
import { type ExtractPropTypes, computed, reactive, ref, watch } from 'vue'
import { debounce } from '@dcloudio/uni-shared'
import {
  ICON_PATH_CLOSE,
  ICON_PATH_CONFIRM,
  createSvgIconVNode,
  initI18nChooseLocationMsgsOnce,
  useI18n,
} from '@dcloudio/uni-core'
import {
  Input,
  ScrollView,
  defineSystemComponent,
} from '@dcloudio/uni-components'
import { usePreventScroll } from '../../../../helpers/usePreventScroll'
import {
  ICON_PATH_LOCTAION,
  ICON_PATH_TARGET,
  MapType,
  type Point,
  getMapInfo,
} from '../../../../helpers/location'
import { Map } from '../../../../view/components'
import { getJSONP } from '../../../../helpers/getJSONP'
import { getLocation } from '../../location/getLocation'

const props = {
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
}

export type Props = ExtractPropTypes<typeof props>

function distance(distance: number): string {
  if (distance > 100) {
    return `${
      distance > 1000 ? (distance / 1000).toFixed(1) + 'k' : distance.toFixed(0)
    }m | `
  } else if (distance > 0) {
    return '<100m | '
  } else {
    return ''
  }
}

interface State {
  latitude: number
  longitude: number
  keyword: string
  searching: boolean
}
function useState(props: Props) {
  const state: State = reactive({
    latitude: 0,
    longitude: 0,
    keyword: '',
    searching: false,
  })
  function updatePosition() {
    if (props.latitude && props.longitude) {
      state.latitude = props.latitude
      state.longitude = props.longitude
    }
  }
  watch([() => props.latitude, () => props.longitude], updatePosition)
  updatePosition()
  return state
}

export interface Poi {
  name: string
  address: string
  distance: number
  latitude: number
  longitude: number
}

function useList(state: State) {
  const key = __uniConfig.qqMapKey
  const list: Poi[] = reactive([])
  const selectedIndexRef = ref(-1)
  const selectedRef = computed(() => list[selectedIndexRef.value])
  const listState = reactive({
    loading: true,
    // google map default
    pageSize: 20,
    pageIndex: 1,
    hasNextPage: true,
    nextPage: null as null | (() => void),
    selectedIndex: selectedIndexRef,
    selected: selectedRef,
  })
  const adcodeRef = ref('')
  const boundaryRef = computed(() =>
    adcodeRef.value
      ? `region(${adcodeRef.value},1,${state.latitude},${state.longitude})`
      : `nearby(${state.latitude},${state.longitude},5000)`
  )
  function pushData(array: any[]) {
    array.forEach((item) => {
      list.push({
        name: item.title || item.name,
        address: item.address,
        distance: item._distance || item.distance,
        latitude: item.location.lat,
        longitude: item.location.lng,
      })
    })
  }
  function getList() {
    listState.loading = true
    const mapInfo = getMapInfo()
    if (mapInfo.type === MapType.GOOGLE) {
      if (listState.pageIndex > 1 && listState.nextPage) {
        listState.nextPage()
        return
      }
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      )
      service[state.searching ? 'textSearch' : 'nearbySearch'](
        {
          location: {
            lat: state.latitude,
            lng: state.longitude,
          },
          query: state.keyword,
          radius: 5000,
        },
        (results, state, page) => {
          listState.loading = false
          if (results && results.length) {
            results.forEach((item) => {
              list.push({
                name: item.name || '',
                address: item.vicinity || item.formatted_address || '',
                distance: 0,
                latitude: item.geometry!.location!.lat(),
                longitude: item.geometry!.location!.lng(),
              })
            })
          }
          if (page) {
            if (!page.hasNextPage) {
              listState.hasNextPage = false
            } else {
              listState.nextPage = () => {
                page.nextPage()
              }
            }
          }
        }
      )
    } else if (mapInfo.type === MapType.QQ) {
      const url = state.searching
        ? `https://apis.map.qq.com/ws/place/v1/search?output=jsonp&key=${key}&boundary=${boundaryRef.value}&keyword=${state.keyword}&page_size=${listState.pageSize}&page_index=${listState.pageIndex}`
        : `https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&key=${key}&location=${state.latitude},${state.longitude}&get_poi=1&poi_options=page_size=${listState.pageSize};page_index=${listState.pageIndex}`
      // TODO 列表加载失败提示
      getJSONP(
        url,
        {
          callback: 'callback',
        },
        (res: any) => {
          listState.loading = false
          if (state.searching && 'data' in res && res.data.length) {
            pushData(res.data)
          } else if ('result' in res) {
            const result = res.result
            adcodeRef.value = result.ad_info ? result.ad_info.adcode : ''
            if (result.pois) {
              pushData(result.pois)
            }
          }
          if (list.length === listState.pageSize * listState.pageIndex) {
            listState.hasNextPage = false
          }
        },
        () => {
          listState.loading = false
        }
      )
    } else if (mapInfo.type === MapType.AMAP) {
      window.AMap.plugin('AMap.PlaceSearch', function () {
        const placeSearch = new (window.AMap as any).PlaceSearch({
          city: '全国',
          pageSize: 10,
          pageIndex: listState.pageIndex,
        })
        const keyword = state.searching ? state.keyword : ''
        const radius = state.searching ? 50000 : 5000
        placeSearch.searchNearBy(
          keyword,
          [state.longitude, state.latitude],
          radius,
          function (status: string, result: any) {
            if (status === 'error') {
              console.error(result)
            } else if (status === 'no_data') {
              listState.hasNextPage = false
            } else {
              pushData(result.poiList.pois)
            }
          }
        )
        listState.loading = false
      })
    }
  }
  function loadMore() {
    if (!listState.loading && listState.hasNextPage) {
      listState.pageIndex++
      getList()
    }
  }
  function reset() {
    listState.selectedIndex = -1
    listState.pageIndex = 1
    listState.hasNextPage = true
    listState.nextPage = null
    list.splice(0, list.length)
  }
  return {
    listState,
    list,
    loadMore,
    reset,
    getList,
  }
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'LoctaionPicker',
  props,
  emits: ['close'],
  setup(props, { emit }) {
    usePreventScroll()
    initI18nChooseLocationMsgsOnce()
    const { t } = useI18n()
    const state = useState(props)
    const { list, listState, loadMore, reset, getList } = useList(state)
    const search = debounce(
      () => {
        reset()
        if (state.keyword) {
          getList()
        }
      },
      1000,
      { setTimeout, clearTimeout }
    )
    watch(
      () => state.searching,
      (val) => {
        reset()
        if (!val) {
          getList()
        }
      }
    )
    function onInput(event: { detail: { value: string } }) {
      state.keyword = event.detail.value
      search()
    }

    function onChoose() {
      emit('close', extend({}, listState.selected))
    }

    function onBack() {
      emit('close')
    }

    function onRegionChange(event: { detail: { centerLocation: Point } }) {
      const centerLocation = event.detail.centerLocation
      if (centerLocation) {
        // TODO 图钉 icon 动画
        move(centerLocation)
      }
    }

    function moveToLocation() {
      getLocation({
        type: 'gcj02',
        success: move,
        fail: () => {
          // move({
          //   latitude: 0,
          //   longitude: 0,
          // })
        },
      })
    }

    function move({ latitude, longitude }: Point) {
      state.latitude = latitude
      state.longitude = longitude
      if (!state.searching) {
        reset()
        getList()
      }
    }

    if (!state.latitude || !state.longitude) {
      moveToLocation()
    }

    return () => {
      const content = list.map((item, index) => {
        return (
          <div
            key={index}
            class={{
              'list-item': true,
              selected: listState.selectedIndex === index,
            }}
            onClick={() => {
              listState.selectedIndex = index
              state.latitude = item.latitude
              state.longitude = item.longitude
            }}
          >
            {createSvgIconVNode(ICON_PATH_CONFIRM, '#007aff', 24)}
            <div class="list-item-title">{item.name}</div>
            <div class="list-item-detail">
              {distance(item.distance)}
              {item.address}
            </div>
          </div>
        )
      })
      if (listState.loading) {
        content.unshift(
          <div class="list-loading">
            <i class="uni-loading" />
          </div>
        )
      }
      return (
        <div class="uni-system-choose-location">
          <Map
            latitude={state.latitude}
            longitude={state.longitude}
            class="map"
            show-location
            libraries={['places']}
            onUpdated={getList}
            onRegionchange={onRegionChange}
          >
            <div
              class="map-location"
              style={`background-image: url("${ICON_PATH_TARGET}")`}
            />
            <div class="map-move" onClick={moveToLocation}>
              {createSvgIconVNode(ICON_PATH_LOCTAION, '#000000', 24)}
            </div>
          </Map>
          <div class="nav">
            <div class="nav-btn back" onClick={onBack}>
              {createSvgIconVNode(ICON_PATH_CLOSE, '#ffffff', 26)}
            </div>
            <div
              class={{
                'nav-btn': true,
                confirm: true,
                disable: !listState.selected,
              }}
              onClick={onChoose}
            >
              {createSvgIconVNode(ICON_PATH_CONFIRM, '#ffffff', 26)}
            </div>
          </div>
          <div class="menu">
            <div class="search">
              <Input
                value={state.keyword}
                class="search-input"
                placeholder={t('uni.chooseLocation.search')}
                // @ts-expect-error
                onFocus={() => (state.searching = true)}
                onInput={onInput}
              />
              {state.searching && (
                <div
                  class="search-btn"
                  onClick={() => {
                    state.searching = false
                    state.keyword = ''
                  }}
                >
                  {t('uni.chooseLocation.cancel')}
                </div>
              )}
            </div>
            <ScrollView scroll-y class="list" onScrolltolower={loadMore}>
              {content}
            </ScrollView>
          </div>
        </div>
      )
    }
  },
})
