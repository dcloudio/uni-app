<template>
  <view class="uni-form">
    <slot></slot>
  </view>
</template>

<script lang="uts" setup>
  import { FORM_KEY } from '../common.uts'
  import { UniFormElement } from './global.uts'
  import { FormField, FormContext } from '../types.uts'

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
         "harmony": {
           "unixvVer": "5.0"
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
  class UniCustomEvent<T> {
    detail : T
    constructor(type : string, detail : T) {
      // this.type = type
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

  function submit() {
    if (props.disabled) {
      return
    }

    const data = {}
    fields.forEach((field, name) => {
      data[name] = field.getValue()
    })
    emit('submit', new UniFormSubmitEvent(data))
  }

  function reset() {
    if (props.disabled) {
      return
    }

    fields.forEach((field) => {
      field.reset && field.reset()
    })
    emit('reset', new UniFormResetEvent())
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