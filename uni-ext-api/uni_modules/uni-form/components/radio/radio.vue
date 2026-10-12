<template>
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
  <view v-else class="uni-radio" @click.stop="handleTap">
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
    <text v-if="isStringSlot">
      <slot></slot>
    </text>
    <slot v-else></slot>
  </view>
</template>

<script lang="uts" setup>
  import { LABEL_KEY, RADIO_GROUP_KEY, buildPointerEvent, classes, toStringOrEmpty } from '../common.uts'
  import { UniRadioElement } from './global.uts'
  import { LabelContext } from '../types.uts'

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
           "unixVaporVer": "5.33"
         },
         "android": {
           "unixVaporVer": "5.33"
         },
         "harmony": {
           "unixVaporVer": "5.33"
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
          proxy?.$el?.dispatchEvent('click', buildPointerEvent(event))
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
