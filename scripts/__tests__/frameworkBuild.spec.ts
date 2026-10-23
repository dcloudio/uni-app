import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { execFileSync } from 'child_process'
import { check, resolveConfig } from 'prettier'
import { createFrameworkTemplateCompiler } from '../frameworkBuild'
import { syncExtApiDir, syncExtComponentFile } from '../syncExtComponentFile'

describe('框架构建可复现性', () => {
  test('真实 Vapor 编译在不同检出目录和路径分隔符下生成相同组件 ID', () => {
    // 独立进程使用构建时的模块别名，避免 Jest 的 VDOM 依赖影响真实编译器。
    const result = JSON.parse(
      execFileSync(
        process.execPath,
        [
          '-e',
          `
          require('./packages/uni-cli-shared/dist').initWebVaporAliases()
          const sfc = require('vue/compiler-sfc')
          const compiler = require('@dcloudio/compiler-vapor-web')
          const { createFrameworkTemplateCompiler } = require('./scripts/frameworkBuild')
          const source = '<template>\\n<custom />\\n</template>\\n<script setup lang="ts">\\nconst value = 1\\n</script>'
          const results = []
          for (const root of ['/first/uni-app-next', '/second/uni-app-next', 'C:\\\\workspace\\\\uni-app-next']) {
              const filename = root + '/packages/uni-h5/src/Example.vue'
              const { descriptor } = sfc.parse(source, { filename })
              results.push(sfc.compileScript(descriptor, {
                id: 'example', inlineTemplate: true, isProd: true, vapor: true,
                templateOptions: { compiler: createFrameworkTemplateCompiler(compiler, root) },
              }).content)
          }
          process.stdout.write(JSON.stringify(results))
          `,
        ],
        { cwd: path.resolve(__dirname, '../..'), encoding: 'utf8' }
      )
    ) as string[]
    expect(result[0]).toContain('withComponentId')
    expect(new Set(result).size).toBe(1)
  })

  test('相对路径保持唯一，页面识别继续接收原始绝对路径', () => {
    const compile = jest.fn((_source, options) => options)
    const isUniPage = jest.fn(() => true)
    const compiler = createFrameworkTemplateCompiler({ compile }, '/repo')
    const first = compiler.compile('', {
      filename: '/repo/first/Example.vue',
      isUniPage,
    })
    const second = compiler.compile('', {
      filename: '/repo/second/Example.vue',
    })
    expect(first.filename).toBe('first/Example.vue')
    expect(second.filename).toBe('second/Example.vue')
    expect(first.isUniPage(first.filename)).toBe(true)
    expect(isUniPage).toHaveBeenCalledWith('/repo/first/Example.vue')
  })

  test('外部 SFC 同步统一换行，连续同步输出一致', () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'framework-sfc-'))
    try {
      const source = path.join(temp, 'source')
      const output = path.join(temp, 'output')
      const code = '<template>\n<custom />\n</template>\n'
      for (const ext of ['vue', 'uvue']) {
        fs.outputFileSync(path.join(source, `${ext}.${ext}`), code)
      }
      syncExtApiDir(source, output)
      for (const ext of ['vue', 'uvue']) {
        expect(fs.readFileSync(path.join(output, `${ext}.vue`), 'utf8')).toBe(
          code
        )
        fs.writeFileSync(
          path.join(source, `${ext}.${ext}`),
          code.replace(/\n/g, '\r\n')
        )
      }
      syncExtApiDir(source, output)
      for (const ext of ['vue', 'uvue']) {
        expect(fs.readFileSync(path.join(output, `${ext}.vue`), 'utf8')).toBe(
          code
        )
      }
    } finally {
      fs.removeSync(temp)
    }
  })

  test('同步生成的 TS 连续两次输出一致，格式化检查无需再次改写', async () => {
    const temp = fs.mkdtempSync(
      path.join(os.tmpdir(), 'framework-sync-[fixture]-')
    )
    try {
      const source = path.join(temp, 'source')
      const output = path.join(temp, 'output')
      fs.writeFileSync(
        path.join(temp, '.prettierrc'),
        '{"semi":false,"singleQuote":true}'
      )
      fs.outputJsonSync(path.join(source, 'uni-loading/package.json'), {})
      fs.outputFileSync(
        path.join(source, 'uni-loading/components/loading/element.uts'),
        '\r\nexport class UniLoadingElement { }\r\n'
      )
      fs.outputFileSync(
        path.join(source, 'uni-loading/components/loading/loading.uvue'),
        '<template><view /></template>\r\n<script setup lang="uts">\r\n</script>\r\n'
      )
      const targets = [
        {
          path: output,
          componentName: 'uniloading',
          scriptLang: 'ts' as const,
          context: {},
        },
      ]
      syncExtComponentFile([source], targets)
      const component = fs.readFileSync(
        path.join(output, 'uniloading.vue'),
        'utf8'
      )
      expect(component).not.toContain('\r')
      expect(component).toContain('lang="ts"')
      expect(fs.existsSync(path.join(output, 'loading.vue'))).toBe(false)
      const filename = path.join(output, 'element.ts')
      const first = fs.readFileSync(filename, 'utf8')
      expect(first).not.toContain('\r')
      expect(
        check(first, { ...(await resolveConfig(filename)), filepath: filename })
      ).toBe(true)
      syncExtComponentFile([source], targets)
      expect(fs.readFileSync(filename, 'utf8')).toBe(first)

      fs.outputFileSync(
        path.join(source, 'uni-loading/components/loading/element.uts'),
        'export class {'
      )
      const error = jest.spyOn(console, 'error').mockImplementation(() => {})
      try {
        expect(() => syncExtComponentFile([source], targets)).toThrow()
      } finally {
        error.mockRestore()
      }
    } finally {
      fs.removeSync(temp)
    }
  })
})
