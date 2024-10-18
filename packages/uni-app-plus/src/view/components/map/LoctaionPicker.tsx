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
  type EmitEvent,
  Input,
  ScrollView,
  defineSystemComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import {
  ICON_PATH_LOCTAION,
  ICON_PATH_TARGET,
  MapType,
  type Point,
  getMapInfo,
} from '../../../helpers/location'
import Map from './index'
import { getLocation, mapPlaceSearch } from './utils'

const props = {
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  keyword: {
    type: String,
    default: '',
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
  if (props.keyword) {
    state.keyword = props.keyword
    state.searching = true
  }
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
  async function getList() {
    listState.loading = true
    const mapInfo = await getMapInfo()
    if (mapInfo.type === MapType.GOOGLE) {
      if (listState.pageIndex > 1 && listState.nextPage) {
        listState.nextPage()
        return
      }
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      )
      service[state.keyword ? 'textSearch' : 'nearbySearch'](
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
      mapPlaceSearch({
        keyword: state.keyword,
        latitude: state.latitude,
        longitude: state.longitude,
        pageIndex: listState.pageIndex,
        pageSize: listState.pageSize,
      })
        .then((pois) => {
          pushData(pois as any[])
          listState.loading = false
        })
        .catch((err) => {
          listState.loading = false
        })
    } else if (mapInfo.type === MapType.AMAP) {
      window.AMap.plugin('AMap.PlaceSearch', function () {
        const placeSearch = new (window.AMap as any).PlaceSearch({
          city: '全国',
          pageSize: 10,
          pageIndex: listState.pageIndex,
        })
        const keyword = state.keyword || ''
        const radius = state.keyword ? 50000 : 5000
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
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
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

    function onChoose(e) {
      const event = new CustomEvent<any>('close', {
        detail: extend({}, listState.selected),
      })
      trigger('close', event, event.detail)
    }

    function onBack(e) {
      const event = new CustomEvent<any>('close', {
        detail: {},
      })
      trigger('close', event, event.detail)
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
        isHighAccuracy: true,
      }).then(({ latitude, longitude }) => {
        move({
          latitude,
          longitude,
        })
      })
    }

    function move({ latitude, longitude }: Point) {
      state.latitude = latitude
      state.longitude = longitude
      reset()
      getList()
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
        <div class="uni-system-choose-location" ref={rootRef}>
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
