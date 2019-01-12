import {
  getLen
} from 'uni-shared'

function beforeValidate (params) {
  let isTabBar = false
  const pages = getCurrentPages()
  if (pages.length) {
    if (pages[pages.length - 1].$page.meta.isTabBar) {
      isTabBar = true
    }
  } else if (getApp().$children[0].hasTabBar) {
    isTabBar = true
  }
  if (!isTabBar) {
    return 'not TabBar page'
  }
}

const indexValidator = {
  type: Number,
  required: true,
  validator (index, params) {
    if (index >= __uniConfig.tabBar.list.length) {
      return 'tabbar item not found'
    }
  }
}

export const setTabBarItem = {
  beforeValidate,
  index: indexValidator,
  text: {
    type: String
  },
  iconPath: {
    type: String
  },
  selectedIconPath: {
    type: String
  }
}

export const setTabBarStyle = {
  beforeValidate,
  color: {
    type: String
  },
  selectedColor: {
    type: String
  },
  backgroundColor: {
    type: String
  },
  borderStyle: {
    type: String,
    validator (borderStyle, params) {
      if (borderStyle) {
        params.borderStyle = borderStyle === 'black' ? 'black' : 'white'
      }
    }
  }
}

export const hideTabBar = {
  beforeValidate,
  animation: {
    type: Boolean,
    default: false
  }
}

export const showTabBar = {
  beforeValidate,
  animation: {
    type: Boolean,
    default: false
  }
}

export const hideTabBarRedDot = {
  beforeValidate,
  index: indexValidator
}

export const showTabBarRedDot = {
  beforeValidate,
  index: indexValidator
}

export const removeTabBarBadge = {
  beforeValidate,
  index: indexValidator
}

export const setTabBarBadge = {
  beforeValidate,
  index: indexValidator,
  text: {
    type: String,
    required: true,
    validator (text, params) {
      if (getLen(text) >= 4) {
        params.text = '...'
      }
    }
  }
}
