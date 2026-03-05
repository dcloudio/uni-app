<template>
  <view class="uni-padding-wrap">
    <page-head :title="title"></page-head>
    <button class="button" @click="setTabBarBadge">{{ !hasSetTabBarBadge ? '设置tab徽标' : '移除tab徽标' }}</button>
    <button class="button" @click="showTabBarRedDot">{{ !hasShownTabBarRedDot ?  '显示红点' : '移除红点'}}</button>
    <button class="button" @click="customStyle">{{ !hasCustomedStyle ? '自定义Tab样式' : '移除自定义样式'}}</button>
    <button class="button" @click="customItem">{{ !hasCustomedItem ? '自定义Tab信息' : '移除自定义信息' }}</button>
    <button class="button" @click="hideTabBar">{{ !hasHiddenTabBar ? '隐藏TabBar' : '显示TabBar' }}</button>
    <!-- #ifdef APP-ANDROID || APP-IOS || WEB || APP-HARMONY -->
    <button class="button" @click="hideTabBarItem">{{ !hasHiddenTabBarItem ? '隐藏接口Item' : '显示接口Item' }}</button>
    <!-- #endif -->
    <button class="button" @click="setTabBarTitle">{{ !hasSetLongTitle ? '自定义超长标题' : '移除自定义信息' }}</button>
    <view class="btn-area">
      <!-- <button class="button" type="primary" @click="navigateBack">关闭</button> -->
    </view>
  </view>
</template>

<script lang="uts" setup>
  const title = ref('tababr')
  const hasSetTabBarBadge = ref(false)
  const hasShownTabBarRedDot = ref(false)
  const hasCustomedStyle = ref(false)
  const hasCustomedItem = ref(false)
  const hasHiddenTabBar = ref(false)
  const hasHiddenTabBarItem = ref(false)
  const hasSetLongTitle = ref(false)

  onUnmounted(() => {
    if (hasSetTabBarBadge.value) {
      uni.removeTabBarBadge({
        index: 1
      })
    }
    if (hasShownTabBarRedDot.value) {
      uni.hideTabBarRedDot({
        index: 1
      })
    }
    if (hasHiddenTabBar.value) {
      uni.showTabBar()
    }
    if (hasCustomedStyle.value) {
      uni.setTabBarStyle({
        color: '#7A7E83',
        selectedColor: '#007AFF',
        backgroundColor: '#F8F8F8',
        borderStyle: 'black'
      })
    }

    if (hasCustomedItem.value) {
      let tabBarOptions = {
        index: 1,
        text: '接口',
        iconPath: '/static/api.png',
        selectedIconPath: '/static/apiHL.png'
      } as SetTabBarItemOptions
      uni.setTabBarItem(tabBarOptions)
    }

    if (hasHiddenTabBarItem.value || hasSetLongTitle.value) {
      let tabBarOptions = {
        visible: true,
        index: 1,
        text: '接口',
        iconPath: '/static/api.png',
        selectedIconPath: '/static/apiHL.png'
      } as SetTabBarItemOptions
      uni.setTabBarItem(tabBarOptions)
    }
  })

  const setTabBarTitle = () => {
    // #ifdef APP-HARMONY
    uni.showToast({
      title: "暂不支持"
    })
    // #endif

    // #ifndef APP-HARMONY
    let tabBarOptions = {
      visible: true,
      index: 1,
      text: '接口',
      iconPath: '/static/api.png',
      selectedIconPath: '/static/apiHL.png'
    } as SetTabBarItemOptions

    if (!hasSetLongTitle.value) {
      tabBarOptions.text = "超长标题内容超长标题内容超长标题内容超长标题测试";
      tabBarOptions.iconPath = "";
      tabBarOptions.selectedIconPath = "";
    } else {
      tabBarOptions.text = "接口";
      tabBarOptions.iconPath = "/static/api.png";
      tabBarOptions.selectedIconPath = "/static/apiHL.png";
    }
    uni.setTabBarItem(tabBarOptions)
    hasSetLongTitle.value = !hasSetLongTitle.value
    // #endif
  }

  const hideTabBarItem = () => {
    // #ifdef APP-HARMONY
    uni.showToast({
      title: "暂不支持"
    })
    // #endif

    // #ifndef APP-HARMONY
    let tabBarOptions = {
      visible: true,
      index: 1,
      text: '接口',
      iconPath: '/static/api.png',
      selectedIconPath: '/static/apiHL.png'
    } as SetTabBarItemOptions

    if (!hasHiddenTabBarItem.value) {
      tabBarOptions.visible = false;
    } else {
      tabBarOptions.visible = true;
    }
    uni.setTabBarItem(tabBarOptions)
    hasHiddenTabBarItem.value = !hasHiddenTabBarItem.value
    // #endif
  }
  const emit = defineEmits(['unmount'])

  const navigateBack = () => {
    emit('unmount')
  }

  const setTabBarBadge = () => {
    if (hasShownTabBarRedDot.value) {
      uni.hideTabBarRedDot({
        index: 1
      })
      hasShownTabBarRedDot.value = !hasShownTabBarRedDot.value
    }
    if (!hasSetTabBarBadge.value) {
      uni.setTabBarBadge({
        index: 1,
        text: '1'
      })
    } else {
      uni.removeTabBarBadge({
        index: 1
      })
    }
    hasSetTabBarBadge.value = !hasSetTabBarBadge.value
  }

  const showTabBarRedDot = () => {
    if (hasSetTabBarBadge.value) {
      uni.removeTabBarBadge({
        index: 1
      })
      hasSetTabBarBadge.value = !hasSetTabBarBadge.value
    }
    if (!hasShownTabBarRedDot.value) {
      uni.showTabBarRedDot({
        index: 1
      })
    } else {
      uni.hideTabBarRedDot({
        index: 1
      })
    }
    hasShownTabBarRedDot.value = !hasShownTabBarRedDot.value
  }

  const hideTabBar = () => {
    if (!hasHiddenTabBar.value) {
      uni.hideTabBar()
    } else {
      uni.showTabBar()
    }
    hasHiddenTabBar.value = !hasHiddenTabBar.value
  }

  const customStyle = () => {
    if (hasCustomedStyle.value) {
      uni.setTabBarStyle({
        color: '#7A7E83',
        selectedColor: '#007AFF',
        backgroundColor: '#F8F8F8',
        borderStyle: 'black',
        // 新增 borderColor，优先级高于 borderStyle
        // borderColor:'red'
      })
    } else {
      uni.setTabBarStyle({
        color: '#FFF',
        selectedColor: '#007AFF',
        backgroundColor: '#000000',
        borderStyle: 'black',
      })
    }
    hasCustomedStyle.value = !hasCustomedStyle.value
  }

  const customItem = () => {
    // #ifdef APP-HARMONY
    uni.showToast({
      title: "暂不支持"
    })
    // #endif

    // #ifndef APP-HARMONY
    let tabBarOptions = {
      index: 1,
      text: '接口',
      iconPath: '/static/api.png',
      selectedIconPath: '/static/apiHL.png'
    } as SetTabBarItemOptions
    if (hasCustomedItem.value) {
      uni.setTabBarItem(tabBarOptions)
    } else {
      tabBarOptions.text = 'API'
      uni.setTabBarItem(tabBarOptions)
    }
    hasCustomedItem.value = !hasCustomedItem.value
    // #endif
  }


</script>

<style>
  .button {
    margin-top: 15px;
    margin-left: 0;
    margin-right: 0;
  }

  .btn-area {
    padding-top: 15px;
  }
</style>
