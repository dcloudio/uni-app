import postcss from 'postcss'
import { normalize, objectifierWithMessages } from '../src'
import { SIMPLE_SELECTOR_RE } from '../src/utils'

describe('nvue-styler: SIMPLE_SELECTOR_RE', () => {
  test('single class selector', () => {
    expect(SIMPLE_SELECTOR_RE.test('.class1')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.foo')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.my-class')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.my_class')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class123')).toBe(true)
  })

  test('chained class selectors', () => {
    expect(SIMPLE_SELECTOR_RE.test('.class1.class2')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.foo.bar')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1.class2.class3')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.a.b.c.d.e')).toBe(true)
  })

  test('comma separated selectors', () => {
    expect(SIMPLE_SELECTOR_RE.test('.class1,.class2')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1, .class2')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1 , .class2')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1,  .class2')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1,.class2,.class3')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1.class2,.class3')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1,.class2.class3')).toBe(true)
    expect(SIMPLE_SELECTOR_RE.test('.class1.class2,.class3.class4')).toBe(true)
  })

  test('should not match combinators', () => {
    // 相邻兄弟选择器
    expect(SIMPLE_SELECTOR_RE.test('.class1 + .class2')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('.class1+.class2')).toBe(false)

    // 通用兄弟选择器
    expect(SIMPLE_SELECTOR_RE.test('.class1 ~ .class2')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('.class1~.class2')).toBe(false)

    // 子选择器
    expect(SIMPLE_SELECTOR_RE.test('.class1 > .class2')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('.class1>.class2')).toBe(false)

    // 后代选择器
    expect(SIMPLE_SELECTOR_RE.test('.class1 .class2')).toBe(false)
  })

  test('should not match pseudo-classes', () => {
    expect(SIMPLE_SELECTOR_RE.test('.class1:hover')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('.class1:active')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('.class1:first-child')).toBe(false)
  })

  test('should not match pseudo-elements', () => {
    expect(SIMPLE_SELECTOR_RE.test('.class1::before')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('.class1::after')).toBe(false)
  })

  test('should not match invalid selectors', () => {
    expect(SIMPLE_SELECTOR_RE.test('class1')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('#id')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('div')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('[attr]')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('*')).toBe(false)
    expect(SIMPLE_SELECTOR_RE.test('')).toBe(false)
  })
})

describe('nvue-styler: DOM2 pseudo selectors', () => {
  test('shares declaration conversion across ordinary and pseudo selectors', () => {
    const visitor = jest.fn((node) => ({ name: node.prop, value: node.value }))
    const { obj, messages } = objectifierWithMessages(
      postcss.parse('.editor, ::selection { opacity: .5 !important; }'),
      {
        trim: false,
        simpleSelectorOnly: true,
        dom2: true,
        parseMessages: [],
        visitor,
      }
    )
    expect(messages).toHaveLength(0)
    expect(visitor).toHaveBeenCalledTimes(1)
    expect(obj).toEqual({
      editor: { '': { '!opacity': '.5' } },
      '': { '::selection': { '!opacity': '.5' } },
    })
  })

  test('keeps existing selector rejection outside DOM2', () => {
    const { obj, messages } = objectifierWithMessages(
      postcss.parse('::selection { opacity: .5; }'),
      { trim: false, simpleSelectorOnly: true, parseMessages: [] }
    )
    expect(obj).toEqual({})
    expect(messages).toHaveLength(1)
  })

  test('preserves pseudo selectors for DOM2 without changing other modes', async () => {
    const css = '::selection { opacity: .5; }'
    const dom2 = await postcss([
      normalize({ dom2: true, type: 'uvue' }),
    ]).process(css, { from: undefined })
    const ordinary = await postcss([normalize({ type: 'uvue' })]).process(css, {
      from: undefined,
    })
    expect(dom2.root.first?.type).toBe('rule')
    expect(dom2.css).toContain('::selection')
    expect(ordinary.root.nodes).toHaveLength(0)
  })

  test('reuses compound class splitting and declaration merging', () => {
    const { obj, messages } = objectifierWithMessages(
      postcss.parse(`
        .editor.active.ready, .editor.active.ready::selection { opacity: .5; }
        .editor.active.ready::selection { opacity: .8 !important; }
        .editor.active.ready::selection { opacity: .2; }
      `),
      { trim: false, simpleSelectorOnly: true, dom2: true, parseMessages: [] }
    )
    expect(messages).toHaveLength(0)
    expect(obj).toEqual({
      editor: {
        '.active.ready': { opacity: '.5' },
        '.active.ready::selection': { '!opacity': '.8' },
      },
    })
  })

  test.each([
    '::selection(foo)',
    '.editor::before',
    '.ed\\69tor::selection',
    '.editor.活跃::selection',
    '.editor ::selection',
    '.parent > .editor::selection',
    '.editor:hover::selection',
    '.editor::selection.active',
  ])('rejects unsupported DOM2 selector %s', (selector) => {
    expect(() =>
      objectifierWithMessages(postcss.parse(`${selector} { opacity: .5; }`), {
        trim: false,
        simpleSelectorOnly: true,
        dom2: true,
        parseMessages: [],
      })
    ).toThrow('Unsupported pseudo-element')
  })

  test('keeps existing pseudo-class conversion outside DOM2', () => {
    const { obj, messages } = objectifierWithMessages(
      postcss.parse('.editor:active { opacity: .5; }'),
      { trim: false, parseMessages: [] }
    )
    expect(messages).toHaveLength(0)
    expect(obj).toEqual({ editor: { '': { 'opacity:active': '.5' } } })
  })
})
