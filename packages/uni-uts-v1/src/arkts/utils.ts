export function getRuntimePackageName(isX = false) {
  return isX ? '@dcloudio/uni-app-x-runtime' : '@dcloudio/uni-app-runtime'
}

function tryRequire(file: string) {
  try {
    return require(file)
  } catch (e) {
    return {}
  }
}

type AutoImportOptions = Record<string, [string, (string | undefined)?][]>

export function getArkTSAutoImports(isX = false): AutoImportOptions {
  const runtimePackageName = getRuntimePackageName(isX)
  const runtimeExports: [string][] = [
    // uts basic
    ['UTS'],
    ['defineAsyncApi'],
    ['defineSyncApi'],
    ['defineTaskApi'],
    ['defineOnApi'],
    ['defineOffApi'],
    ['getUniProvider'],
    ['getUniProviders'],
    ['string'],
    ['AsyncApiSuccessResult'],
    ['AsyncApiResult'],
    ['ApiExecutor'],
    ['ComponentInternalInstance'],
    ['ComponentPublicInstance'],
    ['IUniError'],
    ['ProtocolOptions'],
    ['ApiOptions'],
    ['ApiError'],
    ['UniError'],
    ['UniProvider'],
    ['uni'],
    ['IUTSObject'],
    ['UTSObject'],
    ['UTSJSONObject'],
    ['SourceError'],
    ['UTSHarmony'],
    ['resolveInOperator'],
    ['IJSONStringify'],
    ['IUTSDefaultGenericParent'],
    ['UniElement'], // 注意非uni-app-x也有导出此类型，目前仅为了兼容uni-verify
  ]
  if (isX) {
    runtimeExports.push(
      // uni-app-x-runtime ets
      ['customElements'],
      ['UniCustomElement'],
      // ['UniElement'],
      ['UniElementImpl'],
      ['document'],
      ['UniPage'],
      ['UniPageImpl'],
      ['UniPointerEvent'],
      ['UniTouchEvent'],
      ['UniFormControl'],
      ['UniFormControlElement'],
      ['IUniForm'],
      ['UniNativeViewElementImpl'],
      ['UniNativeViewElement'],
      ['UniNativeViewEvent'],
      ['UniTextElement'],
      ['UniWebViewElement'],
      ['UniWebViewMessageEvent'],
      ['UniWebViewMessageEventDetail'],
      ['UniWebViewContentHeightChangeEvent'],
      ['UniWebViewContentHeightChangeEventDetail'],
      ['UniWebViewErrorEvent'],
      ['UniWebViewErrorEventDetail'],
      ['UniWebViewDownloadEvent'],
      ['UniWebViewDownloadEventDetail'],
      ['UniWebViewLoadingEvent'],
      ['UniWebViewLoadingEventDetail'],
      ['UniWebViewLoadEvent'],
      ['UniWebViewLoadEventDetail'],
      ['UniWebViewElementLoadDataOptions'],
      ['uni'],
      ['UTSHarmony'],
      ['UniCustomEvent'],
      ['UniCustomEventOptions'],
      ['getCurrentPages'],
      ['UniRefresherEventDetail'],
      ['UniRefresherEvent'],
      ['UniScrollEventDetail'],
      ['UniScrollEvent'],
      ['UniScrollToLowerEventDetail'],
      ['UniScrollToLowerEvent'],
      ['UniScrollToUpperEventDetail'],
      ['UniScrollToUpperEvent'],
      ['DOMRect'],
      ['DrawableContext'],
      ['UniResizeObserver'],
      ['UniResizeObserverEntry'],
      ['UniBorderBoxSize'],
      ['UniContentBoxSize'],
      ['UniDevicePixelContentBoxSize'],
      ['UniIntersectionObserver'],
      ['createIntersectionObserver'],
      ['CreateIntersectionObserverOptions'],
      ['UniIntersectionObserverMargins'],
      ['UniIntersectionObserverRectResult'],
      ['UniIntersectionObserverObserveCallbackResult'],
      ['UniIntersectionObserverObserveCallback'],
      ['TextDecoder'],
      ['TextEncoder'],
      ['ShowModalOptions'],

      // element
      ['UniViewElementImpl'],
      ['UniLazyViewElementImpl'],
      ['UniTextElementImpl'],
      ['UniWebViewElementImpl'],
      ['UniImageElementImpl'],
      ['UniScrollViewElementImpl'],
      ['UniListViewElementImpl'],
      ['UniListItemElementImpl'],
      ['UniStickySectionElementImpl'],
      ['UniStickyHeaderElementImpl'],
      ['UniNestedScrollHeaderElementImpl'],
      ['UniNestedScrollBodyElementImpl'],
      ['UniInputElementImpl'],
      ['UniTextareaElementImpl'],
      ['UniSwiperElementImpl'],
      ['UniSwiperItemElementImpl'],
      ['UniRichTextElementImpl'],
      ['UniTabsElementImpl'],
      ['UniWebViewElementImpl'],

      // uni-app-x-runtime framwork js
      ['CreateSelectorQuery'],
      ['SelectorQueryNodeInfoCallback'],
      ['NodeInfo'],
      ['NodeField'],
      ['NodesRef'],
      ['SelectorQuery'],
      ['OpenDialogPageOptions'],
      ['OpenDialogPageSuccess'],
      ['OpenDialogPageFail'],
      ['OpenDialogPageComplete'],
      ['CloseDialogPageOptions'],
      ['CloseDialogPageSuccess'],
      ['CloseDialogPageFail'],
      ['CloseDialogPageComplete'],
      ['NavigateToOptions'],
      ['NavigateToSuccess'],
      ['NavigateToFail'],
      ['NavigateToComplete'],
      ['NavigateBackOptions'],
      ['NavigateBackSuccess'],
      ['NavigateBackFail'],
      ['NavigateBackComplete'],
      ['RedirectToOptions'],
      ['RedirectToSuccess'],
      ['RedirectToFail'],
      ['RedirectToComplete'],
      ['ReLaunchOptions'],
      ['ReLaunchSuccess'],
      ['ReLaunchFail'],
      ['ReLaunchComplete'],
      ['SwitchTabOptions'],
      ['SwitchTabSuccess'],
      ['SwitchTabFail'],
      ['SwitchTabComplete'],
      ['HideTabBarOptions'],
      ['HideTabBarSuccess'],
      ['HideTabBarFail'],
      ['HideTabBarComplete'],
      ['ShowTabBarOptions'],
      ['ShowTabBarSuccess'],
      ['ShowTabBarFail'],
      ['ShowTabBarComplete'],
      ['ShowTabBarRedDotOptions'],
      ['ShowTabBarRedDotSuccess'],
      ['ShowTabBarRedDotFail'],
      ['ShowTabBarRedDotComplete'],
      ['HideTabBarRedDotOptions'],
      ['HideTabBarRedDotSuccess'],
      ['HideTabBarRedDotFail'],
      ['HideTabBarRedDotComplete'],
      ['RemoveTabBarBadgeOptions'],
      ['RemoveTabBarBadgeSuccess'],
      ['RemoveTabBarBadgeFail'],
      ['RemoveTabBarBadgeComplete'],
      ['SetTabBarBadgeOptions'],
      ['SetTabBarBadgeSuccess'],
      ['SetTabBarBadgeFail'],
      ['SetTabBarBadgeComplete'],
      ['SetTabBarItemOptions'],
      ['SetTabBarItemSuccess'],
      ['SetTabBarItemFail'],
      ['SetTabBarItemComplete'],
      ['SetTabBarStyleOptions'],
      ['SetTabBarStyleSuccess'],
      ['SetTabBarStyleFail'],
      ['SetTabBarStyleComplete'],
      ['PageScrollToOptions'],
      ['PageScrollToSuccess'],
      ['PageScrollToFail'],
      ['PageScrollToComplete'],
      ['PageScrollToErrorCode'],
      ['AddInterceptorOptions'],
      ['RemoveInterceptorOptions'],
      ['SetNavigationBarColorOptions'],
      ['SetNavigationBarColorSuccess'],
      ['SetNavigationBarColorFail'],
      ['SetNavigationBarColorComplete'],
      ['SetNavigationBarTitleOptions'],
      ['SetNavigationBarTitleSuccess'],
      ['SetNavigationBarTitleFail'],
      ['SetNavigationBarTitleComplete'],
      ['ShowNavigationBarLoadingOptions'],
      ['ShowNavigationBarLoadingSuccess'],
      ['ShowNavigationBarLoadingFail'],
      ['HideNavigationBarLoadingOptions'],
      ['HideNavigationBarLoadingSuccess'],
      ['HideNavigationBarLoadingFail'],
      ['StartPullDownRefreshOptions'],
      ['StartPullDownRefreshSuccess'],
      ['StartPullDownRefreshFail'],
      ['StartPullDownRefreshComplete'],

      // 其他
      ['CanvasRenderingContext2D'],
      ['requestAnimationFrame'],
      ['cancelAnimationFrame'],
      ['Image'],
      ['Path2D'],

      // copy from uni-preset
      // ssr
      ['ssrRef'],
      ['shallowSsrRef'],
      // uni-app lifecycle
      // App and Page
      ['onShow'],
      ['onHide'],
      // App
      ['onLaunch'],
      ['onError'],
      ['onThemeChange'],
      ['onKeyboardHeightChange'],
      ['onPageNotFound'],
      ['onUnhandledRejection'],
      ['onLastPageBackPress'],
      ['onExit'],
      // Page
      ['onPageShow'],
      ['onPageHide'],
      ['onLoad'],
      ['onReady'],
      ['onUnload'],
      ['onResize'],
      ['onBackPress'],
      ['onPageScroll'],
      ['onTabItemTap'],
      ['onReachBottom'],
      ['onPullDownRefresh'],
      ['OnBackPressOptions'],
      ['OnLaunchOptions'],
      ['OnLoadOptions'],
      ['OnPageScrollOptions'],
      ['OnResizeOptions'],

      // copy from vue-preset
      // vue lifecycle
      ['onActivated'],
      ['onBeforeMount'],
      ['onBeforeUnmount'],
      ['onBeforeUpdate'],
      ['onErrorCaptured'],
      ['onDeactivated'],
      ['onMounted'],
      ['onServerPrefetch'],
      ['onUnmounted'],
      ['onUpdated'],

      // setup helpers
      ['useAttrs'],
      ['useSlots'],

      // reactivity,
      ['computed'],
      ['customRef'],
      ['isReadonly'],
      ['isRef'],
      ['isProxy'],
      ['isReactive'],
      ['markRaw'],
      ['reactive'],
      ['readonly'],
      ['ref'],
      ['shallowReactive'],
      ['shallowReadonly'],
      ['shallowRef'],
      ['triggerRef'],
      ['toRaw'],
      ['toRef'],
      ['toRefs'],
      ['toValue'],
      ['unref'],
      ['watch'],
      ['watchEffect'],
      ['watchPostEffect'],
      ['watchSyncEffect'],

      // component
      ['defineComponent'],
      ['defineAsyncComponent'],
      ['getCurrentInstance'],
      ['inject'],
      ['nextTick'],
      ['provide'],
      ['useCssModule'],
      ['createApp'],
      ['hasInjectionContext'],

      // render
      ['h'],
      ['mergeProps'],
      ['cloneVNode'],
      ['isVNode'],
      ['resolveComponent'],
      ['resolveDirective'],
      ['withDirectives'],
      ['withModifiers'],

      // effect scope
      ['effectScope'],
      ['EffectScope'],
      ['getCurrentScope'],
      ['onScopeDispose']
    )
  }

  const uniApiExportsPath = isX
    ? '../../lib/arkts/uni-api-exports-x.json'
    : '../../lib/arkts/uni-api-exports.json'
  const externalModuleExportsPath = isX
    ? '../../lib/arkts/external-module-exports-x.json'
    : '../../lib/arkts/external-module-exports.json'
  const internalModuleExportsPath = isX
    ? '../../lib/arkts/internal-module-exports-x.json'
    : '../../lib/arkts/internal-module-exports.json'
  /**
   * uni.api.ets
   */
  const uniApiExports = tryRequire(uniApiExportsPath)
  /**
   * uni-video、uni-canvas、uni-chooseLocation等内置component、api。uni_module目录下包含
   */
  const internalModuleExports: AutoImportOptions =
    process.env.UNI_COMPILE_TARGET === 'ext-api' || !isX
      ? {}
      : tryRequire(internalModuleExportsPath)
  /**
   * uni-push等外部api
   */
  const externalModuleExports: AutoImportOptions =
    process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? {}
      : tryRequire(externalModuleExportsPath)

  const autoImports = mergeArkTSAutoImports(
    {
      [runtimePackageName]: runtimeExports,
    },
    uniApiExports,
    internalModuleExports,
    externalModuleExports
  )
  // TODO 引用的runtime包名根据内置外置切换
  return autoImports
}

export function mergeArkTSAutoImports(
  ...autoImports: AutoImportOptions[]
): AutoImportOptions {
  const keys = autoImports.reduce((keys, autoImport) => {
    for (const key of Object.keys(autoImport)) {
      keys.add(key)
    }
    return keys
  }, new Set<string>())
  const result: AutoImportOptions = {}
  for (const key of keys) {
    const imports = autoImports.map((autoImport) => autoImport[key] || [])
    result[key] = imports.reduce((imports, currentImports) => {
      for (const currentImport of currentImports) {
        if (!imports.some((importItem) => importItem[0] === currentImport[0])) {
          imports.push(currentImport)
        }
      }
      return imports
    }, [] as [string, (string | undefined)?][])
  }
  return result
}
