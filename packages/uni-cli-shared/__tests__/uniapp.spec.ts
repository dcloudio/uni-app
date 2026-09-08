import postcss from 'postcss'

import uniappPlugin from '../src/postcss/plugins/uniapp'

describe('uniapp postcss plugin', () => {
  const originalEnv = {
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_APP_X: process.env.UNI_APP_X,
    NODE_ENV: process.env.NODE_ENV,
  }

  beforeEach(() => {
    process.env.UNI_PLATFORM = 'mp-alipay'
    process.env.UNI_APP_X = 'true'
    process.env.NODE_ENV = 'development'
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
  })

  const normalizeCss = (css: string) => css.replace(/\s+/g, ' ').trim()
  const createProcessor = () => postcss([uniappPlugin()])

  test('moves plain background-color from page to body selector', async () => {
    const result = await createProcessor().process(
      `page {
  color: red;
  background-color: #f8f8f8;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: red;
}
:root > :is(body) {
  background-color: #f8f8f8;
}`)
    )
  })

  test('mirrors page background declarations to body selector', async () => {
    const result = await createProcessor().process(
      `page {
  --other-color: #fff;
  --my-color: #f8f8f8;
  color: red;
  background-color: var(--my-color);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: red;
}
:root > :is(body) {
  --other-color: #fff;
  --my-color: #f8f8f8;
  background-color: var(--my-color);
}`)
    )
  })

  test('handles scoped-like page selectors', async () => {
    const result = await createProcessor().process(
      `page.data-v-4e8ee40a {
  --page-bg: #f8f8f8;
  background: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page.data-v-4e8ee40a {
}
:root > :is(body) {
  --page-bg: #f8f8f8;
  background: var(--page-bg)
}`)
    )
  })

  test('keeps page rules without background untouched', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: #f8f8f8;
  color: red;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  --page-bg: #f8f8f8;
  color: red;
}`)
    )
  })

  test('keeps page rules with color var untouched', async () => {
    const result = await createProcessor().process(
      `page {
  color: red;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: red;
}`)
    )
  })

  test('keeps page rules with css var declaration and color var untouched', async () => {
    const result = await createProcessor().process(
      `page {
  --my-color: #fff;
  color: var(--my-color);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  --my-color: #fff;
  color: var(--my-color);
}`)
    )
  })

  test('keeps page rules with only css var declarations untouched', async () => {
    const result = await createProcessor().process(
      `page {
  --page-padding: 16px;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  --page-padding: 16px;
}`)
    )
  })

  test('keeps page rules with background-like css vars untouched', async () => {
    const result = await createProcessor().process(
      `page {
  --background-color: #efeff4;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  --background-color: #efeff4;
}`)
    )
  })

  test('keeps css vars on page for plain background declarations', async () => {
    const result = await createProcessor().process(
      `page {
  --background-color: #fff;
  color: red;
  background-color: #f8f8f4;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  --background-color: #fff;
  color: red;
}
:root > :is(body) {
  background-color: #f8f8f4;
}`)
    )
  })

  test('keeps class selectors named page untouched', async () => {
    const result = await createProcessor().process(
      `.page {
  flex: 1;
  padding: 12px;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`.page {
  flex: 1;
  padding: 12px;
}`)
    )
  })

  test('keeps class selectors named page with background untouched', async () => {
    const result = await createProcessor().process(
      `.page {
  flex: 1;
  padding: 12px;
  background-color: red;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`.page {
  flex: 1;
  padding: 12px;
  background-color: red;
}`)
    )
  })

  test('moves background shorthand and background-* declarations together', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: #f8f8f8;
  color: red;
  background: var(--page-bg);
  background-position: center;
  background-repeat: no-repeat;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: red;
}
:root > :is(body) {
  --page-bg: #f8f8f8;
  background: var(--page-bg);
  background-position: center;
  background-repeat: no-repeat;
}`)
    )
  })

  test('processes nested media rules', async () => {
    const result = await createProcessor().process(
      `@media (min-width: 768px) {
  page {
    --page-bg: #f8f8f8;
    color: red;
    background-color: var(--page-bg);
  }
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`@media (min-width: 768px) {
  page {
    color: red;
  }
  :root > :is(body) {
    --page-bg: #f8f8f8;
    background-color: var(--page-bg);
  }
}`)
    )
  })

  test('skips mixed selectors and non target platform', async () => {
    const mixedSelector = await createProcessor().process(
      `page, .foo {
  background-color: #f8f8f8;
}`,
      { from: 'pages/index/index.css', map: false }
    )
    expect(normalizeCss(mixedSelector.css)).toBe(
      normalizeCss(`page, .foo {
  background-color: #f8f8f8;
}`)
    )

    process.env.UNI_PLATFORM = 'h5'
    const nonTarget = await createProcessor().process(
      `page {
  background-color: #f8f8f8;
}`,
      { from: 'pages/index/index.css', map: false }
    )
    expect(normalizeCss(nonTarget.css)).not.toContain(':root > :is(body)')
    expect(normalizeCss(nonTarget.css)).toContain('uni-page-body')
    expect(normalizeCss(nonTarget.css)).toContain('body')
  })
})
