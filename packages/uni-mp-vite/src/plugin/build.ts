import path from 'path'
import { UserConfig } from 'vite'

import {
  isCSSRequest,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { GetManualChunk, GetModuleInfo } from 'rollup'
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath,
} from '../plugins/virtual'

export function buildOptions(): UserConfig['build'] {
  const inputDir = process.env.UNI_INPUT_DIR
  return {
    // sourcemap: 'inline', // TODO
    assetsInlineLimit: 0, // TODO
    lib: {
      entry: resolveMainPathOnce(inputDir),
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        manualChunks: createMoveToVendorChunkFn(),
        chunkFileNames(chunk) {
          if (chunk.isDynamicEntry && chunk.facadeModuleId) {
            let id = chunk.facadeModuleId
            if (isUniPageUrl(id)) {
              id = path.resolve(
                process.env.UNI_INPUT_DIR,
                parseVirtualPagePath(id)
              )
            } else if (isUniComponentUrl(id)) {
              id = path.resolve(
                process.env.UNI_INPUT_DIR,
                parseVirtualComponentPath(id)
              )
            }
            const filepath = path.relative(inputDir, id)
            return normalizePath(
              filepath.replace(path.extname(filepath), '.js')
            )
          }
          return '[name].js'
        },
        assetFileNames: '[name][extname]',
      },
    },
  }
}

function createMoveToVendorChunkFn(): GetManualChunk {
  const cache = new Map<string, boolean>()
  return (id, { getModuleInfo }) => {
    if (
      (id.includes('node_modules') ||
        id.includes('plugin-vue:export-helper')) &&
      !isCSSRequest(id) &&
      staticImportedByEntry(id, getModuleInfo, cache)
    ) {
      return 'vendor'
    }
  }
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: GetModuleInfo,
  cache: Map<string, boolean>,
  importStack: string[] = []
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some((importer) =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
