import { computed, defineComponent } from 'vue'
import { isArray } from '@vue/shared'
import { usePageMeta } from '../../plugin/provide'

const ICON_FONTS = {
  none: '',
  forward: '&#xe600;',
  back: '&#xe601;',
  share: '&#xe602;',
  favorite: '&#xe604;',
  home: '&#xe605;',
  menu: '&#xe606;',
  close: '&#xe650;',
}

export default /*#__PURE__*/ defineComponent({
  name: 'PageHead',
  setup() {
    const pageMeta = usePageMeta()
    const navigationBar = pageMeta.navigationBar
    UniServiceJSBridge.emit('onNavigationBarChange', navigationBar.titleText)
    const { clazz, style } = usePageHead(navigationBar)
    const buttons = (__UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ &&
      userPageHeadButtons(navigationBar)) as PageHeadButtons
    return () => {
      // 单页面无需back按钮
      const backButtonJsx = __UNI_FEATURE_PAGES__
        ? createBackButtonJsx(navigationBar)
        : null
      const leftButtonsJsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__
        ? createButtonsJsx(buttons.left)
        : []
      const rightButtonsJsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__
        ? createButtonsJsx(buttons.right)
        : []
      return (
        <uni-page-head uni-page-head-type={navigationBar.type}>
          <div class={clazz.value} style={style.value}>
            <div class="uni-page-head-hd">
              {backButtonJsx}
              {...leftButtonsJsx}
              {...rightButtonsJsx}
            </div>
            <div class="uni-page-head-bd"></div>
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

function createButtonsJsx(btns: PageHeadButton[]) {
  return btns.map(
    ({ btnClass, btnStyle, btnText, badgeText, iconStyle }, index) => {
      return (
        <div
          key={index}
          class={btnClass}
          style={btnStyle}
          badge-text={badgeText}
        >
          <i class="uni-btn-icon" style={iconStyle} v-html={btnText} />
        </div>
      )
    }
  )
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

interface PageHeadButton {
  btnClass: UniApp.ClassObj
  btnStyle: UniApp.StyleObj
  btnText: string
  badgeText?: string
  iconStyle: UniApp.StyleObj
}

interface PageHeadButtons {
  left: PageHeadButton[]
  right: PageHeadButton[]
}

function userPageHeadButtons(navigationBar: UniApp.PageNavigationBar) {
  const left: PageHeadButton[] = []
  const right: PageHeadButton[] = []
  const { buttons } = navigationBar
  if (!isArray(buttons)) {
    return {
      left,
      right,
    }
  }
  const { type } = navigationBar
  const isTransparent = type === 'transparent'
  buttons.forEach((btn) => {
    const pageHeadBtn = usePageHeadButton(btn, isTransparent)
    if (btn.float === 'left') {
      left.push(pageHeadBtn)
    } else {
      right.push(pageHeadBtn)
    }
  })
}

function usePageHeadButton(
  btn: UniApp.PageNavigationBarButton,
  isTransparent: boolean
) {
  return {
    btnClass: {
      // 类似这样的大量重复的字符串，会在gzip时压缩大小，无需在代码层考虑优化相同字符串
      'uni-page-head-btn': true,
      'uni-page-head-btn-red-dot': !!(btn.redDot || btn.badgeText),
      'uni-page-head-btn-select': !!btn.select,
    },
    btnStyle: {
      backgroundColor: isTransparent ? btn.background : 'transparent',
      width: btn.width,
    },
    btnText:
      btn.fontSrc && btn.fontFamily
        ? btn.text.replace('\\u', '&#x')
        : ICON_FONTS[btn.type] || btn.text,
    badgeText: btn.badgeText,
    iconStyle: {
      color: btn.color,
      fontSize: btn.fontSize,
      fontWeight: btn.fontWeight,
      fontFamily: btn.fontFamily,
    },
  }
}
