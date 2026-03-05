<template>
  <text v-if="!hasDefaultSlot" class="uni-radio-view uni-radio-icon" :class="radioClasses" @click.stop="handleTap">
    {{ isChecked ? fontUnicode : '' }}
  </text>
  <view v-else class="uni-radio" @click.stop="handleTap">
    <text class="uni-radio-view uni-radio-icon" :class="radioClasses">{{ isChecked ? fontUnicode : '' }}</text>
    <text v-if="isStringSlot">
      <slot></slot>
    </text>
    <slot v-else></slot>
  </view>
</template>

<script lang="uts" setup>
  import { LABEL_KEY, RADIO_GROUP_KEY, buildPointerEvent } from '../common.uts'
  import { UniRadioElement } from './global.uts'
  import { LabelContext } from '../types.uts'

  interface InjectedRadioGroupContext {
    selectedValue: Ref<string>
    change: (val: string) => void
    setSelectedValue: (val: string | null) => void
  }

  interface RadioProps {
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
    value?: string;
    /**
     * 单选框图标的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    iconClass?: string.ClassString;
    /**
     * 单选框的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    radioClass?: string.ClassString;
    /**
     * 单选框选中的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    radioActiveClass?: string.ClassString;
  }

  const props = withDefaults(defineProps<RadioProps>(), {
    disabled: false,
    checked: false,
    value: '',
    iconClass: '',
    radioClass: '',
    radioActiveClass: ''
  })

  defineOptions({
    name: 'radio',
    // @ts-ignore
    rootElement: {
      class: UniRadioElement
    },
    externalClasses: ['icon-class', 'radio-class', 'radio-active-class'],
  })

  const attrs = useAttrs()
  const id = attrs.id

  const slots = useSlots()
  const isStringSlot = slots['default']?.['returnType'] === 'string'
  const hasDefaultSlot = slots['default'] != null

  const proxy = getCurrentInstance()?.proxy

  const isChecked = ref(false)
  const groupCtx = inject<InjectedRadioGroupContext | null>(RADIO_GROUP_KEY, null)
  const labelCtx = inject<LabelContext | null>(LABEL_KEY, null)

  // TODO 需编译器修复
  const fontUnicode = '\ueA08'

  const radioClasses = computed<string[]>(() => {
    if (props.disabled) {
      return ['uni-radio-disabled']
    }
    if (isChecked.value) {
      return ['uni-radio-active', props.radioActiveClass, props.iconClass]
    }
    return [props.radioClass, props.iconClass]
  })

  // Sync checked state: if in group, derive from group's selectedValue; else use own checked prop
  if (groupCtx != null) {
    watch(() => groupCtx!.selectedValue.value, (val) => {
      isChecked.value = (val === props.value)
    }, { immediate: true })

    // Also watch props.checked to support dynamic updates
    watch(() => props.checked, (value : boolean) => {
      if (value) {
        // When checked prop becomes true, update group's selectedValue
        groupCtx.setSelectedValue(props.value)
      } else {
        // When checked prop becomes false, clear selection if this radio was selected
        if (groupCtx.selectedValue.value === props.value) {
          groupCtx.setSelectedValue(null)
        }
      }
    })
  } else {
    watch(() => props.checked, (value : boolean) => {
      isChecked.value = value
    }, { immediate: true })
  }

  const handleTap = () => {
    if (props.disabled || isChecked.value) {
      return
    }
    if (groupCtx != null) {
      groupCtx.change(props.value)
    } else {
      // Standalone: just toggle to checked
      isChecked.value = true
    }
  }

  // If inside group and this radio is marked checked initially, set group's value
  onMounted(() => {
    if (groupCtx != null && props.checked) {
      // Only set if group has no selection yet
      if (groupCtx.selectedValue.value == null || groupCtx.selectedValue.value.length == 0) {
        groupCtx.setSelectedValue(props.value)
      }
    }
    // Register with label if present
    if (labelCtx != null) {
      labelCtx.register({
        id: id || props.value,
        activate: (event: UniPointerEvent) => {
          proxy?.$el?.dispatchEvent('click', buildPointerEvent(event))
        },
        getDisabled: () => props.disabled
      })
    }
  })

  onUnmounted(() => {
    if (labelCtx != null) {
      labelCtx.unregister(id || props.value)
    }
  })
</script>

<style>
  .uni-radio {
    flex-direction: row;
    align-items: center;
  }

  .uni-radio-disabled {
    background-color: #e1e1e1;
    border-color: #d1d1d1;
    color: #adadad;
  }
  
  .uni-radio-active {
    background-color: #007AFF;
    border-color: #007AFF;
  }

  .uni-radio-view {
    width: 24px;
    height: 24px;
    border: 1px solid #d1d1d1;
    background-color: #ffffff;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    /* #ifndef WEB */
    text-align: center;
    line-height: 24px; 
    /* #endif */
  }

  .uni-radio-icon {
    font-size: 16px;
    font-family: uni-icon;
    color: #ffffff;
  }
</style>