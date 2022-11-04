import { isArray } from '@vue/shared'

import { runKotlinProd, runKotlinDev } from './kotlin'
import { runSwiftProd, runSwiftDev } from './swift'

import { genProxyCode, resolvePlatformIndex, resolveRootIndex } from './code'
import { resolvePackage } from './utils'

export * from './sourceMap'

export async function compile(module: string) {
  const pkg = resolvePackage(module)
  if (!pkg) {
    return
  }
  const deps: string[] = []
  const code = await genProxyCode(module, pkg)
  if (process.env.NODE_ENV !== 'development') {
    // 生产模式 支持同时生成 android 和 ios 的 uts 插件
    if (
      process.env.UNI_UTS_PLATFORM === 'app-android' ||
      process.env.UNI_UTS_PLATFORM === 'app'
    ) {
      const filename =
        resolvePlatformIndex('app-android', module, pkg) ||
        resolveRootIndex(module, pkg)
      if (filename) {
        await getCompiler('kotlin').runProd(filename)
      }
    }
    if (
      process.env.UNI_UTS_PLATFORM === 'app-ios' ||
      process.env.UNI_UTS_PLATFORM === 'app'
    ) {
      const filename =
        resolvePlatformIndex('app-ios', module, pkg) ||
        resolveRootIndex(module, pkg)
      if (filename) {
        await getCompiler('swift').runProd(filename)
      }
    }
  } else {
    if (
      process.env.UNI_UTS_PLATFORM === 'app-android' ||
      process.env.UNI_UTS_PLATFORM === 'app-ios'
    ) {
      // dev 模式
      const filename =
        resolvePlatformIndex(process.env.UNI_UTS_PLATFORM, module, pkg) ||
        resolveRootIndex(module, pkg)
      const compilerType =
        process.env.UNI_UTS_PLATFORM === 'app-android' ? 'kotlin' : 'swift'

      if (filename) {
        deps.push(filename)
        const res = await getCompiler(compilerType).runDev(filename)
        if (res) {
          if (isArray(res.deps) && res.deps.length) {
            // 添加其他文件的依赖
            deps.push(...res.deps)
          }
          if (res.type === 'kotlin') {
            const files: string[] = []
            if (process.env.UNI_APP_CHANGED_DEX_FILES) {
              try {
                files.push(...JSON.parse(process.env.UNI_APP_CHANGED_DEX_FILES))
              } catch (e) {}
            }
            if (res.dex) {
              files.push(res.dex)
            }
            process.env.UNI_APP_CHANGED_DEX_FILES = JSON.stringify([
              ...new Set(files),
            ])
          } else if (res.type === 'swift') {
            if (code) {
              throw res.msg
            }
          }
        }
      }
    }
  }
  return {
    code,
    deps,
  }
}

function getCompiler(type: 'kotlin' | 'swift') {
  if (type === 'swift') {
    return {
      runProd: runSwiftProd,
      runDev: runSwiftDev,
    }
  }
  return {
    runProd: runKotlinProd,
    runDev: runKotlinDev,
  }
}
