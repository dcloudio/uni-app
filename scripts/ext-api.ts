import fs from 'fs-extra'
import path from 'path'
import { type Plugin } from 'vite'
import execa from 'execa'
import { sync } from 'fast-glob'

type Target = 'uni-h5' | 'uni-app-plus'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

interface Options {
  target: Target
  platform: 'web' | 'app-ios'
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
              replacement: resolve('../uni-runtime/src/index.ts'),
            },
            {
              find: /^@dcloudio\/uni-ext-api\/(.*)/,
              replacement: '$1',
              customResolver(source) {
                return resolveExtApi(target, platform, source)
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

export function resolveExtApiTempDir(_target: string) {
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
  const extApiDir = path.resolve(process.env.UNI_APP_EXT_API_DIR!)
  // 拷贝到临时目录
  fs.copySync(path.resolve(extApiDir, name), currentExtApiDir)
  // 重命名后缀
  sync('**/*.uts', {
    absolute: true,
    cwd: currentExtApiDir,
  }).forEach((file) => {
    fs.renameSync(file, file + '.ts')
  })

  await checkExtApiTypes(target)
}

async function checkExtApiTypes(target: Target) {
  await execa('tsc', ['-p', './tsconfig.api.json'], {
    cwd: path.resolve(__dirname, '../packages', target),
    stdio: 'inherit',
  })
}
