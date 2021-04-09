import { extend } from '@vue/shared'
import { getLen } from '@dcloudio/uni-shared'
import { getRealPath } from '@dcloudio/uni-platform'
import { getCurrentPageMeta } from '@dcloudio/uni-core'
import { removeLeadingSlash } from '@dcloudio/uni-shared'

import { ApiOptions, ApiProtocol } from '../type'

const IndexProtocol: ApiProtocol = {
  index: {
    type: Number,
    required: true,
  },
}

const IndexOptions: ApiOptions = {
  beforeInvoke() {
    const pageMeta = getCurrentPageMeta()
    if (pageMeta && !pageMeta.isTabBar) {
      return 'not TabBar page'
    }
  },
  formatArgs: {
    index(value) {
      if (!__uniConfig.tabBar!.list[value]) {
        return 'tabbar item not found'
      }
    },
  },
}

export const SetTabBarItemProtocol: ApiProtocol = extend(
  {
    text: {
      type: String,
    },
    iconPath: {
      type: String,
    },
    selectedIconPath: {
      type: String,
    },
    pagePath: {
      type: String,
    },
  },
  IndexProtocol
)

export const SetTabBarItemOptions: ApiOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: extend(
    {
      pagePath(value, params) {
        if (value) {
          params.pagePath = removeLeadingSlash(value)
        }
      },
    } as ApiOptions['formatArgs'],
    IndexOptions.formatArgs
  ),
}

export const SetTabBarStyleProtocol: ApiProtocol = {
  color: {
    type: String,
  },
  selectedColor: {
    type: String,
  },
  backgroundColor: {
    type: String,
  },
  backgroundImage: {
    type: String,
  },
  backgroundRepeat: {
    type: String,
  },
  borderStyle: {
    type: String,
  },
}
const GRADIENT_RE = /^(linear|radial)-gradient\(.+?\);?$/
export const SetTabBarStyleOptions: ApiOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: {
    backgroundImage(value, params) {
      if (value && !GRADIENT_RE.test(value)) {
        params.backgroundImage = getRealPath(value)
      }
    },
    borderStyle(value, params) {
      if (value) {
        params.borderStyle = value === 'white' ? 'white' : 'black'
      }
    },
  },
}
export const HideTabBarProtocol: ApiProtocol = {
  animation: {
    type: Boolean,
    default: false,
  },
}
export const ShowTabBarProtocol: ApiProtocol = HideTabBarProtocol

export const HideTabBarRedDotProtocol: ApiProtocol = IndexProtocol
export const HideTabBarRedDotOptions: ApiOptions = IndexOptions

export const ShowTabBarRedDotProtocol: ApiProtocol = IndexProtocol
export const ShowTabBarRedDotOptions: ApiOptions = IndexOptions

export const RemoveTabBarBadgeProtocol: ApiProtocol = IndexProtocol
export const RemoveTabBarBadgeOptions: ApiOptions = IndexOptions

export const SetTabBarBadgeProtocol: ApiProtocol = extend(
  {
    text: {
      type: String,
      required: true,
    },
  },
  IndexProtocol
)

export const SetTabBarBadgeOptions: ApiOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: extend(
    {
      text(value, params) {
        if (getLen(value) >= 4) {
          params.text = '...'
        }
      },
    } as ApiOptions['formatArgs'],
    IndexOptions.formatArgs
  ),
}
