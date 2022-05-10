import safeAreaInsets from 'safe-area-insets'

import { defineSyncApi } from '@dcloudio/uni-api'

import { getWindowOffset } from '@dcloudio/uni-core'

import {
  ua,
  isIOS,
  isAndroid,
  isWindows,
  isMac,
  isLinux,
  isIPadOS,
  isLandscape,
  getScreenFix,
  getScreenWidth,
  getWindowWidth,
  getScreenHeight,
} from '../base/getBaseSystemInfo'

import deviceId from '../../../helpers/uuid'

function IEVersion() {
  const userAgent = navigator.userAgent
  const isIE =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE
  const isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp.$1)
    if (fIEVersion > 6) {
      return fIEVersion
    } else {
      return 6
    }
  } else if (isEdge) {
    return -1
  } else if (isIE11) {
    return 11
  } else {
    return -1
  }
}

function getDeviceBrand(model: string) {
  if (/iphone/gi.test(model) || /ipad/gi.test(model) || /mac/gi.test(model)) {
    return 'apple'
  }
  if (/windows/gi.test(model)) {
    return 'microsoft'
  }
}

/**
 * 获取系统信息-同步
 */
export const getSystemInfoSync = defineSyncApi<typeof uni.getSystemInfoSync>(
  'getSystemInfoSync',
  () => {
    if (__NODE_JS__) {
      //TODO 临时搞一下配合 uniCloud 测试
      return {
        deviceId: Date.now() + '' + Math.floor(Math.random() * 1e7),
        platform: 'nodejs',
      } as unknown as UniApp.GetSystemInfoResult
    }
    const pixelRatio = window.devicePixelRatio
    // 横屏时 iOS 获取的屏幕宽高颠倒，进行纠正
    const screenFix = getScreenFix()
    const landscape = isLandscape(screenFix)
    const screenWidth = getScreenWidth(screenFix, landscape)
    const screenHeight = getScreenHeight(screenFix, landscape)
    const windowWidth = getWindowWidth(screenWidth)
    let windowHeight = window.innerHeight
    const language = navigator.language
    const statusBarHeight = safeAreaInsets.top
    let osname
    let osversion
    let model = ''
    let deviceType = 'phone'

    if (isIOS) {
      osname = 'iOS'
      const osversionFind = ua.match(/OS\s([\w_]+)\slike/)
      if (osversionFind) {
        osversion = osversionFind[1].replace(/_/g, '.')
      }
      const modelFind = ua.match(/\(([a-zA-Z]+);/)
      if (modelFind) {
        model = modelFind[1]
      }
    } else if (isAndroid) {
      osname = 'Android'
      // eslint-disable-next-line no-useless-escape
      const osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/)
      if (osversionFind) {
        osversion = osversionFind[1]
      }
      const infoFind = ua.match(/\((.+?)\)/)
      const infos = infoFind ? infoFind[1].split(';') : ua.split(' ')
      // eslint-disable-next-line no-useless-escape
      const otherInfo = [
        /\bAndroid\b/i,
        /\bLinux\b/i,
        /\bU\b/i,
        /^\s?[a-z][a-z]$/i,
        /^\s?[a-z][a-z]-[a-z][a-z]$/i,
        /\bwv\b/i,
        /\/[\d\.,]+$/,
        /^\s?[\d\.,]+$/,
        /\bBrowser\b/i,
        /\bMobile\b/i,
      ]
      for (let i = 0; i < infos.length; i++) {
        const info = infos[i]
        if (info.indexOf('Build') > 0) {
          model = info.split('Build')[0].trim()
          break
        }
        let other
        for (let o = 0; o < otherInfo.length; o++) {
          if (otherInfo[o].test(info)) {
            other = true
            break
          }
        }
        if (!other) {
          model = info.trim()
          break
        }
      }
    } else if (isIPadOS) {
      model = 'iPad'
      osname = 'iOS'
      deviceType = 'pad'
      osversion = typeof window.BigInt === 'function' ? '14.0' : '13.0'
    } else if (isWindows || isMac || isLinux) {
      model = 'PC'
      osname = 'PC'
      deviceType = 'pc'
      osversion = '0'

      let osversionFind = ua.match(/\((.+?)\)/)![1]

      if (isWindows) {
        osname = 'Windows'
        switch (isWindows[1]) {
          case '5.1':
            osversion = 'XP'
            break
          case '6.0':
            osversion = 'Vista'
            break
          case '6.1':
            osversion = '7'
            break
          case '6.2':
            osversion = '8'
            break
          case '6.3':
            osversion = '8.1'
            break
          case '10.0':
            osversion = '10'
            break
        }

        const framework =
          osversionFind && osversionFind.match(/[Win|WOW]([\d]+)/)
        if (framework) {
          osversion += ` x${framework[1]}`
        }
      } else if (isMac) {
        osname = 'Mac'
        osversion =
          (osversionFind && osversionFind.match(/Mac OS X (.+)/)) || ''

        if (osversion) {
          osversion = osversion[1].replace(/_/g, '.')
          // '10_15_7' or '10.16; rv:86.0'
          if (osversion.indexOf(';') !== -1) {
            osversion = osversion.split(';')[0]
          }
        }
      } else if (isLinux) {
        osname = 'Linux'
        osversion = (osversionFind && osversionFind.match(/Linux (.*)/)) || ''

        if (osversion) {
          osversion = osversion[1]
          // 'x86_64' or 'x86_64; rv:79.0'
          if (osversion.indexOf(';') !== -1) {
            osversion = osversion.split(';')[0]
          }
        }
      }
    } else {
      osname = 'Other'
      osversion = '0'
      deviceType = 'other'
    }

    const system = `${osname} ${osversion}`
    const platform = osname.toLocaleLowerCase()
    const safeArea = {
      left: safeAreaInsets.left,
      right: windowWidth - safeAreaInsets.right,
      top: safeAreaInsets.top,
      bottom: windowHeight - safeAreaInsets.bottom,
      width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
      height: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom,
    }

    const { top: windowTop, bottom: windowBottom } = getWindowOffset()

    windowHeight -= windowTop
    windowHeight -= windowBottom

    let browserName = ''
    let browseVersion = String(IEVersion())
    if (browseVersion !== '-1') {
      browserName = 'IE'
    } else {
      const browseVendors = ['Version', 'Firefox', 'Chrome', 'Edge{0,1}']
      const vendors = ['Safari', 'Firefox', 'Chrome', 'Edge']
      for (let index = 0; index < browseVendors.length; index++) {
        const vendor = browseVendors[index]
        const reg = new RegExp(`(${vendor})/(\\S*)\\b`)
        if (reg.test(ua)) {
          browserName = vendors[index]
          browseVersion = ua.match(reg)![2]
        }
      }
    }

    // deviceBrand
    let deviceBrand = ''
    if (model) {
      const _model = model.toLocaleLowerCase()
      deviceBrand =
        getDeviceBrand(_model) ||
        getDeviceBrand(osname.toLocaleLowerCase()) ||
        _model.split(' ')[0]
    }

    return {
      windowTop,
      windowBottom,
      windowWidth,
      windowHeight,
      pixelRatio,
      screenWidth,
      screenHeight,
      language,
      statusBarHeight,
      system,
      platform,
      deviceBrand,
      deviceType,
      model,
      safeArea,
      safeAreaInsets: {
        top: safeAreaInsets.top,
        right: safeAreaInsets.right,
        bottom: safeAreaInsets.bottom,
        left: safeAreaInsets.left,
      },
      version: __uniConfig.appVersion,
      SDKVersion: '',
      deviceId: deviceId(),
      ua,
      uniPlatform: 'web',
      browserName,
      browseVersion,
      osLanguage: language,
      osName: osname.toLocaleLowerCase(),
      osVersion: osversion,
      hostLanguage: language,
      uniCompileVersion: __uniConfig.compilerVersion,
      uniRuntimeVersion: __uniConfig.compilerVersion,
      appId: __uniConfig.appId,
      appName: __uniConfig.appName,
      appVersion: __uniConfig.appVersion,
      appVersionCode: __uniConfig.appVersionCode,
      hostName: browserName,
      hostVersion: browseVersion,
      osTheme: '',
      hostTheme: '',
      hostPackageName: '',
    } as UniApp.GetSystemInfoResult
  }
)
