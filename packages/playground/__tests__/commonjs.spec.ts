import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'
// import { sync } from 'fast-glob'
// import { normalizePath } from '@dcloudio/uni-cli-shared'

const projectDir = path.resolve(__dirname, '../commonjs')

describe('commonjs playground', () => {
  jest.setTimeout(50 * 1000)
  const types = {
    'uni-app': ['build:app', 'build:h5', 'build:mp-weixin'],
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
        console.log(`${type} npm run ${script} start`)
        await execa('npm', ['run', script], {
          cwd: projectDir,
          env: {
            ...process.env,
            UNI_OUTPUT_DIR: outDir,
            UNI_APP_X: type === 'uni-app-x' ? 'true' : 'false',
          },
        })
        console.log(`${type} npm run ${script} end`)
        let expectFile = ''
        if (platform === 'app') {
          expectFile = 'app-service.js'
        } else if (platform === 'mp-weixin') {
          expectFile = 'common/vendor.js'
        }
        if (expectFile) {
          expect(
            fs
              .readFileSync(path.resolve(outDir, expectFile), 'utf-8')
              .includes('CONNECTION TIMEOUT: timeout of')
          ).toBe(true)
        }
      })
    })
  })
})
