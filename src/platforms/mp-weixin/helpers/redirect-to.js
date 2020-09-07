import {
  findExistsPageIndex
} from 'uni-helpers/index'

export default {
  name (fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack'
    }
    return 'redirectTo'
  },
  args (fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      const existsPageIndex = findExistsPageIndex(fromArgs.url)
      if (existsPageIndex !== -1) {
        const delta = getCurrentPages().length - 1 - existsPageIndex
        if (delta > 0) {
          fromArgs.delta = delta
        }
      }
    }
  }
}
