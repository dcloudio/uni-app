<template>
  <view class="uni-switch" :class="switchClasses" @click.stop="handleTap">
    <view class="uni-switch-thumb" :class="thumbClasses"></view>
  </view>
</template>

<script lang="uts" setup>
  import { FORM_KEY, LABEL_KEY, buildPointerEvent } from '../common.uts'
  import { UniSwitchElement } from './global.uts'
  import { FormContext, LabelContext } from '../types.uts'

  interface SwitchProps {
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
    disabled?: boolean;
    /**
     * 当前是否选中，可用来设置默认选中
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    checked?: boolean;
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
     * 开关选择器滑块的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    thumbClass?: string.ClassString;
    /**
     * 开关选择器滑块选中的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    thumbActiveClass?: string.ClassString;
    /**
     * 开关选择器选中的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */ 
    switchActiveClass?: string.ClassString;
  }

  const props = withDefaults(defineProps<SwitchProps>(), {
    disabled: false,
    checked: false,
    name: '',
    thumbClass: '',
    thumbActiveClass: '',
    switchActiveClass: ''
  })

  defineOptions({
    name: 'switch',
    // @ts-ignore
    rootElement: {
      class: UniSwitchElement
    },
    externalClasses: ['thumb-class', 'thumb-active-class', 'switch-active-class']
  })

  const attrs = useAttrs()
  const id = attrs.id

  const proxy = getCurrentInstance()?.proxy

  type UniSwitchChangeEventDetail = {
    value : boolean
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

  class UniSwitchChangeEvent extends UniCustomEvent<UniSwitchChangeEventDetail> {
    constructor(value : boolean) {
      super('change', { value } as UniSwitchChangeEventDetail)
    }
  }

  const emit = defineEmits<{
    change : [event: UniSwitchChangeEvent]
  }>()

  const formCtx = inject<FormContext | null>(FORM_KEY, null)
  const labelCtx = inject<LabelContext | null>(LABEL_KEY, null)

  const isChecked = ref(props.checked)
  const initialChecked = ref(false)
  const enableTransition = ref(false)

  const thumbClasses = computed<string[]>(() => {
    const classes: string[] = []
    if (enableTransition.value) {
      classes.push('thumb-transition-enabled')
    }
    if (isChecked.value) {
      classes.push('uni-switch-active-thumb', props.thumbActiveClass)
    } else {
      classes.push(props.thumbClass)
    }
    return classes
  })
  const switchClasses = computed<string[]>(() => {
    const classes: string[] = []
    if (enableTransition.value) {
      classes.push('transition-enabled')
    }
    if (props.disabled) {
      classes.push('uni-switch-disabled')
    }
    if (isChecked.value) {
      classes.push('uni-switch-active', props.switchActiveClass)
    }
    return classes
  })

  watch(() => props.checked, (value : boolean) => {
    isChecked.value = value
  })

  onMounted(() => {
    initialChecked.value = props.checked
    // register with form if available
    if (formCtx && props.name) {
      formCtx.registerField({
        name: props.name,
        getValue: () => isChecked.value,
        reset: () => { isChecked.value = initialChecked.value }
      })
    }
    // register with label if available
    if (labelCtx != null) {
      labelCtx.register({
        id: id || props.name,
        activate: (event: UniPointerEvent) => {
          proxy?.$el?.dispatchEvent('click', buildPointerEvent(event))
        },
        getDisabled: () => props.disabled
      })
    }

    enableTransition.value = true
  })

  onUnmounted(() => {
    if (formCtx && props.name) {
      formCtx.unregisterField(props.name)
    }
    if (labelCtx != null) {
      labelCtx.unregister(id || props.name)
    }
  })

  const handleTap = () => {
    if (props.disabled) {
      return
    }
    isChecked.value = !isChecked.value
    emit('change', new UniSwitchChangeEvent(isChecked.value))
  }
</script>

<style>
  .uni-switch {
    width: 52px;
    height: 32px;
    border: 2px solid #e9e9ea;
    border-radius: 16px;
    background-color: #e9e9ea;
  }

  .uni-switch.transition-enabled {
    transition-duration: 0.1s;
    transition-property: background-color;
  }

  .uni-switch-disabled {
    opacity: 0.7;
  }

  .uni-switch-active {
    background-color: #007aff;
    border-color: #007aff;
  }

  .uni-switch-thumb {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transform: translate(0);
    background-color: #ffffff;
  }

  .uni-switch-thumb.thumb-transition-enabled {
    transition-duration: 0.15s;
    transition-property: transform;
  }

  .uni-switch-active-thumb {
    transform: translateX(20px);
  }
</style>