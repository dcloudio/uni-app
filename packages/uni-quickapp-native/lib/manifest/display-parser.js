const PLATFORMS = [
  'h5',
  'app-plus',
  'mp-weixin',
  'mp-qq',
  'mp-baidu',
  'mp-alipay',
  'mp-jd',
  'mp-xhs',
  'mp-toutiao',
  'quickapp-native'
]

const DISPLAY = {
  'navigationBarBackgroundColor': 'titleBarBackgroundColor',
  'navigationBarTextStyle': (style, val) => {
    if (val === 'black') {
      style.titleBarTextColor = '#000000'
      style.statusBarTextStyle = 'dark'
    } else {
      style.titleBarTextColor = '#ffffff'
      style.statusBarTextStyle = 'light'
    }
  },
  'navigationBarTitleText': 'titleBarText',
  'navigationStyle': (style, val) => {
    if (val === 'custom') {
      style.titleBar = false
    }
  }
}

function parseStyle(style = {}) {
  const ret = {}
  Object.keys(style).forEach(name => {
    if (!PLATFORMS.includes(name)) {
      const transform = DISPLAY[name]
      if (transform) {
        if (typeof transform === 'string') {
          ret[transform] = style[name]
        } else if (typeof transform === 'function') {
          transform(ret, style[name])
        }
      } else {
        ret[name] = style[name]
      }
    }
  })
  if (style['quickapp-native']) {
    Object.assign(ret, style['quickapp-native'])
  }
  return ret
}

module.exports = function parseDisplay(manifest, pages, globalStyle = {}) {
  const display = {
    pages: {}
  }
  // globalStyle
  Object.assign(display, parseStyle(globalStyle))

  pages.forEach(page => {
    const key = page.path.substr(0, page.path.lastIndexOf('/'))
    display.pages[key] = parseStyle(page.style)
  })
  manifest.display = display
}
