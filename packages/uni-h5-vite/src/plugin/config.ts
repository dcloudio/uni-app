import fs from 'fs'
import path from 'path'
import type { Plugin, ResolvedConfig, ServerOptions } from 'vite'
import {
  isInHBuilderX,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { createDefine, isSsr } from '../utils'
import { esbuildPrePlugin } from './esbuild/esbuildPrePlugin'
import { external } from './configureServer/ssr'
import { extend, hasOwn } from '@vue/shared'
export function createConfig(options: {
  resolvedConfig: ResolvedConfig | null
}): Plugin['config'] {
  return function config(config, env) {
    if (isInHBuilderX()) {
      if (
        !fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'index.html'))
      ) {
        console.error(`请确认您的项目模板是否支持vue3：根目录缺少 index.html`)
        process.exit()
      }
    }

    const server: ServerOptions = {
      host: true,
      fs: { strict: false },
      watch: {
        ignored: ['**/uniCloud**'],
      },
    }
    const { server: userServer } = config
    if (userServer) {
      if (hasOwn(userServer, 'host')) {
        server.host = userServer.host
      }
      if (hasOwn(userServer, 'fs')) {
        extend(server.fs, userServer.fs)
      }
      if (hasOwn(userServer, 'watch')) {
        extend(server.watch, userServer.watch)
      }
    }
    return {
      optimizeDeps: {
        entries: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
        exclude: external,
        esbuildOptions: {
          plugins: [esbuildPrePlugin()],
        },
      },
      define: createDefine(env.command, config),
      server,
      ssr: {
        external,
      },
      build: {
        rollupOptions: {
          // resolveSSRExternal 会判定package.json，hbx 工程可能没有，通过 rollup 来配置
          external: isSsr(env.command, config) ? external : [],
          output: {
            chunkFileNames(chunkInfo) {
              const { assetsDir } = options.resolvedConfig!.build
              if (chunkInfo.facadeModuleId) {
                const dirname = path.relative(
                  process.env.UNI_INPUT_DIR,
                  path.dirname(chunkInfo.facadeModuleId)
                )
                if (dirname) {
                  return path.posix.join(
                    assetsDir,
                    normalizePath(dirname).replace(/\//g, '-') +
                      '-[name].[hash].js'
                  )
                }
              }
              return path.posix.join(assetsDir, '[name].[hash].js')
            },
          },
        },
      },
    }
  }
}
