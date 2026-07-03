import { API_SET_KEEP_SCREEN_ON, defineAsyncApi } from '@dcloudio/uni-api'
import type { API_TYPE_SET_KEEP_SCREEN_ON } from '@dcloudio/uni-api'

type WakeLockManager = {
  request: (type: 'screen') => Promise<WakeLockSentinel>
}

type NavigatorWithWakeLock = {
  wakeLock?: WakeLockManager | null
}

let keepScreenOn = false
let wakeLockSentinel: WakeLockSentinel | null = null
let wakeLockRequest: Promise<WakeLockSentinel> | null = null
let visibilityChangeListenerAdded = false

function getWakeLockManager(): WakeLockManager | null {
  const currentNavigator = navigator as NavigatorWithWakeLock
  if (currentNavigator.wakeLock != null) {
    return currentNavigator.wakeLock
  }
  return null
}

function getUnsupportedMessage() {
  return `method 'uni.${API_SET_KEEP_SCREEN_ON}' not supported`
}

function getErrorMessage(error: unknown) {
  return error == null ? undefined : `${error}`
}

function onWakeLockRelease(event: Event) {
  const sentinel = event.target as WakeLockSentinel | null
  if (sentinel) {
    sentinel.removeEventListener('release', onWakeLockRelease)
  }
  if (wakeLockSentinel === sentinel) {
    wakeLockSentinel = null
  }
}

function requestWakeLock() {
  const wakeLockManager = getWakeLockManager()
  if (wakeLockManager == null) {
    return Promise.reject(getUnsupportedMessage())
  }
  if (wakeLockSentinel && !wakeLockSentinel.released) {
    return Promise.resolve(wakeLockSentinel)
  }
  if (wakeLockRequest) {
    return wakeLockRequest
  }
  wakeLockRequest = wakeLockManager
    .request('screen')
    .then((sentinel) => {
      wakeLockSentinel = sentinel
      sentinel.addEventListener('release', onWakeLockRelease)
      return sentinel
    })
    .finally(() => {
      wakeLockRequest = null
    })
  return wakeLockRequest
}

async function releaseWakeLock() {
  if (wakeLockRequest) {
    await wakeLockRequest.catch(() => null)
  }
  const sentinel = wakeLockSentinel
  wakeLockSentinel = null
  if (sentinel == null) {
    return
  }
  sentinel.removeEventListener('release', onWakeLockRelease)
  if (!sentinel.released) {
    await sentinel.release()
  }
}

function onVisibilityChange() {
  if (document.visibilityState === 'visible' && keepScreenOn) {
    requestWakeLock().catch(() => {
      // The browser may deny wake lock after visibility changes.
    })
  }
}

function addVisibilityChangeListener() {
  if (!visibilityChangeListenerAdded) {
    document.addEventListener('visibilitychange', onVisibilityChange)
    visibilityChangeListenerAdded = true
  }
}

function removeVisibilityChangeListener() {
  if (visibilityChangeListenerAdded) {
    document.removeEventListener('visibilitychange', onVisibilityChange)
    visibilityChangeListenerAdded = false
  }
}

export const setKeepScreenOn = defineAsyncApi<API_TYPE_SET_KEEP_SCREEN_ON>(
  API_SET_KEEP_SCREEN_ON,
  ({ keepScreenOn: value }, { resolve, reject }) => {
    keepScreenOn = !!value
    if (keepScreenOn) {
      addVisibilityChangeListener()
      requestWakeLock()
        .then(() => {
          resolve()
        })
        .catch((error) => {
          keepScreenOn = false
          removeVisibilityChangeListener()
          reject(getErrorMessage(error))
        })
    } else {
      removeVisibilityChangeListener()
      releaseWakeLock()
        .then(resolve)
        .catch((error) => {
          reject(getErrorMessage(error))
        })
    }
  }
)
