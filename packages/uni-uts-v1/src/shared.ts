import os from 'os'
import path from 'path'
import { parse } from 'jsonc-parser'

export function parseJson(jsonStr: string) {
  return parse(jsonStr)
}

export function once<T extends (...args: any[]) => any>(
  fn: T,
  ctx: unknown = null
): T {
  let res: any
  return ((...args: any[]) => {
    if (fn) {
      res = fn.apply(ctx, args)
      fn = null as any
    }
    return res
  }) as T
}

export const runByHBuilderX = once(() => {
  return (
    !!process.env.UNI_HBUILDERX_PLUGINS &&
    (!!process.env.RUN_BY_HBUILDERX || !!process.env.HX_Version)
  )
})

export const isInHBuilderX = once(() => {
  // 自动化测试传入了 HX_APP_ROOT(其实就是UNI_HBUILDERX_PLUGINS)
  if (process.env.HX_APP_ROOT) {
    process.env.UNI_HBUILDERX_PLUGINS = process.env.HX_APP_ROOT + '/plugins'
    return true
  }
  try {
    // eslint-disable-next-line no-restricted-globals
    const { name } = require(path.resolve(
      process.cwd(),
      '../about/package.json'
    ))
    if (name === 'about') {
      process.env.UNI_HBUILDERX_PLUGINS = path.resolve(process.cwd(), '..')
      return true
    }
  } catch (e) {
    // console.error(e)
  }
  return false
})

export function resolveSourceMapPath(
  outputDir?: string,
  platform?: UniApp.PLATFORM
) {
  let dir = platform || process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM
  if (dir === 'app-plus') {
    dir = 'app'
  }
  return path.resolve(
    outputDir || process.env.UNI_OUTPUT_DIR,
    '../.sourcemap/' + dir
  )
}

export const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return isWindows ? id.replace(/\\/g, '/') : id
}

function supportAutoInstallPlugin() {
  return !!process.env.HX_Version
}

export function installHBuilderXPlugin(plugin: string) {
  if (!supportAutoInstallPlugin()) {
    return
  }
  return console.error(
    `%HXRunUniAPPPluginName%${plugin}%HXRunUniAPPPluginName%`
  )
}
