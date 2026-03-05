<template>
  <text v-if="!hasDefaultSlot" class="uni-checkbox-view uni-checkbox-icon" :class="checkboxClasses" @click.stop="handleTap">
    {{ isChecked ? fontUnicode : '' }}
  </text>
  <view v-else class="uni-checkbox" @click.stop="handleTap">
    <text class="uni-checkbox-view uni-checkbox-icon" :class="checkboxClasses">{{ isChecked ? fontUnicode : '' }}</text>
    <text v-if="isStringSlot">
      <slot></slot>
    </text>
    <slot v-else></slot>
  </view>
</template>

<script lang="uts" setup>
  import { CHECKBOX_GROUP_KEY, FORM_KEY, LABEL_KEY, buildPointerEvent } from '../common.uts'
  import { UniCheckboxElement } from './global.uts' 
  import { LabelContext, CheckboxGroupContext } from '../types.uts'
  
  interface CheckboxProps {
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
     * 复选框选中图标的类名
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
     * 复选框未选中的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    checkboxClass?: string.ClassString;
    /**
     * 复选框选中的类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    checkboxActiveClass?: string.ClassString;
  }

  const props = withDefaults(defineProps<CheckboxProps>(), {
    disabled: false,
    checked: false,
    value: '',
    iconClass: '',
    checkboxClass: '',
    checkboxActiveClass: ''
  })

  defineOptions({
    name: 'checkbox',
    // @ts-ignore
    rootElement: {
      class: UniCheckboxElement
    },
    externalClasses: ['icon-class', 'checkbox-class', 'checkbox-active-class'],
  })

  const attrs = useAttrs()
  const id = attrs.id

  const slots = useSlots()
  const isStringSlot = slots['default']?.['returnType'] === 'string'
  const hasDefaultSlot = slots['default'] != null

  const proxy = getCurrentInstance()?.proxy

  const isChecked = ref(props.checked)

  // TODO 需编译器修复
  const fontUnicode = '\ueA08'

  const group = inject<CheckboxGroupContext | null>(CHECKBOX_GROUP_KEY, null)
  const labelCtx = inject<LabelContext | null>(LABEL_KEY, null)

  const checkboxClasses = computed<string[]>(() => {
    if (props.disabled) {
      return ['uni-checkbox-disabled']
    }
    return [isChecked.value ? props.checkboxActiveClass : props.checkboxClass, props.iconClass]
  })

  watch(() => props.checked, (value : boolean) => {
    if (isChecked.value === value) {
      return
    }
    isChecked.value = value
    if (group != null) {
      group.toggle(props.value, value, false)
    }
  })

  onMounted(() => {
    // If inside a group, prefer group's current state
    if (group != null) {
      const current = group.isChecked(props.value)
      // if group has no opinion yet, fall back to prop
      const initial = current ? true : props.checked
      isChecked.value = initial
      group.register(props.value, isChecked.value, (checked: boolean) => {
        if (isChecked.value !== checked) {
          isChecked.value = checked
        }
      })
    }
    // Register with enclosing label if any
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
    if (group != null) {
      group.unregister(props.value)
    }
    if (labelCtx != null) {
      labelCtx.unregister(id || props.value)
    }
  })

  const handleTap = () => {
    if (props.disabled) {
      return
    }
    isChecked.value = !isChecked.value
    if (group != null) {
      group.toggle(props.value, isChecked.value, true)
    }
  }
</script>

<style>
  .uni-checkbox {
    flex-direction: row;
    align-items: center;
  }

  .uni-checkbox-disabled {
    background-color: #e1e1e1;
    border-color: #d1d1d1;
    color: #adadad;
  }

  .uni-checkbox-view {
    width: 22px;
    height: 22px;
    border: 1px solid #d1d1d1;
    background-color: #ffffff;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    /* #ifndef WEB */
    text-align: center;
    line-height: 22px; 
    /* #endif */
  }

  .uni-checkbox-icon {
    font-size: 16px;
    color: #007aff;
    font-family: uni-icon;
  }
</style>