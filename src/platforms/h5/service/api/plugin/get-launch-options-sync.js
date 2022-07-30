import {
  getLaunchOptions,
  getEnterOptions
} from 'uni-core/service/plugins/app'

export function getLaunchOptionsSync () {
  return getLaunchOptions()
}
export function getEnterOptionsSync () {
  return getEnterOptions()
}
