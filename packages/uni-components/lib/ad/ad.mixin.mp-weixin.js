const adPlugin = requirePlugin("uni-ad");

const EventType = {
  Load: 'load',
  Close: 'close',
  Error: 'error'
}

const AdType = {
  Banner: "banner",
  RewardedVideo: "rewardedVideo",
  Interstitial: "interstitial"
}

const ProviderType = {
  WeChat: 10018,
  UserWeChat: 10017,
  ShanHu: 10020
}

export default {
  props: {
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
    urlCallback: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      loading: false,
      userwx: false,
      userUnitId: "",
      wxchannel: false,
      errorMessage: null
    }
  },
  created () {
    this._ad = null
    this._loading = false
    this._wxRewardedAd = null
    this._wxInterstitialAd = null
    this._providerType = ProviderType.ShanHu
    if (this.preload && this._canCreateAd()) {
      this.load()
    }
  },
  methods: {
    load () {
      if (this.loading) {
        return
      }
      this._startLoading()
      if (this._providerType == ProviderType.ShanHu) {
      } else if (this._providerType == ProviderType.WeChat) {
        this.selectComponent('.uniad-plugin-wx').load()
      } else if (this._providerType == ProviderType.UserWeChat) {
        this._loadWxAd()
      }
    },

    show (e) {
      this.errorMessage = null
      if (this._providerType == ProviderType.ShanHu) {
        this._showAdInPlugin(this.selectComponent('.uniad-plugin'))
      } else if (this._providerType == ProviderType.WeChat) {
        this._showAdInPlugin(this.selectComponent('.uniad-plugin-wx'))
      } else if (this._providerType == ProviderType.UserWeChat) {
        this._showWxAd(e)
      }
    },

    _onclick () {
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

    _onmpload (e) {
      this.loading = false
      this._dispatchEvent(EventType.Load, {})
    },

    _onmpclose (e) {
      this._dispatchEvent(EventType.Close, e.detail)
      if (e.detail.adsdata) {
        const adv = e.detail.adv
        const adsdata = e.detail.adsdata
        const version = e.detail.version

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

        delete e.detail.adv
        delete e.detail.adsdata
        delete e.detail.version
      }
    },

    _onmperror (e) {
      this.loading = false
      this.errorMessage = JSON.stringify(e.detail)
      this._dispatchEvent(EventType.Error, e.detail)
    },

    _onnextchannel (e) {
      this.wxchannel = true
      const adData = e.detail[0];
      this.$nextTick(() => {
        if (adData.provider == 10017) {
          this._providerType = ProviderType.UserWeChat
          switch(adData._nt_) {
            case 4:
              this.wxAdType = AdType.Banner
              this.userwx = true
              this.userUnitId = adData.posid
              break;
            case 9:
              this.wxAdType = AdType.RewardedVideo
              this._createRewardedAd(adData.posid)
              break;
            case 15:
              this.wxAdType = AdType.Interstitial
              this._createInterstitialAd(adData.posid)
              break;
          }
        } else if (adData.provider == 10018) {
          this._providerType = ProviderType.WeChat
          this.selectComponent('.uniad-plugin-wx').setConfig(adData)
        }
      })
    },

    _onwxchannelerror(e) {
      this.wxchannel = false
      this.$nextTick(() => {
        this._providerType = ProviderType.ShanHu
        this.selectComponent('.uniad-plugin').shanhuChannel()
      })
    },

    _dispatchEvent (type, data) {
      this.$emit(type, {
        detail: data
      })
    },

    _showAdInPlugin(adComponent) {
      if (this._hasCallback()) {
        const userCryptoManager = wx.getUserCryptoManager()
        userCryptoManager.getLatestUserKey({
          success: ({
            encryptKey,
            iv,
            version,
            expireTime
          }) => {
            adComponent.show({
              userId: this.urlCallback.userId || '',
              extra: this.urlCallback.extra || '',
              encryptKey,
              iv,
              version,
              expireTime
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
            this._wxRewardedAd.load();
          }
          break;
        case AdType.Interstitial:
          if (this._wxInterstitialAd) {
            this._wxInterstitialAd.load();
          }
          break;
      }
    },

    // 加载/显示广告
    _showWxAd (options) {
      this._urlCallback = options || this.urlCallback;
      if (this.loading == true) {
        this._userInvokeShowFlag = true
        return
      }
      switch (this.wxAdType) {
        case AdType.RewardedVideo:
          if (!this._wxRewardedAd) {
            return;
          }
          this._wxRewardedAd.show().catch((err) => {
            this._wxRewardedAd.load().then(() => {
              this._wxRewardedAd.show();
            }).catch((err) => {
              this._dispatchEvent(EventType.Error, err);
            });
          });
          break;
        case AdType.Interstitial:
          if (!this._wxInterstitialAd) {
            return;
          }
          this._wxInterstitialAd.show().catch((err) => {
            this._wxInterstitialAd.load().then(() => {
              this._wxInterstitialAd.show();
            }).catch((err) => {
              this._dispatchEvent(EventType.Error, err);
            });
          });
          break;
      }
    },

    // 微信激励视频
    _createRewardedAd(adUnitId) {
      if (this._wxRewardedAd) {
        return;
      }

      this._wxRewardedAd = wx.createRewardedVideoAd({ adUnitId: adUnitId, multiton: true });

      this._wxRewardedAd.onLoad(() => {
        this.loading = false
        this._dispatchEvent(EventType.Load, {})
        if (this._userInvokeShowFlag) {
          this._userInvokeShowFlag = false;
          this._wxRewardedAd.show();
        }
      });

      this._wxRewardedAd.onError(err => {
        this.loading = false
        this._dispatchEvent(EventType.Error, err);
      });

      this._wxRewardedAd.onClose(res => {
        if (res.isEnded) {
          this._callServer()
        } else {
          this._dispatchEvent(EventType.Close, res);
        }
      });

      this.loading = true
    },

    // 微信插屏
    _createInterstitialAd(adUnitId) {
      if (this._wxInterstitialAd) {
        return;
      }

      this._wxInterstitialAd = wx.createInterstitialAd({ adUnitId: adUnitId });

      this._wxInterstitialAd.onLoad(() => {
        this.loading = false
        this._dispatchEvent(EventType.Load, {})
        if (this._userInvokeShowFlag) {
          this._userInvokeShowFlag = false;
          this._wxInterstitialAd.show();
        }
      });

      this._wxInterstitialAd.onError(err => {
        this.loading = false
        this._dispatchEvent(EventType.Error, err);
      });

      this._wxInterstitialAd.onClose(res => {
        this._dispatchEvent(EventType.Close, res);
      });

      this.loading = true
    },

    _callServer() {
      const userCryptoManager = wx.getUserCryptoManager()
      userCryptoManager.getLatestUserKey({
        success: (encryptConfig) => {
          const callbackData = adPlugin.buildCallbackData(this.adpid, this.urlCallback, {}, encryptConfig)
          uniCloud.callFunction({
            name: 'uniAdCallback',
            data: callbackData,
            secretType: 'both',
            success: (res) => {
              this._dispatchEvent(EventType.Close, res);
            },
            fail: (err) => {
              this._dispatchEvent(EventType.Error, err);
            }
          })
        },
        fail: (err) => {
          this._dispatchEvent(EventType.Error, err);
        }
      })
    }
  }
}
