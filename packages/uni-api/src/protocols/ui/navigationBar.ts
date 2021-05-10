const FRONT_COLORS = ['#ffffff', '#000000']
export const API_SET_NAVIGATION_BAR_COLOR = 'setNavigationBarColor'
export type API_TYPE_SET_NAVIGATION_BAR_COLOR = typeof uni.setNavigationBarColor
export const SetNavigationBarColorOptions: ApiOptions<API_TYPE_SET_NAVIGATION_BAR_COLOR> =
  {
    formatArgs: {
      animation(animation, params) {
        if (!animation) {
          animation = { duration: 0, timingFunc: 'linear' }
        }
        params.animation = {
          duration: animation.duration || 0,
          timingFunc: animation.timingFunc || 'linear',
        }
      },
    },
  }

export const SetNavigationBarColorProtocol: ApiProtocol<API_TYPE_SET_NAVIGATION_BAR_COLOR> =
  {
    frontColor: {
      type: String,
      required: true,
      validator(frontColor) {
        if (FRONT_COLORS.indexOf(frontColor!) === -1) {
          return `invalid frontColor "${frontColor}"`
        }
      },
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    animation: Object,
  }
export const API_SET_NAVIGATION_BAR_TITLE = 'setNavigationBarTitle'
export type API_TYPE_SET_NAVIGATION_BAR_TITLE = typeof uni.setNavigationBarTitle
export const SetNavigationBarTitleProtocol: ApiProtocol<API_TYPE_SET_NAVIGATION_BAR_TITLE> =
  {
    title: {
      type: String,
      required: true,
    },
  }

export const API_SHOW_NAVIGATION_BAR_LOADING = 'showNavigationBarLoading'
export type API_TYPE_SHOW_NAVIGATION_BAR_LOADING =
  typeof uni.showNavigationBarLoading

export const API_HIDE_NAVIGATION_BAR_LOADING = 'hideNavigationBarLoading'
export type API_TYPE_HIDE_NAVIGATION_BAR_LOADING =
  typeof uni.hideNavigationBarLoading
