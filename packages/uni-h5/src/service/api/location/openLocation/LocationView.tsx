import { Ref, ref, ExtractPropTypes, reactive, computed } from 'vue'
import { createSvgIconVNode, ICON_PATH_BACK } from '@dcloudio/uni-core'
import { defineSystemComponent } from '@dcloudio/uni-components'
import { usePreventScroll } from '../../../../helpers/usePreventScroll'

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

export default /*#__PURE__*/ defineSystemComponent({
  name: 'LocationView',
  props,
  emits: ['close'],
  setup(props, { emit }) {
    usePreventScroll()
    const mapRef: Ref<HTMLIFrameElement | null> = ref(null)
    const key = __uniConfig.qqMapKey
    const referer = 'uniapp'
    const poimarkerSrc = 'https://apis.map.qq.com/tools/poimarker'
    const src = computed(() => {
      const { latitude, longitude, name, address } = props
      return latitude && longitude
        ? `${poimarkerSrc}?type=0&marker=coord:${latitude},${longitude};title:${name};addr:${address};&key=${key}&referer=${referer}`
        : ''
    })
    const state = reactive({
      src,
      isPoimarkerSrc: true,
    })

    function check() {
      const map = mapRef.value as HTMLIFrameElement
      if (map.src.indexOf(poimarkerSrc) === 0) {
        state.isPoimarkerSrc = true
      } else {
        state.isPoimarkerSrc = false
      }
    }

    function nav() {
      const map = mapRef.value as HTMLIFrameElement
      const url = `https://map.qq.com/nav/drive#routes/page?transport=2&epointy=${
        props.latitude
      }&epointx=${props.longitude}&eword=${encodeURIComponent(
        props.name || '目的地'
      )}&referer=${referer}`
      map.src = url
    }

    function back() {
      const map = mapRef.value as HTMLIFrameElement
      if (map.src.indexOf(poimarkerSrc) !== 0) {
        map.src = state.src
      } else {
        emit('close')
      }
      check()
    }

    return () => {
      return (
        <div class="uni-system-open-location">
          <div
            class={{
              'map-content': true,
              'fix-position': state.isPoimarkerSrc,
            }}
          >
            <iframe
              ref={mapRef}
              src={state.src}
              allow="geolocation"
              sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation allow-modals allow-popups"
              frameborder="0"
              onLoad={check}
            />
            {/* <!-- 去这里 --> */}
            {state.isPoimarkerSrc && <div class="actTonav" onClick={nav} />}
          </div>
          <div class="nav-btn-back" onClick={back}>
            {createSvgIconVNode(ICON_PATH_BACK, '#ffffff', 26)}
          </div>
        </div>
      )
    }
  },
})
