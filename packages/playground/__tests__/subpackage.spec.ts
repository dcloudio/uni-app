import fs from 'fs-extra'
import path from 'path'
import execa from 'execa'

const projectDir = path.resolve(__dirname, '../subpackage')
const pagesJsonFile = path.resolve(projectDir, 'src/pages.json')
const independentPageFile = path.resolve(
  projectDir,
  'src/package-independent/pages/index/index.vue'
)

function createIndependentPagesJson(
  usingComponents: Record<string, string> = {
    'native-badge': '../../wxcomponents/native-badge/index',
  }
) {
  return {
    pages: [
      {
        path: 'pages/index/index',
      },
      {
        path: 'uni_modules/test-module/pages/index/index',
      },
    ],
    subPackages: [
      {
        root: 'package-normal',
        pages: [
          {
            path: 'pages/index/index',
          },
        ],
      },
      {
        root: 'package-independent',
        independent: true,
        pages: [
          {
            path: 'pages/index/index',
            style: {
              usingComponents,
            },
          },
        ],
      },
    ],
  }
}

async function withPagesJson(
  pagesJson: Record<string, unknown>,
  test: () => Promise<void>
) {
  const originalPagesJson = fs.readFileSync(pagesJsonFile, 'utf-8')
  fs.writeJSONSync(pagesJsonFile, pagesJson, { spaces: 2 })
  try {
    await test()
  } finally {
    fs.writeFileSync(pagesJsonFile, originalPagesJson)
  }
}

async function withFileContent(
  file: string,
  content: string,
  test: () => Promise<void>
) {
  const exists = fs.existsSync(file)
  const originalContent = exists ? fs.readFileSync(file, 'utf-8') : ''
  fs.ensureDirSync(path.dirname(file))
  fs.writeFileSync(file, content)
  try {
    await test()
  } finally {
    if (exists) {
      fs.writeFileSync(file, originalContent)
    } else {
      fs.removeSync(file)
    }
  }
}

async function runUniAppBuild(outDir: string, stdio: 'inherit' | 'pipe') {
  return execa('npm', ['run', 'build:mp-weixin'], {
    cwd: projectDir,
    env: {
      ...process.env,
      UNI_OUTPUT_DIR: outDir,
      UNI_APP_X: 'false',
    },
    stdio,
    all: stdio === 'pipe',
  })
}

async function expectIndependentBuildFailure(
  outDir: string,
  expectedMessages: string[]
) {
  let output = ''
  try {
    await runUniAppBuild(outDir, 'pipe')
  } catch (error: any) {
    output = [error.all, error.stdout, error.stderr, error.message]
      .filter(Boolean)
      .join('\n')
  }
  expect(output).toContain('独立分包 "package-independent"')
  expectedMessages.forEach((message) => {
    expect(output).toContain(message)
  })
}

function expectIndependentJsInRoot(outDir: string, root: string) {
  const rootDir = path.resolve(outDir, root)
  const jsFiles = findFiles(rootDir).filter((file) => file.endsWith('.js'))

  jsFiles.forEach((file) => {
    const filename = path.posix.join(root, file.split(path.sep).join('/'))
    const code = fs.readFileSync(path.resolve(rootDir, file), 'utf-8')
    code.replace(
      /\brequire\(\s*['"]([^'"]+)['"]\s*\)/g,
      (match, source: string) => {
        if (source.startsWith('.')) {
          const resolved = path.posix.normalize(
            path.posix.join(path.posix.dirname(filename), source)
          )
          expect(resolved === root || resolved.startsWith(`${root}/`)).toBe(
            true
          )
        }
        return match
      }
    )
  })
}

function findFiles(dir: string, prefix = ''): string[] {
  return fs.readdirSync(dir).flatMap((name) => {
    const file = path.join(prefix, name)
    const filepath = path.join(dir, name)
    if (fs.statSync(filepath).isDirectory()) {
      return findFiles(filepath, file)
    }
    return file
  })
}

describe('subpackage playground', () => {
  jest.setTimeout(120 * 1000)
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
          // console.log(filePath)
          expect(fs.existsSync(filePath)).toBe(true)
          expect(fs.readFileSync(filePath, 'utf-8')).toMatchSnapshot(
            `${type} ${script} ${file}`
          )
        })
      })
    })
  })

  test('uni-app build:mp-weixin independent subpackage', async () => {
    const outDir = path.resolve(distDir, 'build', 'uni-app', 'mp-weixin-full')
    await withPagesJson(createIndependentPagesJson(), async () => {
      console.log('uni-app npm run build:mp-weixin independent start')
      await runUniAppBuild(outDir, 'inherit')
      console.log('uni-app npm run build:mp-weixin independent end')
    })

    const files = [
      'package-independent/common/index.js',
      'package-independent/common/main.js',
      'package-independent/pages/index/index.js',
      'package-independent/pages/index/index.json',
      'package-independent/pages/index/index.wxml',
      'package-independent/pages/index/index.wxss',
      'package-independent/components/independent-card/independent-card.js',
      'package-independent/components/independent-card/independent-card.json',
      'package-independent/components/independent-card/independent-card.wxml',
      'package-independent/components/independent-card/independent-card.wxss',
      'package-independent/wxcomponents/native-badge/index.js',
      'package-independent/wxcomponents/native-badge/index.json',
      'package-independent/wxcomponents/native-badge/index.wxml',
      'package-independent/wxcomponents/native-badge/index.wxss',
      'package-independent/static/logo.png',
      'package-normal/pages/index/index.js',
      'package-normal/pages/index/index.json',
      'package-normal/pages/index/index.wxml',
      'package-normal/pages/index/index.wxss',
    ]
    files.forEach((file) => {
      expect(fs.existsSync(path.resolve(outDir, file))).toBe(true)
    })

    const appJson = fs.readJSONSync(path.resolve(outDir, 'app.json'))
    expect(appJson.subPackages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          root: 'package-normal',
        }),
        expect.objectContaining({
          root: 'package-independent',
          independent: true,
        }),
      ])
    )
    const pageJson = fs.readJSONSync(
      path.resolve(outDir, 'package-independent/pages/index/index.json')
    )
    expect(pageJson.usingComponents).toMatchObject({
      'independent-card': '../../components/independent-card/independent-card',
      'native-badge': '../../wxcomponents/native-badge/index',
    })
    expect(
      fs.readFileSync(
        path.resolve(outDir, 'package-independent/pages/index/index.js'),
        'utf-8'
      )
    ).toContain("require('../../common/index.js')")
    expect(
      fs.readFileSync(
        path.resolve(outDir, 'package-independent/pages/index/index.wxss'),
        'utf-8'
      )
    ).not.toContain('@import "../../common/main.wxss";')
    const independentMain = fs.readFileSync(
      path.resolve(outDir, 'package-independent/common/main.js'),
      'utf-8'
    )
    expect(independentMain).toContain('createSSRApp')
    expect(independentMain).toContain('independent: true')
    expect(independentMain).not.toContain('store-ready')
    expect(independentMain).not.toContain('App Launch')
    expect(
      fs.existsSync(
        path.resolve(outDir, 'package-independent/common/main.wxss')
      )
    ).toBe(false)
    expect(
      fs.existsSync(
        path.resolve(outDir, 'package-independent/common/assets.js')
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.resolve(outDir, 'package-independent/pages/index/index2.js')
      )
    ).toBe(false)
    expectIndependentJsInRoot(outDir, 'package-independent')
  })

  test('uni-app build:mp-weixin independent subpackage boundaries', async () => {
    const originalPage = fs.readFileSync(independentPageFile, 'utf-8')
    await withPagesJson(createIndependentPagesJson(), async () => {
      const outsideJsFile = path.resolve(
        projectDir,
        'src/__independent_tmp__/outside-js.js'
      )
      await withFileContent(
        outsideJsFile,
        'export const outsideMessage = "outside-js"\n',
        async () => {
          await withFileContent(
            independentPageFile,
            originalPage.replace(
              '<script>\n',
              '<script>\nimport { outsideMessage } from "../../../__independent_tmp__/outside-js.js"\nconsole.log(outsideMessage)\n'
            ),
            async () => {
              await expectIndependentBuildFailure(
                path.resolve(
                  distDir,
                  'build',
                  'uni-app',
                  'mp-weixin-outside-js'
                ),
                [
                  'root 外依赖：__independent_tmp__/outside-js.js',
                  '来源：package-independent/pages/index/index.vue -> ../../../__independent_tmp__/outside-js.js',
                ]
              )
            }
          )
        }
      )

      const outsideVueFile = path.resolve(
        projectDir,
        'src/__independent_tmp__/outside-card.vue'
      )
      await withFileContent(
        outsideVueFile,
        '<template><view>outside</view></template>\n',
        async () => {
          await withFileContent(
            independentPageFile,
            originalPage.replace(
              '<script>\n',
              '<script>\nimport OutsideCard from "../../../__independent_tmp__/outside-card.vue"\nconsole.log(OutsideCard)\n'
            ),
            async () => {
              await expectIndependentBuildFailure(
                path.resolve(
                  distDir,
                  'build',
                  'uni-app',
                  'mp-weixin-outside-vue'
                ),
                [
                  'root 外依赖：__independent_tmp__/outside-card.vue',
                  '来源：package-independent/pages/index/index.vue -> ../../../__independent_tmp__/outside-card.vue',
                ]
              )
            }
          )
        }
      )

      await withFileContent(
        independentPageFile,
        originalPage.replace(
          'src="../../static/logo.png"',
          'src="../../../static/logo.png"'
        ),
        async () => {
          await expectIndependentBuildFailure(
            path.resolve(
              distDir,
              'build',
              'uni-app',
              'mp-weixin-outside-asset'
            ),
            [
              'root 外依赖：static/logo.png',
              '来源：package-independent/pages/index/index.vue -> ../../../static/logo.png',
            ]
          )
        }
      )
    })

    await withPagesJson(
      createIndependentPagesJson({
        'native-badge': '../../wxcomponents/native-badge/index',
        'outside-native': '/wxcomponents/outside/index',
      }),
      async () => {
        await expectIndependentBuildFailure(
          path.resolve(distDir, 'build', 'uni-app', 'mp-weixin-outside-native'),
          [
            '在 "package-independent/pages/index/index" 中使用 root 外组件 "outside-native"',
            '/wxcomponents/outside/index',
          ]
        )
      }
    )
  })
})
