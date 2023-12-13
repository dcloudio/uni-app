import path from 'path'
import { parse as parseUrl } from 'url'
import mime from 'mime/lite'
import fs, { promises as fsp } from 'fs-extra'
import MagicString from 'magic-string'
import { createHash } from 'crypto'
import type {
  EmittedAsset,
  OutputOptions,
  PluginContext,
  RenderedChunk,
} from 'rollup'
import { Plugin } from '../plugin'
import { ResolvedConfig } from '../config'
import { cleanUrl, normalizePath } from '../utils'
import { withSourcemap } from '../../../../vite/utils/utils'
import { isFunction, isString } from '@vue/shared'
import { normalizeNodeModules } from '../../../../utils'

export const assetUrlRE = /__VITE_ASSET__([a-z\d]{8})__(?:\$_(.*?)__)?/g

const rawRE = /(\?|&)raw(?:&|$)/
const urlRE = /(\?|&)url(?:&|$)/

export const chunkToEmittedAssetsMap = new WeakMap<RenderedChunk, Set<string>>()

const assetCache = new WeakMap<ResolvedConfig, Map<string, string>>()

const assetHashToFilenameMap = new WeakMap<
  ResolvedConfig,
  Map<string, string>
>()
// save hashes of the files that has been emitted in build watch
const emittedHashMap = new WeakMap<ResolvedConfig, Set<string>>()

/**
 * Also supports loading plain strings with import text from './foo.txt?raw'
 */
export function assetPlugin(
  config: ResolvedConfig,
  options?: { isAndroidX: boolean }
): Plugin {
  // assetHashToFilenameMap initialization in buildStart causes getAssetFilename to return undefined
  assetHashToFilenameMap.set(config, new Map())
  return {
    name: 'vite:asset',

    buildStart() {
      assetCache.set(config, new Map())
      emittedHashMap.set(config, new Set())
    },

    resolveId(id) {
      if (!config.assetsInclude(cleanUrl(id))) {
        return
      }
      // imports to absolute urls pointing to files in /public
      // will fail to resolve in the main resolver. handle them here.
      const publicFile = checkPublicFile(id, config)
      if (publicFile) {
        return id
      }
    },

    async load(id) {
      if (id.startsWith('\0')) {
        // Rollup convention, this id should be handled by the
        // plugin that marked it with \0
        return
      }

      // raw requests, read from disk
      if (rawRE.test(id)) {
        const file = checkPublicFile(id, config) || cleanUrl(id)
        // raw query, read file and return as string
        return `export default ${JSON.stringify(
          await fsp.readFile(file, 'utf-8')
        )}`
      }

      if (!config.assetsInclude(cleanUrl(id)) && !urlRE.test(id)) {
        return
      }

      id = id.replace(urlRE, '$1').replace(/[\?&]$/, '')
      const url = await fileToUrl(
        id,
        config,
        options?.isAndroidX
          ? ({
              emitFile(emittedFile: EmittedAsset) {
                // 直接写入目标目录
                fs.outputFileSync(
                  path.resolve(
                    process.env.UNI_OUTPUT_DIR,
                    emittedFile.fileName!
                  ),
                  emittedFile.source!
                )
              },
            } as PluginContext)
          : this
      )
      if (options?.isAndroidX) {
        this.emitFile({
          type: 'asset',
          fileName: normalizeNodeModules(
            path.relative(process.env.UNI_INPUT_DIR, id) + '.uts'
          ),
          source: `export default ${JSON.stringify(parseAssets(config, url))}`,
        })
      }
      return `export default ${JSON.stringify(url)}`
    },

    renderChunk(code, chunk) {
      let match: RegExpExecArray | null
      let s: MagicString | undefined
      assetUrlRE.lastIndex = 0
      // Urls added with JS using e.g.
      // imgElement.src = "__VITE_ASSET__5aa0ddc0__" are using quotes

      // Urls added in CSS that is imported in JS end up like
      // var inlined = ".inlined{color:green;background:url(__VITE_ASSET__5aa0ddc0__)}\n";

      // In both cases, the wrapping should already be fine
      while ((match = assetUrlRE.exec(code))) {
        s = s || (s = new MagicString(code))
        const [full, hash, postfix = ''] = match
        // some internal plugins may still need to emit chunks (e.g. worker) so
        // fallback to this.getFileName for that.
        const file = getAssetFilename(hash, config) || this.getFileName(hash)
        registerAssetToChunk(chunk, file)
        const outputFilepath = config.base + file + postfix
        s.overwrite(match.index, match.index + full.length, outputFilepath)
      }
      if (s) {
        return {
          code: s.toString(),
          map: withSourcemap(config) ? s.generateMap({ hires: true }) : null,
        }
      } else {
        return null
      }
    },
  }
}

export function parseAssets(config: ResolvedConfig, code: string) {
  let match: RegExpExecArray | null
  let s: MagicString | undefined
  assetUrlRE.lastIndex = 0
  while ((match = assetUrlRE.exec(code))) {
    s = s || (s = new MagicString(code))
    const [full, hash, postfix = ''] = match
    // some internal plugins may still need to emit chunks (e.g. worker) so
    // fallback to this.getFileName for that.
    const file = getAssetFilename(hash, config)
    const outputFilepath = config.base + file + postfix
    s.overwrite(match.index, match.index + full.length, outputFilepath)
  }
  if (s) {
    return s.toString()
  }
  return code
}

export function registerAssetToChunk(chunk: RenderedChunk, file: string): void {
  let emitted = chunkToEmittedAssetsMap.get(chunk)
  if (!emitted) {
    emitted = new Set()
    chunkToEmittedAssetsMap.set(chunk, emitted)
  }
  emitted.add(cleanUrl(file))
}

export function checkPublicFile(
  url: string,
  { publicDir }: ResolvedConfig
): string | undefined {
  // note if the file is in /public, the resolver would have returned it
  // as-is so it's not going to be a fully resolved path.
  if (!publicDir || !url.startsWith('/')) {
    return
  }
  const publicFile = path.join(publicDir, cleanUrl(url))
  if (fs.existsSync(publicFile)) {
    return publicFile
  } else {
    return
  }
}

export function fileToUrl(
  id: string,
  config: ResolvedConfig,
  ctx: PluginContext,
  canInline: boolean = false
): string {
  return fileToBuiltUrl(id, config, ctx, false, canInline)
}

export function getAssetFilename(
  hash: string,
  config: ResolvedConfig
): string | undefined {
  return assetHashToFilenameMap.get(config)?.get(hash)
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
  const ext = extname.substring(1)
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
          return sanitizeFileName(name)
      }
      throw new Error(
        `invalid placeholder ${placeholder} in assetFileNames "${assetFileNames}"`
      )
    }
  )

  return fileName
}

// taken from https://github.com/rollup/rollup/blob/a8647dac0fe46c86183be8596ef7de25bc5b4e4b/src/utils/sanitizeFileName.ts
// https://datatracker.ietf.org/doc/html/rfc2396
// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i
function sanitizeFileName(name: string): string {
  const match = DRIVE_LETTER_REGEX.exec(name)
  const driveLetter = match ? match[0] : ''

  // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
  // Otherwise, avoid them because they can refer to NTFS alternate data streams.
  return (
    driveLetter +
    name.substring(driveLetter.length).replace(INVALID_CHAR_REGEX, '_')
  )
}

/**
 * Register an asset to be emitted as part of the bundle (if necessary)
 * and returns the resolved public URL
 */
function fileToBuiltUrl(
  id: string,
  config: ResolvedConfig,
  pluginContext: PluginContext,
  skipPublicCheck = false,
  canInline = false
): string {
  if (!skipPublicCheck && checkPublicFile(id, config)) {
    return config.base + id.slice(1)
  }
  const cache = assetCache.get(config)!
  const cached = cache.get(id)
  if (cached) {
    return cached
  }

  const file = cleanUrl(id)
  const content = fs.readFileSync(file)

  let url: string

  if (canInline && content.length < Number(config.build.assetsInlineLimit)) {
    // base64 inlined as a string
    url = `data:${mime.getType(file)};base64,${content.toString('base64')}`
  } else {
    const map = assetHashToFilenameMap.get(config)!
    const contentHash = getAssetHash(content)
    const { search, hash } = parseUrl(id)
    const postfix = (search || '') + (hash || '')

    const output = config.build?.rollupOptions?.output

    const defaultAssetFileNames = path.posix.join(
      config.build.assetsDir,
      '[name].[hash][extname]'
    )
    // Steps to determine which assetFileNames will be actually used.
    // First, if output is an object or string, use assetFileNames in it.
    // And a default assetFileNames as fallback.
    let assetFileNames: Exclude<OutputOptions['assetFileNames'], undefined> =
      (output && !Array.isArray(output) ? output.assetFileNames : undefined) ??
      defaultAssetFileNames
    if (output && Array.isArray(output)) {
      // Second, if output is an array, adopt assetFileNames in the first object.
      assetFileNames = output[0].assetFileNames ?? assetFileNames
    }

    const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
    let fileName =
      file.startsWith(inputDir) && file.includes('/static/')
        ? // 需要处理 HBuilderX 项目中的 node_modules 目录
          normalizeNodeModules(path.posix.relative(inputDir, file))
        : assetFileNamesToFileName(assetFileNames, file, contentHash, content)

    if (!map.has(contentHash)) {
      map.set(contentHash, fileName)
    }

    if (!fileName.includes('/static/')) {
      const emittedSet = emittedHashMap.get(config)!
      if (!emittedSet.has(contentHash)) {
        pluginContext.emitFile({
          name: fileName,
          fileName,
          type: 'asset',
          source: content,
        })
        emittedSet.add(contentHash)
      }
    }

    url = `__VITE_ASSET__${contentHash}__${postfix ? `$_${postfix}__` : ``}`
  }
  cache.set(id, url)
  return url
}

export function getAssetHash(content: Buffer | string): string {
  return createHash('sha256').update(content).digest('hex').slice(0, 8)
}

export function urlToBuiltUrl(
  url: string,
  importer: string,
  config: ResolvedConfig,
  pluginContext: PluginContext
): string {
  if (checkPublicFile(url, config)) {
    return config.base + url.slice(1)
  }
  const file = url.startsWith('/')
    ? path.join(config.root, url)
    : path.join(path.dirname(importer), url)
  return fileToBuiltUrl(
    file,
    config,
    pluginContext,
    // skip public check since we just did it above
    true
  )
}
