import os from 'os'
import fs from 'fs'
import path from 'path'
import type { Plugin, ResolvedConfig, ServerOptions } from 'vite'
import {
  getDevServerOptions,
  initPostcssPlugin,
  isInHBuilderX,
  isSsr,
  normalizePath,
  parseManifestJsonOnce,
  parseRpx2UnitOnce,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { createDefine } from '../utils'
import { esbuildPrePlugin } from './esbuild/esbuildPrePlugin'
import { external } from './configureServer/ssr'
import { extend, hasOwn } from '@vue/shared'
export function createConfig(options: {
  resolvedConfig: ResolvedConfig | null
}): Plugin['config'] {
  return function config(config, env) {
    const inputDir = process.env.UNI_INPUT_DIR
    if (isInHBuilderX()) {
      if (!fs.existsSync(path.resolve(inputDir, 'index.html'))) {
        console.error(`请确认您的项目模板是否支持vue3：根目录缺少 index.html`)
        process.exit()
      }
    }

    const server: ServerOptions = {
      host: true,
      hmr: process.env.UNI_AUTOMATOR_WS_ENDPOINT
        ? false
        : {
            // mac 内置浏览器版本较低不支持 globalThis，而 overlay 使用了 globalThis
            overlay:
              os.platform() !== 'win32'
                ? process.env.UNI_H5_BROWSER !== 'builtin'
                : true,
          },
      fs: { strict: false },
      watch: {
        ignored: [
          '**/uniCloud-aliyun/**',
          '**/uniCloud-tcb/**',
          '**/uniCloud-alipay/**',
          '**/uniCloud-dcloud/**',
          '**/uni_modules/uniCloud/**',
          '**/__snapshots__/**',
          normalizePath(path.join(inputDir, 'unpackage/**')),
          normalizePath(path.join(inputDir, 'dist/**')),
        ],
      },
      ...getDevServerOptions(parseManifestJsonOnce(inputDir)),
    }

    if ((server.port as unknown as string) === '') {
      delete server.port
    }

    const { server: userServer } = config
    if (userServer) {
      if (hasOwn(userServer, 'host')) {
        server.host = userServer.host
      }
      if (hasOwn(userServer, 'fs')) {
        extend(server.fs!, userServer.fs)
      }
      if (hasOwn(userServer, 'watch')) {
        extend(server.watch!, userServer.watch)
      }
    }

    return {
      legacy: {
        // 目前先使用旧模式
        proxySsrExternalModules: true,
      },
      css: {
        postcss: {
          plugins: initPostcssPlugin({
            uniApp: parseRpx2UnitOnce(inputDir, process.env.UNI_PLATFORM),
          }),
        },
      },
      optimizeDeps: {
        entries: resolveMainPathOnce(inputDir),
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
        target:
          process.env.UNI_APP_X === 'true'
            ? ['es2015', 'edge79', 'firefox62', 'chrome64', 'safari11.1']
            : undefined,
        rollupOptions: {
          // resolveSSRExternal 会判定package.json，hbx 工程可能没有，通过 rollup 来配置
          external: isSsr(env.command, config) ? external : [],
          output: {
            chunkFileNames(chunkInfo) {
              const hash =
                // 为了测试额外加的逻辑，避免因为环境不一致导致hash有变化
                process.env.UNI_WEB_DISABLE_CHUNK_HASH === 'true'
                  ? ''
                  : '.[hash]'
              const { assetsDir } = options.resolvedConfig!.build
              if (chunkInfo.facadeModuleId) {
                const dirname = path.relative(
                  inputDir,
                  path.dirname(chunkInfo.facadeModuleId)
                )
                if (dirname) {
                  return path.posix.join(
                    assetsDir,
                    normalizePath(dirname).replace(/\//g, '-') +
                      `-[name]${hash}.js`
                  )
                }
              }
              return path.posix.join(assetsDir, `[name]${hash}.js`)
            },
          },
        },
      },
    }
  }
}
