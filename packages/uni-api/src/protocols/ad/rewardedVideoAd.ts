export const API_CREATE_REWARDED_VIDEO_AD = 'createRewardedVideoAd'
export type API_TYPE_CREATE_REWARDED_VIDEO_AD = typeof uni.createRewardedVideoAd

export const CreateRewardedVideoAdOptions: ApiOptions<API_TYPE_CREATE_REWARDED_VIDEO_AD> =
  {
    formatArgs: {
      adpid: '',
      adUnitId: '',
    },
  }

export const CreateRewardedVideoAdProtocol: ApiProtocol<API_TYPE_CREATE_REWARDED_VIDEO_AD> =
  {
    adpid: String,
    adUnitId: String,
  }
