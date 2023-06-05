import fs from 'fs'
import path from 'path'
import { normalizePath, Plugin, ResolvedConfig } from 'vite'

import {
  buildInCssSet,
  minifyCSS,
  getAssetHash,
  resolveBuiltIn,
  isExternalUrl,
} from '@dcloudio/uni-cli-shared'
import { OutputOptions } from 'rollup'
import { isFunction, isString } from '@vue/shared'

function isCombineBuiltInCss(config: ResolvedConfig) {
  return config.command === 'build' && config.build.cssCodeSplit
}

export function uniCssPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  let file = ''
  let fileName = ''
  return {
    name: 'uni:h5-css',
    apply: 'build',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config
      file = path.join(process.env.UNI_INPUT_DIR, 'uni.css')
    },
    async generateBundle() {
      if (!isCombineBuiltInCss(resolvedConfig) || !buildInCssSet.size) {
        return
      }
      // 生成框架css(需要排序，避免生成不一样的内容)
      const content = await minifyCSS(
        generateBuiltInCssCode([...buildInCssSet].sort()),
        resolvedConfig
      )
      // @ts-ignore 'Buffer' only refers to a type, but is being used as a value here
      const contentHash = getAssetHash(Buffer.from(content, 'utf-8'))
      const assetFileNames = path.posix.join(
        resolvedConfig.build.assetsDir,
        '[name].[hash][extname]'
      )
      fileName = assetFileNamesToFileName(
        assetFileNames,
        file,
        contentHash,
        content
      )
      const name = normalizePath(path.relative(resolvedConfig.root, file))
      this.emitFile({
        name,
        fileName,
        type: 'asset',
        source: content,
      })
    },
    transformIndexHtml: {
      enforce: 'post',
      transform() {
        if (!fileName) {
          return
        }
        // 追加框架css
        return [
          {
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: toPublicPath(fileName, resolvedConfig),
            },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

function toPublicPath(filename: string, config: ResolvedConfig) {
  return isExternalUrl(filename) ? filename : config.base + filename
}

function generateBuiltInCssCode(cssImports: string[]) {
  return cssImports
    .map((cssImport) => fs.readFileSync(resolveBuiltIn(cssImport), 'utf8'))
    .join('\n')
}

/**
 * converts the source filepath of the asset to the output filename based on the assetFileNames option. \
 * this function imitates the behavior of rollup.js. \
 * https://rollupjs.org/guide/en/#outputassetfilenames
 *
 * @example
 * ```ts
 * const content = Buffer.from('text');
 * const fileName = assetFileNamesToFileName(
 *   'assets/[name].[hash][extname]',
 *   '/path/to/file.txt',
 *   getAssetHash(content),
 *   content
 * )
 * // fileName: 'assets/file.982d9e3e.txt'
 * ```
 *
 * @param assetFileNames filename pattern. e.g. `'assets/[name].[hash][extname]'`
 * @param file filepath of the asset
 * @param contentHash hash of the asset. used for `'[hash]'` placeholder
 * @param content content of the asset. passed to `assetFileNames` if `assetFileNames` is a function
 * @returns output filename
 */
export function assetFileNamesToFileName(
  assetFileNames: Exclude<OutputOptions['assetFileNames'], undefined>,
  file: string,
  contentHash: string,
  content: string | Buffer
): string {
  const basename = path.basename(file)

  // placeholders for `assetFileNames`
  // `hash` is slightly different from the rollup's one
  const extname = path.extname(basename)
  const ext = extname.slice(1)
  const name = basename.slice(0, -extname.length)
  const hash = contentHash

  if (isFunction(assetFileNames)) {
    assetFileNames = assetFileNames({
      name: file,
      source: content,
      type: 'asset',
    })
    if (!isString(assetFileNames)) {
      throw new TypeError('assetFileNames must return a string')
    }
  } else if (!isString(assetFileNames)) {
    throw new TypeError('assetFileNames must be a string or a function')
  }

  const fileName = assetFileNames.replace(
    /\[\w+\]/g,
    (placeholder: string): string => {
      switch (placeholder) {
        case '[ext]':
          return ext

        case '[extname]':
          return extname

        case '[hash]':
          return hash

        case '[name]':
          return name
      }
      throw new Error(
        `invalid placeholder ${placeholder} in assetFileNames "${assetFileNames}"`
      )
    }
  )

  return fileName
}
