import type { NormalizeOptions } from '../utils'

export enum DOM2_APP_PLATFORM {
  APP = 'app',
  APP_ANDROID = 'app-android',
  APP_IOS = 'app-ios',
  APP_HARMONY = 'app-harmony',
}

export enum DOM2_APP_TARGET {
  DOM_C = 'dom-c',
  DOM_KT = 'dom-kt',
  NV_KT = 'nv-kt',
  TXT_KT = 'txt-kt',
  DOM_OC = 'dom-oc',
  NV_C = 'nv-c',
  TXT_C = 'txt-c',
  DOM_TS = 'dom-ts',
}

export interface ParseDom2StaticStyleOptions extends NormalizeOptions {
  platform: DOM2_APP_PLATFORM
  target: DOM2_APP_TARGET
}

export interface Dom2StaticStylePropertyValue {
  valueCode: string
  setterCode: string
}

export type UniPlatformConfig = {
  [platform in DOM2_APP_PLATFORM]?: {
    [target in DOM2_APP_TARGET]?: {
      setter: string
    }
  }
}

export interface AppCssPropertyConfig {
  type?: string
  uniPlatform: UniPlatformConfig
}

export interface AppCssJson {
  [propertyName: string]: AppCssPropertyConfig
}
