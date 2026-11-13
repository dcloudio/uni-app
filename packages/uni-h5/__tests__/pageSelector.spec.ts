import { normalizePageSelector } from '../src/helpers/pageSelector'

test.each([
  ['page', 'uni-page-body'],
  ['page .target', 'uni-page-body .target'],
  ['page > .target', 'uni-page-body > .target'],
  ['  PAGE\t.target', '  uni-page-body\t.target'],
  ['page-other', 'page-other'],
  ['.page', '.page'],
  ['#page', '#page'],
  ['[data-page="page"]', '[data-page="page"]'],
  ['.target page', '.target page'],
  ['uni-page-body', 'uni-page-body'],
])('页面选择器前缀映射：%s', (selector, expected) => {
  expect(normalizePageSelector(selector)).toBe(expected)
})
