// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
import { createFor } from 'vue'
import { defineSystemComponent } from '@dcloudio/uni-components'
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

const UNI_TABBAR_ICON_FONT = 'UniTabbarIconFont'

const _middleButton = {
  width: '50px',
  height: '50px',
  iconWidth: '24px',
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

// 功能开关保留为 JS 条件表达式，使项目发行时能裁剪关闭的分支及其组件依赖。
export default /*#__PURE__*/ defineSystemComponent({
  name: 'TabBar',
  setup() {
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

    return () => (
      <uni-tabbar class={'uni-tabbar-' + tabBar.position}>
        <div class="uni-tabbar" style={style.value}>
          <div class="uni-tabbar-border" style={borderStyle.value}></div>
          {createFor(
            () => visibleList.value,
            (item, index) => (
              <div
                class="uni-tabbar__item"
                style={getItemStyle(item.value)}
                onClick={($event) => onSwitchTab(item.value, index.value)}
              >
                {__UNI_FEATURE_TABBAR_MIDBUTTON__ && (
                  <div
                    class="uni-tabbar__mid"
                    v-if={isMidButton(item.value)}
                    style={getMidButtonStyle(item.value)}
                  >
                    {getIconPath(item.value, index.value) ? (
                      <img
                        style={{
                          width: getMidButton(item.value).iconWidth,
                          height: getMidButton(item.value).iconWidth,
                        }}
                        src={getRealPath(getIconPath(item.value, index.value))}
                      ></img>
                    ) : null}
                  </div>
                )}
                <div
                  class="uni-tabbar__bd"
                  style={{
                    height: tabBar.height,
                  }}
                >
                  {getIconfontText(item.value, index.value) ? (
                    <div
                      class={getIconClass(item.value)}
                      style={getIconStyle()}
                    >
                      {item.value.type !== 'midButton' ? (
                        <div
                          class="uni-tabbar__iconfont"
                          style={getIconfontStyle(item.value, index.value)}
                        >
                          {getIconfontText(item.value, index.value)}
                        </div>
                      ) : null}
                    </div>
                  ) : getIconPath(item.value, index.value) ? (
                    <div
                      class={getIconClass(item.value)}
                      style={getIconStyle()}
                    >
                      {item.value.type !== 'midButton' ? (
                        <img
                          src={getRealPath(
                            getIconPath(item.value, index.value)
                          )}
                        ></img>
                      ) : null}
                    </div>
                  ) : null}
                  {item.value.text ? (
                    <div
                      class="uni-tabbar__label"
                      style={getLabelStyle(item.value, index.value)}
                    >
                      {item.value.text}
                    </div>
                  ) : null}
                  {item.value.redDot ? (
                    <div
                      class={[
                        'uni-tabbar__reddot',
                        item.value.badge ? 'uni-tabbar__badge' : '',
                      ]}
                    >
                      {item.value.badge}
                    </div>
                  ) : null}
                </div>
              </div>
            ),
            (item, index) => (isRenderedMidButton(item) ? 'midButton' : index),
            8 /* IS_SINGLE_NODE：每项返回一个 div，沿用模板 v-for 的快速路径。 */
          )}
        </div>
        <div class="uni-placeholder" style={placeholderStyle.value}></div>
      </uni-tabbar>
    )
  },
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
  const internalMidButton = __UNI_FEATURE_TABBAR_MIDBUTTON__
    ? ref<UniApp.TabBarMidButtonOptions>(
        extend({ type: 'midButton' }, tabBar.midButton)
      )
    : undefined
  function setVisibleList() {
    let tempList: UniNamespace.TabBarItemOptions[] = []
    tempList = tabBar.list.filter((item) => item.visible !== false)

    if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && tabBar.midButton) {
      internalMidButton!.value = extend(
        {},
        _middleButton,
        internalMidButton!.value,
        tabBar.midButton
      )
      tempList = tempList.filter((item) => !isMidButton(item))

      if (tempList.length % 2 === 0) {
        tempList.splice(
          Math.floor(tempList.length / 2),
          0,
          internalMidButton!.value
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
    if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && type === 'midButton') {
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
  return __UNI_FEATURE_TABBAR_MIDBUTTON__ && isMidButton(item)
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

function getIconClass(item: UniApp.TabBarItemOptions) {
  return 'uni-tabbar__icon' + (item.text ? ' uni-tabbar__icon__diff' : '')
}
