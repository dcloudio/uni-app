export const API_CREATE_FULL_SCREEN_VIDEO_AD = 'createFullScreenVideoAd'
export type API_TYPE_CREATE_FULL_SCREEN_VIDEO_AD =
  typeof uni.createFullScreenVideoAd

export const CreateFullScreenVideoAdOptions: ApiOptions<API_TYPE_CREATE_FULL_SCREEN_VIDEO_AD> =
  {
    formatArgs: {
      adpid: '',
    },
  }

export const CreateFullScreenVideoAdProtocol: ApiProtocol<API_TYPE_CREATE_FULL_SCREEN_VIDEO_AD> =
  {
    adpid: String,
  }
