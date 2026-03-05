<template>
  <view flatten>
    <slot></slot>
  </view>
</template>

<script lang="uts" setup>
  import { FORM_KEY, RADIO_GROUP_KEY } from '../common.uts'
  import { UniRadioGroupElement } from './global.uts'
  import { FormContext } from '../types.uts'

  interface RadioGroupContext {
    selectedValue : Ref<string | null>
    change : (val : string) => void
    setSelectedValue : (val : string | null) => void
  }

  type UniRadioGroupChangeEventDetail = {
    value : string
  }

  // #ifdef WEB
  class UniCustomEvent<T> {
    detail : T
    constructor(type : string, detail : T) {
      // this.type = type
      this.detail = detail
    }
  }
  // #endif

  class UniRadioGroupChangeEvent extends UniCustomEvent<UniRadioGroupChangeEventDetail> {
    constructor(value : string) {
      super('change', { value } as UniRadioGroupChangeEventDetail)
    }
  }

  const emit = defineEmits<{
    change: [event: UniRadioGroupChangeEvent]
  }>()

  interface RadioGroupProps {
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
  }

  const props = withDefaults(defineProps<RadioGroupProps>(), {
    name: ''
  })

  defineOptions({
    name: 'radio-group',
    // @ts-ignore
    rootElement: {
      class: UniRadioGroupElement
    }
  })

  // Internal selected value ref
  const selectedValue = ref<string | null>(null)
  const initialValue = ref<string | null>(null)

  function setSelectedValue(val : string | null) {
    if (selectedValue.value === val) {
      return
    }
    selectedValue.value = val
  }

  function change(val : string) {
    setSelectedValue(val)
    emit('change', new UniRadioGroupChangeEvent(val))
  }

  const ctx : RadioGroupContext = {
    selectedValue: selectedValue,
    change: change,
    setSelectedValue: setSelectedValue
  }

  provide(RADIO_GROUP_KEY, ctx)

  const formCtx = inject<FormContext | null>(FORM_KEY, null)

  onMounted(() => {
    // Capture initial after potential child radios set a default
    initialValue.value = selectedValue.value
    if (formCtx && props.name) {
      formCtx.registerField({
        name: props.name,
        getValue: () => selectedValue.value,
        reset: () => {
          selectedValue.value = initialValue.value
          emit('change', new UniRadioGroupChangeEvent(initialValue.value))
        }
      })
    }
  })

  onUnmounted(() => {
    if (formCtx && props.name) {
      formCtx.unregisterField(props.name)
    }
  })
</script>