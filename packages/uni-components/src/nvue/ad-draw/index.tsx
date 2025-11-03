import {
  type ExtractPropTypes,
  type Ref,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useNVueEvent'
import { getComponentSize } from '../helpers'
import { adDrawProps, getAdData } from '../../components/ad-draw'

type AdDrawProps = ExtractPropTypes<typeof adDrawProps>
type AdDrawState = ReturnType<typeof useAdDrawState>

const AdEventType = {
  load: 'load',
  close: 'close',
  error: 'error',
}

export default defineComponent({
  name: 'AdDraw',
  props: adDrawProps,
  emits: [AdEventType.load, AdEventType.close, AdEventType.error],
  setup(props, { emit }) {
    const adRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(adRef, emit)

    const state = useAdDrawState(props)

    watch(
      () => props.adpid,
      (value) => {
        _loadAdData(state, props, trigger)
      }
    )

    watch(
      () => props.data,
      (value) => {
        state.data = value
      }
    )

    const listeners = {
      onDislike(e: Event) {
        trigger(AdEventType.close, e)
      },
    }

    onMounted(() => {
      setTimeout(() => {
        getComponentSize(adRef.value!).then(({ width, height }) => {
          state.width = width === 0 ? -1 : width
          state.height = height === 0 ? -1 : height
          _loadAdData(state, props, trigger)
        })
      }, 50)
    })

    return () => {
      const { data } = state
      return (
        <u-ad-draw
          ref={adRef}
          {...{ data, rendering: true }}
          {...listeners}
        ></u-ad-draw>
      )
    }
  },
})

function useAdDrawState(props: AdDrawProps) {
  const data = ref('')
  const state = reactive({
    width: 0,
    height: 0,
    data,
  })
  return state
}

function _loadAdData(
  state: AdDrawState,
  props: AdDrawProps,
  trigger: CustomEventTrigger
) {
  getAdData(
    props.adpid,
    state.width,
    state.height,
    (res: any) => {
      state.data = res
      trigger(AdEventType.load, {})
    },
    (err: any) => {
      trigger(AdEventType.error, err)
    }
  )
}
