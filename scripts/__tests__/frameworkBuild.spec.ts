import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { execFileSync } from 'child_process'
import { check, resolveConfig } from 'prettier'
import { createFrameworkTemplateCompiler } from '../frameworkBuild'
import { syncExtApiDir, syncExtComponentFile } from '../syncExtComponentFile'

describe('框架构建可复现性', () => {
  test('真实 Vapor 内联编译优先解析与 prop 同名的内置组件', () => {
    const code = execFileSync(
      process.execPath,
      [
        '-e',
        `
        require('./packages/uni-cli-shared/dist').initWebVaporAliases()
        const sfc = require('vue/compiler-sfc')
        const compiler = require('@dcloudio/compiler-vapor-web')
        const { createFrameworkTemplateCompiler } = require('./scripts/frameworkBuild')
        const source = '<script setup lang="ts">defineProps<{ loading: boolean }>()</script><template><loading /></template>'
        const { descriptor } = sfc.parse(source, { filename: '/repo/button.uvue' })
        const result = sfc.compileScript(descriptor, {
          id: 'button', inlineTemplate: true, isProd: true, vapor: true,
          templateOptions: {
            compiler: createFrameworkTemplateCompiler(compiler, '/repo'),
            compilerOptions: { isEasyComponent: tag => tag === 'loading' }
          }
        })
        process.stdout.write(result.content)
        `,
      ],
      { cwd: path.resolve(__dirname, '../..'), encoding: 'utf8' }
    )
    expect(code).toContain('_createAssetComponent("loading"')
    expect(code).not.toContain('_createComponent(__props.loading')
  })

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

  test.each([
    ['C:\\Repo', 'c:/repo/src/Example.vue'],
    ['\\\\Server\\Share\\Repo', '//server/share/repo/src/Example.vue'],
  ])('Windows 根目录 %s 按 Windows 规则计算相对路径', (root, filename) => {
    const compile = jest.fn((_source, options) => options)
    const compiler = createFrameworkTemplateCompiler({ compile }, root)
    expect(compiler.compile('', { filename }).filename).toBe('src/Example.vue')
  })

  test('外部文本同步统一换行，保留资源字节和源码，连续同步输出一致', () => {
    const temp = fs.mkdtempSync(
      path.join(os.tmpdir(), 'framework-sfc.uvue-[fixture]-')
    )
    try {
      const source = path.join(temp, 'source')
      const output = path.join(temp, 'output')
      const files = [
        ['child.uvue', 'child.vue', '<template>\n<view />\n</template>\n'],
        [
          'parent.vue',
          'parent.vue',
          '<script>\nimport Child from "./child.uvue"\n</script>\n',
        ],
        [
          'interface.uts',
          'interface.uts.ts',
          'export const value = "./child.uvue"\n',
        ],
        ...[
          'ts',
          'js',
          'json',
          'md',
          'css',
          'html',
          'ets',
          'cpp',
          'h',
          'swift',
          'xml',
          'plist',
        ].map((ext) => [
          `nested [dir]/file.${ext}`,
          `nested [dir]/file.${ext}`,
          '第一行\n第二行\n',
        ]),
      ]
      const binary = Buffer.from([0, 255, 13, 10, 128, 13, 10])
      for (const name of [
        'image.png',
        'font.ttf',
        'native.aar',
        'binary.plist',
        'binary.xml',
      ]) {
        fs.outputFileSync(path.join(source, name), binary)
      }
      const encodedFiles = {
        'utf16.xml': Buffer.from([0xff, 0xfe, 0x61, 0, 13, 0, 10, 0]),
        'nul.xml': Buffer.from([0x61, 0, 13, 10, 0x62]),
        'header.plist': Buffer.from('bplist00\r\n'),
      }
      for (const [name, bytes] of Object.entries(encodedFiles)) {
        fs.outputFileSync(path.join(source, name), bytes)
      }
      for (const newline of ['\n', '\r\n', '\r\n']) {
        for (const [from, , code] of files) {
          fs.outputFileSync(
            path.join(source, from),
            code.replace(/\n/g, newline)
          )
        }
        syncExtApiDir(source, output)
        for (const [from, to, code] of files) {
          expect(fs.readFileSync(path.join(source, from), 'utf8')).toBe(
            code.replace(/\n/g, newline)
          )
          expect(fs.readFileSync(path.join(output, to), 'utf8')).toBe(
            to.endsWith('.vue') ? code.replace('.uvue"', '.vue"') : code
          )
          if (from !== to)
            expect(fs.existsSync(path.join(output, from))).toBe(false)
        }
        for (const name of [
          'image.png',
          'font.ttf',
          'native.aar',
          'binary.plist',
          'binary.xml',
        ]) {
          expect(fs.readFileSync(path.join(output, name))).toEqual(binary)
        }
        for (const [name, bytes] of Object.entries(encodedFiles)) {
          expect(fs.readFileSync(path.join(output, name))).toEqual(bytes)
        }
      }
    } finally {
      fs.removeSync(temp)
    }
  })

  test('新增文本换行处理不跟随目录软链接', () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'framework-eol-link-'))
    try {
      const source = path.join(temp, 'source')
      const output = path.join(temp, 'output')
      const external = path.join(temp, 'external')
      const code = 'export {}\r\n'
      fs.ensureDirSync(source)
      fs.outputFileSync(path.join(external, 'index.ts'), code)
      fs.symlinkSync(external, path.join(source, 'linked'), 'junction')
      syncExtApiDir(source, output)
      expect(fs.readFileSync(path.join(external, 'index.ts'), 'utf8')).toBe(
        code
      )
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
