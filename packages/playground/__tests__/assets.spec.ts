import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'
import { sync } from 'fast-glob'

const projectDir = path.resolve(__dirname, '../assets')

describe('assets playground', () => {
  jest.setTimeout(50 * 1000)
  const types = {
    'uni-app': [
      'dev:app',
      'dev:mp-alipay',
      'dev:mp-baidu',
      'dev:mp-kuaishou',
      'dev:mp-lark',
      'dev:mp-qq',
      'dev:mp-toutiao',
      'dev:mp-weixin',
      'build:app',
      'build:h5',
      'build:mp-alipay',
      'build:mp-baidu',
      'build:mp-kuaishou',
      'build:mp-lark',
      'build:mp-qq',
      'build:mp-toutiao',
      'build:mp-weixin',
    ],
    'uni-app-x': [
      'dev:app-android',
      'dev:app-ios',
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
        console.log(`npm run ${script} start`)
        await execa('npm', ['run', script], {
          cwd: projectDir,
          env: {
            ...process.env,
            UNI_OUTPUT_DIR: outDir,
            UNI_APP_X: type === 'uni-app-x' ? 'true' : 'false',
          },
        })
        console.log(`npm run ${script} end`)
        sync('**/*', { cwd: outDir, absolute: true })
          .sort()
          .forEach((file) => {
            expect(path.basename(file)).toMatchSnapshot()
          })
      })
    })
  })
})
