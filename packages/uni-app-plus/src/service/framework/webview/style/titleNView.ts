import { isArray } from '@vue/shared'
import { BACKGROUND_COLOR } from '@dcloudio/uni-shared'
import { isColor } from './utils'
import { invokeHook } from '@dcloudio/uni-core'
export function initTitleNView(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  const { navigationBar } = routeMeta
  if (navigationBar.style === 'custom') {
    return false
  }
  let autoBackButton = true
  if (routeMeta.isQuit) {
    autoBackButton = false
  }
  const titleNView: PlusWebviewWebviewTitleNViewStyles = {
    autoBackButton,
  }
  Object.keys(navigationBar).forEach((name) => {
    const value = navigationBar[name as keyof UniApp.PageNavigationBar]
    if (name === 'backgroundColor') {
      titleNView.backgroundColor = isColor(value as string)
        ? (value as string)
        : BACKGROUND_COLOR
    } else if (name === 'titleImage' && value) {
      titleNView.tags = createTitleImageTags(value as string)
    } else if (name === 'buttons' && isArray(value)) {
      titleNView.buttons = (value as UniApp.PageNavigationBar['buttons'])!.map(
        (button, index) => {
          ;(button as any).onclick = createTitleNViewBtnClick(index)
          return button
        }
      )
    }
  })

  webviewStyle.titleNView = titleNView
}

function createTitleImageTags(titleImage: string) {
  return [
    {
      tag: 'img',
      src: titleImage,
      position: {
        left: 'auto',
        top: 'auto',
        width: 'auto',
        height: '26px',
      },
    },
  ]
}

function createTitleNViewBtnClick(index: number) {
  return function onClick(btn: UniApp.PageNavigationBarButton) {
    ;(btn as any).index = index
    invokeHook('onNavigationBarButtonTap', btn)
  }
}
