import {
  TABBAR_HEIGHT
} from '../constants'

import {
  getRealPath,
  isTabBarPage
} from '../api/util'

import safeArea from './safe-area'

const IMAGE_TOP = 7
const IMAGE_WIDTH = 24
const IMAGE_HEIGHT = 24
const TEXT_TOP = 36
const TEXT_SIZE = 12
const TEXT_NOICON_SIZE = 17
const TEXT_HEIGHT = 12
const IMAGE_ID = 'TABITEM_IMAGE_'
const TABBAR_VIEW_ID = 'TABBAR_VIEW_'

let view
let config
let winWidth
let itemWidth
let itemLength
let itemImageLeft
let itemRects = []
const itemIcons = []
const itemLayouts = []
const itemDot = []
const itemBadge = []
let itemClickCallback

let selected = 0
/**
 * tabbar显示状态
 */
let visible = true

const init = function () {
  const list = config.list
  itemLength = config.list.length

  calcItemLayout(list) // 计算选项卡布局

  initBitmaps(list) // 初始化选项卡图标

  initView()
}

let initView = function () {
  const viewStyles = {
    height: TABBAR_HEIGHT
  }
  if (config.position === 'top') {
    viewStyles.top = 0
  } else {
    viewStyles.bottom = 0
    viewStyles.height += safeArea.bottom
  }
  view = new plus.nativeObj.View(TABBAR_VIEW_ID, viewStyles, getDraws())

  view.interceptTouchEvent(true)

  view.addEventListener('click', (e) => {
    if (!__uniConfig.__ready__) { // 未 ready，不允许点击
      return
    }
    const x = e.clientX
    const y = e.clientY
    for (let i = 0; i < itemRects.length; i++) {
      if (isCross(x, y, itemRects[i])) {
        const draws = getSelectedDraws(i)
        const drawTab = !!draws.length
        itemClickCallback && itemClickCallback(config.list[i], i, drawTab)
        if (drawTab) {
          setTimeout(() => view.draw(draws))
        }
        break
      }
    }
  })
  plus.globalEvent.addEventListener('orientationchange', () => {
    calcItemLayout(config.list)
    if (config.position !== 'top') {
      let height = TABBAR_HEIGHT + safeArea.bottom
      view.setStyle({
        height: height
      })
      if (visible) {
        setWebviewPosition(height)
      }
    }
    view.draw(getDraws())
  })
  if (!visible) {
    view.hide()
  }
}

let isCross = function (x, y, rect) {
  if (x > rect.left && x < (rect.left + rect.width) && y > rect.top && y < (rect.top + rect.height)) {
    return true
  }
  return false
}

let initBitmaps = function (list) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.iconData) {
      const bitmap = new plus.nativeObj.Bitmap(IMAGE_ID + i)
      bitmap.loadBase64Data(item.iconData)
      const selectedBitmap = new plus.nativeObj.Bitmap(`${IMAGE_ID}SELECTED_${i}`)
      selectedBitmap.loadBase64Data(item.selectedIconData)
      itemIcons[i] = {
        icon: bitmap,
        selectedIcon: selectedBitmap
      }
    } else if (item.iconPath) {
      itemIcons[i] = {
        icon: item.iconPath,
        selectedIcon: item.selectedIconPath
      }
    } else {
      itemIcons[i] = {
        icon: false,
        selectedIcon: false
      }
    }
  }
}

let getDraws = function () {
  const backgroundColor = config.backgroundColor
  const borderHeight = Math.max(0.5, 1 / plus.screen.scale) // 高分屏最少0.5
  const borderTop = config.position === 'top' ? (TABBAR_HEIGHT - borderHeight) : 0
  const borderStyle = config.borderStyle === 'white' ? 'rgba(255,255,255,0.33)' : 'rgba(0,0,0,0.33)'

  const draws = [{
    id: `${TABBAR_VIEW_ID}BG`, // 背景色
    tag: 'rect',
    color: backgroundColor,
    position: {
      top: 0,
      left: 0,
      width: '100%',
      height: TABBAR_HEIGHT + safeArea.bottom
    }
  }, {
    id: `${TABBAR_VIEW_ID}BORDER`,
    tag: 'rect',
    color: borderStyle,
    position: {
      top: borderTop,
      left: 0,
      width: '100%',
      height: `${borderHeight}px`
    }
  }]

  for (let i = 0; i < itemLength; i++) {
    const item = config.list[i]
    if (i === selected) {
      drawTabItem(draws, i, item.text, config.selectedColor, itemIcons[i].selectedIcon)
    } else {
      drawTabItem(draws, i, item.text, config.color, itemIcons[i].icon)
    }
  }
  return draws
}

let getSelectedDraws = function (newSelected) {
  if (selected === newSelected) {
    return false
  }
  const draws = []
  const lastSelected = selected
  selected = newSelected
  drawTabItem(draws, lastSelected)
  drawTabItem(draws, selected)
  return draws
}
/**
 * 获取文字宽度（全角为1）
 * @param {*} text
 */
function getFontWidth (text) {
  // eslint-disable-next-line
  return text.length - (text.match(/[\u0000-\u00ff]/g) || []).length / 2
}
let calcItemLayout = function () {
  winWidth = plus.screen.resolutionWidth
  itemWidth = winWidth / itemLength
  itemImageLeft = (itemWidth - IMAGE_WIDTH) / 2
  itemRects = []
  let dotTop = 0
  let dotLeft = 0
  for (let i = 0; i < itemLength; i++) {
    itemRects.push({
      top: 0,
      left: i * itemWidth,
      width: itemWidth,
      height: TABBAR_HEIGHT
    })
  }

  for (let i = 0; i < itemLength; i++) {
    const item = config.list[i]
    let imgLeft = itemWidth * i + itemImageLeft
    if ((item.iconData || item.iconPath) && item.text) { // 图文
      itemLayouts[i] = {
        text: {
          top: TEXT_TOP,
          left: `${i * itemWidth}px`,
          width: `${itemWidth}px`,
          height: TEXT_HEIGHT
        },
        img: {
          top: IMAGE_TOP,
          left: `${imgLeft}px`,
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT
        }
      }
      dotTop = IMAGE_TOP
      dotLeft = imgLeft + IMAGE_WIDTH
    } else if (!(item.iconData || item.iconPath) && item.text) { // 仅文字
      let textLeft = i * itemWidth
      itemLayouts[i] = {
        text: {
          top: 0,
          left: `${textLeft}px`,
          width: `${itemWidth}px`,
          height: TABBAR_HEIGHT
        }
      }
      dotTop = (44 - TEXT_NOICON_SIZE) / 2
      dotLeft = textLeft + itemWidth * 0.5 + getFontWidth(item.text) * TEXT_NOICON_SIZE * 0.5
    } else if ((item.iconData || item.iconPath) && !item.text) { // 仅图片
      const diff = 10
      let imgTop = (TABBAR_HEIGHT - IMAGE_HEIGHT - diff) / 2
      let imgLeft = itemWidth * i + itemImageLeft - diff / 2
      itemLayouts[i] = {
        img: {
          top: `${imgTop}px`,
          left: `${imgLeft}px`,
          width: IMAGE_WIDTH + diff,
          height: IMAGE_HEIGHT + diff
        }
      }
      dotTop = imgTop
      dotLeft = imgLeft + IMAGE_WIDTH + diff
    }
    let height = itemBadge[i] ? 14 : 10
    let badge = itemBadge[i] || '0'
    let font = getFontWidth(badge) - 0.5
    font = font > 1 ? 1 : font
    let width = height + font * 12
    width = width < height ? height : width
    let itemLayout = itemLayouts[i]
    if (itemLayout) {
      itemLayout.doc = {
        top: dotTop,
        left: `${dotLeft - width * 0.382}px`,
        width: `${width}px`,
        height: `${height}px`
      }
      itemLayout.badge = {
        top: dotTop,
        left: `${dotLeft - width * 0.382}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    }
  }
}

let drawTabItem = function (draws, index) {
  const layout = itemLayouts[index]

  const item = config.list[index]

  let color = config.color
  let icon = itemIcons[index].icon
  let dot = itemDot[index]
  let badge = itemBadge[index] || ''

  if (index === selected) {
    color = config.selectedColor
    icon = itemIcons[index].selectedIcon
  }

  if (icon) {
    draws.push({
      id: `${TABBAR_VIEW_ID}ITEM_${index}_ICON`,
      tag: 'img',
      position: layout.img,
      src: icon
    })
  }
  if (item.text) {
    draws.push({
      id: `${TABBAR_VIEW_ID}ITEM_${index}_TEXT`,
      tag: 'font',
      position: layout.text,
      text: item.text,
      textStyles: {
        size: icon ? TEXT_SIZE : `${TEXT_NOICON_SIZE}px`,
        color
      }
    })
  }
  const hiddenPosition = {
    letf: 0,
    top: 0,
    width: 0,
    height: 0
  }
  // 绘制小红点（角标背景）
  draws.push({
    id: `${TABBAR_VIEW_ID}ITEM_${index}_DOT`,
    tag: 'rect',
    position: (dot || badge) ? layout.doc : hiddenPosition,
    rectStyles: {
      color: '#ff0000',
      radius: badge ? '7px' : '5px'
    }
  })
  // 绘制角标文本
  draws.push({
    id: `${TABBAR_VIEW_ID}ITEM_${index}_BADGE`,
    tag: 'font',
    position: badge ? layout.badge : hiddenPosition,
    text: badge || ' ',
    textStyles: {
      align: 'center',
      verticalAlign: 'middle',
      color: badge ? '#ffffff' : 'rgba(0,0,0,0)',
      overflow: 'ellipsis',
      size: '10px'
    }
  })
}
/**
 * {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [{
      "pagePath": "page/component/index.html",
      "iconData": "",
      "selectedIconData": "",
      "text": "组件"
    }, {
      "pagePath": "page/API/index.html",
      "iconData": "",
      "selectedIconData": "",
      "text": "接口"
    }],
    "position":"bottom"//bottom|top
  }
 */

/**
 * 设置角标
 * @param {string} type
 * @param {number} index
 * @param {string} text
 */
function setTabBarBadge (type, index, text) {
  if (type === 'none') {
    itemDot[index] = false
    itemBadge[index] = ''
  } else if (type === 'text') {
    itemBadge[index] = text
  } else if (type === 'redDot') {
    itemDot[index] = true
  }
  if (view) {
    calcItemLayout(config.list)
    view.draw(getDraws())
  }
}
/**
 * 动态设置 tabBar 某一项的内容
 */
function setTabBarItem (index, text, iconPath, selectedIconPath) {
  if (iconPath || selectedIconPath) {
    let itemIcon = itemIcons[index] = itemIcons[index] || {}
    if (iconPath) {
      itemIcon.icon = getRealPath(iconPath)
    }
    if (selectedIconPath) {
      itemIcon.selectedIcon = getRealPath(selectedIconPath)
    }
  }
  if (text) {
    config.list[index].text = text
  }
  view.draw(getDraws())
}
/**
 * 动态设置 tabBar 的整体样式
 * @param {Object} style 样式
 */
function setTabBarStyle (style) {
  for (const key in style) {
    config[key] = style[key]
  }
  view.draw(getDraws())
}
/**
 * 设置tab页底部或顶部距离
 * @param {*} value 距离
 */
function setWebviewPosition (value) {
  const position = config.position === 'top' ? 'top' : 'bottom'
  plus.webview.all().forEach(webview => {
    if (isTabBarPage(String(webview.__uniapp_route))) {
      webview.setStyle({
        [position]: value
      })
    }
  })
}
/**
 * 隐藏 tabBar
 * @param {boolean} animation 是否需要动画效果 暂未支持
 */
function hideTabBar (animation) {
  if (visible === false) {
    return
  }
  visible = false
  if (view) {
    view.hide()
    setWebviewPosition(0)
  }
}
/**
 * 显示 tabBar
 * @param {boolean} animation 是否需要动画效果 暂未支持
 */
function showTabBar (animation) {
  if (visible === true) {
    return
  }
  visible = true
  if (view) {
    view.show()
    setWebviewPosition(TABBAR_HEIGHT + safeArea.bottom)
  }
}

export default {
  init (options, clickCallback) {
    if (options && options.list.length) {
      selected = options.selected || 0
      config = options
      config.position = 'bottom' // 暂时强制使用bottom
      itemClickCallback = clickCallback
      init()
      return view
    }
  },
  switchTab (page) {
    if (itemLength) {
      for (let i = 0; i < itemLength; i++) {
        if (
          config.list[i].pagePath === page ||
          config.list[i].pagePath === `${page}.html`
        ) {
          const draws = getSelectedDraws(i)
          if (draws.length) {
            view.draw(draws)
          }
          return true
        }
      }
    }
    return false
  },
  setTabBarBadge,
  setTabBarItem,
  setTabBarStyle,
  hideTabBar,
  showTabBar,
  get visible () {
    return visible
  }
}
