import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { execFileSync } from 'child_process'
import {
  resolveWebVaporComponents,
  resolveWebVaporFrameworkComponents,
} from '../webVaporComponentConfig'
import {
  UVUE_VAPOR_WEB_EASYCOMS,
  UVUE_VAPOR_WEB_STYLE_COMPONENTS,
} from '../../packages/uni-shared/src/tagsGen'
import {
  prepareWebVaporComponents,
  webVaporComponentStylesPlugin,
} from '../webVaporComponents'
import { initScopedPreContext } from '../../packages/uni-cli-shared/src/preprocess/context'

describe('Web Vapor 组件生成', () => {
  test('框架组件名单来自真实导出，样式名单中的文件均存在', () => {
    const root = path.resolve(__dirname, '../..')
    for (const name of resolveWebVaporFrameworkComponents(root)) {
      expect(UVUE_VAPOR_WEB_EASYCOMS).toContain(name)
    }
    for (const name of UVUE_VAPOR_WEB_STYLE_COMPONENTS) {
      expect(
        fs.existsSync(
          path.join(
            root,
            'packages/uni-components/style-x-vapor',
            `${name}.css`
          )
        )
      ).toBe(true)
    }
  })

  test('从包含特殊字符的目录读取组件入口，仅收集实际组件导出', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'web-vapor-[entry]-'))
    try {
      fs.outputFileSync(
        path.join(root, 'packages/uni-components/src/vue/index-x-vapor.ts'),
        `
        import Input from './input/index-vapor'
        import type Hidden from './hidden'
        export { Input, Hidden }
      `
      )
      fs.outputFileSync(
        path.join(root, 'packages/uni-h5/src/view/components/index-vapor.ts'),
        `
        export { default as WebView } from './web-view/index-vapor'
        export { UniWebViewElement } from './web-view/index-vapor'
      `
      )
      expect(resolveWebVaporFrameworkComponents(root)).toEqual([
        'input',
        'web-view',
      ])
    } finally {
      fs.removeSync(root)
    }
  })

  test.each(['C:\\workspace\\[repo]', '\\\\server\\share\\[repo]'])(
    '使用 Windows 文件系统路径读取组件入口：%s',
    (root) => {
      const configFile = path.resolve(
        __dirname,
        '../webVaporComponentConfig.js'
      )
      const output = execFileSync(
        process.execPath,
        [
          '-e',
          `
        const Module = require('module')
        const path = require('path')
        const fs = require('fs-extra')
        const configFile = ${JSON.stringify(configFile)}
        const root = ${JSON.stringify(root)}
        const files = new Map([
          [path.win32.resolve(root, 'packages/uni-components/src/vue/index-x-vapor.ts'), "import Input from './input'; export { Input }"],
          [path.win32.resolve(root, 'packages/uni-h5/src/view/components/index-vapor.ts'), "export { default as WebView } from './web-view'"],
        ])
        const load = Module._load
        Module._load = function (name, parent, ...rest) {
          if (parent && parent.filename === configFile) {
            if (name === 'path') return path.win32
            if (name === 'fs-extra') return {
              ...fs,
              statSync: file => ({ isDirectory: () => [path.win32.resolve(root), path.win32.resolve(root, 'components')].includes(file) }),
              readFileSync: file => {
                if (!files.has(file)) throw new Error('unexpected path: ' + file)
                return files.get(file)
              },
            }
          }
          return load.call(this, name, parent, ...rest)
        }
        const config = require(configFile)
        process.env.UNI_APP_WEB_COMPONENTS_DIR = root
        if (config.resolveWebVaporSourceDir(root) !== path.win32.resolve(root)) throw new Error('unexpected absolute source path')
        process.env.UNI_APP_WEB_COMPONENTS_DIR = './components'
        if (config.resolveWebVaporSourceDir(root) !== path.win32.resolve(root, 'components')) throw new Error('unexpected relative source path')
        process.stdout.write(JSON.stringify(config.resolveWebVaporFrameworkComponents(root)))
        `,
        ],
        { encoding: 'utf8' }
      )
      expect(JSON.parse(output)).toEqual(['input', 'web-view'])
    }
  )
  test.each([
    ['dom2', ['button', 'input', 'textarea']],
    [{ exclude: ['input', 'textarea'] }, ['button']],
    [{ include: ['input'] }, ['input']],
    [{ include: ['input'], exclude: ['input'] }, ['input']],
    [{ include: [] }, []],
    [{ exclude: [] }, ['button', 'input', 'textarea']],
    [{}, ['button', 'input', 'textarea']],
    [true, []],
    [false, []],
    [null, []],
    [[], []],
  ])('按 Web 组件配置 %j 筛选', (web, expected) => {
    const extApiDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'web-vapor-filter-')
    )
    try {
      fs.outputJsonSync(path.join(extApiDir, 'uni-form/package.json'), {
        uni_modules: { components: { web } },
      })
      for (const name of ['button', 'input', 'textarea']) {
        fs.outputFileSync(
          path.join(extApiDir, `uni-form/components/${name}/${name}.uvue`),
          '<template />'
        )
      }
      expect([...resolveWebVaporComponents(extApiDir).keys()]).toEqual(expected)
    } finally {
      fs.removeSync(extApiDir)
    }
  })

  test('根据 package.json 的 Web DOM2 配置生成组件', () => {
    const extApiDir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-vapor-'))
    try {
      fs.outputJsonSync(path.join(extApiDir, 'uni-progress/package.json'), {
        uni_modules: { components: { web: 'dom2' } },
      })
      fs.outputFileSync(
        path.join(extApiDir, 'uni-progress/components/progress/progress.uvue'),
        '<template />'
      )
      fs.outputFileSync(
        path.join(extApiDir, 'uni-progress/components/progress/global.ts'),
        'export class UniProgressElement {}'
      )
      fs.outputJsonSync(path.join(extApiDir, 'uni-video/package.json'), {
        uni_modules: { components: { web: true } },
      })
      fs.outputFileSync(
        path.join(extApiDir, 'uni-video/components/video/video.uvue'),
        '<template />'
      )
      fs.outputJsonSync(path.join(extApiDir, 'uni-form/package.json'), {
        uni_modules: { components: { web: false } },
      })
      fs.outputFileSync(
        path.join(extApiDir, 'uni-form/components/button/button.uvue'),
        '<template />'
      )

      expect([...resolveWebVaporComponents(extApiDir)]).toEqual([
        [
          'progress',
          {
            source: 'uni-progress/components/progress/progress.uvue',
            elementSource: 'uni-progress/components/progress/global.ts',
          },
        ],
      ])
    } finally {
      fs.removeSync(extApiDir)
    }
  })

  test('框架未接入组件从同一份配置推导，不影响启用名单', () => {
    const extApiDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'web-vapor-excluded-')
    )
    try {
      fs.outputJsonSync(path.join(extApiDir, 'uni-form/package.json'), {
        uni_modules: {
          components: { web: { exclude: ['input', 'textarea'] } },
        },
      })
      for (const name of ['progress', 'input', 'textarea']) {
        fs.outputFileSync(
          path.join(extApiDir, `uni-form/components/${name}/${name}.uvue`),
          '<template />'
        )
      }
      expect([...resolveWebVaporComponents(extApiDir).keys()]).toEqual([
        'progress',
      ])
      expect([...resolveWebVaporComponents(extApiDir, true).keys()]).toEqual([
        'input',
        'progress',
        'textarea',
      ])
    } finally {
      fs.removeSync(extApiDir)
    }
  })

  test.each([
    'global.ts',
    'global.uts',
    'global.uts.ts',
    'index.ts',
    'index.uts',
    'index.uts.ts',
    'element.ts',
    'element.uts',
    'element.uts.ts',
  ])('统一识别组件元素文件 %s', (elementFile) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-vapor-element-'))
    try {
      fs.outputJsonSync(path.join(dir, 'uni-loading/package.json'), {
        uni_modules: { components: { web: 'dom2' } },
      })
      fs.outputFileSync(
        path.join(dir, 'uni-loading/components/loading/loading.uvue'),
        '<template />'
      )
      fs.outputFileSync(
        path.join(dir, 'uni-loading/components/loading', elementFile),
        'export class UniLoadingElement {}'
      )
      expect(resolveWebVaporComponents(dir).get('loading')).toEqual({
        source: 'uni-loading/components/loading/loading.uvue',
        elementSource: `uni-loading/components/loading/${elementFile}`,
      })
    } finally {
      fs.removeSync(dir)
    }
  })

  test.each(['global', 'index', 'element'])(
    '%s 同名文件优先选择标准 TS',
    (name) => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-vapor-ts-'))
      try {
        fs.outputJsonSync(path.join(dir, 'uni-loading/package.json'), {
          uni_modules: { components: { web: 'dom2' } },
        })
        const componentDir = path.join(dir, 'uni-loading/components/loading')
        fs.outputFileSync(
          path.join(componentDir, 'loading.uvue'),
          '<template />'
        )
        for (const ext of ['.ts', '.uts', '.uts.ts']) {
          fs.outputFileSync(path.join(componentDir, name + ext), '')
        }
        expect(
          resolveWebVaporComponents(dir).get('loading')?.elementSource
        ).toBe(`uni-loading/components/loading/${name}.ts`)
      } finally {
        fs.removeSync(dir)
      }
    }
  )

  test('无外部源码时，读取已同步副本的组件、元素和排除配置', () => {
    const componentsDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'web-vapor-cached-')
    )
    try {
      fs.outputJsonSync(path.join(componentsDir, 'uni-form/package.json'), {
        uni_modules: {
          components: { web: { exclude: ['button', 'input', 'textarea'] } },
        },
      })
      for (const name of ['button', 'input', 'textarea', 'progress']) {
        fs.outputFileSync(
          path.join(componentsDir, `uni-form/components/${name}/${name}.vue`),
          '<template /><style>.component { color: red; }</style>'
        )
      }
      fs.outputFileSync(
        path.join(componentsDir, 'uni-form/components/progress/global.uts.ts'),
        'export class UniProgressElement {}'
      )
      const components = resolveWebVaporComponents(componentsDir)
      expect([...components]).toEqual([
        [
          'progress',
          {
            source: 'uni-form/components/progress/progress.vue',
            elementSource: 'uni-form/components/progress/global.uts.ts',
          },
        ],
      ])
      expect(
        [...resolveWebVaporComponents(componentsDir, true).keys()].filter(
          (name) => !components.has(name)
        )
      ).toEqual(['button', 'input', 'textarea'])
    } finally {
      fs.removeSync(componentsDir)
    }
  })

  test.each(
    [false, { include: [] }, { exclude: ['progress'] }].flatMap((web) => [
      [web, false],
      [web, true],
    ])
  )(
    '模块禁用为 %j 后，入口和排除名单一致（首次即禁用=%s）',
    async (web, initiallyDisabled) => {
      const tempDir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'web-vapor-disable-')
      )
      try {
        const extApiDir = path.join(tempDir, 'source')
        const componentsDir = path.join(tempDir, 'compiled')
        const packageFile = 'uni-progress/package.json'
        const componentFile = 'uni-progress/components/progress/progress.uvue'
        const options = {
          extApiDir,
          componentsDir,
          componentsEntryOutput: path.join(tempDir, 'index.ts'),
          styleDir: path.join(tempDir, 'style'),
          context: {
            ...initScopedPreContext('h5', {}, 'web', true).preUVueContext,
            VUE3_VAPOR: true,
          },
        }
        fs.outputJsonSync(path.join(extApiDir, packageFile), {
          uni_modules: {
            components: { web: initiallyDisabled ? web : 'dom2' },
          },
        })
        fs.outputFileSync(
          path.join(extApiDir, componentFile),
          '<template /><style>.progress { color: red; }</style>'
        )
        await prepareWebVaporComponents(options)
        expect([...resolveWebVaporComponents(componentsDir).keys()]).toEqual(
          initiallyDisabled ? [] : ['progress']
        )

        const apiFile = path.join(componentsDir, 'uni-progress/api/index.ts')
        fs.outputFileSync(apiFile, 'export const preserved = true')
        const packageContent =
          JSON.stringify({ uni_modules: { components: { web } } }, null, 2) +
          '\n'
        fs.outputFileSync(
          path.join(extApiDir, packageFile),
          packageContent.replace(/\n/g, '\r\n')
        )
        await prepareWebVaporComponents(options)

        expect(
          fs.readFileSync(path.join(componentsDir, packageFile), 'utf8')
        ).toBe(packageContent)
        expect(fs.readFileSync(path.join(extApiDir, packageFile), 'utf8')).toBe(
          packageContent.replace(/\n/g, '\r\n')
        )
        expect(fs.readJsonSync(path.join(componentsDir, packageFile))).toEqual(
          fs.readJsonSync(path.join(extApiDir, packageFile))
        )
        expect([...resolveWebVaporComponents(componentsDir).keys()]).toEqual([])
        expect([
          ...resolveWebVaporComponents(componentsDir, true).keys(),
        ]).toEqual(['progress'])
        expect([...resolveWebVaporComponents(extApiDir, true).keys()]).toEqual([
          'progress',
        ])
        expect(
          fs.readFileSync(options.componentsEntryOutput, 'utf8')
        ).not.toContain('default as Progress')
        expect(fs.existsSync(path.join(options.styleDir, 'progress.css'))).toBe(
          false
        )
        expect(fs.readFileSync(apiFile, 'utf8')).toBe(
          'export const preserved = true'
        )
        expect(
          fs.existsSync(
            path.join(componentsDir, componentFile.replace(/\.uvue$/, '.vue'))
          )
        ).toBe(true)
      } finally {
        fs.removeSync(tempDir)
      }
    }
  )

  test.each(['file', 'directory', 'module'])(
    '源码移除最后一个组件（%s）后，清理组件副本但保留 API 和页面',
    async (removed) => {
      const tempDir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'web-vapor-removed-')
      )
      try {
        const extApiDir = path.join(tempDir, 'source')
        const componentsDir = path.join(tempDir, 'compiled')
        const sourceModule = path.join(extApiDir, 'uni-progress')
        const cachedModule = path.join(componentsDir, 'uni-progress')
        const options = {
          extApiDir,
          componentsDir,
          componentsEntryOutput: path.join(tempDir, 'index.ts'),
          styleDir: path.join(tempDir, 'style'),
          context: {},
        }
        fs.outputJsonSync(path.join(sourceModule, 'package.json'), {
          uni_modules: { components: { web: 'dom2' } },
        })
        fs.outputFileSync(
          path.join(sourceModule, 'components/progress/progress.uvue'),
          '<template /><style>.progress { color: red; }</style>'
        )
        await prepareWebVaporComponents(options)
        const apiFile = path.join(cachedModule, 'utssdk/web/index.uts.ts')
        const pageFile = path.join(cachedModule, 'pages/index.vue')
        fs.outputFileSync(apiFile, 'export const preserved = true')
        fs.outputFileSync(pageFile, '<template />')
        fs.removeSync(
          removed === 'module'
            ? sourceModule
            : path.join(
                sourceModule,
                removed === 'directory'
                  ? 'components'
                  : 'components/progress/progress.uvue'
              )
        )
        await prepareWebVaporComponents(options)

        expect([...resolveWebVaporComponents(componentsDir).keys()]).toEqual([])
        expect([
          ...resolveWebVaporComponents(componentsDir, true).keys(),
        ]).toEqual([])
        expect(
          fs.existsSync(
            path.join(cachedModule, 'components/progress/progress.vue')
          )
        ).toBe(false)
        expect(
          fs.readFileSync(options.componentsEntryOutput, 'utf8')
        ).not.toContain('default as Progress')
        expect(fs.readdirSync(options.styleDir)).toEqual([])
        expect(fs.readFileSync(apiFile, 'utf8')).toBe(
          'export const preserved = true'
        )
        expect(fs.readFileSync(pageFile, 'utf8')).toBe('<template />')
      } finally {
        fs.removeSync(tempDir)
      }
    }
  )

  test('Button 样式随内网组件的启用状态生成', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-vapor-button-'))
    try {
      const extApiDir = path.join(tempDir, 'source [button]')
      const styleDir = path.join(tempDir, 'style [vapor]')
      const packageFile = path.join(extApiDir, 'uni-form/package.json')
      const options = {
        extApiDir,
        componentsDir: path.join(tempDir, 'compiled [button]'),
        componentsEntryOutput: path.join(tempDir, 'index.ts'),
        styleDir,
        context: {
          ...initScopedPreContext('h5', {}, 'web', true).preUVueContext,
          VUE3_VAPOR: true,
        },
      }
      fs.outputJsonSync(packageFile, {
        uni_modules: { components: { web: false } },
      })
      fs.outputFileSync(
        path.join(extApiDir, 'uni-form/components/button/button.uvue'),
        '<template><view /></template><style>.app-button { color: red; }</style>'
      )
      const buttonStyle = path.join(styleDir, 'button.css')
      const manualStyle = 'div:where([uni-button]) { display: block; }'
      fs.outputFileSync(buttonStyle, manualStyle)
      fs.outputFileSync(path.join(styleDir, 'obsolete.css'), '.obsolete {}')
      await prepareWebVaporComponents(options)
      expect(fs.existsSync(buttonStyle)).toBe(false)
      expect(fs.readdirSync(styleDir)).toEqual([])
      expect(
        fs.readFileSync(options.componentsEntryOutput, 'utf8')
      ).not.toContain('default as Button')

      fs.outputJsonSync(packageFile, {
        uni_modules: { components: { web: 'dom2' } },
      })
      await prepareWebVaporComponents(options)
      expect(fs.readFileSync(buttonStyle, 'utf8')).toContain('.app-button {')
      expect(fs.readFileSync(buttonStyle, 'utf8')).not.toContain('[uni-button]')
      expect(fs.readFileSync(options.componentsEntryOutput, 'utf8')).toContain(
        'default as Button'
      )
    } finally {
      fs.removeSync(tempDir)
    }
  })

  test('入口和样式遵循同一筛选结果，样式提取复用完整编译上下文', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-vapor-style-'))
    const originalExtApiDir = process.env.UNI_APP_EXT_API_DIR
    try {
      const extApiDir = path.join(tempDir, 'source')
      const componentsDir = path.join(tempDir, 'compiled')
      const sourceFile = path.join(
        componentsDir,
        'uni-progress/components/progress/progress.vue'
      )
      const context = {
        ...initScopedPreContext('h5', {}, 'web', true).preUVueContext,
        VUE3_VAPOR: true,
      }
      const source = `<template><view /></template>
<script setup lang="uts">
// #ifdef APP || WEB
const enabled = true
// #endif
</script>
<style>
/* #ifdef APP || WEB */
.app-or-web { color: red; }
/* #endif */
/* #ifdef WEB || APP */
.web-or-app { color: red; }
/* #endif */
/* #ifdef WEB && !APP */
.web-not-app { color: red; }
/* #endif */
/* #ifdef MP-WEIXIN || WEB */
.mp-or-web { color: red; }
/* #endif */
/* #ifdef UNI-APP-X && VUE3 && VUE3-VAPOR && H5 && WEB */
.web-vapor { color: red; }
/* #endif */
/* #ifndef APP */
/* #ifdef VUE3 && (WEB || MP) */
.nested-web { color: red; }
/* #endif */
/* #endif */
/* #ifdef APP || MP */
.app-or-mp { color: red; }
/* #endif */
</style>`
      fs.outputJsonSync(path.join(extApiDir, 'uni-progress/package.json'), {
        uni_modules: {
          components: { web: { exclude: ['input', 'textarea'] } },
        },
      })
      for (const name of ['input', 'textarea']) {
        fs.outputFileSync(
          path.join(extApiDir, `uni-progress/components/${name}/${name}.uvue`),
          '<template /><style scoped />'
        )
      }
      fs.outputFileSync(
        path.join(extApiDir, 'uni-progress/components/progress/progress.uvue'),
        source
      )
      process.env.UNI_APP_EXT_API_DIR = extApiDir

      const styleDir = path.join(tempDir, 'style')
      fs.outputFileSync(path.join(styleDir, 'input.css'), '.old-input {}')
      fs.outputFileSync(path.join(styleDir, 'textarea.css'), '.old-textarea {}')
      await prepareWebVaporComponents({
        extApiDir,
        componentsDir,
        componentsEntryOutput: path.join(tempDir, 'index.ts'),
        styleDir,
        context,
      })

      const css = fs.readFileSync(path.join(styleDir, 'progress.css'), 'utf8')
      expect(fs.readdirSync(styleDir)).toEqual(['progress.css'])
      const entry = fs.readFileSync(path.join(tempDir, 'index.ts'), 'utf8')
      expect(entry).toContain('default as Progress')
      expect(entry).not.toMatch(/default as (Input|Textarea)/)
      expect(entry).not.toContain('uni-components/src/index-vapor')
      for (const selector of [
        'app-or-web',
        'web-or-app',
        'web-not-app',
        'mp-or-web',
        'web-vapor',
        'nested-web',
      ]) {
        expect(css).toContain(`.${selector} {`)
      }
      expect(css).not.toContain('.app-or-mp')
      expect(css).not.toContain('#ifdef')
      expect(fs.readFileSync(sourceFile, 'utf8')).toContain(
        '// #ifdef APP || WEB'
      )
      expect(fs.readFileSync(sourceFile, 'utf8')).toContain('<style>')
      expect([...resolveWebVaporComponents(componentsDir).keys()]).toEqual([
        'progress',
      ])
      const plugin = webVaporComponentStylesPlugin(componentsDir) as any
      expect(plugin.transform(source, sourceFile).code).not.toContain('<style>')
      expect(
        plugin.transform(source, path.join(tempDir, 'other.vue'))
      ).toBeUndefined()
      expect(
        plugin.transform(source, sourceFile + '?vue&type=script')
      ).toBeUndefined()
    } finally {
      if (originalExtApiDir === undefined) {
        delete process.env.UNI_APP_EXT_API_DIR
      } else {
        process.env.UNI_APP_EXT_API_DIR = originalExtApiDir
      }
      fs.removeSync(tempDir)
    }
  })
})

test('真实 Button 接入使用 uni-form 的组件、Element 和样式，保留非 Vapor 入口', () => {
  const nextDir = path.resolve(__dirname, '../..')
  const read = (file: string) =>
    fs.readFileSync(path.join(nextDir, file), 'utf8')
  const modulesDir = path.join(nextDir, 'uni-ext-api/uni_modules')
  const button = resolveWebVaporComponents(modulesDir).get('button')
  expect(button).toEqual({
    source: 'uni-form/components/button/button.vue',
    elementSource: 'uni-form/components/button/global.ts',
  })
  expect(resolveWebVaporFrameworkComponents(nextDir)).not.toContain('button')
  const entry = read('packages/uni-h5/src/x/view/components/index-vapor.ts')
  expect(entry).toContain(
    "default as Button } from '@dcloudio/uni-ext-component/uni-form/components/button/button.uvue'"
  )
  expect(entry).toMatch(
    /UniButtonElement,\s+UniButtonElement as UniButtonElementImpl,\s*} from '@dcloudio\/uni-ext-component\/uni-form\/components\/button\/global.ts'/
  )
  expect(read('packages/uni-components/src/vue/index-x.ts')).toContain(
    "import Button, { UniButtonElement } from './button/index'"
  )
  expect(UVUE_VAPOR_WEB_EASYCOMS).toContain('button')
  expect(UVUE_VAPOR_WEB_STYLE_COMPONENTS).toContain('button')

  const { preprocess } = require('../../packages/uni-cli-shared/lib/preprocess')
  const { parseSfc } = require('../syncExtComponentFile')
  const { format } = require('prettier')
  const context = {
    ...initScopedPreContext('h5', {}, 'web', true).preUVueContext,
    VUE3_VAPOR: true,
  }
  const source = read('uni-ext-api/uni_modules/' + button!.source)
  const code = preprocess(
    preprocess(source, context, { type: 'html' }),
    context,
    { type: 'js' }
  )
  const { descriptor, errors } = parseSfc(code, button!.source)
  expect(errors).toEqual([])
  const css = descriptor.styles
    .map((style: { content: string }) => style.content)
    .join('\n')
  expect(
    format(read('packages/uni-components/style-x-vapor/button.css'), {
      parser: 'css',
    })
  ).toBe(format(css, { parser: 'css' }))
  expect(css).toContain('uni-app div:where(.uni-button)')
  // Web Vapor 的 loading 根节点适配不进入旧 Web 和 App 的组件样式。
  for (const overrides of [
    { WEB: true, VUE3_VAPOR: false },
    { WEB: false, APP: true, VUE3_VAPOR: true },
  ]) {
    const preContext = { ...context, ...overrides }
    const { descriptor } = parseSfc(
      preprocess(
        preprocess(source, preContext, { type: 'html' }),
        preContext,
        { type: 'js' }
      ),
      button!.source
    )
    expect(
      descriptor.styles
        .map((style: { content: string }) => style.content)
        .join('\n')
    ).not.toContain('uni-app div:where(.uni-button)')
  }
})
