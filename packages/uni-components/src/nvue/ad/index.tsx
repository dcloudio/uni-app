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
import { adProps, getAdData } from '../../components/ad'

type AdProps = ExtractPropTypes<typeof adProps>
type AdState = ReturnType<typeof useAdState>

const AdEventType = {
  load: 'load',
  close: 'close',
  error: 'error',
  downloadchange: 'downloadchange',
}

export default defineComponent({
  name: 'Ad',
  props: adProps,
  emits: [
    AdEventType.load,
    AdEventType.close,
    AdEventType.error,
    AdEventType.downloadchange,
  ],
  setup(props, { emit }) {
    const adRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(adRef, emit)

    const state = useAdState(props)

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

    onMounted(() => {
      setTimeout(() => {
        getComponentSize(adRef.value!).then(({ width }) => {
          state.width = width === 0 ? -1 : width
          _loadAdData(state, props, trigger)
        })
      }, 50)
    })

    const listeners = {
      onDownloadchange(e: Event) {
        trigger(AdEventType.downloadchange, e)
      },
      onDislike(e: Event) {
        trigger(AdEventType.close, e)
      },
    }

    return () => {
      return (
        <u-ad
          ref={adRef}
          {...{ data: state.data, rendering: true }}
          {...listeners}
        />
      )
    }
  },
})

function useAdState(props: AdProps) {
  const data = ref('')
  const state = reactive({
    width: 0,
    data,
  })
  return state
}

function _loadAdData(
  state: AdState,
  props: AdProps,
  trigger: CustomEventTrigger
) {
  getAdData(
    {
      adpid: props.adpid,
      width: state.width,
    },
    (res: any) => {
      state.data = res
      trigger(AdEventType.load, {})
    },
    (err: any) => {
      trigger(AdEventType.error, err)
    }
  )
}
