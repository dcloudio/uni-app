import type { Options } from 'unplugin-auto-import/types'

export type AutoImportOptions = Options

const uniPreset = {
  from: '@dcloudio/uni-app',
  imports: [
    // ssr
    'ssrRef',
    'shallowSsrRef',
    // uni-app lifecycle
    // App and Page
    'onShow',
    'onHide',
    // App
    'onLaunch',
    'onError',
    'onThemeChange',
    'onKeyboardHeightChange',
    'onPageNotFound',
    'onUnhandledRejection',
    'onLastPageBackPress',
    'onExit',
    // Page
    'onPageShow',
    'onPageHide',
    'onLoad',
    'onReady',
    'onUnload',
    'onResize',
    'onBackPress',
    'onPageScroll',
    'onTabItemTap',
    'onReachBottom',
    'onPullDownRefresh',
    // 辅助
    'renderComponentSlot',
  ],
}
const uniH5Preset = {
  from: '@dcloudio/uni-h5',
  imports: [
    'onAppShow',
    'onAppHide',
    'offAppHide',
    'offAppShow',
    'UniElement',
    'UniElementImpl',
    'UniButtonElement',
    'UniCanvasElement',
    'UniCheckboxElement',
    'UniCheckboxGroupElement',
    'UniEditorElement',
    'UniFormElement',
    'UniIconElement',
    'UniImageElement',
    'UniInputElement',
    'UniLabelElement',
    'UniMovableAreaElement',
    'UniMovableViewElement',
    'UniNavigatorElement',
    'UniPickerViewElement',
    'UniPickerViewColumnElement',
    'UniProgressElement',
    'UniRadioElement',
    'UniRadioGroupElement',
    'UniRichTextElement',
    'UniScrollViewElement',
    'UniSliderElement',
    'UniSwiperElement',
    'UniSwiperItemElement',
    'UniSwitchElement',
    'UniTextElement',
    'UniTextareaElement',
    'UniViewElement',
    'UniListViewElement',
    'UniListItemElement',
    'UniStickySectionElement',
    'UniStickyHeaderElement',
    'UniVideoElement',
    'UniWebViewElement',
    'UniMapElement',
    'UniCoverViewElement',
    'UniCoverImageElement',
    'UniPickerElement',
  ],
}
const cloudPreset = {
  '@dcloudio/uni-cloud': [['default', 'uniCloud'], 'UniCloudError'],
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
    'inject',
    'nextTick',
    'provide',
    'useCssModule',
    'createApp',
    'hasInjectionContext',

    // render
    'h',
    'mergeProps',
    'cloneVNode',
    'isVNode',
    'resolveComponent',
    'resolveDirective',
    'withDirectives',
    'withModifiers',

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
