import path from 'path'
import fs from 'fs-extra'
import type { UTSBundleOptions } from '@dcloudio/uts'
import { formatUniProviderName, getUTSCompiler } from './utils'
import type { CompileResult } from '.'

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
      '@dcloudio/uts-harmony': [
        ['IUTSObject'],
        ['UTSObject'],
        ['UTSJSONObject'],
      ],
      '@dcloudio/uni-app-harmony': [
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
      ],
      '@dcloudio/uni-app-harmony-framework': [['uni']],
    },
    require('../lib/arkts/ext-api-export.json')
  )
}
export async function compileArkTS(
  pluginDir: string,
  { isExtApi, transform }: ArkTSCompilerOptions
): Promise<CompileResult | void> {
  if (!process.env.UNI_APP_HARMONY_PROJECT_PATH) {
    console.error('manifest.json -> app-harmony -> projectPath is required')
    process.exit(0)
  }
  const filename = resolveAppHarmonyIndexFile(pluginDir)
  if (!filename) {
    return
  }

  const { bundle, UTSTarget } = getUTSCompiler()
  const pluginId = path.basename(pluginDir)
  const inputDir = process.env.UNI_INPUT_DIR
  const projectPath = process.env.UNI_APP_HARMONY_PROJECT_PATH
  const outputUniModuleDir = resolveAppHarmonyUniModuleDir(
    projectPath,
    pluginId
  )

  const autoImportExternals = getArkTSAutoImports()
  if (transform && transform.uniExtApiProviderService) {
    autoImportExternals['@dcloudio/uni-app-harmony'].push([
      formatUniProviderName(transform.uniExtApiProviderService),
    ])
  }

  const buildOptions: UTSBundleOptions = {
    hbxVersion: process.env.HX_Version || process.env.UNI_COMPILER_VERSION,
    input: {
      root: inputDir,
      filename,
      paths: {
        '@dcloudio/uni-runtime': '@dcloudio/uni-app-harmony-framework',
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
  const result = await bundle(UTSTarget.ARKTS, buildOptions)
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

export function resolveAppHarmonyUniModulesRootDir(projectPath: string) {
  return path.resolve(projectPath, 'entry/src/main/ets/uni_modules')
}

function resolveAppHarmonyUniModuleDir(projectPath: string, pluginId: string) {
  return path.resolve(resolveAppHarmonyUniModulesRootDir(projectPath), pluginId)
}
