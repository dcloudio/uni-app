import { extend } from '@vue/shared'
import { ref, ExtractPropTypes, reactive, computed, watch } from 'vue'
import { debounce } from '@dcloudio/uni-shared'
import {
  createSvgIconVNode,
  ICON_PATH_CLOSE,
  ICON_PATH_CONFIRM,
} from '@dcloudio/uni-core'
import {
  defineSystemComponent,
  Input,
  ScrollView,
} from '@dcloudio/uni-components'
import { usePreventScroll } from '../../../../helpers/usePreventScroll'
import { Map } from '../../../../view/components'
import { getJSONP } from '../../../../helpers/getJSONP'
import { getLocation } from '../../location/getLocation'
const ICON_PATH_LOCTAION =
  'M13.3334375 16 q0.033125 1.1334375 0.783125 1.8834375 q0.75 0.75 1.8834375 0.75 q1.1334375 0 1.8834375 -0.75 q0.75 -0.75 0.75 -1.8834375 q0 -1.1334375 -0.75 -1.8834375 q-0.75 -0.75 -1.8834375 -0.75 q-1.1334375 0 -1.8834375 0.75 q-0.75 0.75 -0.783125 1.8834375 ZM30.9334375 14.9334375 l-1.1334375 0 q-0.5 -5.2 -4.0165625 -8.716875 q-3.516875 -3.5165625 -8.716875 -4.0165625 l0 -1.1334375 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 l0 1.1334375 q-5.2 0.5 -8.716875 4.0165625 q-3.5165625 3.516875 -4.0165625 8.716875 l-1.1334375 0 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 l1.1334375 0 q0.5 5.2 4.0165625 8.716875 q3.516875 3.5165625 8.716875 4.0165625 l0 1.1334375 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 l0 -1.1334375 q5.2 -0.5 8.716875 -4.0165625 q3.5165625 -3.516875 4.0165625 -8.716875 l1.1334375 0 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 ZM17.0665625 27.6665625 l0 -2.0665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 l0 2.0665625 q-4.3 -0.4665625 -7.216875 -3.383125 q-2.916875 -2.916875 -3.3834375 -7.216875 l2.0665625 0 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 l-2.0665625 0 q0.4665625 -4.3 3.3834375 -7.216875 q2.9165625 -2.916875 7.216875 -3.3834375 l0 2.0665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 l0 -2.0665625 q4.3 0.4665625 7.216875 3.3834375 q2.9165625 2.9165625 3.383125 7.216875 l-2.0665625 0 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 l2.0665625 0 q-0.4665625 4.3 -3.383125 7.216875 q-2.916875 2.9165625 -7.216875 3.383125 Z'

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
    return '100m内 | '
  } else {
    return ''
  }
}
interface Point {
  latitude: number
  longitude: number
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
    pageSize: 15,
    pageIndex: 1,
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
        name: item.title,
        address: item.address,
        distance: item._distance,
        latitude: item.location.lat,
        longitude: item.location.lng,
      })
    })
  }
  function getList() {
    listState.loading = true
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
      },
      () => {
        listState.loading = false
      }
    )
  }
  function loadMore() {
    if (
      !listState.loading &&
      list.length === listState.pageSize * listState.pageIndex
    ) {
      listState.pageIndex++
      getList()
    }
  }
  function reset() {
    listState.selectedIndex = -1
    listState.pageIndex = 1
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
    const state = useState(props)
    const { list, listState, loadMore, reset, getList } = useList(state)
    const search = debounce(() => {
      reset()
      if (state.keyword) {
        getList()
      }
    }, 1000)
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
          move({
            latitude: 39.90960456049752,
            longitude: 116.3972282409668,
          })
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
            // @ts-ignore
            onRegionchange={onRegionChange}
          >
            <div class="map-location" />
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
                placeholder="搜索地点"
                // @ts-ignore
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
                  取消
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
