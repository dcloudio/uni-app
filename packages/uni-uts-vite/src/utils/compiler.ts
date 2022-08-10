import os from 'os'
import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'
import { once } from '@dcloudio/uni-shared'
import type { parse, bundle, UtsTarget } from '@dcloudio/uts'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import { camelize } from '@vue/shared'

export function getUtsCompiler(): {
  parse: typeof parse
  bundle: typeof bundle
  UtsTarget: typeof UtsTarget
} {
  // eslint-disable-next-line no-restricted-globals
  return require('@dcloudio/uts')
}
export async function compile(filename: string) {
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    return
  }
  const { bundle, UtsTarget } = getUtsCompiler()
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  let time = Date.now()
  await bundle({
    target: UtsTarget.KOTLIN,
    input: {
      root: inputDir,
      filename,
    },
    output: {
      outDir: outputDir,
      package: parsePackage(filename),
      sourceMap: true,
      extname: 'kt',
      imports: ['kotlinx.coroutines.*', 'io.dcloud.uts.runtime.*'],
    },
  })
  console.log('uts compile time: ' + (Date.now() - time) + 'ms')
  const kotlinFile = resolveKotlinFile(filename, inputDir, outputDir)
  if (process.env.NODE_ENV === 'production') {
    // 生产模式下，需要将 kt 文件转移到 src 下
    fs.mkdirSync(path.resolve(kotlinFile, '../src'))
    if (fs.existsSync(kotlinFile)) {
      fs.moveSync(kotlinFile, path.resolve(kotlinFile, '../src/index.kt'))
    }
    const kotlinMapFile = kotlinFile + '.map'
    if (fs.existsSync(kotlinMapFile)) {
      fs.moveSync(
        kotlinMapFile,
        path.resolve(kotlinFile, '../src/index.map.kt')
      )
    }

    const copies = ['assets', 'libs', 'res']
    const moduleDir = path.dirname(filename)
    const outputModuleDir = path.dirname(kotlinFile)
    fs.readdirSync(moduleDir).forEach((file) => {
      if (copies.includes(file)) {
        fs.copySync(
          path.join(moduleDir, file),
          path.join(outputModuleDir, file)
        )
      }
    })
  } else if (process.env.NODE_ENV === 'development') {
    // 开发模式下，需要生成 dex
    if (fs.existsSync(kotlinFile)) {
      time = Date.now()
      await compileKotlin(kotlinFile)
      console.log('kotlin compile time: ' + (Date.now() - time) + 'ms')
      const jarFile = resolveJarPath(kotlinFile)
      if (fs.existsSync(jarFile)) {
        time = Date.now()
        await d8(jarFile)
        console.log('d8 compile time: ' + (Date.now() - time) + 'ms')
        try {
          fs.unlinkSync(jarFile)
          // 短期内先不删除，方便排查问题
          // fs.unlinkSync(kotlinFile)
        } catch (e) {}
        const dexFile = resolveDexFile(jarFile)
        if (fs.existsSync(dexFile)) {
          return normalizePath(path.relative(outputDir, dexFile))
        }
      }
    }
  }
}

function resolveDexFile(jarFile: string) {
  return normalizePath(path.resolve(path.dirname(jarFile), 'classes.dex'))
}

function resolveKotlinFile(
  filename: string,
  inputDir: string,
  outputDir: string
) {
  return path
    .resolve(outputDir, path.relative(inputDir, filename))
    .replace(path.extname(filename), '.kt')
}

function resolveDirs(): { kotlinc: string; d8: string; lib: string } {
  // eslint-disable-next-line no-restricted-globals
  return require(path.resolve(
    process.env.UNI_HBUILDERX_PLUGINS,
    'uts-kotlin-compiler'
  ))
}

const resolveKotlinc = once(() => {
  const { kotlinc } = resolveDirs()
  return path.resolve(
    kotlinc,
    'bin',
    'kotlinc' + (os.platform() === 'win32' ? '.bat' : '')
  )
})

async function compileKotlin(filename: string) {
  const kotlinc = resolveKotlinc()
  await execa(
    kotlinc,
    [filename, '-cp', resolveClassPath(), '-d', resolveJarPath(filename)],
    {
      stdio: 'inherit',
    }
  )
}

async function d8(filename: string) {
  const java = resolveJavaPath()
  const d8 = resolveD8Path()
  await execa(
    java,
    [
      '-cp',
      d8,
      'com.android.tools.r8.D8',
      filename,
      '--no-desugaring',
      '--min-api',
      '19',
      '--output',
      resolveDexPath(filename),
    ],
    {
      stdio: 'inherit',
    }
  )
}

function resolveDexPath(filename: string) {
  return path.dirname(filename)
}

function resolveJarPath(filename: string) {
  return filename.replace(path.extname(filename), '.jar')
}

const resolveBuiltInClassPath = once(() => {
  const libDir = resolveDirs().lib
  return fs
    .readdirSync(libDir)
    .filter((file) => file.endsWith('.jar'))
    .map((file) => path.resolve(libDir, file))
})

function resolveClassPath() {
  return resolveBuiltInClassPath().join(os.platform() === 'win32' ? ';' : ':')
}

const resolveJavaPath = once(() => {
  return path.resolve(
    process.env.UNI_HBUILDERX_PLUGINS,
    'amazon-corretto',
    'bin/java'
  )
})

const resolveD8Path = once(() => {
  const { d8 } = resolveDirs()
  return path.resolve(d8, 'd8.jar')
})

export function parsePackage(filepath: string) {
  const parts = normalizePath(filepath).split('/')
  const index = parts.findIndex((part) => part === 'uni_modules')
  if (index > -1) {
    return 'uts.modules.' + camelize(parts[index + 1])
  }
  return ''
}
