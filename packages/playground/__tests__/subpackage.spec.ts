import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'

const projectDir = path.resolve(__dirname, '../subpackage')

describe('subpackage playground', () => {
  jest.setTimeout(50 * 1000)
  const types = {
    'uni-app': ['dev:mp-weixin', 'build:mp-weixin'],
    'uni-app-x': ['dev:mp-weixin', 'build:mp-weixin'],
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
        // 仅未指定输出目录时，分包产物位置会自动根据subpackage参数生成。此测试例中指定了UNI_OUTPUT_DIR，outDir也需要手动指定sub目录
        const outDir = path.resolve(distDir, mode, type, platform, 'sub')
        console.log(`${type} npm run ${script} start`)
        await execa('npm', ['run', script, '--', '--subpackage=sub'], {
          cwd: projectDir,
          env: {
            ...process.env,
            UNI_OUTPUT_DIR: outDir,
            UNI_APP_X: type === 'uni-app-x' ? 'true' : 'false',
          },
          stdio: 'inherit',
        })
        console.log(`${type} npm run ${script} end`)
        const files = [
          'common/assets.js',
          'pages/index/index.wxss',
          'uni_modules/test-module/pages/index/index.wxss',
          'uni_modules/test-module/components/test-component/test-component.wxss',
        ]
        files.forEach((file) => {
          const filePath = path.resolve(outDir, file)
          console.log(filePath)
          expect(fs.existsSync(filePath)).toBe(true)
          expect(fs.readFileSync(filePath, 'utf-8')).toMatchSnapshot(
            `${type} ${script} ${file}`
          )
        })
      })
    })
  })
})
