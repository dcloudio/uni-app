import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import ts from 'typescript'
import { Teleport, createSSRApp, h, ref, useSSRContext } from 'vue'
import { useInputStyles } from '../src/helpers/useInputStyles'
import * as shared from '@dcloudio/uni-shared'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)
jest.mock('vue', () =>
  jest.requireActual('../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
)
jest.mock('@vue/runtime-dom', () =>
  jest.requireActual('../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
)
jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPageId: () => 1,
  registerViewMethod: jest.fn(),
  createNativeEvent: (event: Event) => event,
}))
jest.mock('../src/helpers/useFormField', () => ({ useFormField: jest.fn() }))

const renderer = jest.requireActual(
  '../../uni-cli-shared/lib/dom2/web/@vue/server-renderer/dist/server-renderer.cjs.js'
)

// 使用实际 SSR 入口检查 headMeta，避免仅验证 context 而漏掉首屏样式输出。
async function render(styles: (string | null | undefined)[], head = false) {
  const code = ts.transpileModule(
    fs.readFileSync(
      path.resolve(__dirname, '../../uni-h5-vite/lib/ssr/entry-server.js'),
      'utf8'
    ),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } }
  ).outputText
  const module = { exports: {} as any }
  const imports: Record<string, unknown> = {
    './main': {
      createApp() {
        const app = createSSRApp({
          setup() {
            useSSRContext()!.modules = new Set()
            const placeholders = styles.map((placeholderStyle) =>
              useInputStyles(
                { placeholderStyle, placeholderClass: '', selectionClass: '' },
                ref(null)
              )
            )
            return () =>
              h('div', [
                ...placeholders.map((style) =>
                  h('input', {
                    'uni-input': '',
                    placeholder: 'Hint',
                    class: style.value
                      ? shared.INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX +
                        style.value
                      : undefined,
                    'data-uni-placeholder-style': style.value || undefined,
                  })
                ),
                ...(head
                  ? [
                      h(Teleport, { to: 'head' }, [
                        h('meta', { name: 'description', content: 'example' }),
                      ]),
                    ]
                  : []),
              ])
          },
        })
        ;(app as any).router = {
          push: async () => {},
          isReady: async () => {},
        }
        return { app }
      },
    },
    '@vue/server-renderer': renderer,
    '@dcloudio/uni-shared': shared,
    '@dcloudio/uni-h5': { plugin: () => {} },
    '@dcloudio/uni-app': { getSsrGlobalData: () => ({}) },
  }
  new Function('require', 'module', 'exports', code)(
    (id: string) => {
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    module,
    module.exports
  )
  return module.exports.render('/')
}

describe('Web Vapor Input SSR 原生占位样式', () => {
  let Input: any
  const originalX = (global as any).__X__
  const originalPlatform = (global as any).__PLATFORM__
  beforeAll(() => {
    ;(global as any).__X__ = true
    ;(global as any).__PLATFORM__ = 'h5'
    // 使用实际 Input 源码的 SSR JSX 分支，保留 Vue 的 props 默认值及空值行为。
    const file = path.resolve(__dirname, '../src/vue/input/index-vapor.tsx')
    const code = execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `
      import {createRequire} from 'node:module';
      import fs from 'node:fs';
      import path from 'node:path';
      const req=createRequire(import.meta.url);
      const {default:factory}=await import(req.resolve('vue-jsx/vite',{paths:['./packages/uni-h5']}));
      const plugin=factory({vapor:true,root:path.resolve('packages')});
      const file=process.argv[1];
      const result=await plugin.transform.handler.call({},fs.readFileSync(file,'utf8'),file,{ssr:true});
      process.stdout.write(result.code);
    `,
        file,
      ],
      { cwd: path.resolve(__dirname, '../../..'), encoding: 'utf8' }
    )
    const vue = jest.requireMock('vue')
    const imports: Record<string, unknown> = {
      vue,
      '@dcloudio/uni-shared': shared,
      '../../helpers/component': {
        defineBuiltInComponent: (options: any) =>
          vue.defineComponent({
            ...options,
            // SSR JSX 返回 VNode，将它作为标准 SSR render 的返回值。
            setup(props: any, context: any) {
              const node = options.setup(props, context)
              return () => node
            },
          }),
      },
      '../../helpers/useInputStyles': jest.requireActual(
        '../src/helpers/useInputStyles'
      ),
      './element-vapor': { UniInputElement: class {} },
      './useInput': jest.requireActual('../src/vue/input/useInput'),
    }
    const module = { exports: {} as any }
    new Function(
      'require',
      'module',
      'exports',
      ts.transpileModule(code, {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
      }).outputText
    )(
      (id: string) => {
        if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
        return imports[id]
      },
      module,
      module.exports
    )
    Input = module.exports.default
  })
  afterAll(() => {
    ;(global as any).__X__ = originalX
    if (originalPlatform === undefined) delete (global as any).__PLATFORM__
    else (global as any).__PLATFORM__ = originalPlatform
  })

  test.each(['placeholderClass', 'selectionClass'])(
    'SSR 组件显式传入 %s=null 时渲染为空类名',
    async (prop) => {
      const app = createSSRApp({
        render: () => h(Input, { [prop]: null, value: 'hello' }),
      })
      const html = await renderer.renderToString(app)
      const { JSDOM } = jest.requireActual('jsdom')
      const dom = new JSDOM(html)
      try {
        const field = dom.window.document.querySelector('input')!
        const attribute =
          prop === 'placeholderClass'
            ? 'data-uni-placeholder-class'
            : 'data-uni-selection-class'
        expect(field.getAttribute(attribute)).toBe('')
        expect(field.value).toBe('hello')
        expect(dom.window.document.body.children).toHaveLength(1)
      } finally {
        dom.window.close()
      }
    }
  )

  test('SSR 组件保留默认类名，并正常去除传递类名的 ^ 前缀', async () => {
    const app = createSSRApp({
      render: () =>
        h('div', [
          h(Input),
          h(Input, {
            placeholderClass: ' ^hint ^^large ',
            selectionClass: ' ^selected ',
          }),
        ]),
    })
    const html = await renderer.renderToString(app)
    expect(html).toContain('data-uni-placeholder-class="input-placeholder"')
    expect(html).toContain('data-uni-placeholder-class="hint large"')
    expect(html).toContain('data-uni-selection-class="selected"')
  })

  test('SSR 组件首屏输出占位文本及匹配样式规则的 class', async () => {
    const context: Record<string, any> = {}
    const app = createSSRApp({
      render: () =>
        h(Input, {
          placeholder: '首屏占位文本',
          placeholderStyle: 'font-size:18px;color:red!important',
          class: 'business',
        }),
    })
    const html = await renderer.renderToString(app, context)
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM(html)
    try {
      const field = dom.window.document.querySelector('input')!
      const key = field.getAttribute('data-uni-placeholder-style')!
      const className = `uni-input-style-${key}`
      expect(field.placeholder).toBe('首屏占位文本')
      expect(field.classList.contains(className)).toBe(true)
      expect(field.classList.contains('business')).toBe(true)
      const styles = context[shared.UNI_SSR_INPUT_STYLES]
      const css = shared.stringifyInputStyles(styles.values())
      expect(css).toContain(`.${className}::placeholder`)
      expect(css).toContain('font-size:18px;')
      expect(css).toContain('color:red!important;')
    } finally {
      dom.window.close()
    }
  })

  test('原生规则随首屏进入 head，局部变量、重复声明及关键字不被改写', async () => {
    const result = await render([
      'color:var(--tone)',
      '--tone:initial;color:var(--tone,red)',
      'font:italic 32px var(--family,serif)',
      'color:var(--tone)',
    ])
    expect(result.headMeta).toContain('<style data-uni-input-ssr-styles>')
    expect(result.headMeta).toContain('color:var(--tone);')
    expect(result.headMeta).toContain('--tone:initial;color:var(--tone,red);')
    expect(result.headMeta).toContain('font:italic 32px var(--family,serif);')
    expect(result.headMeta.match(/\{color:var\(--tone\);\}/g)).toHaveLength(1)
    expect(result.appHtml.match(/<input /g)).toHaveLength(4)
    expect(result.appHtml.match(/data-uni-placeholder-style=/g)).toHaveLength(4)
    expect(result.appHtml).not.toContain('<style')
    expect(typeof document).toBe('undefined')
  })

  test('默认值和样式按请求隔离，不进入业务状态序列化', async () => {
    const first = await render(['color:var(--tone)'])
    const second = await render(['font-family:var(--family)'])
    expect(first.headMeta).not.toContain('--family')
    expect(second.headMeta).not.toContain('--tone')
    expect(first.appContext).not.toContain('--tone')
  })

  test('没有 placeholder-style 时不额外输出样式', async () => {
    expect((await render([''])).headMeta).toBe('')
  })

  test('空样式值正常渲染，不收集占位样式', async () => {
    const result = await render([null, undefined])
    expect(result.headMeta).toBe('')
    expect(result.appHtml.match(/<input /g)).toHaveLength(2)
    expect(result.appHtml).not.toContain('data-uni-placeholder-style=')
  })

  test('异常字符串不会影响同次 SSR 的其他输入框或产生页面级规则', async () => {
    const result = await render([
      'font-family:"Some\nfont /*";color:red',
      'font-family:"\n}body{display:none}/*";color:blue',
      'color:green',
    ])
    expect(result.headMeta.match(/::placeholder/g)).toHaveLength(3)
    expect(result.headMeta).toContain('color:red;')
    expect(result.headMeta).toContain('color:blue;')
    expect(result.headMeta).toContain('color:green;')
    expect(result.headMeta).not.toContain('font-family')
    expect(result.headMeta).not.toContain('body{')
  })

  test('原生样式与已有 head 内容一起输出', async () => {
    const result = await render(['color:var(--tone)'], true)
    expect(result.headMeta).toContain('data-uni-input-ssr-styles')
    expect(result.headMeta).toContain(
      '<meta name="description" content="example">'
    )
  })

  test.each([
    'color:red;color:rgb(1,2)',
    'font:28px serif;font:500 32px',
    'background:linear-gradient(red,blue);background-color:green',
    'text-decoration:underline red wavy',
    'font:initial;font-family:initial',
  ])('首屏也由浏览器原生解析：%s', async (css) => {
    const result = await render([css])
    expect(result.headMeta).toContain(css + ';')
    expect(result.headMeta).not.toContain('--uni-input-placeholder-font')
  })

  test('CSS 字符串中的结束标签不会截断 SSR style 元素', async () => {
    const result = await render([
      'font-family:"a</style><script>example</script>";color:red',
    ])
    expect(result.headMeta.match(/<\/style>/gi)).toHaveLength(1)
    expect(result.headMeta).toContain('a\\3c /style>')
  })
})
