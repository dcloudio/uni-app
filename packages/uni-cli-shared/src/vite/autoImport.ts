import { once } from '@dcloudio/uni-shared'
import type {
  ImportExtended,
  Options,
  ScanDir,
  ScanDirExportsOptions,
} from 'unplugin-auto-import/types'
import type { Unimport, UnimportOptions } from 'unimport'

import { getUTSCustomElementsExports } from '../uts'

export type AutoImportOptions = Options

const uniLifeCyclePreset = {
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

    // 其他
    'onShareTimeline',
    'onShareAppMessage',
    'onShareChat', // xhs-share

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

const uniMiniProgramPreset = {
  from: 'vue',
  imports: ['UniElement', 'UniElementImpl'],
}

const cloudPreset = {
  from: '@dcloudio/uni-cloud',
  imports: ['uniCloud', 'UniCloudError'],
}

const uniAppLifeCyclePreset = {
  from: 'vue',
  imports: [
    // ssr
    // ssrRef,
    // shallowSsrRef,
    // uni-app lifecycle
    // App and Page
    'onShow',
    'onHide',
    // App
    'onLaunch',
    'onError',
    'onThemeChange',
    // onKeyboardHeightChange,
    'onPageNotFound',
    'onUnhandledRejection',
    // onLastPageBackPress,
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

    // 其他
    'onShareTimeline',
    'onShareAppMessage',
    // onShareChat, // xhs-share

    // 辅助，用于自定义render函数时，开发者可以调用此方法渲染组件的slot
    'renderComponentSlot',
  ],
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
  rewriteAutoImportOnce()
  const autoImport = [vuePreset]
  // 只有app-ios和app-harmony平台特殊处理
  if (platform === 'app-ios' || platform === 'app-harmony') {
    autoImport.push(uniAppLifeCyclePreset)
  } else {
    autoImport.push(uniLifeCyclePreset)
  }
  // 内置框架编译时，不能注入这些内容
  if (!process.env.UNI_COMPILE_EXT_API_TYPE) {
    autoImport.push(cloudPreset)
  }
  if (platform === 'web') {
    autoImport.push(uniH5Preset)
  } else if (platform.startsWith('mp-')) {
    autoImport.push(uniMiniProgramPreset)
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

const rewriteAutoImportOnce = once(() => {
  const unimport = require('unimport')
  const originalCreateUnimport = unimport.createUnimport
  unimport.createUnimport = (opts: Partial<UnimportOptions>): Unimport => {
    const unimport_ = originalCreateUnimport(opts) as Unimport
    const originalScanImportsFromDir = unimport_.scanImportsFromDir
    unimport_.scanImportsFromDir = async (
      dir?: (string | ScanDir)[],
      options?: ScanDirExportsOptions
    ) => {
      const exports_ = (await originalScanImportsFromDir(
        dir,
        options
      )) as ImportExtended[]
      scanCustomElements(exports_)
      return exports_
    }
    return unimport_
  }
})

function scanCustomElements(exports_: ImportExtended[]) {
  const utsCustomElementsExports = getUTSCustomElementsExports()
  for (const [key, value] of utsCustomElementsExports.entries()) {
    value.exports.forEach((export_) => {
      exports_.push({
        from: key,
        name: export_[0],
      })
    })
  }
}
