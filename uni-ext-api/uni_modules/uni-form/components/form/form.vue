<template>
  <view class="uni-form"
    <!-- #ifdef WEB -->
    ref="rootRef"
    <!-- #endif -->
  >
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
  import { FORM_KEY } from '../common.ts'
  import { UniFormElement } from './global.ts'
  import { FormField, FormContext } from '../types.ts'

  type UniFormSubmitEventDetail = {
    value : UTSJSONObject
  }

  type UniFormResetEventDetail = {
  }

  defineOptions({
    name: 'form',
    // @ts-ignore
    rootElement: {
      class: UniFormElement
    }
  })

  interface FormProps {
    /**
     * 是否禁用
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
        "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    disabled?: boolean
  }

  const props = withDefaults(defineProps<FormProps>(), {
    disabled: false
  })

  // #ifdef WEB
  const rootRef = ref<UniElement | null>(null)

  class UniCustomEvent<T> {
    type : string
    timeStamp : number = 0
    target : UniElement | null
    currentTarget : UniElement | null
    detail : T

    constructor(type : string, detail : T) {
      const target = rootRef.value
      this.type = type
      this.target = target
      this.currentTarget = target
      this.detail = detail
    }
  }
  // #endif

  class UniFormSubmitEvent extends UniCustomEvent<UniFormSubmitEventDetail> {
    constructor(value : UTSJSONObject) {
      super('submit', { value } as UniFormSubmitEventDetail)
    }
  }

  class UniFormResetEvent extends UniCustomEvent<UniFormResetEventDetail> {
    constructor() {
      super('reset', {} as UniFormResetEventDetail)
    }
  }

  const emit = defineEmits<{
    submit : UniFormSubmitEvent
    reset : UniFormResetEvent
  }>()

  // Keep fields by name
  const fields = new Map<string, FormField>()

  function registerField(field : FormField) {
    if (!field.name) {
      return
    }
    fields.set(field.name, field)
  }

  function unregisterField(name : string) {
    if (!name) {
      return
    }
    fields.delete(name)
  }

  function submit(event?: UniPointerEvent) {
    if (props.disabled) {
      return
    }

    const data = {}
    fields.forEach((field, name) => {
      data[name] = field.getValue()
    })
    const submitEvent = new UniFormSubmitEvent(data)
    // #ifdef WEB
    submitEvent.timeStamp = event?.timeStamp ?? performance.now()
    // #endif
    emit('submit', submitEvent)
  }

  function reset(event?: UniPointerEvent) {
    if (props.disabled) {
      return
    }

    fields.forEach((field) => {
      field.reset && field.reset()
    })
    const resetEvent = new UniFormResetEvent()
    // #ifdef WEB
    resetEvent.timeStamp = event?.timeStamp ?? performance.now()
    // #endif
    emit('reset', resetEvent)
  }

  const ctx : FormContext = { registerField, unregisterField, submit, reset }
  provide(FORM_KEY, ctx)

  defineExpose({ submit, reset })
</script>

<style>
  .uni-form {
    flex-direction: column;
  }
</style>
