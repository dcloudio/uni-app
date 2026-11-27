import postcss from 'postcss'
import { compileStyle } from '@vue/compiler-sfc'
import { initPostcssPlugin } from '../src/postcss'
import uniappPlugin from '../src/postcss/plugins/uniapp'

describe('Web Vapor 标签选择器', () => {
  const env = { ...process.env }
  beforeEach(() => {
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'
  })
  afterEach(() => {
    for (const key of [
      'UNI_PLATFORM',
      'UNI_APP_X',
      'UNI_APP_X_DOM2',
      'UNI_APP_X_VAPOR',
    ]) {
      if (env[key] === undefined) delete process.env[key]
      else process.env[key] = env[key]
    }
  })

  async function css(source: string) {
    return (
      await postcss([uniappPlugin()]).process(source, { from: undefined })
    ).css
  }

  function placeholderRules(output: string, legacy = false) {
    const rules: postcss.Rule[] = []
    const params = legacy
      ? 'not (color: revert-layer)'
      : 'uni-input-placeholder-class'
    postcss.parse(output).walkAtRules((rule) => {
      if (rule.parent?.type === 'root' && rule.params === params) {
        rule.walkRules((child) => {
          rules.push(child)
        })
      }
    })
    return rules
  }

  test.each([
    ['view', 'div:where([uni-view])'],
    ['text', 'span:where([uni-text])'],
    ['image', 'img:where([uni-image])'],
    ['canvas', 'canvas:where([uni-canvas])'],
    ['cover-view', 'div:where([uni-view])'],
    ['cover-image', 'img:where([uni-image])'],
    ['button', ':is(div,span):where([uni-button])'],
    ['navigator', ':is(div,span):where([uni-navigator])'],
    ['progress', 'div:where([uni-progress])'],
    ['scroll-view', 'div:where([uni-scroll-view])'],
    ['list-view', 'div:where([uni-list-view])'],
    ['waterflow', 'div:where([uni-waterflow])'],
    ['match-media', 'div:where([uni-match-media])'],
    ['input', 'input:where([uni-input])'],
    ['v-uni-input', 'input:where([uni-input])'],
    ['page', 'uni-page-body'],
  ])('%s 保留标签权重并匹配对应宿主', async (input, output) => {
    expect(await css(`${input} { color: red }`)).toBe(
      `${output} { color: red }`
    )
  })

  test('保留组合关系、伪类、伪元素、属性值及选择器之间的空白', async () => {
    expect(
      await css(
        'view.active > text:hover, button + image[data-name="view"]::before { color:red }'
      )
    ).toBe(
      'div:where([uni-view]).active > span:where([uni-text]):hover, :is(div,span):where([uni-button]) + img:where([uni-image])[data-name="view"]::before { color:red }'
    )
    expect(
      await css(':is(view, button):not(.text) ~ image { color:red }')
    ).toBe(
      ':is(div:where([uni-view]), :is(div,span):where([uni-button])):not(.text) ~ img:where([uni-image]) { color:red }'
    )
  })

  test('原生 HTML、自定义组件、框架标签和显式命名空间保持不变', async () => {
    const source =
      'div, span, img, #text, my-card, uni-page-body, uni-progress, svg|image { color:red }'
    expect(await css(source)).toBe(source)
  })

  test.each([
    'uni-app canvas:where([uni-canvas])',
    'canvas:where([uni-canvas][hidden])',
  ])('框架已有 Canvas 选择器不重复追加标识：%s', async (selector) => {
    const source = `${selector} { color:red }`
    expect(await css(source)).toBe(source)
  })

  test.each([
    ['view', 'view', 'div'],
    ['text', 'text', 'span'],
    ['image', 'image', 'img'],
    ['canvas', 'canvas', 'canvas'],
    ['button', 'button', ':is(div,span)'],
    ['navigator', 'navigator', ':is(div,span)'],
    ['progress', 'progress', 'div'],
    ['cover-view', 'view', 'div'],
    ['v-uni-image', 'image', 'img'],
  ])('%s 已有身份时只转换宿主，重复处理保持不变', async (tag, marker, host) => {
    const source = `${tag}:where([uni-${marker}][hidden]) { color:red }`
    const output = await css(source)
    expect(output).toBe(`${host}:where([uni-${marker}][hidden]) { color:red }`)
    expect(await css(output)).toBe(output)
    const generated = await css(`${tag}.active { color:red }`)
    expect(await css(generated)).toBe(generated)
  })

  test.each([
    ':where([uni-view], .other)',
    ':where([uni-view] div)',
    ':not([uni-view])',
    ':where([uni-text])',
  ])(
    '不把其他分支、后代、否定条件或其他身份当成 View 标识：%s',
    async (suffix) => {
      expect(await css(`view${suffix} { color:red }`)).toBe(
        `div:where([uni-view])${suffix} { color:red }`
      )
    }
  )

  test.each([':where([uni-canvas], .other)', ':where([uni-canvas] div)'])(
    '不将复杂 where 内的标识当成 Canvas 身份：%s',
    async (suffix) => {
      expect(await css(`canvas${suffix} { color:red }`)).toBe(
        `canvas:where([uni-canvas])${suffix} { color:red }`
      )
    }
  )

  test('带已有标识的内部组件名仍转换为原生 Canvas', async () => {
    expect(await css('v-uni-canvas:where([uni-canvas]) { color:red }')).toBe(
      'canvas:where([uni-canvas]) { color:red }'
    )
  })

  test('保留 Vue scoped 和 deep 转换后的隔离条件', async () => {
    const result = compileStyle({
      source: 'view > text { color:red } button :deep(image) { opacity:1 }',
      filename: 'test.vue',
      id: 'data-v-test',
      scoped: true,
    })
    expect(result.errors).toEqual([])
    const output = await css(result.code)
    expect(output).toContain(
      'div:where([uni-view]) > span:where([uni-text])[data-v-test]'
    )
    expect(output).toContain(
      ':is(div,span):where([uni-button])[data-v-test] img:where([uni-image])'
    )
  })

  test.each(['.field', '#email', '.field[data-state="invalid"]'])(
    '为 scoped 占位类保留祖先与 Input 根节点条件，并生成无需 CSS 层的回退：%s',
    async (condition) => {
      const result = compileStyle({
        source: `${condition} .hint { color: red; width: 10px }`,
        filename: 'test.vue',
        id: 'data-v-test',
        scoped: true,
      })
      expect(result.errors).toEqual([])
      const output = await css(result.code)
      const root = postcss.parse(output)
      const generated: Record<string, string> = {}
      root.walkAtRules((rule) => {
        if (rule.nodes?.length) generated[rule.params] = rule.toString()
      })
      expect(output).toContain(`${condition} .hint[data-v-test]`)
      const layered = generated['uni-input-placeholder-class']
      const scopedHint = '.uni-input-ph-hint[data-v-test]'
      expect(layered).toContain(
        `${condition} ${scopedHint}:where([uni-input])::placeholder`
      )
      expect(layered).toContain(
        `${scopedHint}:where([uni-input]):is(${condition})::placeholder`
      )
      const fallback = generated['not (color: revert-layer)']
      expect(fallback).toContain(
        `${condition} ${scopedHint}[uni-input]::placeholder`
      )
      expect(fallback).toContain(
        `${scopedHint}[uni-input]${condition}::placeholder`
      )
      expect(fallback).toContain('color: red')
      expect(fallback).not.toContain('width')
      expect(await css(output)).toBe(output)
    }
  )

  test('保留占位规则的媒体条件，回退跳过嵌套的业务层', async () => {
    const source = `@media (min-width: 768px) {
  .hint { color: red; width: 10px; }
  @layer card { .in-layer { color: blue; } }
}`
    const output = await css(source)
    expect(output)
      .toBe(`@layer uni-input-placeholder-inline-important, uni-input-placeholder-class;
${source}
@layer uni-input-placeholder-class {
@media (min-width: 768px) {
.uni-input-ph-hint:where([uni-input])::placeholder { color: red; }
@layer card {
.uni-input-ph-in-layer:where([uni-input])::placeholder { color: blue; } }
}
}
@supports not (color: revert-layer) {
@media (min-width: 768px) {
.uni-input-ph-hint[uni-input]::placeholder { color: red; }
}
}`)
    expect(await css(output)).toBe(output)
  })

  test('原规则和两种占位规则分别保留媒体参数原文', async () => {
    const media = '@media screen /* original */ and (min-width: 768px)'
    const { css: output } = await postcss([
      uniappPlugin(),
      {
        postcssPlugin: 'rewrite-media-comment',
        OnceExit(root) {
          root.walkAtRules('media', (rule) => {
            const parent = rule.parent
            if (
              parent?.type === 'root' ||
              (parent?.type === 'atrule' && parent.name === 'layer')
            ) {
              const params = rule.raws.params!
              params.raw = params.raw.replace(
                'original',
                parent.type === 'root' ? 'business' : 'modern'
              )
            }
          })
        },
      },
    ]).process(`${media} { .hint { color: red } }`, { from: undefined })

    expect(
      output.match(/@media [^{]+/g)?.map((params) => params.trim())
    ).toEqual([
      media.replace('original', 'business'),
      media.replace('original', 'modern'),
      media,
    ])
  })

  test('默认 PostCSS 链仅在生成的现代层移除占位选择器前缀', async () => {
    const { css: output } = await postcss(
      initPostcssPlugin({
        autoprefixer: {
          overrideBrowserslist: ['Chrome 49', 'Firefox 45', 'Safari 15'],
        },
      })
    ).process(
      '.hint { background-clip: text; } .native::placeholder { color: red; }',
      { from: undefined }
    )

    const modern = placeholderRules(output)
    expect(modern.map((rule) => rule.selector)).toEqual([
      '.uni-input-ph-hint:where([uni-input])::placeholder',
    ])
    expect(modern[0].toString()).toContain('-webkit-background-clip: text')
    const legacy = placeholderRules(output, true)
    expect(legacy.map((rule) => rule.selector)).toEqual(
      expect.arrayContaining([
        '.uni-input-ph-hint[uni-input]::-webkit-input-placeholder',
        '.uni-input-ph-hint[uni-input]::-moz-placeholder',
        '.uni-input-ph-hint[uni-input]::placeholder',
      ])
    )
    expect(output).toContain('.native::-webkit-input-placeholder')
    expect(output).toContain('.native::-moz-placeholder')
  })

  test.each(['.hint', '& .hint'])(
    '原生 CSS 嵌套占位类保留祖先和 Input 根上的匹配：%s',
    async (selector) => {
      const source = `.field { ${selector} { color: red; width: 10px; } }`
      const output = await css(source)
      expect(output).toContain(source)
      const [modern] = placeholderRules(output)
      expect(modern?.selectors).toEqual([
        '.field .uni-input-ph-hint:where([uni-input])::placeholder',
        '.uni-input-ph-hint:where([uni-input]):is(.field)::placeholder',
      ])
      const [legacy] = placeholderRules(output, true)
      expect(legacy?.selectors).toEqual([
        '.field .uni-input-ph-hint[uni-input]::placeholder',
        '.uni-input-ph-hint[uni-input].field::placeholder',
      ])
      expect(legacy.toString()).toContain('color: red')
      expect(legacy.toString()).not.toContain('width')
      expect(await css(output)).toBe(output)
    }
  )

  test('原生 CSS 媒体嵌套保留子规则与父选择器直接声明', async () => {
    const source = `.field {
  @media (min-width: 768px) {
    .hint { color: red; }
  }
}
.hint {
  @media (min-width: 768px) {
    font-weight: bold;
  }
}`
    const output = await css(source)
    expect(output).toContain(source)
    for (const legacy of [false, true]) {
      const rules = placeholderRules(output, legacy)
      expect(rules).toHaveLength(2)
      for (const rule of rules) {
        expect(rule.parent).toMatchObject({
          type: 'atrule',
          name: 'media',
          params: '(min-width: 768px)',
        })
      }
      expect(rules[0].selector).toContain('.field .uni-input-ph-hint')
      expect(rules[0].toString()).toContain('color: red')
      expect(rules[1].selector).toContain('.uni-input-ph-hint')
      expect(rules[1].toString()).toContain('font-weight: bold')
    }
  })

  test('原生 CSS 的嵌套声明按原顺序输出，并保留 & 的复合条件', async () => {
    const output = await css(`.hint {
  color: red;
  & { color: blue; }
  color: green;
  &.accent { font-weight: bold; }
}`)
    for (const legacy of [false, true]) {
      const rules = placeholderRules(output, legacy)
      const colors: string[] = []
      for (const rule of rules) {
        rule.walkDecls('color', (decl) => {
          colors.push(decl.value)
        })
      }
      expect(colors).toEqual(['red', 'blue', 'green'])
      const accent = rules.find((rule) =>
        rule.selector.includes('.uni-input-ph-hint.uni-input-ph-accent')
      )
      expect(accent?.toString()).toContain('font-weight: bold')
    }
  })

  test('父选择器列表保留原生 CSS 嵌套的最大权重', async () => {
    const output = await css('#email, .field { & .hint { color: red; } }')
    const [rule] = placeholderRules(output)
    const selector = rule?.selector.replace(/\s/g, '')
    expect(selector).toContain(':is(#email,.field).uni-input-ph-hint')
    const [legacy] = placeholderRules(output, true)
    expect(legacy?.selectors).toEqual([
      '#email .uni-input-ph-hint[uni-input]::placeholder',
      '.field .uni-input-ph-hint[uni-input]::placeholder',
      '.uni-input-ph-hint[uni-input]#email::placeholder',
      '.uni-input-ph-hint[uni-input].field::placeholder',
    ])
  })

  test('嵌套的 & 仅匹配占位类，未匹配的父分支保留权重', async () => {
    const output = await css('#email, .hint { & { color: red; } }')
    expect(
      placeholderRules(output).map((rule) => rule.selector.replace(/\s/g, ''))
    ).toEqual([
      ':is(#email:not(*),.uni-input-ph-hint):where([uni-input])::placeholder',
    ])
  })

  test('page 背景和 CSS 变量保留在页面滚动容器，继续转换 rpx', async () => {
    const output = await css(
      'page { background: red; --color:blue; width:10rpx }'
    )
    const rules = postcss.parse(output).nodes as postcss.Rule[]
    expect(rules.map((rule) => rule.selector)).toEqual(['uni-page-body'])
    expect(output).toContain('background: red; --color:blue')
    expect(output).not.toContain('10rpx')
  })

  test('嵌套规则和组合选择器中的 page 样式也不提升到 body', async () => {
    const output = await css(
      '@media (min-width: 768px) { page[data-v-test], .panel { background-color: var(--page-bg); --page-bg: red } }'
    )
    expect(output).toContain(
      '@media (min-width: 768px) { uni-page-body[data-v-test], .panel { background-color: var(--page-bg); --page-bg: red } }'
    )
    expect(output).toContain('.uni-input-ph-panel[uni-input]::placeholder')
  })

  test.each([
    ['false', 'true'],
    ['true', undefined],
  ] as const)(
    '非蒸汽 Web 保留背景和变量提升：X=%s、DOM2=%s',
    async (x, dom2) => {
      process.env.UNI_APP_X = x
      if (dom2) process.env.UNI_APP_X_DOM2 = dom2
      else delete process.env.UNI_APP_X_DOM2
      expect(await css('page { background: red; --color:blue }')).toBe(
        'uni-page-body { background: red; --color:blue }\nbody { background: red; --color:blue }'
      )
    }
  )

  test.each([
    ['h5', 'true', undefined, 'uni-view'],
    ['h5', 'false', 'true', 'uni-view'],
    ['app', 'true', 'true', 'uni-view'],
    ['app-harmony', 'true', 'true', 'uni-view'],
    ['mp-weixin', 'true', 'true', 'view'],
  ] as const)(
    '不影响平台 %s、X=%s、DOM2=%s',
    async (platform, x, dom2, tag) => {
      process.env.UNI_PLATFORM = platform
      process.env.UNI_APP_X = x
      if (dom2) process.env.UNI_APP_X_DOM2 = dom2
      else delete process.env.UNI_APP_X_DOM2
      expect(await css('view { color:red }')).toBe(`${tag} { color:red }`)
    }
  )

  test('复用项目 DOM2 开关，不依赖派生的 VAPOR 环境变量', async () => {
    delete process.env.UNI_APP_X_VAPOR
    expect(await css('view { color:red }')).toBe(
      'div:where([uni-view]) { color:red }'
    )
    process.env.UNI_APP_X_VAPOR = 'true'
    delete process.env.UNI_APP_X_DOM2
    expect(await css('view { color:red }')).toBe('uni-view { color:red }')
  })

  test('匹配复合 View 根及可切换根，不将 Canvas 认作 View', async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM(
      '<div uni-progress uni-view></div><canvas uni-canvas></canvas><div uni-button uni-view></div><span uni-button uni-text></span>'
    )
    try {
      async function count(tag: string) {
        const result = await css(`${tag} { color:red }`)
        const selector = (postcss.parse(result).first as postcss.Rule).selector
        return dom.window.document.querySelectorAll(selector).length
      }
      expect(await count('view')).toBe(2)
      expect(await count('canvas')).toBe(1)
      expect(await count('progress')).toBe(1)
      expect(await count('button')).toBe(2)
    } finally {
      dom.window.close()
    }
  })
})
