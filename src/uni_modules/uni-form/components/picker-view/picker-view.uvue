<template>
  <view ref="pickViewRef" class="uni-picker-view">
    <slot></slot>
  </view>
</template>

<script lang="uts" setup>
  import { FORM_KEY, PICKER_VIEW_KEY } from '../common.uts'
  import { UniPickerViewElement } from './global.uts' 
  import { FormContext, PickerViewColumnApi, PickerViewContext } from '../types.uts'
  
  interface PickerViewProps {
    /**
     * 指示器样式
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    indicatorStyle?: string;
    /**
     * 遮罩类
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    maskClass?: string.ClassString;
    /**
     * 遮罩顶部类
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    maskTopStyle?: string;
    /**
     * 遮罩底部类
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    maskBottomStyle?: string;
    /**
     * 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    name?: string;
    /**
     * 表单的控件值，作为键值对的一部分与表单(form组件)一同提交
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    value?: number[];
  }

  const props = withDefaults(defineProps<PickerViewProps>(), {
    indicatorStyle: '',
    maskClass: '',
    maskTopStyle: '',
    maskBottomStyle: '',
    name: '',
    value: () => []
  })

  // #ifdef WEB
  class UniCustomEvent<T> {
    detail : T
    constructor(type : string, detail : T) {
      // this.type = type
      this.detail = detail
    }
  }
  // #endif

  type UniPickerViewChangeEventDetail = {
    value : number[]
  }

  class UniPickerViewChangeEvent extends UniCustomEvent<UniPickerViewChangeEventDetail> {
    constructor(value : number[]) {
      super('change', { value } as UniPickerViewChangeEventDetail)
    }
  }
  
  defineOptions({
    name: 'picker-view',
    // @ts-ignore
    rootElement: {
      class: UniPickerViewElement
    },
    externalClasses: ['mask-class']
  })

  const emit = defineEmits<{
    change: [event: UniPickerViewChangeEvent]
  }>()

  // parse indicator height from style string; fallback 50px
  function parseIndicatorHeight(styleStr: string): number {
    const re = /height\s*:\s*(\d+)px/i
    const m = re.exec(styleStr)
    if (m && m.length > 1) {
      const n = parseInt(m[1])
      if (!isNaN(n) && n > 0) return n
    }
    return 50
  }

  const itemHeight = computed<number>(() => parseIndicatorHeight(props.indicatorStyle))
  const pickViewRef = ref<UniElement | null>(null)
  const offsetHeight = ref(100)
  const containerPaddingPx = computed<string>(() => (offsetHeight.value - itemHeight.value) / 2 + 'px')

  // mask styles will be applied in each column now
  const maskTopInlineStyle = computed<any>(() => props.maskTopStyle ? props.maskTopStyle : {})
  const maskBottomInlineStyle = computed<any>(() => props.maskBottomStyle ? props.maskBottomStyle : {})
  const indicatorInlineStyle = computed<any>(() => props.indicatorStyle ? props.indicatorStyle : {})

  // internal value state synced with prop
  const innerValue = ref<number[]>([])

  const columns: PickerViewColumnApi[] = []

  function normalizeValue(value: number[]): number[] {
    return columns.map((_, i) => value[i] ?? 0)
  }

  function syncFromProp(indexes: number[]) {
    innerValue.value = indexes
    setTimeout(() => {
      // TODO 此处不加延时，会存在滚动异常的问题
      for (let i = 0; i < columns.length; i++) {
        const api = columns[i]
        const index = indexes[i]
        api.setScrollTop(index)
      }
    }, 30)
  }

  watch(() => props.value, (newValue: number[]) => {
    syncFromProp(normalizeValue(newValue))
  }, { deep: true })

  function registerColumn(api: PickerViewColumnApi): number {
    columns.push(api)
    const idx = columns.length - 1
    return idx
  }

  function unregisterColumn(api: PickerViewColumnApi) {
    const i = columns.indexOf(api)
    if (i >= 0) {
      columns.splice(i, 1)
    }
  }

  function onColumnIndexChange(col: number, index: number) {
    // update inner state
    const curr = innerValue.value.slice()
    if (curr[col] !== index) {
      curr[col] = index
      // emit consolidated change
      emit('change', new UniPickerViewChangeEvent(curr))
    }
  }

  provide<PickerViewContext>(PICKER_VIEW_KEY, {
    itemHeight: () => itemHeight.value,
    containerPaddingPx: () => containerPaddingPx.value,
    maskClass: () => props.maskClass,
    maskTopStyle: () => maskTopInlineStyle.value,
    maskBottomStyle: () => maskBottomInlineStyle.value,
    indicatorStyle: () => indicatorInlineStyle.value,
    registerColumn,
    unregisterColumn,
    onColumnIndexChange,
  })
  const formCtx = inject<FormContext | null>(FORM_KEY, null)
  
  onMounted(() => {
    const initialValue = props.value
    if (formCtx && props.name) {
      formCtx.registerField({
        name: props.name,
        getValue: () => innerValue.value,
        reset: () => { syncFromProp(normalizeValue(initialValue)) }
      })
    }
    offsetHeight.value = pickViewRef.value!.offsetHeight

    syncFromProp(normalizeValue(initialValue))
  })

  onUnmounted(() => {
    // clear columns
    columns.splice(0, columns.length)
  })
</script>

<style>
.uni-picker-view {
  position: relative;
  flex-direction: row;
  overflow: hidden;
}
</style>