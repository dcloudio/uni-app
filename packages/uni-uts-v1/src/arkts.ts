import path from 'path'
import fs from 'fs-extra'
import type { UTSBundleOptions } from '@dcloudio/uts'
import {
  addPluginInjectApis,
  getUTSCompiler,
  normalizeUTSResult,
  resolveBundleInputFileName,
  resolveBundleInputRoot,
  resolveCustomElements,
  resolveUTSSourceMapPath,
} from './utils'
import type { CompileResult } from '.'
import { sync } from 'fast-glob'
import { parseJson } from './shared'
import { parseUTSSyntaxError } from './stacktrace'

interface ArkTSCompilerOptions {
  isX?: boolean
  isExtApi?: boolean
  isOhpmPackage?: boolean
  sourceMap?: boolean
  uni_modules?: string[]
  rewriteConsoleExpr?: (fileName: string, content: string) => string
  transform?: {
    uniExtApiProviderName?: string
    uniExtApiProviderService?: string
    uniExtApiProviderServicePlugin?: string
  }
}

type AutoImportOptions = Record<string, [string, (string | undefined)?][]>

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

function getRuntimePackageName(isX = false) {
  return isX ? '@dcloudio/uni-app-x-runtime' : '@dcloudio/uni-app-runtime'
}

function tryRequire(file: string) {
  try {
    return require(file)
  } catch (e) {
    return {}
  }
}

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
    ? '../lib/arkts/uni-api-exports-x.json'
    : '../lib/arkts/uni-api-exports.json'
  const externalModuleExportsPath = isX
    ? '../lib/arkts/external-module-exports-x.json'
    : '../lib/arkts/external-module-exports.json'
  const internalModuleExportsPath = isX
    ? '../lib/arkts/internal-module-exports-x.json'
    : '../lib/arkts/internal-module-exports.json'
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

/**
 * 将config.json内的依赖相对路径转为oh-package.json5的依赖相对路径
 */
function parsePackageDeps(
  deps?: Record<string, string>
): Record<string, string> | undefined {
  if (!deps) {
    return
  }
  const base = '/'
  const result: Record<string, string> = {}
  for (const key in deps) {
    const value = deps[key]
    if (value.startsWith('file:.') || value.startsWith('.')) {
      const configRelativePath = value.replace(/^file:/, '')
      const packageRelativePath = path
        .relative(
          base,
          path.resolve(base, 'utssdk/app-harmony', configRelativePath)
        )
        .replace(/\\/g, '/')
      result[key] = packageRelativePath.startsWith('.')
        ? packageRelativePath
        : './' + packageRelativePath
    } else {
      result[key] = value
    }
  }
  return result
}

export async function compileArkTSExtApi(
  rootDir: string,
  pluginDir: string,
  outputDir: string,
  {
    isExtApi,
    isX,
    isOhpmPackage = false,
    sourceMap,
    uni_modules,
    rewriteConsoleExpr,
  }: ArkTSCompilerOptions
): Promise<CompileResult | void> {
  let filename = resolveAppHarmonyIndexFile(pluginDir)
  if (!filename) {
    // 如果有自定义组件，则使用自定义组件生成的index.uts
    const customElements = resolveCustomElements(pluginDir)
    if (Object.keys(customElements).length === 0) {
      return
    }
    filename = path.resolve(pluginDir, 'utssdk/app-harmony/index.uts')
  }
  const runtimePackageName = getRuntimePackageName(isX)

  const { bundle, UTSTarget } = getUTSCompiler()
  const pluginId = path.basename(pluginDir)
  const outputUniModuleDir = outputDir

  let autoImportExternals = getArkTSAutoImports(isX)

  if (isOhpmPackage) {
    // 只保留uni-app-runtime
    autoImportExternals = {
      [runtimePackageName]: autoImportExternals[runtimePackageName],
    }
  }

  const buildOptions: UTSBundleOptions = {
    hbxVersion: process.env.HX_Version || process.env.UNI_COMPILER_VERSION,
    input: {
      root: rootDir,
      filename: resolveBundleInputFileName('app-harmony', filename),
      paths: {
        '@dcloudio/uni-runtime': runtimePackageName,
      },
      uniModules: uni_modules,
      parseOptions: {
        tsx: true,
        noEarlyErrors: true,
        allowComplexUnionType: true,
        allowTsLitType: true,
      },
    },
    output: {
      errorFormat: 'json',
      outDir: outputUniModuleDir,
      outFilename: 'utssdk/app-harmony/index.ets',
      package: '',
      imports: [],
      sourceMap: sourceMap
        ? path.resolve(resolveUTSSourceMapPath(), 'uni_modules', pluginId)
        : false,
      extname: '.ets',
      logFilename: false,
      isPlugin: true,
      transform: {
        autoImportExternals,
        uniExtApiDefaultNamespace: '@dcloudio/uni-app-x-runtime',
      },
      treeshake: {
        noSideEffects: true,
      },
    },
  }
  const configFilePath = path.resolve(
    pluginDir,
    'utssdk/app-harmony/config.json'
  )

  const harmonyPackageName = '@uni_modules/' + pluginId.toLowerCase()
  const harmonyModuleName = harmonyPackageName
    .replace(/@/g, '')
    .replace(/\//g, '__')
    .replace(/-/g, '_')

  // 拷贝所有ets、har文件
  const etsFiles = sync('**/*.{ets,js,har,tgz}', {
    cwd: pluginDir,
  })
  const depEtsFiles: string[] = []
  for (const etsFile of etsFiles) {
    const srcFile = path.resolve(pluginDir, etsFile)
    const destFile = path.resolve(outputUniModuleDir, etsFile)
    if (/\.(ets|js)$/.test(etsFile)) {
      depEtsFiles.push(srcFile)
      if (rewriteConsoleExpr) {
        const content = fs.readFileSync(srcFile, 'utf8')
        const newContent = rewriteConsoleExpr(srcFile, content)
        fs.outputFileSync(destFile, newContent)
      } else {
        fs.copySync(srcFile, destFile)
      }
    } else {
      fs.copySync(srcFile, destFile)
    }
  }

  // generate oh-package.json5
  let version = '1.0.0'
  const packageJsonPath = path.resolve(pluginDir, 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = fs.readJSONSync(packageJsonPath)
    version = packageJson.version || '1.0.0'
  }
  const ohPackageJson: Record<string, any> = {
    name: harmonyPackageName,
    version,
    description: '',
    main: 'utssdk/app-harmony/index.ets',
    author: '',
    license: '',
    dependencies: (uni_modules || []).reduce((acc, dep) => {
      acc['@uni_modules/' + dep.toLowerCase()] = '../' + dep
      return acc
    }, {} as Record<string, string>),
  }

  if (isOhpmPackage) {
    ohPackageJson.description = 'uni-app runtime package'
    ohPackageJson.author = 'DCloud'
    ohPackageJson.license = 'Apache-2.0'
  }

  if (fs.existsSync(configFilePath)) {
    const config = fs.readJSONSync(configFilePath)
    ohPackageJson.dependencies = parsePackageDeps(config.dependencies)
    ohPackageJson.dynamicDependencies = parsePackageDeps(
      config.dynamicDependencies
    )
    ohPackageJson.devDependencies = parsePackageDeps(config.devDependencies)
    ohPackageJson.overrides = parsePackageDeps(config.overrides)
  }
  fs.outputJSONSync(
    path.resolve(outputUniModuleDir, 'oh-package.json5'),
    ohPackageJson,
    {
      spaces: 2,
    }
  )

  // copy resources
  const resourcesDir = path.resolve(pluginDir, 'utssdk/app-harmony/resources')
  if (fs.existsSync(resourcesDir)) {
    fs.copySync(
      resourcesDir,
      path.resolve(outputUniModuleDir, 'src/main/resources')
    )
  }

  // TODO 以下文件用户可定制
  // src/main/module.json5
  const moduleJson5Path = path.resolve(
    pluginDir,
    'utssdk/app-harmony/module.json5'
  )
  const defaultModuleJson5Module = {
    name: harmonyModuleName,
    type: 'har',
    deviceTypes: ['default', 'tablet', '2in1'],
  }
  if (fs.existsSync(moduleJson5Path)) {
    // merge module.json5
    const moduleJson5 = parseJson(
      fs.readFileSync(moduleJson5Path).toString('utf8')
    )
    if (!moduleJson5.module) {
      moduleJson5.module = defaultModuleJson5Module
    }
    moduleJson5.module = Object.assign(
      {},
      defaultModuleJson5Module,
      moduleJson5.module
    )
    fs.outputJSONSync(
      path.resolve(outputUniModuleDir, 'src/main/module.json5'),
      moduleJson5,
      {
        spaces: 2,
      }
    )
  } else {
    fs.outputJSONSync(
      path.resolve(outputUniModuleDir, 'src/main/module.json5'),
      {
        module: defaultModuleJson5Module,
      },
      {
        spaces: 2,
      }
    )
  }

  // build-profile.json5
  fs.outputJSONSync(
    path.resolve(outputUniModuleDir, 'build-profile.json5'),
    {
      apiType: 'stageMode',
      buildOption: {},
      buildOptionSet: [],
      targets: [
        {
          name: 'default',
          config: {
            buildOption: {
              arkOptions: {
                runtimeOnly: {
                  packages: [runtimePackageName],
                },
              },
            },
          },
        },
      ],
    },
    {
      spaces: 2,
    }
  )

  // hvigorfile.ts
  fs.outputFileSync(
    path.resolve(outputUniModuleDir, 'hvigorfile.ts'),
    `import { harTasks } from '@ohos/hvigor-ohos-plugin';

export default {
    system: harTasks,  /* Built-in plugin of Hvigor. It cannot be modified. */
    plugins:[]         /* Custom plugin to extend the functionality of Hvigor. */
}`
  )

  const result = await bundle(UTSTarget.ARKTS, buildOptions)

  if (!result) {
    return
  }
  if (result.error) {
    throw parseUTSSyntaxError(result.error, process.env.UNI_INPUT_DIR)
  }
  normalizeUTSResult('app-harmony', result)
  const deps: string[] = [filename, ...depEtsFiles]
  if (process.env.NODE_ENV === 'development') {
    if (result.deps) {
      deps.push(...result.deps)
    }
  }

  if (result.inject_apis && result.inject_apis.length) {
    addPluginInjectApis(result.inject_apis)
  }

  return {
    code: requireUTSPluginCode(pluginId, !!isExtApi),
    deps,
    encrypt: true,
    dir: outputUniModuleDir,
    inject_apis: [],
    scoped_slots: [],
    custom_elements: {},
  }
}

export async function compileArkTS(
  pluginDir: string,
  options: ArkTSCompilerOptions
): Promise<CompileResult | void> {
  const inputDir = process.env.UNI_INPUT_DIR
  const pluginId = path.basename(pluginDir)
  return compileArkTSExtApi(
    resolveBundleInputRoot('app-harmony', inputDir),
    pluginDir,
    resolveAppHarmonyUniModuleDir(pluginId),
    options
  )
}

export function requireUTSPluginCode(pluginId: string, _isExtApi: boolean) {
  // 应该不需要返回uni，全都使用requireUTSPlugin即可，因为extApi也可能导出其他内容自己内部使用，比如map组件+createMapContext
  // UNI_COMPILE_EXT_API_INPUT 是js-framework-next用来编译鸿蒙ext-api插件的js代码
  // 此时不能返回uni，应该返回uni.requireUTSPlugin('uni_modules/${pluginId}')
  // if (isExtApi && !process.env.UNI_COMPILE_EXT_API_INPUT) {
  //   return `export default uni`
  // }
  return `export default uni.requireUTSPlugin('uni_modules/${pluginId}')`
}

function resolveAppHarmonyIndexFile(pluginDir: string) {
  let indexFile = path.resolve(pluginDir, 'utssdk/app-harmony/index.uts')
  if (fs.existsSync(indexFile)) {
    return indexFile
  }
  indexFile = path.resolve(pluginDir, 'utssdk/index.uts')
  if (fs.existsSync(indexFile)) {
    return indexFile
  }
}

export function resolveAppHarmonyUniModulesRootDir() {
  if (process.env.UNI_APP_HARMONY_PROJECT_PATH) {
    return path.resolve(process.env.UNI_APP_HARMONY_PROJECT_PATH, 'uni_modules')
  }
  return path.resolve(process.env.UNI_OUTPUT_DIR, 'uni_modules')
}

export function resolveAppHarmonyUniModuleDir(pluginId: string) {
  return path.resolve(resolveAppHarmonyUniModulesRootDir(), pluginId)
}

export function resolveAppHarmonyUniModulesEntryDir() {
  if (process.env.UNI_APP_HARMONY_PROJECT_PATH) {
    return path.resolve(
      process.env.UNI_APP_HARMONY_PROJECT_PATH,
      'entry/src/main/ets/uni_modules'
    )
  }
  return path.resolve(process.env.UNI_OUTPUT_DIR, 'uni_modules')
}
