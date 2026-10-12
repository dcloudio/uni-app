import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { resolveWebVaporComponents } from '../webVaporComponentConfig'
import {
  prepareWebVaporComponents,
  webVaporComponentStylesPlugin,
} from '../webVaporComponents'
import { initScopedPreContext } from '../../packages/uni-cli-shared/src/preprocess/context'

describe('Web Vapor 组件生成', () => {
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
        path.join(extApiDir, 'uni-progress/components/progress/global.uts'),
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
            elementSource: 'uni-progress/components/progress/global.uts',
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
      const plugin = webVaporComponentStylesPlugin(
        extApiDir,
        componentsDir
      ) as any
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
