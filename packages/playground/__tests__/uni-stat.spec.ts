import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'

const projectDir = path.resolve(__dirname, '../uni-stat')

describe('uni-stat playground', () => {
  jest.setTimeout(50 * 1000)
  const types = {
    'uni-app-x': ['build:app-android'],
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

        expect(
          fs
            .readFileSync(
              path.resolve(outDir, '.uniappx/android/src/index.kt'),
              'utf-8'
            )
            .includes('override var uniStatistics = object : UTSJSONObject()')
        ).toBe(true)
      })
    })
  })
})
