import { type ExtractPropTypes, reactive, ref, watch } from 'vue'
import { ICON_PATH_BACK, createSvgIconVNode } from '@dcloudio/uni-core'
import {
  type EmitEvent,
  defineSystemComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import {
  ICON_PATH_LOCTAION,
  ICON_PATH_ORIGIN,
  ICON_PATH_TARGET,
  MapType,
  type Point,
  getMapInfo,
} from '../../../helpers/location'
import Map from './index'
import { getLocation } from './utils'

const ICON_PATH_NAV =
  'M28 17c-6.49396875 0-12.13721875 2.57040625-15 6.34840625V5.4105l6.29859375 6.29859375c0.387875 0.387875 1.02259375 0.387875 1.4105 0 0.387875-0.387875 0.387875-1.02259375 0-1.4105L12.77853125 2.36803125a0.9978125 0.9978125 0 0 0-0.0694375-0.077125c-0.1944375-0.1944375-0.45090625-0.291375-0.70721875-0.290875l-0.00184375-0.0000625-0.00184375 0.0000625c-0.2563125-0.0005-0.51278125 0.09640625-0.70721875 0.290875a0.9978125 0.9978125 0 0 0-0.0694375 0.077125l-7.930625 7.9305625c-0.387875 0.387875-0.387875 1.02259375 0 1.4105 0.387875 0.387875 1.02259375 0.387875 1.4105 0L11 5.4105V29c0 0.55 0.45 1 1 1s1-0.45 1-1c0-5.52284375 6.71571875-10 15-10 0.55228125 0 1-0.44771875 1-1 0-0.55228125-0.44771875-1-1-1z'

const props = {
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  scale: {
    type: Number,
    default: 18,
  },
  name: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
}

export type Props = ExtractPropTypes<typeof props>

interface State {
  center: Point
  marker: Point
  location: Point
}
function useState(props: Props) {
  const state: State = reactive({
    center: {
      latitude: 0,
      longitude: 0,
    },
    marker: {
      id: 1,
      latitude: 0,
      longitude: 0,
      iconPath: ICON_PATH_TARGET,
      width: 32,
      height: 52,
    },
    location: {
      id: 2,
      latitude: 0,
      longitude: 0,
      iconPath: ICON_PATH_ORIGIN,
      width: 44,
      height: 44,
    },
  })
  function updatePosition() {
    if (props.latitude && props.longitude) {
      state.center.latitude = props.latitude
      state.center.longitude = props.longitude
      state.marker.latitude = props.latitude
      state.marker.longitude = props.longitude
    }
  }
  watch([() => props.latitude, () => props.longitude], updatePosition)
  updatePosition()
  return state
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'LocationView',
  props,
  emits: ['close'],
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const state = useState(props)

    getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
    }).then(({ latitude, longitude }) => {
      state.location.latitude = latitude
      state.location.longitude = longitude
    })

    function onRegionChange(event: { detail: { centerLocation: Point } }) {
      const centerLocation = event.detail.centerLocation
      if (centerLocation) {
        state.center.latitude = centerLocation.latitude
        state.center.longitude = centerLocation.longitude
      }
    }

    async function nav() {
      const mapInfo = await getMapInfo()
      let url = ''
      if (mapInfo.type === MapType.GOOGLE) {
        const origin: string = state.location.latitude
          ? `&origin=${state.location.latitude}%2C${state.location.longitude}`
          : ''
        url = `https://www.google.com/maps/dir/?api=1${origin}&destination=${props.latitude}%2C${props.longitude}`
      } else if (mapInfo.type === MapType.QQ) {
        const fromcoord: string = state.location.latitude
          ? `&fromcoord=${state.location.latitude}%2C${
              state.location.longitude
            }&from=${encodeURIComponent('我的位置')}`
          : ''
        url = `https://apis.map.qq.com/uri/v1/routeplan?type=drive${fromcoord}&tocoord=${
          props.latitude
        }%2C${props.longitude}&to=${encodeURIComponent(
          props.name || '目的地'
        )}&ref=${mapInfo.key}`
      } else if (mapInfo.type === MapType.AMAP) {
        const from = state.location.latitude
          ? `from=${state.location.longitude},${
              state.location.latitude
            },${encodeURIComponent('我的位置')}&`
          : ''
        url = `https://uri.amap.com/navigation?${from}to=${props.longitude},${
          props.latitude
        },${encodeURIComponent(props.name || '目的地')}`
      }
      window.open(url)
    }

    function back(e) {
      const event = new CustomEvent<any>('close', {} as any)
      trigger('close', event, event.detail)
    }

    function setCenter({ latitude, longitude }: Point) {
      state.center.latitude = latitude
      state.center.longitude = longitude
    }

    return () => {
      return (
        <div class="uni-system-open-location" ref={rootRef}>
          <Map
            latitude={state.center.latitude}
            longitude={state.center.longitude}
            class="map"
            markers={[state.marker, state.location]}
            onRegionchange={onRegionChange}
          >
            <div class="map-move" onClick={() => setCenter(state.location)}>
              {createSvgIconVNode(ICON_PATH_LOCTAION, '#000000', 24)}
            </div>
          </Map>
          <div class="info">
            <div class="name" onClick={() => setCenter(state.marker)}>
              {props.name}
            </div>
            <div class="address" onClick={() => setCenter(state.marker)}>
              {props.address}
            </div>
            <div class="nav" onClick={nav}>
              {createSvgIconVNode(ICON_PATH_NAV, '#ffffff', 26)}
            </div>
          </div>
          <div class="nav-btn-back" onClick={back}>
            {createSvgIconVNode(ICON_PATH_BACK, '#ffffff', 26)}
          </div>
        </div>
      )
    }
  },
})
