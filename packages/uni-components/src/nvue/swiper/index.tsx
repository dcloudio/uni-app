import {
  type ExtractPropTypes,
  type VNode,
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { isString } from '@vue/shared'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useNVueEvent'
import { getComponentSize } from '../helpers'
import type { NVueComponentStyles } from '../utils'
import { flatVNode } from '../../helpers/flatVNode'
import { swiperProps } from '../../components/swiper'

const isAndroid = weex.config.env.platform.toLowerCase() === 'android'

const swiperStyles: NVueComponentStyles = [
  {
    'uni-swiper': {
      '': {
        position: 'relative',
        height: '150px',
      },
    },
    'uni-swiper-slider': {
      '': {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    },
    'uni-swiper-dots': {
      '': {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '10',
        height: '10',
      },
    },
  },
]

type SwiperProps = ExtractPropTypes<typeof swiperProps>
type SwiperState = ReturnType<typeof useSwiperState>

export default defineComponent({
  name: 'Swiper',
  props: swiperProps,
  styles: swiperStyles,
  emits: ['change', 'transition', 'animationfinish'],
  setup(props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    let swiperItems: VNode[] = []

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    const state = useSwiperState(props)
    const listeners = useSwiperListeners(state, props, swiperItems, trigger)

    watch(
      [() => props.current, () => props.currentItemId],
      ([newChecked, newModelValue]) => {
        currentCheck(state, props, swiperItems)
      }
    )

    onMounted(() => {
      setTimeout(() => {
        getComponentSize(rootRef.value!).then(({ width, height }) => {
          state.swiperWidth = width
          state.swiperHeight = height
        })
      }, 50)
    })

    return () => {
      const defaultSlots = slots.default && slots.default()
      const { indicatorStyle, currentSync } = state
      swiperItems = flatVNode(defaultSlots)
      return (
        <div ref={rootRef} class="uni-swiper">
          <slider
            class="uni-swiper-slider"
            {...{
              autoPlay: props.autoplay,
              interval: props.interval,
              index: currentSync,
              keepIndex: true,
              showIndicators: props.indicatorDots,
              infinite: props.circular,
              vertical: props.vertical,
              scrollable: !props.disableTouch,
            }}
            {...listeners}
          >
            {swiperItems}
            <indicator class="uni-swiper-dots" style={indicatorStyle} />
          </slider>
        </div>
      )
    }
  },
})

function useSwiperState(props: SwiperProps) {
  let swiperWidth = ref<number>(0)
  let swiperHeight = ref<number>(0)
  const currentSync = ref(props.current)
  const currentChangeSource = ref<string>('autoplay')

  const indicatorStyle = computed(() => ({
    itemColor: props.indicatorColor,
    itemSelectedColor: props.indicatorActiveColor,
    itemSize: 8,
    // 动态创建 indicator 在安卓上有问题，改成透明度控制显示和隐藏
    opacity: props.indicatorDots ? 1 : 0,
  }))

  const state = reactive({
    swiperWidth,
    swiperHeight,
    indicatorStyle,
    currentSync,
    currentChangeSource,
  })
  return state
}

function useSwiperListeners(
  state: SwiperState,
  props: SwiperProps,
  swiperItems: VNode[],
  trigger: CustomEventTrigger
) {
  let lastOffsetRatio: number = 0

  const onScroll = (event: any) => {
    const detail = event.detail
    const isVertical = props.vertical
    let offsetRatio =
      (isVertical ? detail.offsetYRatio : detail.offsetXRatio) || 0
    if (event.drag || event.drag) {
      state.currentChangeSource = 'touch'
    }
    // 纠正 offsetRatio 数值
    if (offsetRatio === 0) {
      const lastOffsetRatio2 = Math.abs(lastOffsetRatio)
      if (lastOffsetRatio2 === 1) {
        return
      } else if (lastOffsetRatio2 > 0.5) {
        offsetRatio = 1
      }
    }
    lastOffsetRatio = offsetRatio
    trigger('transition', {
      dx: isVertical ? 0 : -state.swiperWidth * offsetRatio,
      dy: isVertical ? -state.swiperHeight * offsetRatio : 0,
    })
  }

  const onScrollend = (event: CustomEvent) => {
    const end = () => {
      trigger('animationfinish', getDetail())
      state.currentChangeSource = 'autoplay'
    }
    // 解决 iOS change 事件早于 scrollend 的问题
    if (isAndroid) {
      end()
    } else {
      setTimeout(end, 50)
    }
  }

  const onChange = (event: any) => {
    if (isString(event.detail.source)) {
      state.currentChangeSource = event.detail.source
    }
    state.currentSync = event.detail.index
    lastOffsetRatio = 0
  }

  function getDetail() {
    const current = Number(state.currentSync)
    const currentItem: any = swiperItems[current] || {}
    const currentItemId =
      (currentItem.componentInstance && currentItem.componentInstance.itemId) ||
      ''
    return {
      current,
      currentItemId,
      source: state.currentChangeSource,
    }
  }

  // TODO
  watch(
    () => state.currentSync,
    (val) => {
      trigger('change', getDetail())
    }
  )

  const listeners = {
    onScroll,
    onScrollend,
    onChange,
  }

  return listeners
}

function currentCheck(
  state: SwiperState,
  props: SwiperProps,
  swiperItems: VNode[]
) {
  let current = -1
  if (props.currentItemId) {
    for (let i = 0, items = swiperItems; i < items.length; i++) {
      const componentInstance = (items[i] as any).componentInstance
      if (
        componentInstance &&
        componentInstance.itemId === props.currentItemId
      ) {
        current = i
        break
      }
    }
  }
  if (current < 0) {
    current = Math.round(Number(props.current)) || 0
  }
  current = current < 0 ? 0 : current
  if (state.currentSync !== current) {
    state.currentChangeSource = ''
    state.currentSync = current
  }
}
