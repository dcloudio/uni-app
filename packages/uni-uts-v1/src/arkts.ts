import path from 'path'
import fs from 'fs-extra'
import type { UTSBundleOptions } from '@dcloudio/uts'
import {
  getUTSCompiler,
  normalizeUTSResult,
  resolveBundleInputFileName,
  resolveBundleInputRoot,
} from './utils'
import type { CompileResult } from '.'
import { sync } from 'fast-glob'

interface ArkTSCompilerOptions {
  isX?: boolean
  isExtApi?: boolean
  transform?: {
    uniExtApiProviderName?: string
    uniExtApiProviderService?: string
    uniExtApiProviderServicePlugin?: string
  }
}

type AutoImportOptions = Record<string, [string, (string | undefined)?][]>

export function mergeArkTSAutoImports(
  base: AutoImportOptions,
  ext: AutoImportOptions
): AutoImportOptions {
  const keys = new Set([...Object.keys(base), ...Object.keys(ext)])
  const result: AutoImportOptions = {}
  for (const key of keys) {
    const baseImports = base[key] || []
    const extImports = ext[key] || []
    result[key] = [...baseImports, ...extImports]
  }
  return result
}

export function getArkTSAutoImports(): AutoImportOptions {
  return mergeArkTSAutoImports(
    {
      '@dcloudio/uni-app-runtime': [
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
      ],
    },
    require('../lib/arkts/ext-api-export.json')
  )
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
  { isExtApi, transform }: ArkTSCompilerOptions
): Promise<CompileResult | void> {
  const filename = resolveAppHarmonyIndexFile(pluginDir)
  if (!filename) {
    return
  }

  const { bundle, UTSTarget } = getUTSCompiler()
  const pluginId = path.basename(pluginDir)
  const outputUniModuleDir = outputDir

  const autoImportExternals = getArkTSAutoImports()

  const buildOptions: UTSBundleOptions = {
    hbxVersion: process.env.HX_Version || process.env.UNI_COMPILER_VERSION,
    input: {
      root: rootDir,
      filename: resolveBundleInputFileName('app-harmony', filename),
      paths: {
        '@dcloudio/uni-runtime': '@dcloudio/uni-app-runtime',
      },
      parseOptions: {
        tsx: true,
        noEarlyErrors: true,
        allowComplexUnionType: true,
        allowTsLitType: true,
      },
    },
    output: {
      outDir: outputUniModuleDir,
      outFilename: 'utssdk/app-harmony/index.ets',
      package: '',
      imports: [],
      sourceMap: false,
      extname: '.ets',
      logFilename: false,
      isPlugin: true,
      transform: {
        autoImportExternals,
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

  const harmonyPackageName = '@uni_modules/' + pluginId
  const harmonyModuleName = harmonyPackageName
    .replace(/@/g, '')
    .replace(/\//g, '__')
    .replace(/-/g, '_')

  // 拷贝所有ets、har文件
  const etsFiles = sync('**/*.{ets,har}', {
    cwd: pluginDir,
  })
  for (const etsFile of etsFiles) {
    fs.copySync(
      path.resolve(pluginDir, etsFile),
      path.resolve(outputUniModuleDir, etsFile)
    )
  }

  // generate oh-package.json5
  const ohPackageJson: Record<string, any> = {
    name: harmonyPackageName,
    version: '1.0.0',
    description: '',
    main: 'utssdk/app-harmony/index.ets',
    author: '',
    license: '',
    dependencies: {},
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
  fs.outputJSONSync(
    path.resolve(outputUniModuleDir, 'src/main/module.json5'),
    {
      module: {
        name: harmonyModuleName,
        type: 'har',
        deviceTypes: ['default', 'tablet', '2in1'],
      },
    },
    {
      spaces: 2,
    }
  )

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
  normalizeUTSResult('app-harmony', result)
  const deps: string[] = [filename]
  if (process.env.NODE_ENV === 'development') {
    if (result.deps) {
      deps.push(...result.deps)
    }
  }
  return {
    code: requireUTSPluginCode(pluginId, !!isExtApi),
    deps,
    encrypt: true,
    dir: outputUniModuleDir,
    inject_apis: [],
    scoped_slots: [],
  }
}

export async function compileArkTS(
  pluginDir: string,
  { isExtApi, transform }: ArkTSCompilerOptions
): Promise<CompileResult | void> {
  const inputDir = process.env.UNI_INPUT_DIR
  const pluginId = path.basename(pluginDir)
  return compileArkTSExtApi(
    resolveBundleInputRoot('app-harmony', inputDir),
    pluginDir,
    resolveAppHarmonyUniModuleDir(pluginId),
    { isExtApi, transform }
  )
}

function requireUTSPluginCode(pluginId: string, isExtApi: boolean) {
  if (isExtApi) {
    return `export default uni`
  }
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
