import fs from 'fs-extra'
import path from 'path'
import { type Plugin } from 'vite'
import execa from 'execa'
import { sync } from 'fast-glob'

type Target = 'uni-h5' | 'uni-app-harmony'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

export function uts2ts(): Plugin {
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
                return resolveExtApi('uni-h5', source)
              },
            },
          ],
        },
      }
    },
    buildStart() {
      clearExtApiTempDir('uni-h5')
    },
    buildEnd(error) {
      if (!error) {
        clearExtApiTempDir('uni-h5')
      }
    },
  }
}

export function resolveExtApiTempDir(target: string) {
  return path.resolve(__dirname, '../packages', target, 'temp', 'uni-ext-api')
}

export function clearExtApiTempDir(target: Target) {
  fs.emptyDirSync(resolveExtApiTempDir(target))
}

async function resolveExtApi(target: Target, source: string) {
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
    'web',
    'index.uts.ts'
  )
  return fs.existsSync(filename)
    ? filename
    : path.resolve(extApiTempDir, name, 'utssdk', 'index.uts.ts')
}

async function checkExtApiDir(target: Target, name: string) {
  const extApiTempDir = resolveExtApiTempDir(target)

  if (fs.existsSync(path.resolve(extApiTempDir, name))) {
    return
  }
  const extApiDir = path.resolve(process.env.UNI_APP_EXT_API_DIR!)

  // 拷贝到临时目录
  fs.copySync(path.resolve(extApiDir, name), path.resolve(extApiTempDir, name))
  // 重命名后缀
  sync('**/*.uts', {
    absolute: true,
    cwd: path.resolve(extApiTempDir, name),
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
