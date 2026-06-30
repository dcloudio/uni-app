import path from 'path'
import {
  type CopyOptions,
  normalizePath,
  relativeFile,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '.'
import { getIndependentSubPackages } from '../plugins/independentUtils'

export function normalizeCopyOptions(
  copyOptions: CopyOptions,
  options: UniMiniProgramPluginOptions
): CopyOptions {
  const componentDir = options.template.component?.dir
  if (!options.app.independentSubpackages || !componentDir) {
    return copyOptions
  }
  const assets = copyOptions.assets || []
  const componentAssets = assets.filter((asset) =>
    isMiniProgramComponentCopyAsset(asset, componentDir)
  )
  if (!componentAssets.length) {
    return copyOptions
  }
  return {
    ...copyOptions,
    assets: assets.filter(
      (asset) => !isMiniProgramComponentCopyAsset(asset, componentDir)
    ),
    targets: [
      {
        src: componentAssets,
        get dest() {
          return process.env.UNI_OUTPUT_DIR
        },
        transform(source, filename) {
          return transformIndependentMiniProgramComponentJs(source, filename, {
            componentDir,
            independentRoots: getIndependentSubPackages().map(
              ({ root }) => root
            ),
            inputDir: process.env.UNI_INPUT_DIR,
          })
        },
      },
      ...(copyOptions.targets || []),
    ],
  }
}

function isMiniProgramComponentCopyAsset(asset: string, componentDir: string) {
  const normalizedAsset = normalizePath(asset)
  const normalizedComponentDir = normalizePath(componentDir).replace(
    /^\/+|\/+$/g,
    ''
  )
  return (
    normalizedAsset === normalizedComponentDir ||
    normalizedAsset === `uni_modules/*/${normalizedComponentDir}/**/*` ||
    normalizedAsset.endsWith(`/${normalizedComponentDir}`) ||
    normalizedAsset.endsWith(`/uni_modules/*/${normalizedComponentDir}/**/*`)
  )
}

export function transformIndependentMiniProgramComponentJs(
  source: Buffer | string,
  filename: string,
  {
    componentDir,
    independentRoots,
    inputDir,
  }: {
    componentDir: string
    independentRoots: string[]
    inputDir?: string
  }
): string | undefined {
  if (!inputDir || path.extname(filename) !== '.js') {
    return
  }
  const relativeFilename = normalizePath(path.relative(inputDir, filename))
  const independentRoot = findIndependentRoot(
    relativeFilename,
    independentRoots
  )
  if (
    !independentRoot ||
    !isIndependentMiniProgramComponentJs(
      relativeFilename,
      independentRoot,
      componentDir
    )
  ) {
    return
  }
  const vendorFilename = `${independentRoot}/common/vendor.js`
  const vendorRequirePath = relativeFile(relativeFilename, vendorFilename)
  const code = Buffer.isBuffer(source) ? source.toString() : source
  if (hasVendorRequire(code, vendorRequirePath)) {
    return code
  }
  // 独立分包原生组件注册前必须加载当前 root 的 runtime，确保 u-p 能找到同一份 props 缓存。
  return injectRequireCode(code, `require('${vendorRequirePath}');\n`)
}

function findIndependentRoot(filename: string, roots: string[]) {
  return roots
    .map((root) => normalizePath(root).replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .find((root) => filename.startsWith(root + '/'))
}

function isIndependentMiniProgramComponentJs(
  filename: string,
  root: string,
  componentDir: string
) {
  const filenameInRoot = filename.slice(root.length + 1)
  const normalizedComponentDir = normalizePath(componentDir).replace(
    /^\/+|\/+$/g,
    ''
  )
  return (
    filenameInRoot.startsWith(normalizedComponentDir + '/') ||
    new RegExp(
      `^uni_modules/[^/]+/${escapeRegExp(normalizedComponentDir)}/`
    ).test(filenameInRoot)
  )
}

function hasVendorRequire(code: string, vendorRequirePath: string) {
  const escapedPath = escapeRegExp(vendorRequirePath)
  return new RegExp(String.raw`\brequire\(\s*['"]${escapedPath}['"]\s*\)`).test(
    code
  )
}

function injectRequireCode(code: string, requireCode: string) {
  const strictDirectiveMatch = code.match(/^((?:\s*['"]use strict['"];?\s*)+)/)
  if (strictDirectiveMatch) {
    const index = strictDirectiveMatch[0].length
    return code.slice(0, index) + requireCode + code.slice(index)
  }
  return requireCode + code
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
