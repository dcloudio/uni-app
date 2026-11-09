import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import postcss from 'postcss'
import { compileStyle } from '@vue/compiler-sfc'
import uniappPlugin from '../src/postcss/plugins/uniapp'

const marker = ':where([uni-rich-text], [uni-editor])'

describe('Web content selection styles', () => {
  const keys = [
    'UNI_PLATFORM',
    'UNI_APP_X',
    'UNI_APP_X_DOM2',
    'VUE_APP_DARK_MODE',
  ]
  const env = { ...process.env }
  beforeEach(() => {
    Object.assign(process.env, {
      UNI_PLATFORM: 'h5',
      UNI_APP_X: 'true',
      UNI_APP_X_DOM2: 'true',
      VUE_APP_DARK_MODE: 'true',
    })
  })
  afterEach(() => {
    keys.forEach((key) => {
      if (env[key] === undefined) delete process.env[key]
      else process.env[key] = env[key]
    })
  })

  async function transform(source: string) {
    return (
      await postcss([uniappPlugin()]).process(source, { from: undefined })
    ).css
  }

  test.each([
    '.content',
    '#content:hover',
    '.outer > .content',
    ':is(.a, .b):not(.c)',
  ])(
    '%s preserves its original conditions and specificity',
    async (selector) => {
      const output = postcss.parse(
        await transform(
          `${selector}::selection { color:white; background-color:var(--selected, blue) !important }`
        )
      )
      expect(output.nodes).toHaveLength(2)
      const original = output.nodes[0] as postcss.Rule
      const expanded = output.nodes[1] as postcss.Rule
      expect(original.selector).toBe(`${selector}::selection`)
      expect(expanded.selector).toBe(`${selector}${marker} *::selection`)
      expect(expanded.nodes.map((node) => node.toString())).toEqual(
        original.nodes.map((node) => node.toString())
      )
    }
  )

  test('expands only terminal selection pseudo elements in selector lists', async () => {
    const output = postcss.parse(
      await transform('.a::selection, .b::before, .c::selection {color:red}')
    )
    expect((output.nodes[1] as postcss.Rule).selectors).toEqual([
      `.a${marker} *::selection`,
      `.c${marker} *::selection`,
    ])
  })

  test('同名 class 的扩展规则只匹配 rich-text 和 editor 内部内容', async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM(`
      <div uni-rich-text uni-view class="content"><div><p id="rich"><span id="rich-span">富文本</span></p></div></div>
      <div uni-editor uni-view class="content"><div class="ql-editor"><p id="editor">编辑内容</p></div></div>
      <div uni-view class="content"><span id="view-child">普通视图</span></div>
      <span uni-text class="content"><span id="text-child">普通文本</span></span>
      <div uni-input uni-view class="content"><input id="input-child"></div>
      <div uni-textarea uni-view class="content"><textarea id="textarea-child"></textarea></div>
      <div class="content"><span id="html-child">普通节点</span></div>
      <div uni-view class="content"><div uni-rich-text><p id="nested-rich">祖先具有同名 class</p></div></div>
    `)
    try {
      const output = postcss.parse(
        await transform(
          '.content::selection {color:white;background-color:blue}'
        )
      )
      const original = output.nodes[0] as postcss.Rule
      const expanded = output.nodes[1] as postcss.Rule
      expect(original.selector).toBe('.content::selection')
      const matches = Array.from(
        dom.window.document.querySelectorAll(
          expanded.selector.replace(/::selection$/, '')
        )
      ) as HTMLElement[]
      expect(matches.filter((node) => node.id).map((node) => node.id)).toEqual([
        'rich',
        'rich-span',
        'editor',
      ])
      for (const node of matches) {
        expect(
          node.parentElement!.closest('[uni-rich-text], [uni-editor]')
        ).not.toBeNull()
      }
    } finally {
      dom.window.close()
    }
  })

  test('handles comments and case-insensitive pseudo element names', async () => {
    const output = await transform(
      '.content/* before */::SELECTION/* after */ {color:red}'
    )
    expect(output).toContain(
      `.content/* before */${marker} *::SELECTION/* after */`
    )
    expect(await transform(output)).toBe(output)
    const universal = '*/* before */::selection/* after */ {color:red}'
    expect(await transform(universal)).toBe(universal)
  })

  test.each([
    '::selection',
    '*::selection',
    '.content *::selection',
    '.content::before',
    '.content::before::selection',
    ':is(.content::selection)',
  ])('leaves %s unchanged', async (selector) => {
    const source = `${selector} {color:red}`
    expect(await transform(source)).toBe(source)
  })

  test('retains media, supports, layers, declarations and rule order', async () => {
    const source =
      '@layer app { @media (prefers-color-scheme: dark) { @supports (color:var(--selected)) { .content::selection {color:var(--fg);background-color:transparent} } } }'
    const output = postcss.parse(await transform(source))
    const rules: postcss.Rule[] = []
    output.walkRules((rule) => {
      rules.push(rule)
    })
    expect(rules).toHaveLength(2)
    expect(rules[0].parent).toBe(rules[1].parent)
    expect((rules[1].parent as postcss.AtRule).name).toBe('supports')
    expect(rules[1].nodes.map((node) => node.toString())).toEqual(
      rules[0].nodes.map((node) => node.toString())
    )
  })

  test('expands CSS brought in by imports through the normal PostCSS pipeline', async () => {
    const result = await postcss([
      require('postcss-import')({
        resolve: () => '/virtual/theme.css',
        load: () => '.content::selection {color:white;background-color:blue}',
      }),
      uniappPlugin(),
    ]).process('@import "./theme.css";', { from: '/virtual/App.css' })
    expect(result.css).toContain(`.content${marker} *::selection`)
    expect(result.css).not.toContain('@import')
  })

  test.each([false, true])(
    'processes scoped CSS after root scoping (Vapor=%s)',
    async (vapor) => {
      process.env.UNI_APP_X = 'true'
      if (vapor) process.env.UNI_APP_X_DOM2 = 'true'
      else delete process.env.UNI_APP_X_DOM2
      const scoped = compileStyle({
        source:
          '.outer > .content::selection {color:white;background-color:blue} .outer :deep(.inner)::selection {color:red}',
        filename: 'selection.vue',
        id: 'data-v-selection',
        scoped: true,
      })
      expect(scoped.errors).toEqual([])
      const output = await transform(scoped.code)
      if (vapor) {
        expect(output).toContain(
          `.outer > .content[data-v-selection]${marker} *::selection`
        )
        expect(output).toContain(
          `.outer[data-v-selection] .inner${marker} *::selection`
        )
      } else {
        expect(output).not.toContain(`${marker} *::selection`)
      }
      expect(output).not.toContain('*[data-v-selection]::selection')
    }
  )

  test('also expands after scoping when the plugins share one SFC compilation', () => {
    const result = compileStyle({
      source: '.content::selection { color:white; background-color:blue }',
      filename: 'selection.vue',
      id: 'data-v-selection',
      scoped: true,
      postcssPlugins: [uniappPlugin()],
    })
    expect(result.errors).toEqual([])
    expect(result.code).toContain(
      `.content[data-v-selection]${marker} *::selection`
    )
    expect(result.code).not.toContain('*[data-v-selection]')
  })

  test('bundled Vapor scoped compiler keeps the scope on the root', async () => {
    const code = execFileSync(
      process.execPath,
      [
        '-e',
        `
      require('./packages/uni-cli-shared/dist/hbx/alias').initWebVaporAliases();
      const {compileStyle} = require('vue/compiler-sfc');
      const result = compileStyle({source: '.content::selection {color:white;background-color:blue}', filename:'selection.uvue', id:'data-v-selection', scoped:true});
      if(result.errors.length) throw result.errors[0];
      process.stdout.write(result.code);
    `,
      ],
      { cwd: path.resolve(__dirname, '../../..'), encoding: 'utf8' }
    )
    const output = await transform(code)
    expect(output).toContain(`.content[data-v-selection]${marker} *::selection`)
    expect(output).not.toContain('*[data-v-selection]')
  })

  test.each([false, true])(
    'handles both content component tags (Vapor=%s)',
    async (vapor) => {
      process.env.UNI_APP_X = 'true'
      if (vapor) process.env.UNI_APP_X_DOM2 = 'true'
      else delete process.env.UNI_APP_X_DOM2
      for (const name of ['editor', 'rich-text']) {
        const output = await transform(`${name}.content::selection {color:red}`)
        const host = vapor ? `div:where([uni-${name}])` : `uni-${name}`
        if (vapor) {
          expect(output).toContain(`${host}.content${marker} *::selection`)
        } else {
          expect(output).not.toContain(`${marker} *::selection`)
        }
        expect(await transform(output)).toBe(output)
      }
    }
  )

  test('repeat processing does not duplicate rules or lose distinct declarations', async () => {
    const output = await transform(
      '.content::selection {color:red} .content::selection {background:blue}'
    )
    expect(await transform(output)).toBe(output)
    const rules: string[] = []
    postcss.parse(output).walkRules((rule) => {
      rules.push(rule.selector)
    })
    expect(rules).toHaveLength(4)
  })

  test.each(['app', 'app-harmony', 'mp-weixin', 'mp-alipay'])(
    'does not expand selectors on %s',
    async (platform) => {
      process.env.UNI_PLATFORM = platform as typeof process.env.UNI_PLATFORM
      expect(await transform('.content::selection {color:red}')).toBe(
        '.content::selection {color:red}'
      )
    }
  )

  test('不扩展普通 H5 和 X Web VDOM 的选择器', async () => {
    process.env.UNI_PLATFORM = 'h5'
    delete process.env.UNI_APP_X_DOM2
    expect(await transform('.content::selection {color:red}')).toBe(
      '.content::selection {color:red}'
    )
  })

  test('组件不再依赖运行时选区样式同步', () => {
    const root = path.resolve(__dirname, '../../uni-components/src')
    for (const file of [
      'vue/editor/useEditor.ts',
      'vue/rich-text/index.tsx',
      'vue/rich-text/index-vapor.tsx',
    ]) {
      expect(fs.readFileSync(path.join(root, file), 'utf8')).not.toContain(
        'useWebSelectionStyle'
      )
    }
    expect(
      fs.existsSync(path.join(root, 'helpers/useWebSelectionStyle.ts'))
    ).toBe(false)
  })
})
