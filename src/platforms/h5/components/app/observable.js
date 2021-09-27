import Vue from 'vue'
import { initTabBarI18n } from 'uni-helpers/i18n'
__uniConfig.tabBar = Vue.observable(initTabBarI18n(__uniConfig.tabBar || {}))
export const tabBar = __uniConfig.tabBar
