import {
  computed,
  createBlock,
  //   createCommentVNode,
  //   createVNode,
  defineComponent,
  openBlock,
  //   renderSlot,
  //   SetupContext,
  //   withCtx,
} from 'vue'

import { usePageMeta } from '../../plugin/provide'

export default defineComponent({
  name: 'PageHead',
  setup() {
    const pageMeta = usePageMeta()
    const navigationBar = pageMeta.navigationBar
    UniServiceJSBridge.emit('onNavigationBarChange', navigationBar.titleText)
    const { clazz, style } = usePageHead(navigationBar)
    const backButtonJsx = createBackButtonJsx(navigationBar)
    return () => (
      <uni-page-head uni-page-head-type={navigationBar.type}>
        <div class={clazz.value} style={style.value}>
          <div class="uni-page-head-hd">{backButtonJsx}</div>
        </div>
      </uni-page-head>
    )
  },
})

function createBackButtonJsx(navigationBar: UniApp.PageNavigationBar) {
  if (navigationBar.backButton) {
    return (
      <div class="uni-page-head-btn">
        <i style="{color:color,fontSize:'27px'}" class="uni-btn-icon">
          &#xe601;
        </i>
      </div>
    )
  }
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
