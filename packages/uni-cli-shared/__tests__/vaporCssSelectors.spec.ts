import postcss from 'postcss'
import { compileStyle } from '@vue/compiler-sfc'
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
    ['v-uni-input', 'div:where([uni-input])'],
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
      'div, span, img, .view, #text, my-card, uni-page-body, uni-progress, svg|image { color:red }'
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

  test('page 背景提升与 rpx 转换仍走原流程', async () => {
    const output = await css(
      'page { background: red; --color:blue; width:10rpx }'
    )
    expect(output).toContain('uni-page-body')
    expect(output).toContain('body { background: red; --color:blue }')
    expect(output).not.toContain('10rpx')
  })

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
