import os from 'os'
import fs from 'fs-extra'
import path from 'path'
import AdmZip from 'adm-zip'
import { sync } from 'fast-glob'

import {
  installHBuilderXPlugin,
  isInHBuilderX,
  normalizePath,
  resolveSourceMapPath,
} from '@dcloudio/uni-cli-shared'
import {
  genUTSPlatformResource,
  getUtsCompiler,
  resolveAndroidDir,
  resolvePackage,
  resolveUTSPlatformFile,
} from './utils'
import { Module } from '../../../types/types'

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

export async function runKotlinDev(filename: string) {
  // 文件有可能是 app-ios 里边的，因为编译到 android 时，为了保证不报错，可能会去读取 ios 下的 uts
  if (filename.includes('app-ios')) {
    return
  }
  await compile(filename)
  const kotlinFile = resolveUTSPlatformFile(filename, {
    inputDir: process.env.UNI_INPUT_DIR,
    outputDir: process.env.UNI_OUTPUT_DIR,
    platform: 'app-android',
    extname: '.kt',
  })
  // 开发模式下，需要生成 dex
  if (fs.existsSync(kotlinFile)) {
    const compilerServer = getCompilerServer()
    if (!compilerServer) {
      return
    }
    const { getDefaultJar, getKotlincHome, compile } = compilerServer
    // time = Date.now()
    const jarFile = resolveJarPath(kotlinFile)
    const options = {
      kotlinc: resolveKotlincArgs(
        kotlinFile,
        getKotlincHome(),
        getDefaultJar().concat(resolveLibs(filename))
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
        return normalizePath(path.relative(process.env.UNI_OUTPUT_DIR, dexFile))
      }
    }
  }
}

function resolveSourceMapFile(outputDir: string, kotlinFile: string) {
  return (
    path.resolve(resolveSourceMapPath(), path.relative(outputDir, kotlinFile)) +
    '.map'
  )
}

async function compile(filename: string) {
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    return
  }
  const { bundle, UtsTarget } = getUtsCompiler()
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // let time = Date.now()
  await bundle(UtsTarget.KOTLIN, {
    input: {
      root: inputDir,
      filename,
    },
    output: {
      isPlugin: true,
      outDir: outputDir,
      package: parseKotlinPackage(filename).package,
      sourceMap: resolveSourceMapPath(),
      extname: 'kt',
      imports: [
        'kotlinx.coroutines.async',
        'kotlinx.coroutines.CoroutineScope',
        'kotlinx.coroutines.Deferred',
        'kotlinx.coroutines.Dispatchers',
        'io.dcloud.uts.*',
      ],
      logFilename: true,
      noColor: isInHBuilderX(),
    },
  })
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
    })
    if (zips.length) {
      libs.push(
        ...sync('*/*.jar', {
          cwd: resolveAndroidArchiveOutputPath(),
          absolute: true,
        })
      )
    }
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

const getCompilerServer = ():
  | {
      getKotlincHome(): string
      getDefaultJar(): string[]
      compile(
        options: { kotlinc: string[]; d8: string[] },
        projectPath: string
      ): Promise<boolean>
    }
  | false => {
  try {
    const compilerServerPath = path.resolve(
      process.env.UNI_HBUILDERX_PLUGINS,
      'uniapp-runextension/out/main.js'
    )
    // eslint-disable-next-line no-restricted-globals
    return require(compilerServerPath)
  } catch (e) {
    installHBuilderXPlugin('uniapp-runextension')
  }
  return false
}
