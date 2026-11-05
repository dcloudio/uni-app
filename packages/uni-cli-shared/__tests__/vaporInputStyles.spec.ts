import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import fs from 'fs'
import path from 'path'
import { compileStyle } from '@vue/compiler-sfc'
import {
  INPUT_PLACEHOLDER_CLASS_LAYER,
  createInputPlaceholderStyle,
  stringifyInputStyles,
} from '@dcloudio/uni-shared'
import uniapp from '../src/postcss/plugins/uniapp'

const envKeys = ['UNI_PLATFORM', 'UNI_APP_X', 'UNI_APP_X_DOM2'] as const
const originalEnv = envKeys.map((key) => process.env[key])

async function processCss(source: string) {
  return (await postcss([uniapp()]).process(source, { from: undefined })).css
}

function mappedRules(css: string, selection = false) {
  const rules: postcss.Rule[] = []
  const root = postcss.parse(css)
  root.walkAtRules('layer', (layer) => {
    if (layer.params !== INPUT_PLACEHOLDER_CLASS_LAYER) return
    layer.walkRules((rule) => {
      if (rule.selector.endsWith(selection ? '::before' : '::placeholder'))
        rules.push(rule)
    })
  })
  return rules
}

describe('Web Vapor Input 原生伪元素样式', () => {
  beforeEach(() => {
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
  })
  afterEach(() => {
    envKeys.forEach((key, i) => {
      if (originalEnv[i] === undefined) delete process.env[key]
      else
        (process.env as Record<string, string | undefined>)[key] =
          originalEnv[i]
    })
  })

  test('保留原样式，原生声明只作用于占位符或选区，不改变 input 自身', async () => {
    const source =
      '.hint {color:red;font-size:20px;background-color:transparent;padding:10px}'
    const css = await processCss(source)
    expect(css).toContain(source)
    const placeholder = mappedRules(css)[0]
    expect(placeholder.selector).toBe(
      '[data-uni-placeholder-class~="hint"]:where([uni-input])::placeholder'
    )
    expect(placeholder.toString()).toContain(
      'color:red;font-size:20px;background-color:transparent'
    )
    expect(placeholder.toString()).not.toContain('padding')
    const selection = mappedRules(css, true)[0]
    expect(selection.selector).toContain('data-uni-selection-class')
    expect(selection.nodes).toHaveLength(2)
    expect(selection.last).toMatchObject({
      prop: 'background-color',
      value: 'transparent',
    })
    expect(css).not.toContain('--uni-input-placeholder-font')
  })

  test('保留 scoped、多类、祖先、媒体查询、变量和 important', async () => {
    const scoped = compileStyle({
      source:
        '@media (min-width:600px){.theme .hint.large{color:var(--tone)!important;font-weight:700}}',
      filename: 'input.vue',
      id: 'data-v-owner',
      scoped: true,
    })
    expect(scoped.errors).toEqual([])
    const mapped = mappedRules(await processCss(scoped.code))[0]
    expect(mapped.selector).toContain('.theme ')
    expect(mapped.selector).toContain('[data-uni-placeholder-class~="hint"]')
    expect(mapped.selector).toContain('[data-uni-placeholder-class~="large"]')
    expect(mapped.selector).toContain('[data-v-owner]')
    expect(mapped.parent).toMatchObject({
      name: 'media',
      params: '(min-width:600px)',
    })
    expect(mapped.first).toMatchObject({
      prop: 'color',
      value: 'var(--tone)',
      important: true,
    })
  })

  test('祖先 class 可匹配父级或 input 根，保留 scoped 和多级祖先', async () => {
    const scoped = compileStyle({
      source: '.theme .field .hint{color:red;background:blue}',
      filename: 'input.vue',
      id: 'data-v-owner',
      scoped: true,
    })
    const css = await processCss(scoped.code)
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM(
      '<div class="theme"><input class="field" data-v-owner data-uni-placeholder-class="hint" data-uni-selection-class="hint" uni-input><div class="field"><input data-v-owner data-uni-placeholder-class="hint" data-uni-selection-class="hint" uni-input></div><input data-v-owner data-uni-placeholder-class="hint" uni-input></div>'
    )
    try {
      for (const rule of [mappedRules(css)[0], mappedRules(css, true)[0]]) {
        expect(
          dom.window.document.querySelectorAll(
            rule.selector.replace(/::(?:placeholder|before)/g, '')
          )
        ).toHaveLength(2)
        expect(rule.selector).toContain(':is(.field)')
      }
      expect(await processCss(css)).toBe(css)
    } finally {
      dom.window.close()
    }
  })

  test('递归转换函数伪类，保留祖先条件、where 权重及 input 标签', async () => {
    const css = await processCss(
      'input.field .hint:not(.large):is(.small,:where(.compact)){color:red} :where(.hint.large){font-size:24px} .field + .hint{color:green}'
    )
    const rules = mappedRules(css)
    expect(rules[0].selector).toContain(':is(input:where([uni-input]).field)')
    expect(rules[0].selector).toContain(
      ':not([data-uni-placeholder-class~="large"])'
    )
    expect(rules[0].selector).toContain(
      ':is([data-uni-placeholder-class~="small"],:where([data-uni-placeholder-class~="compact"]))'
    )
    expect(rules[1].selector).toContain(
      ':where([data-uni-placeholder-class~="hint"][data-uni-placeholder-class~="large"])'
    )
    expect(rules[2].selector).not.toContain(':is(')
    expect(await processCss(css)).toBe(css)
  })

  test('类内的嵌套条件保留声明顺序，并作用于同一个占位符和选区探测伪元素', async () => {
    const css = await processCss(
      '.hint{color:blue;@media(min-width:1px){color:red;background:green;@supports(color:red){color:purple}}color:orange}'
    )
    for (const rule of [mappedRules(css)[0], mappedRules(css, true)[0]]) {
      expect(rule.nodes.map((node) => node.type)).toEqual([
        'decl',
        'atrule',
        'decl',
      ])
      const media = rule.nodes[1] as postcss.AtRule
      expect(media).toMatchObject({ name: 'media', params: '(min-width:1px)' })
      expect(media.nodes![0]).toMatchObject({ prop: 'color', value: 'red' })
      expect(media.nodes![1]).toMatchObject({
        prop: 'background',
        value: 'green',
      })
      expect(media.nodes![2]).toMatchObject({
        name: 'supports',
        params: '(color:red)',
      })
      expect(rule.last).toMatchObject({ prop: 'color', value: 'orange' })
    }
    expect(await processCss(css)).toBe(css)
  })

  test('只有嵌套条件声明时也生成规则，普通嵌套子类仍保留祖先条件', async () => {
    const css = await processCss(
      '.hint{@media(min-width:1px){background:red}}.theme{.hint{color:green}}'
    )
    for (const selection of [false, true]) {
      const rules = mappedRules(css, selection)
      expect(rules[0].first).toMatchObject({ name: 'media' })
      expect((rules[0].first as postcss.AtRule).first).toMatchObject({
        prop: 'background',
        value: 'red',
      })
      expect(rules[1].parent).toMatchObject({ selector: '.theme' })
    }
  })

  test('currentColor 的颜色依赖与背景一起交给探测伪元素解析', async () => {
    const css = await processCss(
      '.selected{color:red;background-color:currentColor}'
    )
    const probe = mappedRules(css, true)[0]
    expect(probe.selector).toContain('::before')
    expect(probe.nodes.map((node) => node.toString()).join(';')).toBe(
      'color:red;background-color:currentColor'
    )
    expect(css).not.toContain('::selection')
  })

  test.each([
    '.hint{&{color:red;background:green}}',
    '.hint{@media(min-width:1px){&{color:red;background:green}}}',
  ])('解析嵌套 &，占位符和选区保留对应外部类及条件：%s', async (source) => {
    const css = await processCss(source)
    for (const selection of [false, true]) {
      const rules = mappedRules(css, selection)
      expect(rules).toHaveLength(1)
      const selector = selectorParser().astSync(rules[0].selector)
      let nesting = false
      const attributes: string[] = []
      selector.walkNesting(() => {
        nesting = true
      })
      selector.walkAttributes((node) => {
        if (node.value === 'hint') attributes.push(node.attribute)
      })
      expect(nesting).toBe(false)
      expect(attributes).toEqual([
        selection ? 'data-uni-selection-class' : 'data-uni-placeholder-class',
      ])
      expect(rules[0].first).toMatchObject({ prop: 'color', value: 'red' })
      expect(rules[0].last).toMatchObject({
        prop: 'background',
        value: 'green',
      })
      if (source.includes('@media'))
        expect(rules[0].parent).toMatchObject({
          name: 'media',
          params: '(min-width:1px)',
        })
      if (source.includes('@supports'))
        expect(rules[0].parent).toMatchObject({
          name: 'supports',
          params: '(color:red)',
        })
    }
    expect(css).toContain(source)
    expect(await processCss(css)).toBe(css)
  })

  test('单层 &.class 保留多类约束，且不要求 input 自身携带外部类', async () => {
    const css = await processCss('.hint{&.large{color:red;background:green}}')
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM(
      '<input uni-input data-uni-placeholder-class="hint large" data-uni-selection-class="hint large"><input uni-input data-uni-placeholder-class="hint" data-uni-selection-class="hint"><input uni-input data-uni-placeholder-class="large" data-uni-selection-class="large">'
    )
    try {
      for (const selection of [false, true]) {
        const selector = mappedRules(css, selection)[0].selector.replace(
          /::(?:placeholder|before)/g,
          ''
        )
        expect(dom.window.document.querySelectorAll(selector)).toHaveLength(1)
      }
      expect(await processCss(css)).toBe(css)
    } finally {
      dom.window.close()
    }
  })

  test('单层 & 保留普通祖先条件，支持父容器和 input 根 class', async () => {
    const css = await processCss(
      '.theme .field .hint{&{color:red;background:green}}'
    )
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM(
      '<div class="theme"><input class="field" uni-input data-uni-placeholder-class="hint" data-uni-selection-class="hint"><div class="field"><input uni-input data-uni-placeholder-class="hint" data-uni-selection-class="hint"></div><input uni-input data-uni-placeholder-class="hint" data-uni-selection-class="hint"></div>'
    )
    try {
      for (const selection of [false, true]) {
        const selector = mappedRules(css, selection)[0].selector.replace(
          /::(?:placeholder|before)/g,
          ''
        )
        expect(dom.window.document.querySelectorAll(selector)).toHaveLength(2)
      }
      expect(await processCss(css)).toBe(css)
    } finally {
      dom.window.close()
    }
  })

  test('scoped 嵌套仍保留作用域属性，转义的 & 不作为嵌套符号处理', async () => {
    const scoped = compileStyle({
      source: '.hint{&.large{color:red}}',
      filename: 'input.vue',
      id: 'data-v-owner',
      scoped: true,
    })
    expect(scoped.errors).toEqual([])
    const css = await processCss(scoped.code)
    expect(mappedRules(css)[0].selector).toContain('[data-v-owner]')
    expect(mappedRules(css)[0].selector).toContain(
      'data-uni-placeholder-class~="hint"'
    )
    expect(mappedRules(css)[0].selector).toContain(
      'data-uni-placeholder-class~="large"'
    )
    const escaped = await processCss('.hint\\&large{color:red}')
    expect(mappedRules(escaped)[0].selector).toContain(
      'data-uni-placeholder-class~="hint&large"'
    )
    expect(await processCss(escaped)).toBe(escaped)
  })

  test('单层 & 与条件规则前后的声明保持原顺序', async () => {
    const css = await processCss(
      '.hint{color:red;&{color:green}@media(min-width:1px){&.large{color:purple}}color:blue}'
    )
    for (const selection of [false, true]) {
      const rules = mappedRules(css, selection)
      expect(
        rules.map((rule) => (rule.first as postcss.Declaration).value)
      ).toEqual(['red', 'green', 'purple', 'blue'])
      expect(rules[2].parent).toMatchObject({ name: 'media' })
    }
    expect(await processCss(css)).toBe(css)
  })

  test.each([
    '.hint{&{&{color:red}}}',
    '.hint,.other{&.large{color:red}}',
    '.hint{>& .child{color:red}}',
  ])('超出单层 & 支持范围时只保留业务 CSS：%s', async (source) => {
    const css = await processCss(source)
    expect(css).toContain(source)
    expect(mappedRules(css)).toHaveLength(0)
    expect(mappedRules(css, true)).toHaveLength(0)
    expect(await processCss(css)).toBe(css)
  })

  test('镜像业务层顺序和嵌套，保留每条声明的原始优先级及 revert-layer', async () => {
    const source =
      '@layer low,high;@layer low{.hint{font:italic 22px serif!important}}@layer high{@media(min-width:1px){.hint{font:700 32px serif;font-size:revert-layer}}}.hint{font-family:inherit}'
    const css = await processCss(source)
    const layer = postcss.parse(css).last as postcss.AtRule
    expect(layer.params).toBe(INPUT_PLACEHOLDER_CLASS_LAYER)
    expect(layer.first).toMatchObject({
      name: 'layer',
      params: 'low,high',
    })
    const rules = mappedRules(css)
    expect(rules[0].parent).toMatchObject({ name: 'layer', params: 'low' })
    expect(rules[0].first).toMatchObject({
      prop: 'font',
      value: 'italic 22px serif',
      important: true,
    })
    expect(rules[1].last).toMatchObject({
      prop: 'font-size',
      value: 'revert-layer',
    })
    expect(rules[2].first).toMatchObject({
      prop: 'font-family',
      value: 'inherit',
    })
    expect(await processCss(css)).toBe(css)
  })

  test('混合标签或 ID 的函数分支不生成兼容规则，原业务规则保留', async () => {
    const css = await processCss(
      ':is(.hint,input#field){color:red}:where(.hint,#field){color:red}.hint:not(input){color:green}:is(.hint,text){color:blue}.hint:is(div){color:purple}.supported{color:blue}'
    )
    for (const selection of [false, true]) {
      const rules = mappedRules(css, selection)
      expect(rules).toHaveLength(1)
      expect(rules[0].selector).toContain('~="supported"')
    }
    expect(css).toContain('.hint:is(div){color:purple}')
    expect(css).not.toContain(':not(*)')
    expect(await processCss(css)).toBe(css)
  })

  test.each([
    'color:red;color:rgb(1,2)',
    'font:28px serif;font:500 32px',
    'background:linear-gradient(red,blue);background-color:green',
    'background:linear-gradient(red,blue);background-color:initial',
    'text-decoration:underline red wavy;text-decoration-color:blue',
    'font:initial;font-family:initial',
    'font:oblique calc(10deg) calc(450) 32px "monospace"',
    '--tone:initial;color:var(--tone,red)',
    '--tone:inherit;color:var(--tone,red)',
    'font:var(--font,initial)',
  ])('保留原生解析语义和重复声明：%s', async (declarations) => {
    const css = await processCss(`.hint{${declarations}}`)
    const rule = mappedRules(css)[0]
    expect(rule.nodes.map((node) => node.toString()).join(';')).toBe(
      declarations
    )
    expect(await processCss(css)).toBe(css)
  })

  test('选区探测保留背景、颜色及局部变量，不给选中文字设置颜色', async () => {
    const css = await processCss(
      '.hint\\:active{--tone:red;background:var(--tone,inherit);color:blue}.inherit{background-color:inherit}.literal{background:url("a, inherit).png") red}'
    )
    const rules = mappedRules(css, true)
    expect(rules[0].selector).toContain(
      'data-uni-selection-class~="hint:active"'
    )
    expect(rules[0].toString()).toContain('--tone:red')
    expect(rules[0].toString()).toContain('var(--tone,inherit)')
    expect(rules[0].toString()).toContain('color:blue')
    expect(rules[0].selector).toContain('::before')
    expect(rules[0].selector).not.toContain('::selection')
    expect(rules[1].first).toMatchObject({
      value: 'inherit',
    })
    expect(rules[2].first).toMatchObject({
      value: 'url("a, inherit).png") red',
    })
  })

  test('原生伪元素、其他组件专用样式不重复映射', async () => {
    const css = await processCss(
      '.hint{color:red;background:blue}.hint::placeholder{color:green}text.hint{color:yellow}'
    )
    expect(mappedRules(css)).toHaveLength(1)
    expect(mappedRules(css, true)).toHaveLength(1)
    expect(await processCss(css)).toBe(css)
  })

  test('VDOM 和 App 保持原有 CSS', async () => {
    delete process.env.UNI_APP_X_DOM2
    expect(await processCss('.hint{color:red}')).toBe('.hint{color:red}')
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_PLATFORM = 'app'
    expect(await processCss('.hint{color:red}')).toBe('.hint{color:red}')
  })

  test('再次处理框架 Input 样式时保留原生占位符默认层', async () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, '../../uni-h5/style/vapor/input.css'),
      'utf8'
    )
    const css = await processCss(source)
    expect(css).toContain('color: #757575')
    expect(css).toContain('font: inherit')
    expect(await processCss(css)).toBe(css)
  })

  test('负向选择器不改变未设置 selection-class 时的默认选区', async () => {
    const css = await processCss(':not(.large){background:red}')
    const selector = mappedRules(css, true)[0].selector.replace(/::before/g, '')
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM(
      '<input uni-input data-uni-selection-class=""><input uni-input data-uni-selection-class="hint"><input uni-input data-uni-selection-class="large">'
    )
    try {
      expect(dom.window.document.querySelectorAll(selector)).toHaveLength(1)
    } finally {
      dom.window.close()
    }
  })
  test('inline 样式保留空变量、嵌套值、rpx 和带空格的 important', () => {
    const style = createInputPlaceholderStyle(
      '--empty:;--tokens:{a:b;c:d};font-size:36rpx;color:red ! important;font-family:"important"'
    )
    expect(style.normal).toContain('--empty:;--tokens:{a:b;c:d};')
    expect(style.normal).toContain('font-size:1.125rem;')
    expect(style.normal).toContain('font-family:"important";')
    expect(style.important).toBe('color:red ! important;')
  })

  test('重复及空样式复用不可变解析结果', () => {
    const first = createInputPlaceholderStyle('color:red;font-size:18rpx')
    expect(createInputPlaceholderStyle('color:red;font-size:18rpx')).toBe(first)
    expect(Object.isFrozen(first)).toBe(true)
    expect(first.normal).toBe('color:red;font-size:0.5625rem;')
    const empty = createInputPlaceholderStyle('')
    expect(createInputPlaceholderStyle(null)).toBe(empty)
    expect(createInputPlaceholderStyle(undefined)).toBe(empty)
    expect(Object.isFrozen(empty)).toBe(true)
  })

  test('解析缓存有上限，并保留持续复用的样式', () => {
    const cold = createInputPlaceholderStyle('--cache:cold;color:red')
    const hot = createInputPlaceholderStyle('--cache:hot;color:blue')
    for (let i = 0; i < 1000; i++) {
      createInputPlaceholderStyle(`--cache:${i};color:green`)
      expect(createInputPlaceholderStyle('--cache:hot;color:blue')).toBe(hot)
    }
    expect(createInputPlaceholderStyle('--cache:cold;color:red')).not.toBe(cold)
  })

  test('过长样式正常解析，不长期保留在缓存中', () => {
    const source = ' '.repeat(20000) + 'color:red'
    const first = createInputPlaceholderStyle(source)
    const second = createInputPlaceholderStyle(source)
    expect(first.normal).toBe('color:red;')
    expect(second).toEqual(first)
    expect(second).not.toBe(first)
  })

  test('inline 样式规则使用同权重的 class，并保留声明及 important 分层', () => {
    const style = createInputPlaceholderStyle(
      'font:italic 18px serif;color:blue;color:rgb(1,2);opacity:0.5!important'
    )
    const css = stringifyInputStyles([style])
    const selectors: string[] = []
    postcss.parse(css).walkRules((rule) => {
      selectors.push(rule.selector)
      expect(rule.selector).toBe(
        `input:where([uni-input]).uni-input-style-${style.key}::placeholder`
      )
    })
    expect(selectors).toHaveLength(2)
    expect(css).toContain('font:italic 18px serif;color:blue;color:rgb(1,2);')
    expect(css).toContain('opacity:0.5!important;')
  })

  test.each(['\n', '\r', '\r\n', '\f'])(
    '字符串中未转义的换行 %j 不得污染后续声明或其他规则',
    (newline) => {
      const style = createInputPlaceholderStyle(
        `font-family:"Some${newline}font /*";color:red`
      )
      expect(style.normal).toBe('color:red;')
      const escaped = createInputPlaceholderStyle(
        `font-family:"${newline}}body{display:none}/*";color:blue`
      )
      expect(escaped.normal).toBe('color:blue;')
      const css = stringifyInputStyles([
        style,
        escaped,
        createInputPlaceholderStyle('color:green'),
      ])
      const root = postcss.parse(css)
      const selectors: string[] = []
      root.walkRules((rule) => {
        selectors.push(rule.selector)
        expect(rule.selector).toContain('::placeholder')
      })
      expect(selectors).toHaveLength(3)
    }
  )

  test.each(['\n', '\r', '\r\n', '\f'])(
    '字符串中的转义续行 %j 保持合法',
    (newline) => {
      const style = createInputPlaceholderStyle(
        `font-family:"Some\\${newline}Font";color:blue`
      )
      expect(style.normal).toBe('font-family:"Some\\\nFont";color:blue;')
    }
  )

  test.each([
    'color:red; }body{display:none};font-size:20px',
    '--unsafe{}body{display:none}:red;color:blue',
    'font-family:"unterminated',
    '--tokens:{unclosed',
  ])('inline 声明不能逃逸到其他规则：%s', (source) => {
    const style = createInputPlaceholderStyle(source)
    const css = stringifyInputStyles([style])
    const root = postcss.parse(css)
    root.walkRules((rule) => {
      expect(rule.selector).toContain('::placeholder')
    })
  })
})
