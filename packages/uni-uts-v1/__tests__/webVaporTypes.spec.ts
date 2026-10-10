import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import { pathToFileURL } from 'url'
import type * as tsTypes from 'typescript'

const inputDir = path.resolve(__dirname, 'examples/web-vapor')
const originalEnv = { ...process.env }

function getOptions() {
  let options!: ReturnType<
    typeof import('../src/tsc/utils/options').createBasicUtsOptions
  >
  jest.isolateModules(() => {
    const { createBasicUtsOptions } = require('../src/tsc/utils/options')
    options = createBasicUtsOptions(inputDir, false)
  })
  return options
}

describe('Web Vapor UTS 类型', () => {
  beforeEach(() => {
    for (const name of [
      'HX_APP_ROOT',
      'HX_PLUGIN_PATHS',
      'UNI_HBUILDERX_PLUGINS',
      'UNI_COMPILE_TARGET',
      'UNI_APP_NEXT_WORKSPACE',
      'UNI_UTS_COMPILER_TYPE',
      'UNI_UTS_PLATFORM',
      'UNI_APP_X_DOM2',
    ]) {
      delete process.env[name]
    }
    process.env.UNI_UTS_PLATFORM = 'web'
    process.env.UNI_APP_X_DOM2 = 'true'
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  test.each(['cli', 'hbuilderx', 'cloud', 'ext-api'])(
    '%s 使用完整且独立的 Web 类型路径',
    (environment) => {
      if (environment === 'hbuilderx') {
        process.env.HX_PLUGIN_PATHS = JSON.stringify({
          'uniapp-cli-vite': '/plugins/cli-vite',
          'hbuilderx-language-services': '/plugins/language-services',
        })
      } else if (environment === 'cloud') {
        process.env.UNI_UTS_COMPILER_TYPE = 'cloud'
      } else if (environment === 'ext-api') {
        process.env.UNI_COMPILE_TARGET = 'ext-api'
        process.env.UNI_APP_NEXT_WORKSPACE = path.resolve(__dirname, '../../..')
      }
      const paths = getOptions().tsconfigOverride.compilerOptions.paths
      expect(Object.keys(paths)).toEqual(
        expect.arrayContaining([
          'vue',
          '@vue/shared',
          '@vue/reactivity',
          '@vue/runtime-core',
          '@vue/runtime-dom',
          '@vue/runtime-vapor',
          '@dcloudio/runtime-vapor-web',
          'csstype',
        ])
      )
      expect(paths['@vue/runtime-vapor-dom2']).toBeUndefined()
      for (const name of ['vue', '@vue/runtime-vapor', 'csstype']) {
        expect(paths[name][0]).toContain('/lib/uts/types/uni-x/web/')
        expect(fs.existsSync(paths[name][0])).toBe(true)
      }
    }
  )

  test('普通 CLI Web 保留原有 Vue 类型路径', () => {
    delete process.env.UNI_APP_X_DOM2
    expect(getOptions().tsconfigOverride.compilerOptions.paths).toEqual({
      vue: [path.resolve(inputDir, '../node_modules/@vue/runtime-core')],
    })
  })

  test.each<[string, string, boolean, string, string?]>([
    ['App.uvue', '<template><div /></template>', true, 'defineVaporComponent'],
    ['App.vue', '<template><div /></template>', true, 'defineVaporComponent'],
    [
      'progress.uvue',
      '<template><div /></template>',
      true,
      'defineVaporComponent',
    ],
    [
      'progress.vue',
      '<template><div /></template>',
      true,
      'defineVaporComponent',
    ],
    ['progress.uvue', '<template><div /></template>', false, 'defineComponent'],
    ['progress.vue', '<template><div /></template>', false, 'defineComponent'],
    ...['vue', 'uvue'].flatMap((extension) =>
      ['', '  \n\t'].flatMap((content) =>
        [true, false].map<[string, string, boolean, string]>((dom2) => [
          `progress.${extension}`,
          `<script lang="uts">${content}</script><template><div /></template>`,
          dom2,
          dom2 ? 'defineVaporComponent' : 'defineComponent',
        ])
      )
    ),
    [
      'progress.uvue',
      '<script lang="uts">// 保留有效普通脚本\nexport default {}</script><template><div /></template>',
      true,
      'defineComponent',
    ],
    [
      'App.uvue',
      '<script lang="uts">  </script><template><div /></template>',
      true,
      'defineVaporComponent',
    ],
    ...['vue', 'uvue'].map<[string, string, boolean, string]>((extension) => [
      `progress.${extension}`,
      '<script lang="uts" src="./component.uts"></script><template><div /></template>',
      true,
      'defineComponent',
    ]),
    [
      'progress.uvue',
      '<script setup lang="uts">import { defineVaporComponent } from "vue"; const Child = defineVaporComponent(() => document.createElement("div")); defineExpose({ Child })</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'progress.uvue',
      '<script setup lang="uts">import { defineVaporComponent as createChild } from "vue"; const Child = createChild(() => document.createElement("div")); defineExpose({ Child })</script>',
      true,
      'defineVaporComponent',
      'createChild',
    ],
    [
      'progress.uvue',
      '<script setup lang="uts">import type { defineVaporComponent } from "vue"; type Factory = typeof defineVaporComponent</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'progress.uvue',
      '<script setup lang="uts">import { type defineVaporComponent } from "vue"; type Factory = typeof defineVaporComponent</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'progress.uvue',
      '<script setup lang="uts">import * as defineVaporComponent from "vue"; const value = defineVaporComponent.ref(1); defineExpose({ value })</script>',
      true,
      'defineVaporComponent',
      '_defineVaporComponent',
    ],
    [
      'progress.uvue',
      '<script setup lang="uts">import { ref as defineVaporComponent, computed as _defineVaporComponent } from "vue"; const value = defineVaporComponent(1); defineExpose({ value })</script>',
      true,
      'defineVaporComponent',
      '__defineVaporComponent',
    ],
    [
      'App.uvue',
      '<script setup>console.log(123)</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'App.uvue',
      '<script setup lang="uts">const value: number = 1</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'App.uvue',
      '<script setup lang="ts">const value: number = 1</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'App.uvue',
      '<script setup lang="js">const value = 1</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'progress.uvue',
      '<script setup lang="uts">const value: number = 1; defineExpose({ value })</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'progress.vue',
      '<script setup lang="ts">const value: number = 1</script>',
      true,
      'defineVaporComponent',
    ],
    [
      'legacy.uvue',
      '<script lang="uts">export default { setup() {} }</script>',
      true,
      'defineComponent',
    ],
    [
      'legacy.vue',
      '<script>export default { setup() {} }</script>',
      true,
      'defineComponent',
    ],
    [
      'progress.uvue',
      '<script setup lang="uts">const value: number = 1</script>',
      false,
      'defineComponent',
    ],
    [
      'App.uvue',
      '<script setup lang="uts">import B from "./B.uvue"; import type { VaporComponent } from "vue"; const component: VaporComponent = B; defineExpose({ component })</script>',
      true,
      'defineVaporComponent',
    ],
  ])(
    '虚拟组件复用原有类型包装：%s %s（Vapor: %s）',
    (filename, source, dom2, factory, factoryName = factory) => {
      const options = getOptions()
      // 独立进程使用真实 UTS 插件，检查 App 导入及 setup 脚本导入其他组件的类型。
      const output = execFileSync(
        process.execPath,
        [
          '-e',
          `
      const { rollup } = require('rollup')
      const { uts2js } = require(${JSON.stringify(
        path.resolve(__dirname, '../lib/javascript')
      )})
      const nativeTs = require(${JSON.stringify(
        path.resolve(__dirname, '../lib/typescript')
      )})
      const services = []
      const ts = { ...nativeTs, createLanguageService(...args) {
        const service = nativeTs.createLanguageService(...args)
        services.push(service)
        return service
      } }
      const mainFile = ${JSON.stringify(path.resolve(inputDir, 'main.uts'))}
      const appFile = ${JSON.stringify(path.resolve(inputDir, filename))}
      const childFile = ${JSON.stringify(path.resolve(inputDir, 'B.uvue'))}
      const readFile = ts.sys.readFile
      const fileExists = ts.sys.fileExists
      ts.sys.fileExists = file => file === appFile || file === childFile || fileExists(file)
      ts.sys.readFile = (file, ...args) => {
        if (file === appFile) return ${JSON.stringify(source)}
        if (file === childFile) return '<script setup lang="uts">const value: number = 1; defineExpose({ value })</script>'
        const content = readFile(file, ...args)
        return file === mainFile
          ? content.replace('./App.uvue', ${JSON.stringify('./' + filename)})
              .replace('createVaporApp as createSSRApp', ${JSON.stringify(
                factory === 'defineVaporComponent'
                  ? 'createVaporApp as createSSRApp'
                  : 'createApp as createSSRApp'
              )})
          : content
      }
      const compiler = require(${JSON.stringify(
        require.resolve('@vue/compiler-dom', {
          paths: [path.resolve(__dirname, '../../uni-cli-shared')],
        })
      )})
      process.env.UNI_INPUT_DIR = ${JSON.stringify(inputDir)}
      const warnings = []
      const plugins = uts2js({
        ...${JSON.stringify({
          ...options,
          typescript: undefined,
          tsconfig: path.resolve(inputDir, 'tsconfig.json'),
        })},
        typescript: ts, platform: 'web', dom2: ${dom2}, abortOnError: true,
        modules: {
          vueCompilerDom: compiler,
          uniCliShared: { preUVueJs: code => code, preUVueHtml: code => code },
        },
        scriptMacros: { createUniAppXScriptMacrosTransformer: () => () => file => file },
        sharedData: { createSharedDataTransformer: () => () => file => file },
      })
      rollup({
        input: mainFile,
        plugins: [{ name: 'test-main', load(file) {
          if (file === mainFile) return ts.sys.readFile(file)
        } }, ...plugins],
        external: id => id === 'vue' || /\\.u?vue$/.test(id),
        onwarn: warning => warnings.push(warning.message),
      }).then(async bundle => {
        const program = services[0].getProgram()
        const virtualSource = program.getSourceFile(appFile + '.ts')
        const child = program.getSourceFile(childFile + '.ts')
        const diagnostics = [virtualSource, child].filter(Boolean).flatMap(file =>
          services[0].getSemanticDiagnostics(file.fileName).map(diagnostic =>
            ts.flattenDiagnosticMessageText(diagnostic.messageText, '\\n')
          )
        )
        const code = (await bundle.generate({ format: 'es' })).output[0].code
        const virtual = ts.createPrinter().printFile(virtualSource)
        const childContent = child && ts.createPrinter().printFile(child)
        await bundle.close()
        console.log(JSON.stringify({ warnings, diagnostics, virtual, childContent, code }))
      }).catch(error => { console.error(error.message, error.frame || ''); process.exitCode = 1 })
    `,
        ],
        { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
      )
      const { warnings, diagnostics, virtual, childContent, code } =
        JSON.parse(output)
      expect(warnings).toEqual([])
      expect(diagnostics).toEqual([])
      expect(virtual).toContain('export default ' + factoryName + '(')
      if (factory === 'defineVaporComponent') {
        expect(virtual).toContain(
          `import { defineVaporComponent${
            factoryName === factory ? '' : ' as ' + factoryName
          } } from "vue"`
        )
        expect(virtual).not.toContain('defineApp')
      } else {
        expect(virtual).not.toContain('defineVaporComponent')
      }
      if (childContent) {
        expect(childContent).toContain('export default defineVaporComponent(')
        expect(childContent).toContain('return { value }')
      }
      // 虚拟包装只参与类型检查，不应混入 main 的运行代码。
      expect(code).not.toContain('defineVaporComponent')
      expect(code).not.toContain('@uts-setup')
      expect(code).not.toContain('@uts-no-script')
    }
  )

  test.todo(
    'Web Vapor 双脚本虚拟类型：保留普通 script 的作用域、导出和组件选项'
  )
  test.todo(
    'Web Vapor 双脚本虚拟类型：两种 script 顺序及空 setup 与实际编译模式一致'
  )

  test.each(['uts', 'typescript'])(
    '%s 独立声明完整且保留泛型参数校验',
    (compiler) => {
      const options = getOptions()
      const ts: typeof tsTypes =
        compiler === 'uts' ? options.typescript : require('typescript')
      const filename = path.resolve(inputDir, 'type-compat.ts')
      const source = `
import { createVaporApp, defineVaporComponent, withAsyncContext } from 'vue'
const app = createVaporApp(defineVaporComponent(() => document.createElement('div')))
const plugin = { install(app: unknown, options: { message: string }) {} }
app.use(plugin, { message: 'valid' })
// @ts-expect-error NoInfer 必须保留插件参数校验，不能因缺失而退化成 any。
app.use(plugin, { message: 123 })
defineVaporComponent((props: { message: string }) => document.createElement('div'), { props: ['message'] })
// @ts-expect-error props 名称应由 setup 的 Props 限定。
defineVaporComponent((props: { message: string }) => document.createElement('div'), { props: ['invalid'] })
const [, restore] = withAsyncContext(() => Promise.resolve(1))
restore()
// @ts-expect-error withAsyncContext 应生成真实的元组返回类型。
restore(123)
`
      const compilerOptions: tsTypes.CompilerOptions = {
        strict: true,
        noEmit: true,
        skipLibCheck: false,
        types: [],
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        paths: options.tsconfigOverride.compilerOptions.paths,
      }
      const host = ts.createCompilerHost(compilerOptions)
      const originalGetSourceFile = host.getSourceFile.bind(host)
      host.getSourceFile = (file, languageVersion, ...args) =>
        file === filename
          ? ts.createSourceFile(file, source, languageVersion, true)
          : originalGetSourceFile(file, languageVersion, ...args)
      const program = ts.createProgram([filename], compilerOptions, host)
      expect(
        ts
          .getPreEmitDiagnostics(program)
          .map((diagnostic) =>
            ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
          )
      ).toEqual([])
    }
  )

  test.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])(
    'Vapor API 和 UTS setup 类型检查（DOM shim: %s，显式 expose: %s）',
    (useDomShim, explicitExpose) => {
      const options = getOptions()
      const ts = options.typescript
      const filename = path.resolve(inputDir, 'progress.ts')
      const compiledFilename = path.resolve(inputDir, 'compiled-progress.ts')
      const sfc = `<script setup lang="uts">
import { ref, watch } from 'vue'
interface ProgressProps { percent?: number }
const props = withDefaults(defineProps<ProgressProps>(), { percent: 0 })
const emit = defineEmits<{ activeend: [percent: number] }>()
const current = ref(await Promise.resolve(props.percent))
watch(() => props.percent, value => { current.value = value })
${explicitExpose ? 'defineExpose({ current })' : ''}
defineOptions({ name: 'progress' })
emit('activeend', current.value)
</script>`
      // 独立进程加载自包含编译器，避免 Jest 的旧版 Vue 模块映射干扰。
      const compilerUrl = pathToFileURL(
        path.resolve(
          __dirname,
          '../../uni-cli-shared/lib/dom2/web/@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'
        )
      ).href
      const compiled = JSON.parse(
        execFileSync(
          process.execPath,
          [
            '--input-type=module',
            '-e',
            `
          import { readFileSync } from 'node:fs'
          import { parse, compileScript } from ${JSON.stringify(compilerUrl)}
          const { descriptor } = parse(readFileSync(0, 'utf8'), { filename: 'progress.uvue' })
          const { lang, content } = compileScript(descriptor, { id: 'progress', vapor: true })
          console.log(JSON.stringify({ lang, content }))
        `,
          ],
          { input: sfc, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
        )
      )
      expect(compiled.lang).toBe('uts')
      expect(compiled.content).toContain('defineVaporComponent')
      expect(compiled.content).toContain('withAsyncContext')
      if (!explicitExpose) {
        expect(compiled.content).toContain('__expose();')
      }
      const source = `
import { defineVaporComponent, createVaporApp, createVaporSSRApp, ref,
  normalizeUniText, setImageSrc, withAsyncContext, type VaporComponent } from 'vue'
const component = defineVaporComponent({
  props: { percent: { type: Number, default: 0 } },
  emits: ['activeend'],
  setup(props, { expose, emit }) {
    const percent = ref(props.percent)
    expose({ percent })
    emit('activeend')
    // @ts-expect-error props 应保留 Number 推导，不能退化成 any。
    props.percent = 'invalid'
    return () => document.createElement('progress')
  }
})
const vapor: VaporComponent = component
createVaporApp(vapor)
createVaporSSRApp(vapor)
// @ts-expect-error 根组件不能是数字，不能将 Vapor API 声明成 any。
createVaporApp(123)
const [, restore] = withAsyncContext(() => Promise.resolve(1))
restore()
// @ts-expect-error 旧 shim 也应保留真实的 restore 类型。
restore(123)
normalizeUniText('a\\\\nb')
setImageSrc(document.createElement('img'), '/static/logo.png')
`
      const compilerOptions: tsTypes.CompilerOptions = {
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: [],
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        paths: options.tsconfigOverride.compilerOptions.paths,
        ...(useDomShim ? { lib: ['lib.esnext.d.ts'] } : {}),
      }
      const host = ts.createCompilerHost(compilerOptions)
      const originalGetSourceFile = host.getSourceFile.bind(host)
      host.getSourceFile = (file, languageVersion, ...args) =>
        file === filename
          ? ts.createSourceFile(file, source, languageVersion, true)
          : file === compiledFilename
          ? ts.createSourceFile(file, compiled.content, languageVersion, true)
          : originalGetSourceFile(file, languageVersion, ...args)
      const program = ts.createProgram(
        [
          filename,
          compiledFilename,
          path.resolve(__dirname, '../lib/tsconfig/shim-uni.d.ts'),
          ...(useDomShim
            ? [path.resolve(__dirname, '../lib/tsconfig/shim-dom.d.ts')]
            : []),
        ],
        compilerOptions,
        host
      )
      expect(
        ts.getPreEmitDiagnostics(program).map((diagnostic) => ({
          message: ts.flattenDiagnosticMessageText(
            diagnostic.messageText,
            '\n'
          ),
          line:
            diagnostic.file && diagnostic.start !== undefined
              ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
                  .line + 1
              : undefined,
        }))
      ).toEqual([])
    }
  )
})
