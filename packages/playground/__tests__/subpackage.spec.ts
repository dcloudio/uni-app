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
    const pagesJsonFile = path.resolve(projectDir, 'src/pages.json')
    const pagesJson = fs.readFileSync(pagesJsonFile, 'utf-8')
    const outDir = path.resolve(distDir, 'build', 'uni-app', 'mp-weixin-full')
    fs.writeJSONSync(
      pagesJsonFile,
      {
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
                  usingComponents: {
                    'native-badge': '../../wxcomponents/native-badge/index',
                  },
                },
              },
            ],
          },
        ],
      },
      { spaces: 2 }
    )
    try {
      console.log('uni-app npm run build:mp-weixin independent start')
      await execa('npm', ['run', 'build:mp-weixin'], {
        cwd: projectDir,
        env: {
          ...process.env,
          UNI_OUTPUT_DIR: outDir,
          UNI_APP_X: 'false',
        },
        stdio: 'inherit',
      })
      console.log('uni-app npm run build:mp-weixin independent end')
    } finally {
      fs.writeFileSync(pagesJsonFile, pagesJson)
    }

    const files = [
      'package-independent/common/index.js',
      'package-independent/common/main.js',
      'package-independent/common/main.wxss',
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
    ).toContain('@import "../../common/main.wxss";')
    expect(
      fs.readFileSync(
        path.resolve(outDir, 'package-independent/common/main.js'),
        'utf-8'
      )
    ).toContain('store-ready')
  })
})
