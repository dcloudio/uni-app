import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'

const projectDir = path.resolve(__dirname, '../app-components-tree-shaking')

describe('app-components-tree-shaking playground', () => {
  jest.setTimeout(50 * 1000)
  const types = {
    'uni-app-x': ['build:app-android', 'build:app-ios'],
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
        const manifest = fs.readFileSync(
          path.resolve(outDir, 'manifest.json'),
          'utf-8'
        )
        expect(manifest).toMatchSnapshot()
      })
    })
  })
})
