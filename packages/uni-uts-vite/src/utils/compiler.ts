import os from 'os'
import fs from 'fs'
import path from 'path'
import execa from 'execa'
import { once } from '@dcloudio/uni-shared'
import type { parse, bundle, UtsTarget } from '@dcloudio/uts'

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
      sourceMap: true,
      extname: 'kt',
    },
  })
  console.log('uts compile time: ' + (Date.now() - time) + 'ms')
  const kotlinFile = resolveKotlinFile(filename, inputDir, outputDir)
  if (fs.existsSync(kotlinFile)) {
    time = Date.now()
    await compileKotlin(kotlinFile)
    console.log('kotlin compile time: ' + (Date.now() - time) + 'ms')
    const jarFile = resolveJarPath(kotlinFile)
    if (fs.existsSync(jarFile)) {
      time = Date.now()
      await d8(jarFile)
      console.log('d8 compile time: ' + (Date.now() - time) + 'ms')
    }
  }
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
