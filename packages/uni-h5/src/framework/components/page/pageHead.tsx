import { computed, defineComponent } from 'vue'
import { isArray } from '@vue/shared'
import { usePageMeta } from '../../plugin/provide'

export default defineComponent({
  name: 'PageHead',
  setup() {
    const pageMeta = usePageMeta()
    const navigationBar = pageMeta.navigationBar
    UniServiceJSBridge.emit('onNavigationBarChange', navigationBar.titleText)
    const { clazz, style } = usePageHead(navigationBar)
    return () => {
      // 单页面无需back按钮
      const backButtonJsx = __UNI_FEATURE_PAGES__
        ? createBackButtonJsx(navigationBar)
        : null
      const leftButtonsJsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__
        ? createButtonsJsx('left', navigationBar)
        : []
      return (
        <uni-page-head uni-page-head-type={navigationBar.type}>
          <div class={clazz.value} style={style.value}>
            <div class="uni-page-head-hd">
              {backButtonJsx}
              {...leftButtonsJsx}
            </div>
          </div>
        </uni-page-head>
      )
    }
  },
})

function createBackButtonJsx(navigationBar: UniApp.PageNavigationBar) {
  if (navigationBar.backButton) {
    return (
      <div class="uni-page-head-btn">
        <i style="fontSize:27px" class="uni-btn-icon">
          &#xe601;
        </i>
      </div>
    )
  }
}

function createButtonsJsx(
  float: 'left' | 'right',
  navigationBar: UniApp.PageNavigationBar
) {
  if (isArray(navigationBar.buttons)) {
    return navigationBar.buttons
      .filter((btn) => btn.float === float)
      .map((btn, index) => (
        <div key={index}>
          <i />
        </div>
      ))
  }
  return []
}

function usePageHead(navigationBar: UniApp.PageNavigationBar) {
  const clazz = computed(() => {
    const { type, titlePenetrate, shadowColorType } = navigationBar
    const clazz: Record<string, boolean> = {
      'uni-page-head': true,
      'uni-page-head-transparent': type === 'transparent',
      'uni-page-head-titlePenetrate': titlePenetrate === 'YES',
      'uni-page-head-shadow': !!shadowColorType,
    }
    if (shadowColorType) {
      clazz[`uni-page-head-shadow-${shadowColorType}`] = true
    }
    return clazz
  })
  const style = computed(() => {
    return {
      transitionDuration: navigationBar.duration,
      transitionTimingFunction: navigationBar.timingFunc,
      backgroundColor: navigationBar.backgroundColor,
      color: navigationBar.textStyle === 'black' ? '#000' : '#fff',
    }
  })
  return {
    clazz,
    style,
  }
}
