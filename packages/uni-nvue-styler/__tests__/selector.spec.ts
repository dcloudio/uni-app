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
