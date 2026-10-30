import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import {
  buildInCssSet,
  initEasycoms,
  normalizePath,
} from '@dcloudio/uni-cli-shared'
import { uniEasycomPlugin } from '../src/plugins/easycom'
import { resolveWebVaporComponents } from '../../../scripts/webVaporComponentConfig'
import { prepareWebVaporComponents } from '../../../scripts/webVaporComponents'

const { parseAst } = require('rollup/parseAst')

describe('h5 easycom', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_HX_VERSION_DEV: process.env.UNI_HX_VERSION_DEV,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'h5-easycom-'))
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), {
      pages: [{ path: 'pages/index/index' }],
    })
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/uni-form/components/button/button.uvue'),
      '<template><view /></template>'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/uni-form/utssdk/app-android/index.uts'),
      ''
    )
    fs.outputFileSync(
      path.join(inputDir, 'components/Example/Example.uvue'),
      '<template><view /></template>'
    )
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_HX_VERSION_DEV = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'
    initEasycoms(inputDir, { dirs: [], platform: 'h5', isX: true })
  })

  afterEach(() => {
    buildInCssSet.clear()
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = value
      }
    })
    fs.removeSync(inputDir)
  })

  function transform(code: string, parse = parseAst) {
    const plugin = uniEasycomPlugin({}) as any
    const result = plugin.transform.call(
      { parse },
      code,
      `${inputDir}/pages/index/index.uvue?vue&type=template`
    )
    return (result?.code ?? code) as string
  }

  test('框架构建未初始化项目环境时，显式启用 Vapor 组件解析', () => {
    delete process.env.UNI_APP_X_DOM2
    const source = 'const n0 = _createAssetComponent("scroll-view")'
    const plugin = uniEasycomPlugin({ vapor: true }) as any
    const code = plugin.transform.call(
      { parse: parseAst },
      source,
      `${inputDir}/uni_modules/uni-form/components/picker-view-column/picker-view-column.vue?vue&type=script&setup=true&lang.ts`
    ).code
    expect(code).toContain(
      "import { ScrollView as __syscom_0 } from '@dcloudio/uni-h5';"
    )
    expect(code).toContain('__createEasycomComponent(__syscom_0)')
    expect(code).not.toContain('_createAssetComponent')
    expect(transform(source)).toBe(source)
    expect(plugin.enforce).toBeUndefined()
  })

  test('Web Vapor 使用项目内的内置 easycom 组件', () => {
    const code = transform(
      'const n1 = _createAssetComponent("v-uni-button", null, () => n0, true)'
    )

    expect(code).toContain(
      `import __easycom_0 from '${normalizePath(
        path.join(
          inputDir,
          'uni_modules/uni-form/components/button/button.uvue'
        )
      )}';`
    )
    expect(code).toContain(
      '__createEasycomComponent(__easycom_0, null, () => n0, true)'
    )
    expect(code).not.toContain("from '@dcloudio/uni-h5'")
  })

  test('Web Vapor 去除只属于按名解析的自引用和命名空间参数', () => {
    const code = transform(
      'const n0 = _createAssetComponent("Example", { value: () => ({ a: 1 }) }, null, true, null, true, 1)'
    )

    expect(code).toContain(
      '__createEasycomComponent(__easycom_0, { value: () => ({ a: 1 }) }, null, true, null)'
    )
  })

  test('Web Vapor 未命中的组件保持运行时解析', () => {
    const source = 'const n0 = _createAssetComponent("Unknown")'

    expect(transform(source)).toBe(source)
  })

  test.each([
    ['button', 'style-x-vapor/button.css'],
    ['input', 'style/vapor/input.css'],
    ['textarea', 'style/vapor/textarea.css'],
    ['video', 'style/vapor/video.css'],
    ['progress', 'style-x-vapor/progress.css'],
  ])('Web Vapor 的 %s 使用实际的样式目录', (name, css) => {
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform(`const n0 = _createAssetComponent("${name}")`)
    expect(code).toContain(css)
    expect(code).toContain("from '@dcloudio/uni-h5'")
  })

  test.each([
    ['input', 'style/input.css'],
    ['textarea', 'style/textarea.css'],
    ['video', 'style/video.css'],
  ])('非 Vapor 的 %s 继续使用原来的样式目录', (name, css) => {
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform(`_resolveComponent("${name}")`)
    expect(code).toContain(css)
    expect(code).not.toContain('style-x-vapor/')
  })

  test.each([
    'ad',
    'ad-content-page',
    'ad-draw',
    'camera',
    'live-player',
    'live-pusher',
    'web-view',
  ])('%s 按模式加载样式，占位组件复用基础 View 样式', (name) => {
    delete process.env.UNI_HX_VERSION_DEV
    for (const vapor of [false, true]) {
      if (vapor) process.env.UNI_APP_X_DOM2 = 'true'
      else delete process.env.UNI_APP_X_DOM2
      for (const command of ['serve', 'build']) {
        buildInCssSet.clear()
        const plugin = uniEasycomPlugin({}) as any
        plugin.configResolved({ command, build: { cssCodeSplit: true } })
        const code = plugin.transform.call(
          { parse: parseAst },
          `_resolveComponent("${name}")`,
          `${inputDir}/pages/index/index.uvue?vue&type=template`
        ).code
        expect(code).toContain("from '@dcloudio/uni-h5'")
        const styles = code + '\n' + [...buildInCssSet].join('\n')
        const legacyStyle = `@dcloudio/uni-h5/style/${name}.css`
        const vaporStyle = `@dcloudio/uni-h5/style/vapor/${name}.css`
        if (vapor && name !== 'ad' && name !== 'web-view') {
          expect(styles).not.toContain('.css')
        } else {
          expect(styles).toContain(vapor ? vaporStyle : legacyStyle)
          expect(styles).not.toContain(vapor ? legacyStyle : vaporStyle)
        }
        if (name === 'web-view') {
          expect(styles).toContain(
            '@dcloudio/uni-components/style/resize-sensor.css'
          )
        }
      }
    }
  })

  test.each(['input', 'textarea', 'scroll-view', 'video', 'web-view'])(
    '%s 在 Vapor 中只加载一份完整组件样式，开发和发行保持一致',
    (name) => {
      delete process.env.UNI_HX_VERSION_DEV
      for (const command of ['serve', 'build']) {
        buildInCssSet.clear()
        const plugin = uniEasycomPlugin({}) as any
        plugin.configResolved({ command, build: { cssCodeSplit: true } })
        const code = plugin.transform.call(
          { parse: parseAst },
          `const n0 = _createAssetComponent("${name}")`,
          `${inputDir}/pages/index/index.uvue?vue&type=template`
        ).code
        const styles = code + '\n' + [...buildInCssSet].join('\n')
        expect(styles).toContain(`@dcloudio/uni-h5/style/vapor/${name}.css`)
        expect(styles).not.toContain(`@dcloudio/uni-h5/style/${name}.css`)
        expect(styles).not.toContain(
          `@dcloudio/uni-components/style/${name}.css`
        )
      }
    }
  )

  test.each(['picker-view-column', 'picker', 'list-view', 'waterflow'])(
    '发行仅使用 %s 时也收集内部 ScrollView 的完整样式',
    (name) => {
      delete process.env.UNI_HX_VERSION_DEV
      const plugin = uniEasycomPlugin({}) as any
      plugin.configResolved({ command: 'build', build: { cssCodeSplit: true } })
      plugin.transform.call(
        { parse: parseAst },
        `const n0 = _createAssetComponent("${name}")`,
        `${inputDir}/pages/index/index.uvue?vue&type=template`
      )
      for (const style of [
        '@dcloudio/uni-h5/style/vapor/scroll-view.css',
        '@dcloudio/uni-components/style/refresher.css',
        '@dcloudio/uni-components/style-x-vapor/loading.css',
      ]) {
        expect(buildInCssSet.has(style)).toBe(true)
      }
      expect(
        buildInCssSet.has('@dcloudio/uni-components/style/scroll-view.css')
      ).toBe(false)
    }
  )

  test.each(['match-media', 'v-uni-match-media'])(
    'Web Vapor 为 %s 导入内置组件及 Vapor 样式',
    (name) => {
      const code = transform(`const n0 = _createAssetComponent("${name}")`)
      expect(code).toContain(
        "import { MatchMedia as __syscom_0 } from '@dcloudio/uni-h5';"
      )
      expect(code).toContain(
        "import '@dcloudio/uni-components/style-x-vapor/match-media.css';"
      )
      expect(code).toContain('__createEasycomComponent(__syscom_0)')
      expect(code).not.toContain('_createAssetComponent')
    }
  )

  test.each([true, false])(
    'match-media 保持项目内置组件覆盖规则（HBuilderX dev=%s）',
    (dev) => {
      process.env.UNI_HX_VERSION_DEV = String(dev)
      const component = path.join(
        inputDir,
        'uni_modules/uni-match-media/components/match-media/match-media.uvue'
      )
      fs.outputFileSync(component, '<template><view /></template>')
      initEasycoms(inputDir, { dirs: [], platform: 'h5', isX: true })
      const code = transform('const n0 = _createAssetComponent("match-media")')
      if (dev) {
        expect(code).toContain(
          `import __easycom_0 from '${normalizePath(component)}';`
        )
        expect(code).not.toContain("from '@dcloudio/uni-h5'")
        expect(code).not.toContain('style-x-vapor/match-media.css')
      } else {
        expect(code).toContain(
          "import { MatchMedia as __syscom_0 } from '@dcloudio/uni-h5';"
        )
        expect(code).not.toContain(normalizePath(component))
      }
    }
  )

  test('框架构建可排除仅在 Vapor 名单中的 match-media', () => {
    const plugin = uniEasycomPlugin({
      excludeBuiltInComponents: ['match-media'],
    }) as any
    const source = 'const n0 = _createAssetComponent("match-media")'
    expect(
      plugin.transform.call(
        { parse: parseAst },
        source,
        `${inputDir}/pages/index/index.uvue?vue&type=template`
      )?.code ?? source
    ).toBe(source)
  })

  test('非 Vapor 不通过新组件名单接入 match-media', () => {
    delete process.env.UNI_APP_X_DOM2
    const source = '_resolveComponent("match-media")'
    expect(transform(source)).toBe(source)
  })

  test.each(['list-view', 'list-item', 'sticky-section', 'sticky-header'])(
    '框架构建显式排除 %s，项目编译不使用该名单',
    (name) => {
      delete process.env.UNI_HX_VERSION_DEV
      const plugin = uniEasycomPlugin({
        excludeBuiltInComponents: [name],
      }) as any
      for (const source of [
        `const n0 = _createAssetComponent("v-uni-${name}")`,
        `_resolveComponent("v-uni-${name}")`,
      ]) {
        expect(
          plugin.transform.call(
            { parse: parseAst },
            source,
            `${inputDir}/pages/index/index.uvue?vue&type=template`
          )?.code ?? source
        ).toBe(source)
      }
      const resolve = `_resolveComponent("v-uni-${name}")`
      for (const vapor of [true, false]) {
        if (vapor) process.env.UNI_APP_X_DOM2 = 'true'
        else delete process.env.UNI_APP_X_DOM2
        const code = transform(resolve)
        expect(code).toContain("from '@dcloudio/uni-h5'")
        expect(code).not.toContain('_resolveComponent')
      }
    }
  )

  test.each(['list-view', 'list-item', 'sticky-section', 'sticky-header'])(
    'HBuilderX dev Web Vapor 使用项目内的 %s，不导入框架组件或样式',
    (name) => {
      const component = path.join(
        inputDir,
        `uni_modules/uni-list-view/components/${name}/${name}.uvue`
      )
      fs.outputFileSync(component, '<template><view /></template>')
      initEasycoms(inputDir, { dirs: [], platform: 'h5', isX: true })
      for (const source of [
        `const n0 = _createAssetComponent("v-uni-${name}")`,
        `_resolveComponent("v-uni-${name}")`,
      ]) {
        const code = transform(source)
        expect(code).toContain(
          `import __easycom_0 from '${normalizePath(component)}';`
        )
        expect(code).not.toContain("from '@dcloudio/uni-h5'")
        expect(code).not.toContain('@dcloudio/uni-components/style')
      }
    }
  )

  test.each(['button', 'input', 'textarea'])(
    'Vapor 沿用旧 %s 业务实现时，导入对应宿主样式',
    (name) => {
      delete process.env.UNI_HX_VERSION_DEV
      const code = transform(
        `const n0 = _createAssetComponent("v-uni-${name}")`
      )
      expect(code).toContain("from '@dcloudio/uni-h5'")
      expect(code).toContain(
        name === 'button'
          ? '@dcloudio/uni-components/style-x-vapor/button.css'
          : `@dcloudio/uni-h5/style/vapor/${name}.css`
      )
      if (name !== 'button') expect(code).not.toContain('style-x-vapor')
      expect(code).not.toContain('uni_modules/uni-form')
    }
  )

  test.each([false, true])(
    'Button 按宿主选择样式，非 Vapor 保留旧路径（Vapor=%s）',
    (vapor) => {
      delete process.env.UNI_HX_VERSION_DEV
      if (!vapor) delete process.env.UNI_APP_X_DOM2
      const code = transform('_resolveComponent("v-uni-button")')
      expect(code).toContain(
        `@dcloudio/uni-components/${
          vapor ? 'style-x-vapor' : 'style'
        }/button.css`
      )
      expect(code).not.toContain(
        `@dcloudio/uni-components/${
          vapor ? 'style' : 'style-x-vapor'
        }/button.css`
      )
    }
  )

  test.each([false, true])('loading 按模式选择样式（Vapor=%s）', (vapor) => {
    delete process.env.UNI_HX_VERSION_DEV
    if (vapor) process.env.UNI_APP_X_DOM2 = 'true'
    else delete process.env.UNI_APP_X_DOM2
    const code = transform('_resolveComponent("v-uni-loading")')
    expect(code).toContain("from '@dcloudio/uni-h5'")
    expect(code).toContain(
      `@dcloudio/uni-components/${
        vapor ? 'style-x-vapor' : 'style-x'
      }/loading.css`
    )
    expect(code).not.toContain(
      `@dcloudio/uni-components/${
        vapor ? 'style-x' : 'style-x-vapor'
      }/loading.css`
    )
  })

  test.each(['button', 'input', 'textarea'])(
    '框架编译时被排除的 %s 保留按名解析，不回退旧组件',
    (name) => {
      delete process.env.UNI_HX_VERSION_DEV
      const plugin = uniEasycomPlugin({
        excludeBuiltInComponents: ['button', 'input', 'textarea'],
      }) as any
      const source = `const n0 = _createAssetComponent("v-uni-${name}")`
      expect(
        plugin.transform.call(
          { parse: parseAst },
          source,
          `${inputDir}/pages/index/index.uvue?vue&type=template`
        )?.code ?? source
      ).toBe(source)
    }
  )

  test.each([false, { include: [] }, { exclude: ['progress'] }])(
    '框架读取副本配置 %j 后，不导入禁用的组件和样式',
    async (web) => {
      delete process.env.UNI_HX_VERSION_DEV
      const extApiDir = path.join(inputDir, 'source')
      const componentsDir = path.join(inputDir, 'compiled')
      fs.outputJsonSync(path.join(extApiDir, 'uni-progress/package.json'), {
        uni_modules: { components: { web } },
      })
      fs.outputFileSync(
        path.join(extApiDir, 'uni-progress/components/progress/progress.uvue'),
        '<template />'
      )
      await prepareWebVaporComponents({
        extApiDir,
        componentsDir,
        componentsEntryOutput: path.join(inputDir, 'index.ts'),
        styleDir: path.join(inputDir, 'style'),
        context: {},
      })
      const enabled = resolveWebVaporComponents(componentsDir)
      const excluded = [
        ...resolveWebVaporComponents(componentsDir, true).keys(),
      ].filter((name) => !enabled.has(name))
      expect(excluded).toEqual(['progress'])
      const plugin = uniEasycomPlugin({
        excludeBuiltInComponents: excluded,
      }) as any
      for (const source of [
        'const n0 = _createAssetComponent("v-uni-progress")',
        'const n0 = _resolveComponent("v-uni-progress")',
      ]) {
        const result = plugin.transform.call(
          { parse: parseAst },
          source,
          `${inputDir}/pages/index/index.uvue?vue&type=template`
        )
        expect(result?.code ?? source).toBe(source)
      }
    }
  )

  test('不改写字符串中的组件调用文本', () => {
    const source = 'const text = \'_createAssetComponent("Example")\''

    expect(transform(source)).toBe(source)
  })

  test('嵌套组件调用分别转换', () => {
    const code =
      transform(`const outer = _createAssetComponent("Example", null, () => {
      const inner = _createAssetComponent("Example", null, null, true, null, true)
      return inner
    })`)

    expect(code).toContain('outer = __createEasycomComponent(__easycom_0')
    expect(code).toContain(
      'inner = __createEasycomComponent(__easycom_1, null, null, true, null)'
    )
  })

  test('非内部 dev 模式保持内置组件优先级', () => {
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform('const n0 = _createAssetComponent("v-uni-button")')

    expect(code).toContain(
      "import { Button as __syscom_0 } from '@dcloudio/uni-h5';"
    )
    expect(code).toContain('__createEasycomComponent(__syscom_0)')
    expect(code).not.toContain(
      'uni_modules/uni-form/components/button/button.uvue'
    )
  })

  test('Web Vapor 为迁移后的 progress 加载独立样式', () => {
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform('const n0 = _createAssetComponent("v-uni-progress")')

    expect(code).toContain(
      "import '@dcloudio/uni-components/style-x-vapor/progress.css';"
    )
    expect(code).not.toContain(
      "import '@dcloudio/uni-components/style/progress.css';"
    )
  })

  test('Web Vapor 为 package.json 声明的 checkbox 加载独立样式', () => {
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform('const n0 = _createAssetComponent("v-uni-checkbox")')

    expect(code).toContain(
      "import '@dcloudio/uni-components/style-x-vapor/checkbox.css';"
    )
    expect(code).not.toContain(
      "import '@dcloudio/uni-components/style/checkbox.css';"
    )
  })

  test.each(['swiper', 'swiper-item'])(
    'Web Vapor 为 %s 加载新组件样式',
    (name) => {
      delete process.env.UNI_HX_VERSION_DEV
      const code = transform(
        `const n0 = _createAssetComponent("v-uni-${name}")`
      )

      expect(code).toContain(
        `import '@dcloudio/uni-components/style-x-vapor/${name}.css';`
      )
      expect(code).not.toContain(
        `import '@dcloudio/uni-components/style/${name}.css';`
      )
    }
  )

  test.each(['input', 'textarea'])(
    'Web Vapor 暂不接入新的 %s 组件和样式',
    (name) => {
      delete process.env.UNI_HX_VERSION_DEV
      const code = transform(
        `const n0 = _createAssetComponent("v-uni-${name}")`
      )

      expect(code).toContain(
        `import '@dcloudio/uni-h5/style/vapor/${name}.css';`
      )
      expect(code).not.toContain(
        `import '@dcloudio/uni-components/style-x-vapor/${name}.css';`
      )
    }
  )

  test('Web Vapor 的 picker 依赖只加载新 picker-view 样式', () => {
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform('const n0 = _createAssetComponent("v-uni-picker")')
    for (const name of ['picker', 'picker-view', 'picker-view-column']) {
      expect(code).toContain(
        `import '@dcloudio/uni-components/style-x-vapor/${name}.css';`
      )
      expect(code).not.toContain(
        `import '@dcloudio/uni-components/style/${name}.css';`
      )
    }
  })

  test('非 Vapor 继续为 progress 加载原有样式', () => {
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform('const n0 = _resolveComponent("v-uni-progress")')

    expect(code).toContain(
      "import '@dcloudio/uni-components/style/progress.css';"
    )
    expect(code).not.toContain(
      "import '@dcloudio/uni-components/style-x-vapor/progress.css';"
    )
  })

  test('Web Vapor 同时处理多次出现的组件', () => {
    const code = transform(
      'const a = _createAssetComponent("Example"); const b = _resolveComponent("Example")'
    )

    expect(code).toContain('__createEasycomComponent(__easycom_0)')
    expect(code).toContain('const b = __easycom_1')
    expect(
      code.match(/createComponent as __createEasycomComponent/g)
    ).toHaveLength(1)
  })

  test('非 Vapor 继续使用原有 resolveComponent 路径', () => {
    delete process.env.UNI_APP_X_DOM2
    const parse = jest.fn(parseAst)
    const code = transform(
      'const a = _resolveComponent("v-uni-button"); const b = _createAssetComponent("Example")',
      parse
    )

    expect(code).toContain('const a = __easycom_0')
    expect(code).toContain('const b = _createAssetComponent("Example")')
    expect(code).not.toContain('__createEasycomComponent')
    expect(parse).not.toHaveBeenCalled()
  })
})
