import {
  getLen
} from 'uni-shared'

const indexValidator = {
  type: Number,
  required: true
}

export const setTabBarItem = {
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
  animation: {
    type: Boolean,
    default: false
  }
}

export const showTabBar = {
  animation: {
    type: Boolean,
    default: false
  }
}

export const hideTabBarRedDot = {
  index: indexValidator
}

export const showTabBarRedDot = {
  index: indexValidator
}

export const removeTabBarBadge = {
  index: indexValidator
}

export const setTabBarBadge = {
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
