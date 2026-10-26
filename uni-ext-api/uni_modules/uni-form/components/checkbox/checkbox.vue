<template>
  <!-- #ifdef WEB -->
  <!-- Web 端没有内置图标字体，选中状态使用内联 SVG 绘制对勾 -->
  <view
    v-if="!hasDefaultSlot"
    class="uni-checkbox-view uni-checkbox-icon"
    :class="classes(
      [disabled, 'uni-checkbox-disabled'],
      [!disabled && isChecked, checkboxActiveClass],
      [!disabled && !isChecked, checkboxClass],
      [!disabled, iconClass]
    )"
    :style="activeStyle"
    @click.stop="handleTap"
  >
    <svg v-if="isChecked" class="uni-checkbox-svg" viewBox="0 0 32 32">
      <path :d="iconPath" :fill="iconColor"></path>
    </svg>
  </view>
  <!-- #endif -->
  <!-- #ifndef WEB -->
  <text
    v-if="!hasDefaultSlot"
    class="uni-checkbox-view uni-checkbox-icon"
    :class="classes(
      [disabled, 'uni-checkbox-disabled'],
      [!disabled && isChecked, checkboxActiveClass],
      [!disabled && !isChecked, checkboxClass],
      [!disabled, iconClass]
    )"
    :style="activeStyle"
    @click.stop="handleTap"
  >
    {{ isChecked ? fontUnicode : '' }}
  </text>
  <!-- #endif -->
  <view v-else class="uni-checkbox" @click.stop="handleTap">
    <!-- #ifdef WEB -->
    <view
      class="uni-checkbox-view uni-checkbox-icon"
      :class="classes(
        [disabled, 'uni-checkbox-disabled'],
        [!disabled && isChecked, checkboxActiveClass],
        [!disabled && !isChecked, checkboxClass],
        [!disabled, iconClass]
      )"
      :style="activeStyle"
    >
      <svg v-if="isChecked" class="uni-checkbox-svg" viewBox="0 0 32 32">
        <path :d="iconPath" :fill="iconColor"></path>
      </svg>
    </view>
    <!-- #endif -->
    <!-- #ifndef WEB -->
    <text
      class="uni-checkbox-view uni-checkbox-icon"
      :class="classes(
        [disabled, 'uni-checkbox-disabled'],
        [!disabled && isChecked, checkboxActiveClass],
        [!disabled && !isChecked, checkboxClass],
        [!disabled, iconClass]
      )"
      :style="activeStyle"
    >{{ isChecked ? fontUnicode : '' }}</text>
    <!-- #endif -->
    <text v-if="isStringSlot">
      <slot></slot>
    </text>
    <slot v-else></slot>
  </view>
</template>

<script lang="ts" setup>
  import { CHECKBOX_GROUP_KEY, FORM_KEY, LABEL_KEY, dispatchLabelClick, registerLabelTarget, classes, toStringOrEmpty } from '../common.ts'
  import { UniCheckboxElement } from './global.ts'
  import { ActivatableChild, LabelContext, CheckboxGroupContext } from '../types.ts'

  interface CheckboxProps {
    /**
     * checkbox 的颜色，同css的color
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.34"
         },
         "android": {
           "unixVaporVer": "5.34"
         },
         "harmony": {
           "unixVaporVer": "5.34"
         }
       }
     }
     */
    color?: string;
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
    disabled?: boolean;
    /**
     * 当前是否选中，可用来设置默认选中
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
    checked?: boolean;
    /**
     * 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交
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
    value?: string;
    /**
     * 复选框选中图标的类名
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
       },
       "web": {
         "uniVer": "x",
         "unixVer": "x"
       },
       "mp": {
         "weixin": {
           "hostVer": "x",
           "uniVer": "x",
           "unixVer": "x"
         },
         "alipay": {
           "hostVer": "x",
           "uniVer": "x",
           "unixVer": "x"
         }
       }
     }
     */
    iconClass?: string.ClassString;
    /**
     * 复选框未选中的类名
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
       },
       "web": {
         "uniVer": "x",
         "unixVer": "x"
       },
       "mp": {
         "weixin": {
           "hostVer": "x",
           "uniVer": "x",
           "unixVer": "x"
         },
         "alipay": {
           "hostVer": "x",
           "uniVer": "x",
           "unixVer": "x"
         }
       }
     }
     */
    checkboxClass?: string.ClassString;
    /**
     * 复选框选中的类名
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
       },
       "web": {
         "uniVer": "x",
         "unixVer": "x"
       },
       "mp": {
         "weixin": {
           "hostVer": "x",
           "uniVer": "x",
           "unixVer": "x"
         },
         "alipay": {
           "hostVer": "x",
           "uniVer": "x",
           "unixVer": "x"
         }
       }
     }
     */
    checkboxActiveClass?: string.ClassString;
  }

  const props = withDefaults(defineProps<CheckboxProps>(), {
    color: '',
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
  const isStringSlot = slots['default']?.['returnType'] == 'string'
  const hasDefaultSlot = slots['default'] != null

  const proxy = getCurrentInstance()?.proxy

  const isChecked = ref(props.checked)

  const activeStyle = computed(() => {
    if (isChecked.value && !props.disabled && props.color) {
      return { color: props.color }
    }
    return {}
  })

  // TODO 需编译器修复
  const fontUnicode = '\ueA08'

  // #ifdef WEB
  const iconPath = 'M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z'

  const iconColor = computed(() : string => {
    if (props.disabled) {
      return 'currentColor'
    }
    return props.color != '' ? props.color : '#007aff'
  })
  // #endif

  const group = inject<CheckboxGroupContext | null>(CHECKBOX_GROUP_KEY, null)
  const labelCtx = inject<LabelContext | null>(LABEL_KEY, null)
  let unregisterLabelTarget: (() => void) | null = null

  const setChecked = (checked : boolean, syncGroup : boolean) => {
    if (isChecked.value == checked) {
      return
    }
    isChecked.value = checked
    if (syncGroup && group != null) {
      group.toggle(toStringOrEmpty(props.value), checked, false)
    }
  }

  watch(() => props.checked, (value : boolean) => {
    setChecked(value, true)
  })

  onMounted(() => {
    // If inside a group, prefer group's current state
    if (group != null) {
      const value = toStringOrEmpty(props.value)
      const current = group.isChecked(value)
      // if group has no opinion yet, fall back to prop
      const initial = current ? true : props.checked
      isChecked.value = initial
      group.register(value, isChecked.value, (checked: boolean) => {
        setChecked(checked, false)
      })
    }
    // Register with enclosing label if any
    const target: ActivatableChild = {
        id: id || toStringOrEmpty(props.value),
        activate: (event: UniPointerEvent) => {
          const element = proxy?.$el
          if (element != null) {
            dispatchLabelClick(element, event)
          }
        },
        getDisabled: () => props.disabled
    }
    if (labelCtx != null) {
      labelCtx.register(target)
    }
    if (id != null && id.length > 0) {
      unregisterLabelTarget = registerLabelTarget(id, target)
    }
  })

  onUnmounted(() => {
    if (group != null) {
      group.unregister(toStringOrEmpty(props.value))
    }
    if (labelCtx != null) {
      labelCtx.unregister(id || toStringOrEmpty(props.value))
    }
    unregisterLabelTarget?.()
    unregisterLabelTarget = null
  })

  const handleTap = () => {
    if (props.disabled) {
      return
    }
    isChecked.value = !isChecked.value
    if (group != null) {
      group.toggle(toStringOrEmpty(props.value), isChecked.value, true)
    }
  }

  defineExpose({
    getCheckboxChecked : () => {
      return isChecked.value
    },
    setCheckboxChecked : (checked : boolean) => {
      setChecked(checked, true)
    }
  })
</script>

<style>
  .uni-checkbox {
    flex-direction: row;
    align-items: center;
  }

  .uni-checkbox-view {
    width: 22px;
    height: 22px;
    border: 1px solid #d1d1d1;
    background-color: #ffffff;
    border-radius: 3px;
    /* #ifdef WEB */
    /* Web 蒸汽模式下 text 的 display 默认为 block，需设为 flex 使图标居中。 */
    display: flex;
    /* #endif */
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

  /* #ifdef WEB */
  .uni-checkbox-svg {
    width: 16px;
    height: 16px;
  }
  /* #endif */

  .uni-checkbox-disabled {
    background-color: #e1e1e1;
    border-color: #d1d1d1;
    color: #adadad;
  }

  @media (prefers-color-scheme: dark) {
    .uni-checkbox-view,
    .uni-checkbox-disabled {
      background-color: #2c2c2c;
      border-color: #656565;
    }

    .uni-checkbox-disabled {
      border-color: #373737;
      color: #656565;
    }
  }
</style>
