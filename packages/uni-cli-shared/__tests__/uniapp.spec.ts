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

  test('moves plain background-color to body selector', async () => {
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
:root {
  background-color: #f8f8f8;
}`)
    )
  })

  test('removes page rules when only background declarations are moved', async () => {
    const result = await createProcessor().process(
      `page {
  background-color: #f8f8f8;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`:root {
  background-color: #f8f8f8
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
:root {
  --other-color: #fff;
  --my-color: #f8f8f8;
  background-color: var(--my-color);
}`)
    )
  })

  test('handles comments inside page rules', async () => {
    const result = await createProcessor().process(
      `page {
  /* comment */
  --page-bg: #f8f8f8;
  background-color: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  /* comment */
}
:root {
  --page-bg: #f8f8f8;
  background-color: var(--page-bg)
}`)
    )
  })

  test('moves css vars when there is no background declaration', async () => {
    const result = await createProcessor().process(
      `page {
  /* comment */
  --page-bg: #f8f8f8;
  color: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  /* comment */
  color: var(--page-bg);
}
:root {
  --page-bg: #f8f8f8;
}`)
    )
  })

  test('ignores commented out background declarations', async () => {
    const result = await createProcessor().process(
      `page {
  --other-color: #fff;
  --my-color: #f8f8f8;
  color: red;
  /* background-color: var(--my-color); */
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: red;
  /* background-color: var(--my-color); */
}
:root {
  --other-color: #fff;
  --my-color: #f8f8f8
}`)
    )
  })

  test('handles background color vars with comments and multiple css vars', async () => {
    const result = await createProcessor().process(
      `page {
  --background-color: #efeff4;
  --text-color: #333333;
  color: var(--text-color);

  /* backgroundColorContent 不支持 theme.json */
  background-color: var(--background-color);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: var(--text-color);
  /* backgroundColorContent 不支持 theme.json */
}
:root {
  --background-color: #efeff4;
  --text-color: #333333;
  background-color: var(--background-color)
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
      normalizeCss(`:root {
  --page-bg: #f8f8f8;
  background: var(--page-bg)
}`)
    )
  })

  test('moves css vars even without background declarations', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: #f8f8f8;
  color: red;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: red;
}
:root {
  --page-bg: #f8f8f8;
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

  test('moves css var declarations used by non-background properties', async () => {
    const result = await createProcessor().process(
      `page {
  --my-color: #fff;
  color: var(--my-color);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`page {
  color: var(--my-color);
}
:root {
  --my-color: #fff;
}`)
    )
  })

  test('removes page rules when all declarations are moved', async () => {
    const result = await createProcessor().process(
      `page {
  --page-padding: 16px;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`:root {
  --page-padding: 16px
}`)
    )
  })

  test('moves background-like css vars', async () => {
    const result = await createProcessor().process(
      `page {
  --background-color: #efeff4;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`:root {
  --background-color: #efeff4
}`)
    )
  })

  test('moves css vars and plain background declarations', async () => {
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
  color: red;
}
:root {
  --background-color: #fff;
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
:root {
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
  :root {
    --page-bg: #f8f8f8;
    background-color: var(--page-bg);
  }
}`)
    )
  })

  test('handles comprehensive mixed selector styles', async () => {
    const mixedSelector = await createProcessor().process(
      `.class1, #testId, page {
  /* shared page styles */
  --page-padding: 16px;
  --page-bg: #f8f8f8;
  --text-color: #333;
  flex: 1;
  padding: var(--page-padding);
  color: var(--text-color);

  /* page background styles */
  background: var(--page-bg);
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}`,
      { from: 'pages/index/index.css', map: false }
    )
    expect(normalizeCss(mixedSelector.css)).toBe(
      normalizeCss(`.class1, #testId {
  /* shared page styles */
  --page-padding: 16px;
  --page-bg: #f8f8f8;
  --text-color: #333;
  flex: 1;
  padding: var(--page-padding);
  color: var(--text-color);

  /* page background styles */
  background: var(--page-bg);
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
page {
  /* shared page styles */
  flex: 1;
  padding: var(--page-padding);
  color: var(--text-color);

  /* page background styles */
}
:root {
  --page-padding: 16px;
  --page-bg: #f8f8f8;
  --text-color: #333;
  background: var(--page-bg);
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}`)
    )

    process.env.UNI_PLATFORM = 'h5'
    const nonTarget = await createProcessor().process(
      `page {
  background-color: #f8f8f8;
}`,
      { from: 'pages/index/index.css', map: false }
    )
    expect(normalizeCss(nonTarget.css)).not.toContain(':root')
    expect(normalizeCss(nonTarget.css)).toContain('uni-page-body')
    expect(normalizeCss(nonTarget.css)).toContain('body')
  })

  test.each([
    ['#testId, page', '#testId'],
    ['page, button', 'button'],
    ['.class1, #testId, page', '.class1, #testId'],
  ])('handles mixed selector list: %s', async (selector, nonPageSelector) => {
    const result = await createProcessor().process(
      `${selector} {
  --page-bg: #f8f8f8;
  color: red;
  background-color: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`${nonPageSelector} {
  --page-bg: #f8f8f8;
  color: red;
  background-color: var(--page-bg);
}
page {
  color: red;
}
:root {
  --page-bg: #f8f8f8;
  background-color: var(--page-bg);
}`)
    )
  })
})
