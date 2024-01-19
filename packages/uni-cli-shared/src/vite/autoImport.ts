import { Options } from 'unplugin-auto-import/types'
import { injectsToAutoImports } from './plugins/uts/ext-api'
import { parseUniExtApisOnce } from '../uni_modules'

export type AutoImportOptions = Options

const uniPreset = {
  from: '@dcloudio/uni-app',
  imports: [
    // uni-app lifecycle
    // App and Page
    'onShow',
    'onHide',
    // App
    'onAppShow',
    'onLaunch',
    'onError',
    'onThemeChange',
    'onKeyboardHeightChange',
    'onPageNotFound',
    'onUnhandledRejection',
    'onLastPageBackPress',
    'onExit',
    // Page
    'onLoad',
    'onReady',
    'onUnload',
    'onResize',
    'onBackPress',
    'onPageScroll',
    'onTabItemTap',
    'onReachBottom',
    'onPullDownRefresh',
  ],
}
const uniH5Preset = {
  from: '@dcloudio/uni-h5',
  imports: ['UniElement', 'UniElementImpl'],
}
const cloudPreset = {
  '@dcloudio/uni-cloud': [['default', 'uniCloud']],
}
const vuePreset = {
  from: 'vue',
  imports: [
    // vue lifecycle
    'onActivated',
    'onBeforeMount',
    'onBeforeUnmount',
    'onBeforeUpdate',
    'onErrorCaptured',
    'onDeactivated',
    'onMounted',
    'onServerPrefetch',
    'onUnmounted',
    'onUpdated',

    // setup helpers
    'useAttrs',
    'useSlots',

    // reactivity,
    'computed',
    'customRef',
    'isReadonly',
    'isRef',
    'isProxy',
    'isReactive',
    'markRaw',
    'reactive',
    'readonly',
    'ref',
    'shallowReactive',
    'shallowReadonly',
    'shallowRef',
    'triggerRef',
    'toRaw',
    'toRef',
    'toRefs',
    'toValue',
    'unref',
    'watch',
    'watchEffect',
    'watchPostEffect',
    'watchSyncEffect',

    // component
    'defineComponent',
    'defineAsyncComponent',
    'getCurrentInstance',
    'h',
    'inject',
    'nextTick',
    'provide',
    'useCssModule',
    'createApp',

    // effect scope
    'effectScope',
    'EffectScope',
    'getCurrentScope',
    'onScopeDispose',

    // types 全部全局导入
  ],
}

export function initAutoImportOptions(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  { imports = [], ...userOptions }: AutoImportOptions
): AutoImportOptions {
  const autoImport = [uniPreset, cloudPreset, vuePreset]
  if (platform === 'web') {
    autoImport.push(uniH5Preset)
  }
  if (platform !== 'app-android') {
    // 非 android 平台，注入 uts ext-api
    injectsToAutoImports(
      parseUniExtApisOnce(true, platform, 'javascript')
    ).forEach(
      // @ts-expect-error
      (item) => autoImport.push(item)
    )
  }
  return {
    ...userOptions,
    include: [/\.[u]?ts$/, /\.[u]?vue/],
    exclude: [/[\\/]\.git[\\/]/],
    imports: (imports as any[]).concat(
      // app-android 平台暂不注入其他
      platform === 'app-android' ? [] : autoImport
    ),
    dts: false,
  }
}
