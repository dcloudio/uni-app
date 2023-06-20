export default function createMediaQueryObserver () {
  const mediaQueryObserver = {}
  const {
    windowWidth,
    windowHeight
  } = __GLOBAL__.getSystemInfoSync()

  const orientation = windowWidth < windowHeight ? 'portrait' : 'landscape'

  mediaQueryObserver.observe = (options, callback) => {
    let matches = true
    for (const item in options) {
      const itemValue = item === 'orientation' ? options[item] : Number(options[item])
      if (options[item] !== '') {
        if (item === 'width') {
          if (itemValue === windowWidth) {
            matches = true
          } else {
            matches = false
            callback(matches)
            return matches
          }
        }
        if (item === 'minWidth') {
          if (windowWidth >= itemValue) {
            matches = true
          } else {
            matches = false
            callback(matches)
            return matches
          }
        }
        if (item === 'maxWidth') {
          if (windowWidth <= itemValue) {
            matches = true
          } else {
            matches = false
            callback(matches)
            return matches
          }
        }

        if (item === 'height') {
          if (itemValue === windowHeight) {
            matches = true
          } else {
            matches = false
            callback(matches)
            return matches
          }
        }
        if (item === 'minHeight') {
          if (windowHeight >= itemValue) {
            matches = true
          } else {
            matches = false
            callback(matches)
            return matches
          }
        }
        if (item === 'maxHeight') {
          if (windowHeight <= itemValue) {
            matches = true
          } else {
            matches = false
            callback(matches)
            return matches
          }
        }

        if (item === 'orientation') {
          if (options[item] === orientation) {
            matches = true
          } else {
            matches = false
            callback(matches)
            return matches
          }
        }
      }
    }
    callback(matches)

    return matches
  }

  mediaQueryObserver.disconnect = () => {
  }

  return mediaQueryObserver
}
