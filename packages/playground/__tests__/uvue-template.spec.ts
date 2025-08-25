import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'

const projectDir = path.resolve(__dirname, '../uvue-template')

const actions = {
  'uni-app-x': {
    'dev:app-harmony': [
      {
        filename: 'assets/pages/index/index.js',
        includes: `"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event)`,
      },
    ],
    'dev:app-ios': [
      {
        filename: 'app-service.js',
        includes: `"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event)`,
      },
    ],
    'dev:mp-weixin': [
      {
        filename: 'pages/index/index.js',
        includes: `vue.isRef(value) ? value.value = $event.detail.value : null`,
      },
    ],
    'build:app-android': [
      {
        filename: '.uniappx/android/src/pages/index/index.kt',
        includes: `trySetRefValue(value, \`$event\`.detail.value)`,
      },
    ],
    'build:app-harmony': [
      {
        filename: 'assets/pages/index/index.js',
        includes: `isRef(value) ? value.value = $event : null`,
      },
    ],
    'build:app-ios': [
      {
        filename: 'app-service.js',
        includes: `vue.isRef(value) ? value.value = $event : null`,
      },
    ],
    'build:mp-weixin': [
      {
        filename: 'pages/index/index.js',
        includes: `vue.isRef(value) ? value.value = $event.detail.value : null`,
      },
    ],
    'build:web': [
      {
        filename: 'assets/pages-index-index.js',
        includes: `isRef(value) ? value.value = $event : null`,
      },
    ],
  },
}

describe('uvue-template', () => {
  jest.setTimeout(50 * 1000)

  const distDir = path.resolve(projectDir, 'dist')
  if (fs.existsSync(distDir)) {
    fs.emptyDirSync(distDir)
  }
  Object.keys(actions).forEach((type) => {
    const scripts = actions[type]
    Object.keys(scripts).forEach((script: string) => {
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
            UNI_APP_X: 'true',
            // UNI_WEB_DISABLE_CHUNK_HASH: 'true',
          },
          stdio: 'inherit',
        })
        const matches = scripts[script]
        matches.forEach((match: { filename: string; includes: string }) => {
          const { filename, includes } = match
          const filePath = path.resolve(outDir, filename)
          const content = fs.readFileSync(filePath, 'utf-8')
          expect(content).toContain(includes)
        })
        console.log(`${type} npm run ${script} end`)
      })
    })
  })
})
