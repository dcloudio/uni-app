import os from 'os'
import fs from 'fs-extra'
import path from 'path'
import AdmZip from 'adm-zip'
import { sync } from 'fast-glob'
import { isArray } from '@vue/shared'
import {
  isInHBuilderX,
  normalizePath,
  parseJson,
  resolveSourceMapPath,
} from './shared'
import {
  CompilerServer,
  genUTSPlatformResource,
  getUtsCompiler,
  getCompilerServer,
  moveRootIndexSourceMap,
  resolveAndroidDir,
  resolvePackage,
  resolveUTSPlatformFile,
  resolveUTSSourceMapPath,
} from './utils'
import { Module } from '../types/types'
import { UtsResult } from '@dcloudio/uts'

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
    return { package: '' }
  }
  return {
    package: 'uts.sdk.' + (res.is_uni_modules ? 'modules.' : '') + res.name,
  }
}

export async function runKotlinProd(filename: string) {
  // 文件有可能是 app-ios 里边的，因为编译到 android 时，为了保证不报错，可能会去读取 ios 下的 uts
  if (filename.includes('app-ios')) {
    return
  }
  await compile(filename)
  genUTSPlatformResource(filename, {
    inputDir: process.env.UNI_INPUT_DIR,
    outputDir: process.env.UNI_OUTPUT_DIR,
    platform: 'app-android',
    extname: '.kt',
  })
}

export type RunKotlinDevResult = UtsResult & {
  type: 'kotlin'
  changed: string[]
}

export async function runKotlinDev(
  filename: string
): Promise<RunKotlinDevResult | undefined> {
  // 文件有可能是 app-ios 里边的，因为编译到 android 时，为了保证不报错，可能会去读取 ios 下的 uts
  if (filename.includes('app-ios')) {
    return
  }
  const result = (await compile(filename)) as RunKotlinDevResult

  result.type = 'kotlin'
  result.changed = []

  const kotlinFile = resolveUTSPlatformFile(filename, {
    inputDir: process.env.UNI_INPUT_DIR,
    outputDir: process.env.UNI_OUTPUT_DIR,
    platform: 'app-android',
    extname: '.kt',
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
      compile,
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
      sourceRoot: process.env.UNI_INPUT_DIR,
      sourceMapPath: resolveSourceMapFile(
        process.env.UNI_OUTPUT_DIR,
        kotlinFile
      ),
    }
    const res = await compile(options, process.env.UNI_INPUT_DIR)
    // console.log('dex compile time: ' + (Date.now() - time) + 'ms')
    if (res) {
      try {
        fs.unlinkSync(jarFile)
        // 短期内先不删除，方便排查问题
        // fs.unlinkSync(kotlinFile)
      } catch (e) {}
      const dexFile = resolveDexFile(jarFile)
      if (fs.existsSync(dexFile)) {
        result.changed = [
          normalizePath(path.relative(process.env.UNI_OUTPUT_DIR, dexFile)),
        ]
      }
    }
    // else {
    //   throw `${normalizePath(
    //     path.relative(process.env.UNI_INPUT_DIR, filename)
    //   )} 编译失败`
    // }
    if (process.env.HX_USE_BASE_TYPE === 'standard') {
      if (!isSupportStandardPlayground(filename)) {
        const pkg = resolvePackage(filename)
        if (pkg) {
          console.warn(
            `uts插件[${pkg.id}]依赖的原生配置或三方SDK在运行至标准基座时不能生效，如需正常调用请使用自定义基座`
          )
        }
      }
    }
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

async function compile(filename: string) {
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    throw 'process.env.UNI_HBUILDERX_PLUGINS is not found'
  }
  const { bundle, UtsTarget } = getUtsCompiler()
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // let time = Date.now()
  const imports = [...DEFAULT_IMPORTS]
  const rClass = resolveAndroidResourceClass(filename)
  if (rClass) {
    imports.push(rClass)
  }
  const result = await bundle(UtsTarget.KOTLIN, {
    input: {
      root: inputDir,
      filename,
    },
    output: {
      isPlugin: true,
      outDir: outputDir,
      package: parseKotlinPackage(filename).package,
      sourceMap: resolveUTSSourceMapPath(filename),
      extname: 'kt',
      imports,
      logFilename: true,
      noColor: isInHBuilderX(),
    },
  })
  moveRootIndexSourceMap(filename, {
    inputDir: process.env.UNI_INPUT_DIR,
    outputDir: process.env.UNI_OUTPUT_DIR,
    platform: 'app-android',
    extname: '.kt',
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

const checkFiles = ['AndroidManifest.xml']
const checkDirs = ['libs', 'assets', 'res']
/**
 * 当前插件是否支持标准基座运行
 * @param filename
 * @returns
 */
function isSupportStandardPlayground(filename: string) {
  const baseDir = resolveAndroidDir(filename)
  if (checkFiles.find((file) => fs.existsSync(path.resolve(baseDir, file)))) {
    return false
  }
  if (
    checkDirs.find((dir) => {
      const absDir = path.resolve(baseDir, dir)
      return fs.existsSync(absDir) && fs.readdirSync(absDir).length
    })
  ) {
    return false
  }
  const configJsonFile = resolveConfigJsonFile(filename)
  if (configJsonFile && hasDeps(configJsonFile)) {
    return false
  }
  return true
}
