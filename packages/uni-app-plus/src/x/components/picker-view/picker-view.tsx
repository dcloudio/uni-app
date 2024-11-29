import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  type ComponentPublicInstance,
  type PropType,
  type StyleValue,
  camelize,
  getCurrentInstance,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import { _style_picker_view as _style } from './style'
import { UniPickerViewChangeEvent, UniPickerViewElement } from './model'
import { initUniCustomEvent } from '../../utils'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'PickerView',
  rootElement: {
    name: 'uni-picker-view-element',
    // @ts-expect-error not web element
    class: UniPickerViewElement,
  },
  props: {
    value: {
      type: Array as PropType<number[]>,
      default: [] as number[],
    },
    indicatorStyle: {
      type: String,
      default: '',
    },
    maskTopStyle: {
      type: String,
      default: '',
    },
    maskBottomStyle: {
      type: String,
      default: '',
    },
  },
  emits: ['change'],
  setup(props, { emit, expose, slots }) {
    const data = reactive({
      $uniPickerViewElement: null as null | UniPickerViewElement,
      $items: [] as ComponentPublicInstance[],
      valueSync: [] as number[],
    })

    watch(
      () => props.value,
      (val) => {
        val.forEach((_val, index) => {
          if (data.$items.length > index) {
            const fn = data.$items[index].$.exposed?.setCurrent
            fn(_val)
          }
        })
        data.valueSync = [...val]
      },
      {
        immediate: true,
      }
    )

    provide('pickerViewProps', props)

    const pickerViewElementRef = ref<UniPickerViewElement>()

    const instance = getCurrentInstance()

    const _pickerViewUpdateHandler = (
      vm: ComponentPublicInstance,
      type: string
    ) => {
      if (type == 'add') {
        data.$items.push(vm)
        // set default value
        if (data.$items.length > data.valueSync.length) {
          data.valueSync.push(0)
        }
      } else {
        const index = data.$items.indexOf(vm)
        if (index != -1) {
          data.$items.splice(index, 1)
          data.valueSync.splice(index, 1)
        }
      }
    }
    const getItemValue = (vm: ComponentPublicInstance): number => {
      const index = data.$items.indexOf(vm)
      if (index != -1) {
        if (props.value.length > index) {
          return props.value[index]
        }
      }
      return 0
    }

    const setItemValue = (vm: ComponentPublicInstance, val: number) => {
      const index = data.$items.indexOf(vm)
      if (index != -1) {
        if (data.valueSync.length > index) {
          data.valueSync[index] = val
        }
        emit(
          'change',
          initUniCustomEvent(
            pickerViewElementRef.value!,
            new UniPickerViewChangeEvent([...data.valueSync])
          )
        )
      }
    }

    expose({
      _pickerViewUpdateHandler,
      getItemValue,
      setItemValue,
    })

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        if (!instance || !pickerViewElementRef.value) return

        pickerViewElementRef.value!._getAttribute = (
          key: string
        ): string | null => {
          const keyString = camelize(key) as keyof typeof props
          return props[keyString] !== null
            ? props[keyString]?.toString() ?? null
            : null
        }
      })
    })

    // style
    const styleUniPickerView = _style['uni-picker-view'][''] as StyleValue

    const styleUniPickerViewWrapper = _style['uni-picker-view-wrapper'][
      ''
    ] as StyleValue

    // <!-- TODO 过滤非picker-view-column节点 -->
    return () => {
      return (
        <uni-picker-view-element
          ref={pickerViewElementRef}
          class="uni-picker-view"
          style={styleUniPickerView}
        >
          <view
            class="uni-picker-view-wrapper"
            style={styleUniPickerViewWrapper}
          >
            {slots.default?.()}
          </view>
        </uni-picker-view-element>
      )
    }
  },
})

export { UniPickerViewChangeEvent, UniPickerViewElement }
