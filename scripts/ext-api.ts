import fs from 'fs-extra'
import path from 'path'
import type { Plugin } from 'vite'
import execa from 'execa'
import { sync } from 'fast-glob'
import { capitalize } from '@vue/shared'

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

export function syncPagesFile(apiDirs: string[]) {
  const systemPagePaths: Record<string, string> = {}
  const importCodes: string[] = []
  const registerCodes: string[] = []
  apiDirs.forEach((apiDir) => {
    if (apiDir && fs.existsSync(apiDir)) {
      fs.readdirSync(apiDir).forEach((module) => {
        const pagesDir = path.resolve(apiDir, module, 'pages')
        if (fs.existsSync(pagesDir)) {
          fs.readdirSync(pagesDir).forEach((page) => {
            if (fs.existsSync(path.resolve(pagesDir, page, page + '.uvue'))) {
              const utssdkDir = path.resolve(apiDir, module, 'utssdk')
              const hasIOS =
                fs.existsSync(path.resolve(utssdkDir, 'index.uts')) ||
                fs.existsSync(path.resolve(utssdkDir, 'app-ios', 'index.uts'))
              if (!hasIOS) {
                return
              }
              importCodes.push(
                `import Uni${capitalize(
                  page
                )}Page from '@dcloudio/uni-ext-api/${module}/pages/${page}/${page}.vue'`
              )
              registerCodes.push(
                `  registerSystemRoute('uni:${page}', Uni${capitalize(
                  page
                )}Page, {
    disableSwipeBack: false,
  })`
              )
              systemPagePaths[
                `/uni_modules/${module}/pages/${page}/${page}`
              ] = `uni:${page}`
            }
          })
        }
      })
    }
  })
  if (importCodes.length) {
    fs.writeFileSync(
      path.resolve(
        path.resolve(__dirname, '..', 'packages', 'uni-app-plus'),
        'src',
        'x',
        'pages.ts'
      ),
      `${importCodes.join('\n')}
import { registerSystemRoute } from './framework/route'

export function registerSystemPages() {
${registerCodes.join('\n')}
}
`
    )
  }
  return systemPagePaths
}
