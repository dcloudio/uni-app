<template>
  <!-- #ifdef WEB -->
  <!-- Web 端没有内置图标字体，选中状态使用内联 SVG 绘制对勾 -->
  <view
    v-if="!hasDefaultSlot"
    class="uni-radio-view uni-radio-icon"
    :class="classes(
      [disabled, 'uni-radio-disabled'],
      [!disabled && isChecked, 'uni-radio-active'],
      [!disabled && isChecked, radioActiveClass],
      [!disabled && !isChecked, radioClass],
      [!disabled, iconClass]
    )"
    :style="activeStyle"
    @click.stop="handleTap"
  >
    <svg v-if="isChecked" class="uni-radio-svg" viewBox="0 0 32 32">
      <path :d="iconPath" fill="currentColor"></path>
    </svg>
  </view>
  <!-- #endif -->
  <!-- #ifndef WEB -->
  <text
    v-if="!hasDefaultSlot"
    class="uni-radio-view uni-radio-icon"
    :class="classes(
      [disabled, 'uni-radio-disabled'],
      [!disabled && isChecked, 'uni-radio-active'],
      [!disabled && isChecked, radioActiveClass],
      [!disabled && !isChecked, radioClass],
      [!disabled, iconClass]
    )"
    :style="activeStyle"
    @click.stop="handleTap"
  >
    {{ isChecked ? fontUnicode : '' }}
  </text>
  <!-- #endif -->
  <view v-else class="uni-radio" @click.stop="handleTap">
    <!-- #ifdef WEB -->
    <view
      class="uni-radio-view uni-radio-icon"
      :class="classes(
        [disabled, 'uni-radio-disabled'],
        [!disabled && isChecked, 'uni-radio-active'],
        [!disabled && isChecked, radioActiveClass],
        [!disabled && !isChecked, radioClass],
        [!disabled, iconClass]
      )"
      :style="activeStyle"
    >
      <svg v-if="isChecked" class="uni-radio-svg" viewBox="0 0 32 32">
        <path :d="iconPath" fill="currentColor"></path>
      </svg>
    </view>
    <!-- #endif -->
    <!-- #ifndef WEB -->
    <text
      class="uni-radio-view uni-radio-icon"
      :class="classes(
        [disabled, 'uni-radio-disabled'],
        [!disabled && isChecked, 'uni-radio-active'],
        [!disabled && isChecked, radioActiveClass],
        [!disabled && !isChecked, radioClass],
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
  import { LABEL_KEY, RADIO_GROUP_KEY, dispatchLabelClick, classes, toStringOrEmpty } from '../common.ts'
  import { UniRadioElement } from './global.ts'
  import { LabelContext } from '../types.ts'

  interface InjectedRadioGroupContext {
    selectedValue: Ref<string | null>
    change: (val: string) => void
    setSelectedValue: (val: string | null) => void
  }

  interface RadioProps {
    /**
     * radio 的颜色，同css的color
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
     * 单选框图标的类名
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
     * 单选框的类名
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
    radioClass?: string.ClassString;
    /**
     * 单选框选中的类名
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
    radioActiveClass?: string.ClassString;
  }

  const props = withDefaults(defineProps<RadioProps>(), {
    color: '',
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
  const isStringSlot = slots['default']?.['returnType'] == 'string'
  const hasDefaultSlot = slots['default'] != null

  const proxy = getCurrentInstance()?.proxy

  const isChecked = ref(false)

  const activeStyle = computed(() => {
    if (isChecked.value && !props.disabled && props.color) {
      return {
        'background-color': props.color,
        'border-color': props.color
      }
    }
    return {}
  })
  const groupCtx = inject<InjectedRadioGroupContext | null>(RADIO_GROUP_KEY, null)
  const labelCtx = inject<LabelContext | null>(LABEL_KEY, null)

  // TODO 需编译器修复
  const fontUnicode = '\ueA08'

  // #ifdef WEB
  const iconPath = 'M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z'
  // #endif

  const setChecked = (checked : boolean, syncGroup : boolean) => {
    if (syncGroup && groupCtx != null) {
      const value = toStringOrEmpty(props.value)
      if (checked) {
        groupCtx.setSelectedValue(value)
      } else if (groupCtx.selectedValue.value == value) {
        groupCtx.setSelectedValue(null)
      }
      return
    }
    isChecked.value = checked
  }

  // Sync checked state: if in group, derive from group's selectedValue; else use own checked prop
  if (groupCtx != null) {
    watch(() => groupCtx!.selectedValue.value, (val) => {
      setChecked(val == toStringOrEmpty(props.value), false)
    }, { immediate: true })

    // Also watch props.checked to support dynamic updates
    watch(() => props.checked, (value : boolean) => {
      setChecked(value, true)
    })
  } else {
    watch(() => props.checked, (value : boolean) => {
      setChecked(value, false)
    }, { immediate: true })
  }

  const handleTap = () => {
    if (props.disabled || isChecked.value) {
      return
    }
    if (groupCtx != null) {
      groupCtx.change(toStringOrEmpty(props.value))
    } else {
      // Standalone: just toggle to checked
      setChecked(true, false)
    }
  }

  // If inside group and this radio is marked checked initially, set group's value
  onMounted(() => {
    if (groupCtx != null && props.checked) {
      // Only set if group has no selection yet
      if (groupCtx.selectedValue.value == null || groupCtx.selectedValue.value.length == 0) {
        groupCtx.setSelectedValue(toStringOrEmpty(props.value))
      }
    }
    // Register with label if present
    if (labelCtx != null) {
      labelCtx.register({
        id: id || toStringOrEmpty(props.value),
        activate: (event: UniPointerEvent) => {
          const element = proxy?.$el
          if (element != null) {
            dispatchLabelClick(element, event)
          }
        },
        getDisabled: () => props.disabled
      })
    }
  })

  onUnmounted(() => {
    if (labelCtx != null) {
      labelCtx.unregister(id || toStringOrEmpty(props.value))
    }
  })

  defineExpose({
    getRadioChecked : () => {
      return isChecked.value
    },
    setRadioChecked : (checked : boolean) => {
      setChecked(checked, true)
    }
  })
</script>

<style>
  .uni-radio {
    flex-direction: row;
    align-items: center;
  }

  .uni-radio-view {
    width: 24px;
    height: 24px;
    border: 1px solid #d1d1d1;
    background-color: #ffffff;
    border-radius: 50%;
    /* #ifdef WEB */
    /* Web 蒸汽模式下 text 的 display 默认为 block，需设为 flex 使图标居中。 */
    display: flex;
    /* #endif */
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

  /* #ifdef WEB */
  .uni-radio-svg {
    width: 14px;
    height: 14px;
  }
  /* #endif */

  .uni-radio-disabled {
    background-color: #e1e1e1;
    border-color: #d1d1d1;
    color: #adadad;
  }

  .uni-radio-active {
    background-color: #007AFF;
    border-color: #007AFF;
  }

  @media (prefers-color-scheme: dark) {
    .uni-radio-view,
    .uni-radio-disabled {
      background-color: #2c2c2c;
      border-color: #656565;
    }

    .uni-radio-disabled {
      border-color: #373737;
      color: #656565;
    }

    .uni-radio-active {
      background-color: #007AFF;
      border-color: #007AFF;
      color: #ffffff;
    }
  }
</style>
