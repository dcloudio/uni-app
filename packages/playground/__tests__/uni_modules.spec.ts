import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'
import { sync } from 'fast-glob'
import { normalizePath } from '@dcloudio/uni-cli-shared'

const projectDir = path.resolve(__dirname, '../uni_modules')

describe('uni_modules playground', () => {
  jest.setTimeout(50 * 1000)
  const types = {
    // 'uni-app': [
    //   'build:app',
    //   'build:h5',
    //   //   'build:mp-alipay',
    //   //   'build:mp-baidu',
    //   //   'build:mp-kuaishou',
    //   //   'build:mp-lark',
    //   //   'build:mp-qq',
    //   //   'build:mp-toutiao',
    //   //   'build:mp-weixin',
    // ],
    'uni-app-x': [
      'dev:app-android',
      'dev:app-ios',
      'dev:h5',
      'build:app-android',
      'build:app-ios',
      'build:h5',
      //   'build:mp-alipay',
      //   'build:mp-baidu',
      //   'build:mp-kuaishou',
      //   'build:mp-lark',
      //   'build:mp-qq',
      //   'build:mp-toutiao',
      //   'build:mp-weixin',
    ],
  }
  const distDir = path.resolve(projectDir, 'dist')
  if (fs.existsSync(distDir)) {
    fs.emptyDirSync(distDir)
  }
  Object.keys(types).forEach((type) => {
    const scripts = types[type]
    scripts.forEach((script) => {
      const mode = script.split(':')[0]
      const platform = script.split(':')[1]
      test(`${type} ${script}`, async () => {
        const outDir = path.resolve(distDir, mode, type, platform)
        // dev: 统一调整为 build:
        await execa('npm', ['run', script.replace('dev:', 'build:')], {
          cwd: projectDir,
          env: {
            ...process.env,
            NODE_ENV: mode === 'dev' ? 'development' : 'production',
            UNI_OUTPUT_DIR: outDir,
            UNI_COMPILE_TARGET: 'uni_modules',
            UNI_APP_X: type === 'uni-app-x' ? 'true' : 'false',
          },
        })
        const files = sync('**/*', { cwd: outDir, absolute: true }).sort()
        sync('**/*', { cwd: outDir, absolute: true })
        expect(
          files.map((file) => normalizePath(file).split('/uni-app-x/')[1])
        ).toMatchSnapshot()
        files.forEach((file) => {
          if (file.endsWith('.png')) {
            expect(path.basename(file)).toMatchSnapshot()
          } else {
            expect(
              fs
                .readFileSync(file, 'utf-8')
                .replace(
                  `"compilerVersion": "${
                    require('../../vite-plugin-uni/package.json')['uni-app'][
                      'compilerVersion'
                    ]
                  }"`,
                  `"compilerVersion": "x.xx"`
                )
            ).toMatchSnapshot()
          }
        })
      })
    })
  })
})
