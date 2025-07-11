import fs from 'fs-extra'
import path from 'path'
import type { Plugin } from 'vite'
import execa from 'execa'
import { sync } from 'fast-glob'
import { camelize, capitalize } from '@vue/shared'
import type { OutputChunk } from 'rollup'

type Target = 'uni-h5' | 'uni-app-plus'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

interface Options {
  target: Target
  platform: 'web' | 'app-js'
}

if (!process.env.UNI_APP_EXT_API_DIR) {
  const extApiDir = path.resolve(__dirname, '..', '..', 'uni-app', 'api')
  if (fs.existsSync(extApiDir)) {
    process.env.UNI_APP_EXT_API_DIR = extApiDir
    console.log('UNI_APP_EXT_API_DIR', extApiDir)
  }
}

if (!process.env.UNI_APP_EXT_COMPONENT_DIR) {
  const extComponentDir = path.resolve(
    __dirname,
    '..',
    '..',
    'uni-app',
    'component'
  )
  if (fs.existsSync(extComponentDir)) {
    process.env.UNI_APP_EXT_COMPONENT_DIR = extComponentDir
    console.log('UNI_APP_EXT_COMPONENT_DIR', extComponentDir)
  }
}

export function uts2ts({ target, platform }: Options): Plugin {
  return {
    name: 'uts2ts',
    config() {
      return {
        resolve: {
          extensions: [
            '.mjs',
            '.js',
            '.mts',
            '.ts',
            '.jsx',
            '.tsx',
            '.json',
            '.uts.ts',
          ],
          alias: [
            {
              find: '@dcloudio/uni-runtime',
              replacement: resolve('../packages/uni-runtime/src/index.ts'),
            },
            {
              find: '@dcloudio/uni-h5',
              replacement: resolve('../packages/uni-h5/src/index.ts'),
            },
            {
              find: /^@dcloudio\/uni-ext-api\/(.*)/,
              replacement: '$1',
              async customResolver(source) {
                return resolveExtApi(target, platform, source).then(
                  (fileName) => fileName.replace(/\\/g, '/')
                )
              },
            },
            {
              find: /^@\/uni_modules\/(.*)/,
              replacement: '$1',
              async customResolver(source) {
                return resolveExtApi(target, platform, source).then(
                  (fileName) => fileName.replace(/\\/g, '/')
                )
              },
            },
          ],
        },
      }
    },
    buildStart() {
      // clearExtApiTempDir(target)
    },
    buildEnd(error) {
      if (!error) {
        // clearExtApiTempDir(target)
      }
    },
  }
}

export function resolveExtApiTempDir(target: string) {
  if (target === 'uni-app-harmony') {
    return path.resolve(__dirname, '../packages', target, 'temp', 'uni-ext-api')
  }
  return path.resolve(__dirname, '..', 'uni-ext-api', 'uni_modules')
}

export function clearExtApiTempDir(target: Target) {
  fs.emptyDirSync(resolveExtApiTempDir(target))
}

async function resolveExtApi(
  target: Target,
  platform: Options['platform'],
  source: string
) {
  let name = source
  if (source.includes('/')) {
    name = source.split('/')[0]
  }
  const extApiTempDir = resolveExtApiTempDir(target)
  await checkExtApiDir(target, name)
  // 指向了内部文件
  if (name !== source) {
    return path.resolve(extApiTempDir, source)
  }
  const filename = path.resolve(
    extApiTempDir,
    name,
    'utssdk',
    platform,
    'index.uts.ts'
  )
  return fs.existsSync(filename)
    ? filename
    : path.resolve(extApiTempDir, name, 'utssdk', 'index.uts.ts')
}

const extApiChecked = new Set<string>()

async function checkExtApiDir(target: Target, name: string) {
  if (!process.env.UNI_APP_EXT_API_DIR) {
    return
  }
  const extApiTempDir = resolveExtApiTempDir(target)
  if (extApiChecked.has(name)) {
    return
  }
  extApiChecked.add(name)
  const currentExtApiDir = path.resolve(extApiTempDir, name)
  if (fs.existsSync(currentExtApiDir)) {
    fs.emptyDirSync(currentExtApiDir)
  }
  let extApiDir = path.resolve(process.env.UNI_APP_EXT_API_DIR!)
  if (
    process.env.UNI_APP_EXT_COMPONENT_DIR &&
    !fs.existsSync(path.resolve(extApiDir, name))
  ) {
    extApiDir = path.resolve(process.env.UNI_APP_EXT_COMPONENT_DIR!)
  }
  if (
    process.env.UNI_APP_EXT_API_DCLOUD_DIR &&
    !fs.existsSync(path.resolve(extApiDir, name))
  ) {
    extApiDir = path.resolve(process.env.UNI_APP_EXT_API_DCLOUD_DIR!)
  }
  // 拷贝到临时目录
  fs.copySync(path.resolve(extApiDir, name), currentExtApiDir)
  // 重命名后缀
  sync('**/*.uts', {
    absolute: true,
    cwd: currentExtApiDir,
  }).forEach((file) => {
    fs.renameSync(file, file + '.ts')
  })
  sync('**/*.uvue', {
    absolute: true,
    cwd: currentExtApiDir,
  }).forEach((file) => {
    // 当前 next 仓库编译仅支持 vue 后缀
    const newFile = file.replace('.uvue', '.vue')
    fs.renameSync(file, newFile)
    const content = fs.readFileSync(newFile, 'utf-8')
    if (content.includes('.uvue')) {
      fs.writeFileSync(newFile, content.replace(/\.uvue(['"])/g, '.vue$1'))
    }
  })

  await checkExtApiTypes(target)
}

async function checkExtApiTypes(target: Target) {
  await execa('tsc', ['-p', './tsconfig.api.json'], {
    cwd: path.resolve(__dirname, '../packages', target),
    stdio: 'inherit',
  })
}

export function syncPagesFile(apiDirs: string[], platform: 'web') {
  const systemPagePaths: Record<string, string> = {}
  const webExportCodes: string[] = []
  apiDirs.forEach((apiDir) => {
    if (apiDir && fs.existsSync(apiDir)) {
      fs.readdirSync(apiDir).forEach((module) => {
        const pagesDir = path.resolve(apiDir, module, 'pages')
        if (fs.existsSync(pagesDir)) {
          fs.readdirSync(pagesDir).forEach((page) => {
            if (fs.existsSync(path.resolve(pagesDir, page, page + '.uvue'))) {
              const utssdkDir = path.resolve(apiDir, module, 'utssdk')
              const hasRootIndex = fs.existsSync(
                path.resolve(utssdkDir, 'index.uts')
              )
              const pagePath = `/uni_modules/${module}/pages/${page}/${page}`
              // 为啥服务器上会有重复？
              if (systemPagePaths[pagePath]) {
                return
              }
              if (platform === 'web') {
                const hasWeb =
                  hasRootIndex ||
                  fs.existsSync(path.resolve(utssdkDir, 'web', 'index.uts'))

                if (hasWeb) {
                  webExportCodes.push(
                    `// @ts-expect-error\nexport * from '@dcloudio/uni-ext-api/${module}'`
                  )
                }
                systemPagePaths[pagePath] = `uni:${page}`
              }
            }
          })
        }
      })
    }
  })
  //   if (webExportCodes.length) {
  //     fs.outputFileSync(
  //       path.resolve(
  //         path.resolve(__dirname, '..', 'packages', 'uni-h5'),
  //         'src',
  //         'x',
  //         'service',
  //         'api',
  //         'pages.ts'
  //       ),
  //       `// This file is automatically generated.
  // // Do not modify this file -- YOUR CHANGES WILL BE ERASED!
  // ${webExportCodes.join('\n')}
  // `
  //     )
  //   }
  return systemPagePaths
}

export function replacePagePaths(
  systemPagePaths: Record<string, string>
): Plugin {
  return {
    name: 'uni:replace-page-paths',
    generateBundle(_, bundle) {
      if (Object.keys(systemPagePaths).length) {
        Object.keys(bundle).forEach((key) => {
          if (key.endsWith('.js')) {
            const chunk = bundle[key] as OutputChunk
            let newCode = chunk.code
            Object.keys(systemPagePaths).forEach((path) => {
              if (newCode.includes(path)) {
                newCode = newCode.replace(
                  new RegExp(path, 'g'),
                  systemPagePaths[path]
                )
              }
            })
            chunk.code = newCode
          }
        })
      }
    },
  }
}

export function syncCustomElementsFile(apiDirs: string[]) {
  const customElementsImportCodes: string[] = []
  const customElementsExportCodes: string[] = []
  apiDirs.forEach((apiDir) => {
    if (apiDir && fs.existsSync(apiDir)) {
      fs.readdirSync(apiDir).forEach((module) => {
        const moduleDir = path.resolve(apiDir, module)
        // 目前仅限web端编译，所以没有utssdk目录
        if (!fs.existsSync(path.resolve(moduleDir, 'utssdk'))) {
          const customElementsDir = path.resolve(moduleDir, 'customElements')
          if (
            fs.existsSync(customElementsDir) &&
            fs.existsSync(path.resolve(moduleDir, 'package.json'))
          ) {
            const packageJson = require(path.resolve(moduleDir, 'package.json'))
            // 当前 customElements 平台禁用
            if (packageJson.uni_modules?.customElements?.web === true) {
              fs.readdirSync(customElementsDir).forEach((component) => {
                if (
                  fs.existsSync(
                    path.resolve(
                      customElementsDir,
                      component,
                      component + '.uts'
                    )
                  )
                ) {
                  const identElement =
                    capitalize(camelize(component)) + 'Element'
                  customElementsImportCodes.push(
                    `// @ts-expect-error
import { ${identElement} } from '@dcloudio/uni-ext-api/${module}/customElements/${component}/${component}.uts.ts'`
                  )
                  const tagName = component.replace(/^uni-/, '')
                  customElementsExportCodes.push(
                    `export const ${capitalize(
                      camelize(component.replace('uni-', ''))
                    )} = /*#__PURE__*/ (() => {
  // @ts-expect-error
  customElements.define('${component}', ${identElement})
  return '${component}'
})()`
                  )
                }
              })
            }
          }
        }
      })
    }
  })

  const code = customElementsImportCodes.length
    ? `${customElementsImportCodes.join('\n')}
${customElementsExportCodes.join('\n')}
`
    : 'export {}'

  fs.outputFileSync(
    path.resolve(
      path.resolve(__dirname, '..', 'packages', 'uni-h5'),
      'src',
      'x',
      'view',
      'components',
      'customElements.ts'
    ),
    `// This file is automatically generated.
// Do not modify this file -- YOUR CHANGES WILL BE ERASED!
${code}`
  )
}
