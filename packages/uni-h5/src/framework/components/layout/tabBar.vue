<template>
  <uni-tabbar :class="'uni-tabbar-' + tabBar.position">
    <div class="uni-tabbar" :style="style">
      <div class="uni-tabbar-border" :style="borderStyle" />
      <div
        v-for="(item, index) in visibleList"
        :key="isRenderedMidButton(item) ? 'midButton' : index"
        class="uni-tabbar__item"
        :style="getItemStyle(item)"
        @click="onSwitchTab(item, index)"
      >
        <div
          v-if="isRenderedMidButton(item)"
          class="uni-tabbar__mid"
          :style="getMidButtonStyle(item)"
        >
          <img
            v-if="getIconPath(item, index)"
            :style="{
              width: getMidButton(item).iconWidth,
              height: getMidButton(item).iconWidth,
            }"
            :src="getRealPath(getIconPath(item, index))"
          />
        </div>
        <div class="uni-tabbar__bd" :style="{ height: tabBar.height }">
          <div
            v-if="getIconfontText(item, index)"
            :class="getIconClass(item)"
            :style="getIconStyle()"
          >
            <div
              v-if="item.type !== 'midButton'"
              class="uni-tabbar__iconfont"
              :style="getIconfontStyle(item, index)"
            >
              {{ getIconfontText(item, index) }}
            </div>
          </div>
          <div
            v-else-if="getIconPath(item, index)"
            :class="getIconClass(item)"
            :style="getIconStyle()"
          >
            <img
              v-if="item.type !== 'midButton'"
              :src="getRealPath(getIconPath(item, index))"
            />
          </div>
          <div
            v-if="item.text"
            class="uni-tabbar__label"
            :style="getLabelStyle(item, index)"
          >
            {{ item.text }}
          </div>
          <div
            v-if="item.redDot"
            :class="[
              'uni-tabbar__reddot',
              item.badge ? 'uni-tabbar__badge' : '',
            ]"
          >
            {{ item.badge }}
          </div>
        </div>
      </div>
    </div>
    <div class="uni-placeholder" :style="placeholderStyle" />
  </uni-tabbar>
</template>

<script setup lang="ts">
import { type Ref, computed, onMounted, ref, watch, watchEffect } from 'vue'
import { extend, isString } from '@vue/shared'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { invokeHook, updatePageCssVar } from '@dcloudio/uni-core'
import {
  API_ON_TAB_BAR_MID_BUTTON_TAP,
  type OnTabBarMidButtonTap,
} from '@dcloudio/uni-api'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { getRealPath } from '../../../platform'
import { useTabBar } from '../../setup/state'
import { cssBackdropFilter } from '../../../service/api/base/canIUse'
import { loadFontFace } from '../../../service/api/ui/loadFontFace'
import { normalizeWindowBottom } from '../../../helpers/cssVar'

defineOptions({
  name: 'TabBar',
  __reserved: true,
  compatConfig: { MODE: 3 },
})

const hasMidButton = __UNI_FEATURE_TABBAR_MIDBUTTON__
const UNI_TABBAR_ICON_FONT = 'UniTabbarIconFont'

const _middleButton = {
  width: '50px',
  height: '50px',
  iconWidth: '24px',
}

const visibleList = ref<UniApp.TabBarItemOptions[]>([])
const tabBar = useTabBar()!
useVisibleList(tabBar, visibleList)
useTabBarCssVar(tabBar)
const onSwitchTab = useSwitchTab(useRoute(), tabBar, visibleList)
// 修改 borderStyle
const { style, borderStyle, placeholderStyle } = useTabBarStyle(tabBar)

onMounted(() => {
  if (tabBar.iconfontSrc) {
    loadFontFace({
      family: UNI_TABBAR_ICON_FONT,
      source: `url("${tabBar.iconfontSrc}")`,
    })
  }
})

function useTabBarCssVar(tabBar: UniApp.TabBarOptions) {
  watch(
    () => tabBar.shown,
    (value) => {
      updatePageCssVar({
        '--window-bottom': normalizeWindowBottom(
          value ? parseInt(tabBar.height!) : 0
        ),
      })
    }
  )
}

function useVisibleList(
  tabBar: UniApp.TabBarOptions,
  visibleList: Ref<UniApp.TabBarItemOptions[]>
) {
  const internalMidButton = ref<UniApp.TabBarMidButtonOptions>(
    extend({ type: 'midButton' }, tabBar.midButton)
  )
  function setVisibleList() {
    let tempList: UniNamespace.TabBarItemOptions[] = []
    tempList = tabBar.list.filter((item) => item.visible !== false)

    if (hasMidButton && tabBar.midButton) {
      internalMidButton.value = extend(
        {},
        _middleButton,
        internalMidButton.value,
        tabBar.midButton
      )
      tempList = tempList.filter((item) => !isMidButton(item))

      if (tempList.length % 2 === 0) {
        tempList.splice(
          Math.floor(tempList.length / 2),
          0,
          internalMidButton.value
        )
      }
    }

    visibleList.value = tempList
  }

  watchEffect(setVisibleList)
}

function useSwitchTab(
  route: RouteLocationNormalizedLoaded,
  tabBar: UniApp.TabBarOptions,
  visibleList: Ref<UniApp.TabBarItemOptions[]>
) {
  watchEffect(() => {
    const meta = route.meta
    if (meta.isTabBar) {
      const pagePath = meta.route
      const index = visibleList.value.findIndex(
        (item) => item.pagePath === pagePath
      )
      tabBar.selectedIndex = index
    }
  })
  return (tabBarItem: UniApp.TabBarItemOptions, index: number) => {
    const { type } = tabBarItem
    if (hasMidButton && type === 'midButton') {
      return UniServiceJSBridge.invokeOnCallback<OnTabBarMidButtonTap>(
        API_ON_TAB_BAR_MID_BUTTON_TAP
      )
    }
    const { pagePath, text } = tabBarItem
    let url = addLeadingSlash(pagePath)
    if (url === __uniRoutes[0].alias) {
      url = '/'
    }
    if (route.path !== url) {
      uni.switchTab({ from: 'tabBar', url, tabBarText: text } as any)
    } else {
      invokeHook('onTabItemTap', {
        index,
        text,
        pagePath,
      })
    }
  }
}

const DEFAULT_BG_COLOR = '#f7f7fa'

const BLUR_EFFECT_COLOR_DARK = 'rgb(0, 0, 0, 0.8)'
const BLUR_EFFECT_COLOR_LIGHT = 'rgb(250, 250, 250, 0.8)'
const BLUR_EFFECT_COLORS = {
  dark: BLUR_EFFECT_COLOR_DARK,
  light: BLUR_EFFECT_COLOR_LIGHT,
  extralight: BLUR_EFFECT_COLOR_LIGHT,
}

// 和微信保持一致
const BORDER_COLORS = {
  white: 'rgba(255, 255, 255, 0.33)',
  black: 'rgba(0, 0, 0, 0.33)',
}

/**
 * useTabBarStyle
 * @param tabBar
 * @returns
 */
function useTabBarStyle(tabBar: UniApp.TabBarOptions) {
  const style = computed(() => {
    let backgroundColor = tabBar.backgroundColor
    const blurEffect = tabBar.blurEffect
    if (!backgroundColor) {
      if (cssBackdropFilter && blurEffect && blurEffect !== 'none') {
        backgroundColor = BLUR_EFFECT_COLORS[blurEffect]
      }
    }
    return {
      backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
      backdropFilter: blurEffect !== 'none' ? 'blur(10px)' : blurEffect,
    }
  })
  const borderStyle = computed(() => {
    const { borderStyle, borderColor } = tabBar
    // borderColor > borderStyle
    if (borderColor && isString(borderColor)) {
      return {
        backgroundColor: borderColor,
      }
    }
    return {
      backgroundColor: BORDER_COLORS[borderStyle!] || BORDER_COLORS['black'],
    }
  })
  const placeholderStyle = computed(() => {
    return {
      height: tabBar.height!,
    }
  })
  return {
    style,
    borderStyle,
    placeholderStyle,
  }
}

function isMidButton(item: unknown): item is UniApp.TabBarMidButtonOptions {
  return (item as any).type === 'midButton'
}

function isRenderedMidButton(
  item: UniApp.TabBarItemOptions
): item is UniApp.TabBarMidButtonOptions {
  return hasMidButton && isMidButton(item)
}

function getMidButton(item: UniApp.TabBarItemOptions) {
  return item as UniApp.TabBarMidButtonOptions
}

function getItemStyle(item: UniApp.TabBarItemOptions) {
  if (!isRenderedMidButton(item)) {
    return
  }
  return {
    flex: '0 0 ' + item.width,
    position: 'relative',
  }
}

function getMidButtonStyle(item: UniApp.TabBarItemOptions) {
  const { width, height, backgroundImage } = getMidButton(item)
  return {
    width,
    height,
    backgroundImage: backgroundImage
      ? "url('" + getRealPath(backgroundImage) + "')"
      : 'none',
  }
}

function isSelected(index: number) {
  return tabBar.selectedIndex === index
}

function getTextColor(index: number) {
  return isSelected(index) ? tabBar.selectedColor : tabBar.color
}

function getIconPath(item: UniApp.TabBarItemOptions, index: number) {
  return (
    (isSelected(index)
      ? item.selectedIconPath || item.iconPath
      : item.iconPath) || ''
  )
}

function getIconfontText(item: UniApp.TabBarItemOptions, index: number) {
  if (!item.iconfont) {
    return
  }
  return isSelected(index)
    ? item.iconfont.selectedText || item.iconfont.text
    : item.iconfont.text
}

function getIconfontColor(item: UniApp.TabBarItemOptions, index: number) {
  if (!item.iconfont) {
    return
  }
  return isSelected(index)
    ? item.iconfont.selectedColor || item.iconfont.color
    : item.iconfont.color
}

function getIconClass(item: UniApp.TabBarItemOptions) {
  return 'uni-tabbar__icon' + (item.text ? ' uni-tabbar__icon__diff' : '')
}

function getIconStyle() {
  return { width: tabBar.iconWidth, height: tabBar.iconWidth }
}

function getIconfontStyle(item: UniApp.TabBarItemOptions, index: number) {
  return {
    fontSize: item.iconfont?.fontSize || tabBar.iconWidth,
    color: getIconfontColor(item, index) || BLUR_EFFECT_COLOR_DARK,
  }
}

function getLabelStyle(item: UniApp.TabBarItemOptions, index: number) {
  return {
    color: getTextColor(index),
    fontSize: tabBar.fontSize,
    lineHeight: !item.iconPath ? 1.8 : 'normal',
    marginTop: !item.iconPath ? 'inherit' : tabBar.spacing,
  }
}
</script>
