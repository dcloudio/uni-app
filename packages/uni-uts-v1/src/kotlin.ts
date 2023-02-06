import os from 'os'
import fs from 'fs-extra'
import path, { join } from 'path'
import AdmZip from 'adm-zip'
import { sync } from 'fast-glob'
import { isArray } from '@vue/shared'
import type { UTSResult } from '@dcloudio/uts'
import { get } from 'android-versions'
import { normalizePath, parseJson, resolveSourceMapPath } from './shared'
import {
  CompilerServer,
  genUTSPlatformResource,
  getUTSCompiler,
  getCompilerServer,
  moveRootIndexSourceMap,
  resolveAndroidDir,
  resolvePackage,
  resolveUTSPlatformFile,
  resolveUTSSourceMapPath,
  ToKotlinOptions,
  genComponentsCode,
  parseKotlinPackageWithPluginId,
  isColorSupported,
} from './utils'
import { Module } from '../types/types'

interface KotlinCompilerServer extends CompilerServer {
  getKotlincHome(): string
  getDefaultJar(): string[]
  compile(
    options: { kotlinc: string[]; d8: string[] },
    projectPath: string
  ): Promise<boolean>
  checkDependencies?: (
    configJsonPath: string
  ) => Promise<{ code: number; msg: string; data: string[] }>
  checkRResources?: (resDir: string) => Promise<{
    code: number
    msg: string
    data: { jarPath: string; uniModuleName: string }
  }>
}

export function createKotlinResolveTypeReferenceName(
  _namespace: string,
  _ast: Module
) {
  return (name: string) => name
}

function parseKotlinPackage(filename: string) {
  const res = resolvePackage(filename)
  if (!res) {
    return { id: '', package: '' }
  }
  return {
    id: res.id,
    package: parseKotlinPackageWithPluginId(res.name, res.is_uni_modules),
  }
}

export async function runKotlinProd(
  filename: string,
  components: Record<string, string>
) {
  // 文件有可能是 app-ios 里边的，因为编译到 android 时，为了保证不报错，可能会去读取 ios 下的 uts
  if (filename.includes('app-ios')) {
    return
  }
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  let res = await compile(filename, {
    inputDir,
    outputDir,
    sourceMap: true,
    components,
  })
  if (!res) {
    return
  }
  genUTSPlatformResource(filename, {
    inputDir,
    outputDir,
    platform: 'app-android',
    extname: '.kt',
    components,
    package: parseKotlinPackage(filename).package + '.',
  })
}

export type RunKotlinDevResult = UTSResult & {
  type: 'kotlin'
  changed: string[]
}

export async function runKotlinDev(
  filename: string,
  components: Record<string, string>
): Promise<RunKotlinDevResult | undefined> {
  // 文件有可能是 app-ios 里边的，因为编译到 android 时，为了保证不报错，可能会去读取 ios 下的 uts
  if (filename.includes('app-ios')) {
    return
  }
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const result = (await compile(filename, {
    inputDir,
    outputDir,
    sourceMap: true,
    components,
  })) as RunKotlinDevResult
  if (!result) {
    return
  }

  result.type = 'kotlin'
  result.changed = []

  const kotlinFile = resolveUTSPlatformFile(filename, {
    inputDir,
    outputDir,
    platform: 'app-android',
    extname: '.kt',
    components,
    package: '',
  })
  // 开发模式下，需要生成 dex
  if (fs.existsSync(kotlinFile)) {
    const compilerServer = getCompilerServer<KotlinCompilerServer>(
      'uniapp-runextension'
    )
    if (!compilerServer) {
      throw `项目使用了uts插件，正在安装 uts Android 运行扩展...`
    }
    const {
      getDefaultJar,
      getKotlincHome,
      compile: compileDex,
      checkDependencies,
      checkRResources,
    } = compilerServer
    let deps: string[] = []
    if (checkDependencies) {
      deps = await checkDeps(filename, checkDependencies)
    }
    let resDeps: string[] = []
    if (checkRResources) {
      resDeps = await checkRes(filename, checkRResources)
    }
    // time = Date.now()
    const jarFile = resolveJarPath(kotlinFile)
    const options = {
      kotlinc: resolveKotlincArgs(
        kotlinFile,
        getKotlincHome(),
        getDefaultJar()
          .concat(resolveLibs(filename))
          .concat(deps)
          .concat(resDeps)
      ),
      d8: resolveD8Args(jarFile),
      sourceRoot: inputDir,
      sourceMapPath: resolveSourceMapFile(outputDir, kotlinFile),
    }
    const res = await compileDex(options, inputDir)
    // console.log('dex compile time: ' + (Date.now() - time) + 'ms')
    if (res) {
      try {
        fs.unlinkSync(jarFile)
        // 短期内先不删除，方便排查问题
        // fs.unlinkSync(kotlinFile)
      } catch (e) {}
      const dexFile = resolveDexFile(jarFile)
      if (fs.existsSync(dexFile)) {
        result.changed = [normalizePath(path.relative(outputDir, dexFile))]
      }
    }
    // else {
    //   throw `${normalizePath(
    //     path.relative(process.env.UNI_INPUT_DIR, filename)
    //   )} 编译失败`
    // }
  }
  return result
}

function checkDeps(
  filename: string,
  checkDependencies: (
    configJsonFile: string
  ) => Promise<{ code: number; msg: string; data: string[] }>
) {
  const configJsonFile = resolveConfigJsonFile(filename)
  if (configJsonFile && hasDeps(configJsonFile)) {
    return checkDependencies(configJsonFile).then(({ code, msg, data }) => {
      if (code !== 0) {
        console.error(msg)
        return []
      }
      return data
    })
  }
  return Promise.resolve([])
}

function hasDeps(configJsonFile: string) {
  const deps =
    parseJson(fs.readFileSync(configJsonFile, 'utf8')).dependencies || []
  if (isArray(deps) && deps.length) {
    return true
  }
  return false
}

function checkRes(
  filename: string,
  checkRResources: (resDir: string) => Promise<{
    code: number
    msg: string
    data: { jarPath: string; uniModuleName: string }
  }>
) {
  const resDir = resolveResDir(filename)
  if (resDir) {
    return checkRResources(resDir).then(({ code, msg, data }) => {
      if (code !== 0) {
        console.error(msg)
        return []
      }
      return [data.jarPath]
    })
  }
  return Promise.resolve([])
}

function resolveResDir(filename: string) {
  const resDir = path.resolve(resolveAndroidDir(filename), 'res')
  if (fs.existsSync(resDir)) {
    return resDir
  }
}

function resolveAndroidResourceClass(filename: string) {
  const resDir = resolveResDir(filename)
  if (resDir && fs.readdirSync(resDir).length) {
    const pkg = resolveAndroidManifestPackage(filename)
    if (pkg) {
      return pkg + '.R'
    }
  }
}

const packageRe = /\s+package="(.*)"/
function resolveAndroidManifestPackage(filename: string) {
  const manifestXmlPath = path.resolve(
    resolveAndroidDir(filename),
    'AndroidManifest.xml'
  )
  if (fs.existsSync(manifestXmlPath)) {
    const matches = fs.readFileSync(manifestXmlPath, 'utf8').match(packageRe)
    if (matches && matches[1]) {
      return matches[1]
    }
  }
}

const deps = ['AndroidManifest.xml', 'config.json']

export function resolveAndroidDepFiles(filename: string) {
  const dir = resolveAndroidDir(filename)
  return deps.map((dep) => path.resolve(dir, dep))
}

function resolveConfigJsonFile(filename: string) {
  const configJsonFile = path.resolve(
    resolveAndroidDir(filename),
    'config.json'
  )
  if (fs.existsSync(configJsonFile)) {
    return configJsonFile
  }
}

function resolveSourceMapFile(outputDir: string, kotlinFile: string) {
  return (
    path.resolve(resolveSourceMapPath(), path.relative(outputDir, kotlinFile)) +
    '.map'
  )
}

const DEFAULT_IMPORTS = [
  'kotlinx.coroutines.async',
  'kotlinx.coroutines.CoroutineScope',
  'kotlinx.coroutines.Deferred',
  'kotlinx.coroutines.Dispatchers',
  'io.dcloud.uts.*',
]

export async function compile(
  filename: string,
  { inputDir, outputDir, sourceMap, components }: ToKotlinOptions
) {
  const { bundle, UTSTarget } = getUTSCompiler()
  // let time = Date.now()
  const imports = [...DEFAULT_IMPORTS]
  const rClass = resolveAndroidResourceClass(filename)
  if (rClass) {
    imports.push(rClass)
  }
  const componentsCode = genComponentsCode(filename, components)
  const { package: pluginPackage, id: pluginId } = parseKotlinPackage(filename)
  const input: Parameters<typeof bundle>[1]['input'] = {
    root: inputDir,
    filename,
    pluginId,
    paths: {},
  }
  const isUTSFileExists = fs.existsSync(filename)
  if (componentsCode) {
    if (!isUTSFileExists) {
      input.fileContent = componentsCode
    } else {
      input.fileContent =
        fs.readFileSync(filename, 'utf8') + `\n` + componentsCode
    }
  } else {
    // uts文件不存在，且也无组件
    if (!isUTSFileExists) {
      return
    }
  }

  const result = await bundle(UTSTarget.KOTLIN, {
    input,
    output: {
      isPlugin: true,
      outDir: outputDir,
      package: pluginPackage,
      sourceMap: sourceMap ? resolveUTSSourceMapPath() : false,
      extname: 'kt',
      imports,
      logFilename: true,
      noColor: !isColorSupported(),
    },
  })
  sourceMap &&
    moveRootIndexSourceMap(filename, {
      inputDir,
      outputDir,
      platform: 'app-android',
      extname: '.kt',
      components,
      package: '',
    })
  return result
}

function resolveKotlincArgs(filename: string, kotlinc: string, jars: string[]) {
  return [
    filename,
    '-cp',
    resolveClassPath(jars),
    '-d',
    resolveJarPath(filename),
    '-kotlin-home',
    kotlinc,
  ]
}

function resolveD8Args(filename: string) {
  return [
    filename,
    '--no-desugaring',
    '--min-api',
    '19',
    '--output',
    resolveDexPath(filename),
  ]
}

function resolveLibs(filename: string) {
  const libsPath = path.resolve(resolveAndroidDir(filename), 'libs')
  const libs: string[] = []
  if (fs.existsSync(libsPath)) {
    libs.push(...sync('*.jar', { cwd: libsPath, absolute: true }))
    const zips = sync('*.aar', { cwd: libsPath })
    zips.forEach((name) => {
      const outputPath = resolveAndroidArchiveOutputPath(name)
      if (!fs.existsSync(outputPath)) {
        // 解压
        const zip = new AdmZip(path.resolve(libsPath, name))
        zip.extractAllTo(outputPath, true)
      }
      libs.push(
        ...sync('**/*.jar', {
          cwd: outputPath,
          absolute: true,
        })
      )
    })
  }
  return libs
}

function resolveAndroidArchiveOutputPath(aar?: string) {
  return path.resolve(
    process.env.UNI_OUTPUT_DIR,
    '../.uts/aar',
    aar ? aar.replace('.aar', '') : ''
  )
}
function resolveDexFile(jarFile: string) {
  return normalizePath(path.resolve(path.dirname(jarFile), 'classes.dex'))
}

function resolveDexPath(filename: string) {
  return path.dirname(filename)
}

function resolveJarPath(filename: string) {
  return filename.replace(path.extname(filename), '.jar')
}

function resolveClassPath(jars: string[]) {
  return jars.join(os.platform() === 'win32' ? ';' : ':')
}

export function checkAndroidVersionTips(
  pluginId: string,
  pluginDir: string,
  is_uni_modules: boolean
) {
  const configJsonFile = join(
    pluginDir,
    is_uni_modules ? 'utssdk' : '',
    'app-android',
    'config.json'
  )
  if (configJsonFile && fs.existsSync(configJsonFile)) {
    try {
      const configJson = parseJson(fs.readFileSync(configJsonFile, 'utf8'))
      if (configJson.minSdkVersion) {
        const androidVersion = get(configJson.minSdkVersion)
        if (androidVersion) {
          return `uts插件[${pluginId}]需在 Android ${androidVersion.semver} 版本及以上方可正常使用`
        }
      }
    } catch (e) {}
  }
}
