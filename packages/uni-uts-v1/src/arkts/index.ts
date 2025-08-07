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
} from '../utils'
import type { CompileResult } from '../index'
import { sync } from 'fast-glob'
import { parseJson } from '../shared'
import { parseUTSSyntaxError } from '../stacktrace'
import { getArkTSAutoImports, getRuntimePackageName } from './utils'
import { compileEncrypt } from './encrypt'
import { isEncrypt } from '../encrypt'

export { getArkTSAutoImports } from './utils'
export { bundleArkTS } from './compiler'
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
  // 加密插件
  if (isEncrypt(pluginDir)) {
    return compileEncrypt(pluginDir, options.isX)
  }
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
