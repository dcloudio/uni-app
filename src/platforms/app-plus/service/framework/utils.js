import {
  parseQuery
} from 'uni-shared'
const extend = Object.assign

function createLaunchOptions () {
  return {
    path: '',
    query: {},
    scene: 1001,
    referrerInfo: {
      appId: '',
      extraData: {}
    }
  }
}

const enterOptions = createLaunchOptions()
const launchOptions = createLaunchOptions()

export function getLaunchOptions () {
  return launchOptions
}

export function getEnterOptions () {
  return enterOptions
}

export function initEnterOptions ({
  path,
  query,
  referrerInfo
}) {
  extend(enterOptions, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {}
  })
}

export function initLaunchOptions ({
  path,
  query,
  referrerInfo
}) {
  extend(launchOptions, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {}
  })
  extend(enterOptions, launchOptions)
  return launchOptions
}

export function parseRedirectInfo () {
  const weexPlus = weex.requireModule('plus')
  if (weexPlus.getRedirectInfo) {
    const {
      path,
      query,
      extraData,
      userAction,
      fromAppid
    } =
    weexPlus.getRedirectInfo() || {}
    const referrerInfo = {
      appId: fromAppid,
      extraData: {}
    }
    if (extraData) {
      referrerInfo.extraData = extraData
    }
    return {
      path: path || '',
      query: query ? '?' + query : '',
      referrerInfo,
      userAction
    }
  }
}
