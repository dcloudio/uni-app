export const API_CREATE_INTERSTITIAL_AD = 'createInterstitialAd'
export type API_TYPE_CREATE_INTERSTITIAL_AD = typeof uni.createInterstitialAd

export const CreateInterstitialAdOptions: ApiOptions<API_TYPE_CREATE_INTERSTITIAL_AD> =
  {
    formatArgs: {
      adpid: '',
      adUnitId: '',
    },
  }

export const CreateInterstitialAdProtocol: ApiProtocol<API_TYPE_CREATE_INTERSTITIAL_AD> =
  {
    adpid: String,
    adUnitId: String,
  }
