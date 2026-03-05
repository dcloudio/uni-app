<template>
  <text v-if="isStringSlot" @click="handleTap">
    <slot></slot>
  </text>
  <view v-else @click="handleTap">
    <slot></slot>
  </view>
</template>

<script lang="uts" setup>
  import { UniNavigatorElement } from './global.uts'

  type OpenType = 'navigate' | 'navigateBack' | 'redirect' | 'reLaunch' | 'switchTab'

  interface NavigatorProps {
    /**
     * 跳转方式
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    openType?: OpenType
    /**
     * 当前应用内的跳转链接
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    url?: string
    /**
     * 当 open-type="navigateTo" 或 open-type="navigateBack" 时有效，窗口的显示/关闭的动画类型。
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    animationType?: string
    /**
     * 当 open-type="navigateTo" 或 open-type="navigateBack" 时有效，窗口的显示/关闭动画的持续时间。
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    animationDuration?: number
    /**
     * 当 open-type 为 navigateBack 时有效，表示回退的层数
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    delta?: number
  }

  const props = withDefaults(defineProps<NavigatorProps>(), {
    openType: 'navigate',
    url: '',
    animationType: '',
    animationDuration: 300,
    delta: 1
  })

  defineOptions({
    name: 'navigator',
    // @ts-ignore
    rootElement: {
      class: UniNavigatorElement
    }
  })

  const slots = useSlots()
  const isStringSlot = slots['default']?.['returnType'] === 'string'

  const handleTap = () => {
    const url = props.url
    const openType = props.openType as OpenType
    switch (openType) {
      case 'navigate':
        uni.navigateTo({
          url: url,
          animationType: props.animationType || 'pop-in',
          animationDuration: props.animationDuration
        })
        break;
      case 'navigateBack':
        uni.navigateBack({
          delta: props.delta,
          animationType: props.animationType || 'pop-out',
          animationDuration: props.animationDuration
        })
        break;
      case 'redirect':
        uni.redirectTo({
          url: url
        })
        break;
      case 'reLaunch':
        uni.reLaunch({
          url: url
        });
        break;
      case 'switchTab':
        uni.switchTab({
          url: url
        });
        break;
      default:
        console.log('<navigator/> openType attribute invalid')
        break;
    }
  }
</script>
