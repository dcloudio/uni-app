import os from 'os'
import fs from 'fs'
import path from 'path'
import type { SourcemapPathTransformOption } from 'rollup'
import type { Plugin, ResolvedConfig, ServerOptions } from 'vite'
import { extend, hasOwn } from '@vue/shared'
import {
  getDevServerOptions,
  getWorkersRootDirs,
  initPostcssPlugin,
  isInHBuilderX,
  isSsr,
  normalizePath,
  parseManifestJsonOnce,
  parseRpx2UnitOnce,
  resolveMainPathOnce,
  runByHBuilderX,
  withSourcemap,
} from '@dcloudio/uni-cli-shared'
import { createDefine } from '../utils'
import { esbuildPrePlugin } from './esbuild/esbuildPrePlugin'
import { external } from './configureServer/ssr'

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

    if (runByHBuilderX()) {
      // 仅在 HBuilderX 中运行时，将 host 设置为 true，cli 项目命令行运行需要自行开启 --host 参数
      server.host = true
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

    let sourcemapPathTransform: SourcemapPathTransformOption | undefined =
      undefined
    if (
      // 仅在 uni-app-x 模式下，且非开发模式，且需要 sourcemap 时，才进行 sourcemap 路径转换
      process.env.UNI_APP_X === 'true' &&
      process.env.NODE_ENV !== 'development' &&
      withSourcemap(config)
    ) {
      sourcemapPathTransform = transformSourcemapPath
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
            sourcemapPathTransform,
            chunkFileNames(chunkInfo) {
              const hash =
                // 为了测试额外加的逻辑，避免因为环境不一致导致hash有变化
                process.env.UNI_WEB_DISABLE_CHUNK_HASH === 'true'
                  ? ''
                  : '.[hash]'
              const { assetsDir } = options.resolvedConfig!.build
              if (chunkInfo.facadeModuleId) {
                const dirname = normalizePath(
                  path.relative(
                    inputDir,
                    path.dirname(chunkInfo.facadeModuleId)
                  )
                )
                if (dirname) {
                  // 保留workers的目录结构，目前不支持不同的workers引入同一个uts文件，因为目前不能很好的分别打包进各自的chunk中
                  const workersRootDir = getWorkersRootDirs()
                  if (workersRootDir.length) {
                    if (
                      workersRootDir.some((workersRootDir) =>
                        dirname.startsWith(workersRootDir)
                      )
                    ) {
                      return `${dirname}/[name].js`
                    }
                  }
                  return path.posix.join(
                    assetsDir,
                    dirname.replace(/\//g, '-') + `-[name]${hash}.js`
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

function transformSourcemapPath(
  relativeSourcePath: string,
  sourcemapPath: string
) {
  const sourcePath = normalizePath(
    path.relative(
      process.env.UNI_INPUT_DIR,
      path.resolve(path.dirname(sourcemapPath), relativeSourcePath)
    )
  )
  if (sourcePath.startsWith('..')) {
    return ''
  }
  return sourcePath
}
