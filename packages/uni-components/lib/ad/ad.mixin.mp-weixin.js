const adPlugin = requirePlugin("uni-ad");

import {
  canShowHalfScreenModal,
  isHalfScreenModalShowing,
  markHalfScreenModalConfirmed,
  markHalfScreenModalDismissed,
  markHalfScreenModalShowing,
  queueHalfScreenModalOpenOptions,
  resetHalfScreenModalSession,
  resolveHalfScreenModalContent,
  takePendingHalfScreenModalOpenOptions,
  unlockHalfScreenModalShowing
} from '../../lib-x/ad/half-screen-modal.js'

const EventType = {
  Load: 'load',
  Close: 'close',
  Error: 'error'
}

const AdType = {
  Banner: 'banner',
  RewardedVideo: 'rewardedVideo',
  Interstitial: 'interstitial'
}

const ProviderType = {
  WeChat: 10018,
  UserWeChat: 10017,
  ShanHu: 10020,
  HalfScreen: 10032
}

const ActionType = {
  ServerRequest: '-3',
  AdRequest: '-1',
  Show: '40',
  Click: '41'
}

/** 微信广告无填充错误码 */
const WxAdErrorCode = {
  NoFill: 1004
}

/** 供 uniad 壳组件显式声明，消除 Vue3 编译期 mixin 不可见告警 */
export const adComponentProps = {
  style: {
    type: String,
    default: ''
  },
  options: {
    type: [Object, Array],
    default () {
      return {}
    }
  },
  adpid: {
    type: [Number, String],
    default: ''
  },
  unitId: {
    type: [Number, String],
    default: ''
  },
  preload: {
    type: [Boolean, String],
    default: true
  },
  loadnext: {
    type: [Boolean, String],
    default: false
  },
  adIntervals: {
    type: [Number, String],
    default: ''
  },
  urlCallback: {
    type: Object,
    default () {
      return {}
    }
  }
}

/** 供 uniad 壳组件显式声明的 data */
export function adComponentData () {
  return {
    loading: false,
    userwx: false,
    userUnitId: '',
    customFullscreen: '',
    wxchannel: false,
    errorMessage: null,
    isHalfScreen: false
  }
}

/** 供 uniad 壳组件显式声明的 emits */
export const adComponentEmits = ['load', 'close', 'error', 'adcreated']

/** 供 uniad 壳组件显式声明的 computed */
export const adComponentComputed = {
  /**
   * 规范化 adIntervals，无效值不传以免插件收到非 Number
   */
  normalizedAdIntervals () {
    if (this.adIntervals === '' || this.adIntervals == null) {
      return undefined
    }
    const value = Number(this.adIntervals)
    if (!Number.isFinite(value) || value < 30) {
      return undefined
    }
    return value
  }
}

export default {
  options: {
    virtualHost: true
  },
  emits: adComponentEmits,
  props: adComponentProps,
  data: adComponentData,
  created () {
    resetHalfScreenModalSession()
    this._ad = null
    this._loading = false
    this._wxRewardedAd = null
    this._wxInterstitialAd = null
    this._userInvokeShowFlag = false
    this._providerType = ProviderType.ShanHu
    this._halfScreenOpening = false
    this._halfScreenOpeningTimer = null
    if (this.preload && this._canCreateAd()) {
      this.load()
    }
    this._dispatchEvent('adcreated', { instance: this })
  },
  computed: adComponentComputed,
  methods: {
    load () {
      if (this.loading) {
        return
      }
      this._startLoading()
      if (this._providerType === ProviderType.ShanHu) {
      } else if (this._providerType === ProviderType.WeChat) {
        this.selectComponent('.uniad-plugin-wx').load()
      } else if (this._providerType === ProviderType.UserWeChat) {
        this._loadWxAd()
      }
    },

    show (e) {
      this.errorMessage = null
      const plugin = this.selectComponent('.uniad-plugin')
      if (this._isHalfScreenAd(plugin)) {
        this._userInvokeShowFlag = false
        return
      }
      if (this.loading) {
        this._userInvokeShowFlag = true
        return
      }
      if (this._providerType === ProviderType.ShanHu) {
        this._showAdInPlugin(this.selectComponent('.uniad-plugin'))
      } else if (this._providerType === ProviderType.WeChat) {
        this._showAdInPlugin(this.selectComponent('.uniad-plugin-wx'))
      } else if (this._providerType === ProviderType.UserWeChat) {
        this._showWxAd(e)
      }
    },

    _onclick () {
      if (this.isHalfScreen) {
        return
      }
      this.show()
    },

    _startLoading () {
      this.loading = true
      this.errorMessage = null
    },

    _canCreateAd () {
      let result = false
      if (typeof this.adpid === 'string' && this.adpid.length > 0) {
        result = true
      } else if (typeof this.adpid === 'number') {
        result = true
      }
      return result
    },

    _hasCallback () {
      return (typeof this.urlCallback === 'object' && Object.keys(this.urlCallback).length > 0)
    },

    /**
     * 按 provider 从 acsv4 配置列表查找广告项
     * @param {Array} list 配置数组
     * @param {number} provider 渠道 provider
     */
    _findAdItemByProvider (list, provider) {
      if (!Array.isArray(list)) {
        return null
      }
      return list.find(item => Number(item.provider) === Number(provider)) || null
    },

    /**
     * 是否为微信广告无填充 errCode 1004
     * @param {Object} err 错误对象
     */
    _isWxAdNoFillError (err) {
      if (!err) {
        return false
      }
      const detail = err.detail || err
      return Number(detail.errCode) === WxAdErrorCode.NoFill
    },

    /**
     * 代运营无填充时尝试半屏兜底
     * @param {Object} plugin uniad-plugin 实例
     * @param {Object} err 错误对象
     */
    _tryHalfScreenFallback (plugin, err) {
      if (!plugin || !plugin.tryHalfScreenFallback) {
        return false
      }
      const detail = err && (err.detail || err)
      if (!this._isWxAdNoFillError(detail)) {
        return false
      }
      // 半屏切换与 load 事件由插件 triggerEvent(load) → _onmpload 统一处理
      return plugin.tryHalfScreenFallback(detail)
    },

    /**
     * 处理代运营微信广告错误，无填充时走半屏兜底
     * @param {Object} err 错误对象
     * @param {string} reportType 上报类型
     */
    _handleUserWxAdError (err, reportType) {
      this.loading = false
      const plugin = this.selectComponent('.uniad-plugin')
      if (this._tryHalfScreenFallback(plugin, err)) {
        return true
      }
      this.errorMessage = JSON.stringify(err)
      this._dispatchEvent(EventType.Error, err)
      if (reportType) {
        this._report(reportType, err)
      }
      return false
    },

    /**
     * 切换为半屏广告模式
     */
    _setHalfScreenMode () {
      this.isHalfScreen = true
      this._providerType = ProviderType.HalfScreen
      this.userwx = false
      this.wxchannel = false
      this.loading = false
      this._userInvokeShowFlag = false
    },

    /**
     * 是否半屏广告
     * @param {Object} plugin uniad-plugin 实例
     */
    _isHalfScreenAd (plugin) {
      return this._providerType === ProviderType.HalfScreen || !!(
        plugin &&
        plugin.getHalfScreenConfig &&
        plugin.getHalfScreenConfig()
      )
    },

    /**
     * 用户点击半屏占位（插件 halfScreenTap 事件）
     * @param {Object} e 事件对象
     */
    _onHalfScreenTap (e) {
      const openOptions = e.detail && e.detail.openOptions
      if (!openOptions) {
        return
      }
      this._openTargetMiniProgramInHost(openOptions)
    },

    /**
     * 开始打开小程序防抖锁
     */
    _beginMiniProgramOpening () {
      this._halfScreenOpening = true
      this._halfScreenOpeningTimer = setTimeout(() => {
        this._resetHalfScreenOpening()
      }, 3000)
    },

    /**
     * 用户手动触发：优先半屏打开，失败则 navigateToMiniProgram 兜底
     * @param {Object} openOptions 打开参数
     */
    _openTargetMiniProgramInHost (openOptions) {
      if (this._halfScreenOpening) {
        return
      }
      if (!openOptions || !openOptions.appId) {
        this._dispatchEvent(EventType.Error, {
          errMsg: 'mini program openOptions unavailable'
        })
        return
      }
      const plugin = this.selectComponent('.uniad-plugin')
      this._openHalfScreenEmbeddedInHost(openOptions, plugin)
    },

    /**
     * 半屏嵌入打开 wx.openEmbeddedMiniProgram
     * @param {Object} openOptions 打开参数
     * @param {Object} plugin uniad-plugin 实例
     */
    _openHalfScreenEmbeddedInHost (openOptions, plugin) {
      if (typeof wx.openEmbeddedMiniProgram !== 'function') {
        this._openMiniProgramDirectInHost(openOptions, plugin)
        return
      }
      this._beginMiniProgramOpening()
      wx.openEmbeddedMiniProgram({
        appId: openOptions.appId,
        path: openOptions.path,
        extraData: openOptions.extraData || {},
        success: (res) => {
          this._resetHalfScreenOpening()
          if (plugin && plugin.notifyHalfScreenOpenSuccess) {
            plugin.notifyHalfScreenOpenSuccess(res)
          }
        },
        fail: (err) => {
          if (this._isMiniProgramOpenCancel(err)) {
            this._resetHalfScreenOpening()
            this._notifyHalfScreenOpenResult(plugin, err)
            return
          }
          this._openMiniProgramDirectInHost(openOptions, plugin, err)
        }
      })
    },

    /**
     * 直接打开小程序 wx.navigateToMiniProgram（半屏未过审等场景兜底）
     * @param {Object} openOptions 打开参数
     * @param {Object} plugin uniad-plugin 实例
     * @param {Object} fromErr 半屏打开失败时的错误
     */
    _openMiniProgramDirectInHost (openOptions, plugin, fromErr) {
      if (typeof wx.navigateToMiniProgram !== 'function') {
        this._resetHalfScreenOpening()
        this._notifyHalfScreenOpenResult(plugin, fromErr || {
          errMsg: 'navigateToMiniProgram not supported'
        })
        return
      }
      if (!this._halfScreenOpening) {
        this._beginMiniProgramOpening()
      }
      wx.navigateToMiniProgram({
        appId: openOptions.appId,
        path: openOptions.path,
        extraData: openOptions.extraData || {},
        success: (res) => {
          this._resetHalfScreenOpening()
          if (plugin && plugin.notifyHalfScreenOpenSuccess) {
            plugin.notifyHalfScreenOpenSuccess(res, { isDirect: true })
          }
        },
        fail: (err) => {
          this._resetHalfScreenOpening()
          this._notifyHalfScreenOpenResult(plugin, err)
        }
      })
    },

    /**
     * 清除半屏打开锁定时器
     */
    _clearHalfScreenOpeningTimer () {
      if (this._halfScreenOpeningTimer) {
        clearTimeout(this._halfScreenOpeningTimer)
        this._halfScreenOpeningTimer = null
      }
    },

    /**
     * 重置半屏打开锁
     */
    _resetHalfScreenOpening () {
      this._halfScreenOpening = false
      this._clearHalfScreenOpeningTimer()
    },

    /**
     * 是否为打开/跳转小程序时用户点击取消（fail cancel）
     * @param {Object} err 失败回调对象
     */
    _isMiniProgramOpenCancel (err) {
      const msg = (err && err.errMsg) || ''
      return typeof msg === 'string' && msg.indexOf('fail cancel') !== -1
    },

    /**
     * 通知插件半屏打开失败或用户取消
     * @param {Object} plugin uniad-plugin 实例
     * @param {Object} err 失败回调对象
     */
    _notifyHalfScreenOpenResult (plugin, err) {
      if (this._isMiniProgramOpenCancel(err)) {
        if (plugin && plugin.notifyHalfScreenOpenCancel) {
          plugin.notifyHalfScreenOpenCancel(err)
        } else if (plugin && plugin.notifyHalfScreenOpenFail) {
          plugin.notifyHalfScreenOpenFail(err)
        } else {
          this._dispatchEvent(EventType.Close, { type: 'userCancel', detail: err })
        }
        return
      }
      if (plugin && plugin.notifyHalfScreenOpenFail) {
        plugin.notifyHalfScreenOpenFail(err)
      } else {
        this._dispatchEvent(EventType.Error, err)
      }
    },

    /**
     * 插件半屏占位就绪，同步宿主状态并隐藏 ad-custom
     */
    _onHalfScreenReady () {
      this._setHalfScreenMode()
    },

    /**
     * 插件 all_show 双广告：ad 配置就绪后并行弹窗
     * @param {Object} e 事件对象
     */
    _onHalfScreenModal (e) {
      const detail = e.detail || e
      const openOptions = detail.openOptions
      if (openOptions) {
        this._tryShowHalfScreenModal(openOptions)
      }
    },

    /**
     * 尝试展示排队中的半屏弹窗
     */
    _processPendingHalfScreenModal () {
      const pending = takePendingHalfScreenModalOpenOptions()
      if (pending) {
        setTimeout(() => {
          this._tryShowHalfScreenModal(pending)
        }, 50)
      }
    },

    /**
     * 宿主层统一调用 uni.showModal 引导打开半屏
     * @param {Object} openOptions 打开半屏/直达小程序参数
     * @param {number} retryCount showModal 失败重试次数
     */
    _tryShowHalfScreenModal (openOptions, retryCount = 0) {
      if (!openOptions || !openOptions.appId) {
        return
      }
      const appId = openOptions.appId
      if (!canShowHalfScreenModal(appId)) {
        return
      }
      if (isHalfScreenModalShowing()) {
        queueHalfScreenModalOpenOptions(openOptions)
        return
      }
      markHalfScreenModalShowing(appId)
      /* eslint-disable no-undef */
      uni.showModal({
        title: '提示',
        content: resolveHalfScreenModalContent(openOptions.msg),
        confirmText: '继续',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            markHalfScreenModalConfirmed()
            this._openTargetMiniProgramInHost(openOptions)
          } else {
            markHalfScreenModalDismissed(appId)
          }
        },
        fail: () => {
          unlockHalfScreenModalShowing(appId)
          if (retryCount < 1) {
            setTimeout(() => {
              this._tryShowHalfScreenModal(openOptions, retryCount + 1)
            }, 300)
          } else {
            this._processPendingHalfScreenModal()
          }
        }
      })
    },

    _onmpload (e) {
      this.loading = false
      const plugin = this.selectComponent('.uniad-plugin')
      if (plugin && plugin.getHalfScreenConfig && plugin.getHalfScreenConfig()) {
        this._setHalfScreenMode()
      }
      this._dispatchEvent(EventType.Load, {})
      this._report(ActionType.AdRequest)
      if (this._userInvokeShowFlag) {
        this._userInvokeShowFlag = false
        if (this.isHalfScreen) {
          return
        }
        setTimeout(() => {
          this.show()
        }, 1)
      }
    },

    _onmpclose (e) {
      const detail = e.detail || e
      this._dispatchEvent(EventType.Close, detail)
      if (detail.adsdata) {
        const adv = detail.adv
        const adsdata = detail.adsdata
        const version = detail.version

        /* eslint-disable no-undef */
        uniCloud.callFunction({
          name: 'uniAdCallback',
          data: {
            adv: adv,
            adsdata: adsdata,
            version: version
          },
          secretType: 'both',
          success: (res) => {
          },
          fail: (err) => {
            this._dispatchEvent(EventType.Error, err)
          }
        })

        delete detail.adv
        delete detail.adsdata
        delete detail.version
      }
    },

    _onmperror (e) {
      const detail = e.detail || e
      if (this._handleUserWxAdError(detail, ActionType.AdRequest)) {
        return
      }
      if (this._isMiniProgramOpenCancel(detail)) {
        return
      }
      this._dispatchEvent(EventType.Error, detail)
    },

    _onnextchannel (e) {
      const adData = this._findAdItemByProvider(e.detail, ProviderType.UserWeChat)
      if (!adData) {
        return
      }
      this.wxchannel = true
      this.$nextTick(() => {
        if (adData.provider === 10017) {
          this._providerType = ProviderType.UserWeChat
          switch (adData._nt_) {
            case 4:
              this.wxAdType = AdType.Banner
              this.userwx = true
              this.userUnitId = adData.posid
              if (adData.tmpl_type === 24) {
                this.customFullscreen = 'uni-ad-custom-fullscreen'
              }
              break
            case 9:
              this.wxAdType = AdType.RewardedVideo
              this._createRewardedAd(adData.posid)
              break
            case 15:
              this.wxAdType = AdType.Interstitial
              this._createInterstitialAd(adData.posid)
              break
          }
        } else if (adData.provider === 10018) {
          this._providerType = ProviderType.WeChat
          if (adData.tmpl_type === 24) {
            this.customFullscreen = 'uni-ad-custom-fullscreen'
          }
          this.loading = true
          if (!adData.dcloudAdpid) {
            adData.dcloudAdpid = this.adpid
          }
          this.selectComponent('.uniad-plugin-wx').setConfig(adData)
        }
      })
    },
    _customFullscreen () {
      this.customFullscreen = 'uni-ad-custom-fullscreen'
    },
    _onwxchannelerror (e) {
      this._dispatchEvent(EventType.Error, e.detail || e)
    },

    _dispatchEvent (type, data) {
      this.$emit(type, {
        detail: data
      })
    },

    _showAdInPlugin (adComponent) {
      if (this._hasCallback()) {
        const userCryptoManager = wx.getUserCryptoManager()
        userCryptoManager.getLatestUserKey({
          success: ({
            encryptKey,
            iv,
            version,
            expireTime
          }) => {
            const uniOptions = {
              adpid: this.adpid
            }
            adComponent.show({
              userId: this.urlCallback.userId || '',
              extra: this.urlCallback.extra || '',
              encryptKey,
              iv,
              version,
              expireTime,
              uniOptions
            })
          },
          fail: (err) => {
            this._dispatchEvent(EventType.Error, err)
          }
        })
      } else {
        adComponent.show({
          userId: this.urlCallback.userId || '',
          extra: this.urlCallback.extra || ''
        })
      }
    },

    _loadWxAd () {
      switch (this.wxAdType) {
        case AdType.RewardedVideo:
          if (this._wxRewardedAd) {
            this._wxRewardedAd.load().catch((err) => {
              this._dispatchEvent(EventType.Error, err)
            })
          }
          break
        case AdType.Interstitial:
          if (this._wxInterstitialAd) {
            this._wxInterstitialAd.load().catch((err) => {
              this._dispatchEvent(EventType.Error, err)
            })
          }
          break
      }
    },

    // 加载/显示广告
    _showWxAd (options) {
      this._urlCallback = options || this.urlCallback
      if (this.loading === true) {
        this._userInvokeShowFlag = true
        return
      }
      switch (this.wxAdType) {
        case AdType.RewardedVideo:
          if (!this._wxRewardedAd) {
            return
          }
          // eslint-disable-next-line handle-callback-err
          this._wxRewardedAd.show().then(() => {
            this._report(ActionType.Show)
          }).catch((err) => {
            if (this._handleUserWxAdError(err, ActionType.Show)) {
              return
            }
          })
          break
        case AdType.Interstitial:
          if (!this._wxInterstitialAd) {
            return
          }
          // eslint-disable-next-line handle-callback-err
          this._wxInterstitialAd.show().then(() => {
            this._report(ActionType.Show)
          }).catch((err) => {
            if (this._handleUserWxAdError(err, ActionType.Show)) {
              return
            }
          })
          break
      }
    },

    // 微信激励视频
    _createRewardedAd (adUnitId) {
      if (this._wxRewardedAd) {
        return
      }

      this._wxRewardedAd = wx.createRewardedVideoAd({ adUnitId: adUnitId, multiton: true })

      this._wxRewardedAd.onLoad(() => {
        this.loading = false
        this._dispatchEvent(EventType.Load, {})
        this._report(ActionType.AdRequest)
        if (this._userInvokeShowFlag) {
          this._userInvokeShowFlag = false
          this._wxRewardedAd.show()
        }
      })

      this._wxRewardedAd.onError(err => {
        this._handleUserWxAdError(err, ActionType.AdRequest)
      })

      this._wxRewardedAd.onClose(res => {
        this._dispatchEvent(EventType.Close, res)
        if (res.isEnded && this._hasCallback()) {
          this._callServer()
        }
      })

      this._wxRewardedAd.load().then(() => {
      }).catch((_) => {
      })

      this.loading = true
    },

    // 微信插屏
    _createInterstitialAd (adUnitId) {
      if (this._wxInterstitialAd) {
        return
      }

      this._wxInterstitialAd = wx.createInterstitialAd({ adUnitId: adUnitId })

      this._wxInterstitialAd.onLoad(() => {
        this.loading = false
        this._dispatchEvent(EventType.Load, {})
        this._report(ActionType.AdRequest)
        if (this._userInvokeShowFlag) {
          this._userInvokeShowFlag = false
          this._wxInterstitialAd.show().catch((err) => {
            this._dispatchEvent(EventType.Error, err)
          })
        }
      })

      this._wxInterstitialAd.onError(err => {
        this._handleUserWxAdError(err, ActionType.AdRequest)
      })

      this._wxInterstitialAd.onClose(res => {
        this._dispatchEvent(EventType.Close, res)
      })

      this._wxInterstitialAd.load().catch((err) => {
        this._handleUserWxAdError(err, ActionType.AdRequest)
      })

      this.loading = true
    },

    _callServer () {
      const userCryptoManager = wx.getUserCryptoManager()
      userCryptoManager.getLatestUserKey({
        success: (encryptConfig) => {
          const callbackData = adPlugin.buildCallbackData(this.adpid, this.urlCallback, {}, encryptConfig)
          uniCloud.callFunction({
            name: 'uniAdCallback',
            data: callbackData,
            secretType: 'both',
            success: (res) => {
              this._dispatchEvent(EventType.Close, res)
            },
            fail: (err) => {
              this._dispatchEvent(EventType.Error, err)
            }
          })
        },
        fail: (err) => {
          this._dispatchEvent(EventType.Error, err)
        }
      })
    },

    toJSON () {
      return ''
    },

    _report (type, detail) {
      const adComponent = this.selectComponent('.uniad-plugin')
      if (adComponent && adComponent._unireport) {
        adComponent._unireport({
          isUni: true,
          adpid: this.adpid,
          type,
          detail: detail || ''
        })
      }
    }
  }
}
