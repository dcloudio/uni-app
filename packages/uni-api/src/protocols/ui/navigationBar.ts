import { ApiOptions, ApiProtocol } from '../type'

const FRONT_COLORS = ['#ffffff', '#000000']

export const SetNavigationBarColorOptions: ApiOptions = {
  formatArgs: {
    animation(animation = {}, params) {
      params.animation = {
        duration: animation.duration || 0,
        timingFunc: animation.timingFunc || 'linear'
      }
    }
  }
}

export const SetNavigationBarColorProtocol: ApiProtocol = {
  frontColor: {
    type: String,
    required: true,
    validator(frontColor) {
      if (FRONT_COLORS.indexOf(frontColor) === -1) {
        return `invalid frontColor "${frontColor}"`
      }
    }
  },
  backgroundColor: {
    type: String,
    required: true
  },
  animation: {
    type: Object,
    default() {
      return {
        duration: 0,
        timingFunc: 'linear'
      }
    }
  }
}

export const SetNavigationBarTitleProtocol: ApiProtocol = {
  title: {
    type: String,
    required: true
  }
}
