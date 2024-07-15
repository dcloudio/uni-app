import { inject, onUnmounted, reactive } from 'vue'
import {
  defineSystemComponent,
  type useCustomEvent,
} from '@dcloudio/uni-components'
// TODO
// import {
//   offCompassChange,
//   onCompassChange,
// } from '../../../service/api'
import { ICON_PATH_ORIGIN } from '../../../helpers/location'
import type { Map, Maps } from './maps'
import MapMarker from './MapMarker'
import { type Location, getLocation } from './utils'

type CustomEventTrigger = ReturnType<typeof useCustomEvent>
type OnMapReadyCallback = (
  map: Map,
  maps: Maps,
  trigger: CustomEventTrigger
) => void
type OnMapReady = (callback: OnMapReadyCallback) => void
interface State {
  latitude: number
  longitude: number
  rotate: number
}
export interface MoveToLocationOptions {
  latitude?: number
  longitude?: number
}
export const CONTEXT_ID = 'MAP_LOCATION'
export interface Context {
  id: string
  state: State
}
type AddMapChidlContext = (context: Context) => void
type RemoveMapChidlContext = (context: Context) => void

export default /*#__PURE__*/ defineSystemComponent({
  name: 'MapLocation',
  setup() {
    const state: State = reactive({
      latitude: 0,
      longitude: 0,
      rotate: 0,
    })
    if (!__NODE_JS__) {
      const onMapReady: OnMapReady = inject('onMapReady') as OnMapReady
      let timer: ReturnType<typeof setTimeout>
      // function compassChangeHandler(res: { direction: number }) {
      //   state.rotate = res.direction
      // }
      function updateLocation() {
        getLocation({
          type: 'gcj02',
          isHighAccuracy: true,
        })
          .then((res: Location) => {
            state.latitude = res.latitude
            state.longitude = res.longitude
          })
          .finally(() => {
            timer = setTimeout(updateLocation, 30000)
          })
      }
      function removeLocation() {
        if (timer) {
          clearTimeout(timer)
        }
        // offCompassChange(compassChangeHandler)
      }
      // onCompassChange(compassChangeHandler)
      onMapReady(updateLocation)
      onUnmounted(removeLocation)
      const addMapChidlContext: AddMapChidlContext = inject(
        'addMapChidlContext'
      ) as AddMapChidlContext
      const removeMapChidlContext: RemoveMapChidlContext = inject(
        'removeMapChidlContext'
      ) as RemoveMapChidlContext
      const context: Context = {
        id: CONTEXT_ID,
        state,
      }
      addMapChidlContext(context)
      onUnmounted(() => removeMapChidlContext(context))
    }
    return () => {
      return state.latitude ? (
        <MapMarker
          anchor={{ x: 0.5, y: 0.5 }}
          width="44"
          height="44"
          iconPath={ICON_PATH_ORIGIN}
          {...state}
        />
      ) : null
    }
  },
})
