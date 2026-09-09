import postcss from 'postcss'

import uniappPlugin from '../src/postcss/plugins/uniapp'

describe('uniapp postcss plugin on h5', () => {
  const originalEnv = {
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_APP_X: process.env.UNI_APP_X,
    NODE_ENV: process.env.NODE_ENV,
  }

  beforeEach(() => {
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_APP_X = 'false'
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

  test('rewrites page selector and mirrors background declarations to body', async () => {
    const result = await createProcessor().process(
      `page {
  color: red;
  background-color: #f8f8f8;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  color: red;
  background-color: #f8f8f8;
}
body {
  background-color: #f8f8f8;
}`)
    )
  })

  test('copies a css var used by background to body', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: #f8f8f8;
  background-color: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  --page-bg: #f8f8f8;
  background-color: var(--page-bg);
}
body {
  --page-bg: #f8f8f8;
  background-color: var(--page-bg);
}`)
    )
  })

  test('copies multiple css vars used by background to body', async () => {
    const result = await createProcessor().process(
      `page {
  --bg-color: var(--base-color);
  --bg-image: url('/background.png');
  --base-color: #f8f8f8;
  background-color: var(--bg-color);
  background-image: var(--bg-image);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  --bg-color: var(--base-color);
  --bg-image: url('/background.png');
  --base-color: #f8f8f8;
  background-color: var(--bg-color);
  background-image: var(--bg-image);
}
body {
  --bg-color: var(--base-color);
  --bg-image: url('/background.png');
  --base-color: #f8f8f8;
  background-color: var(--bg-color);
  background-image: var(--bg-image);
}`)
    )
  })

  test('copies recursive css var dependencies and skips unrelated vars', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: var(--theme-bg);
  --theme-bg: var(--base-bg);
  --base-bg: #f8f8f8;
  --unused-color: #333;
  color: var(--unused-color);
  background-color: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  --page-bg: var(--theme-bg);
  --theme-bg: var(--base-bg);
  --base-bg: #f8f8f8;
  --unused-color: #333;
  color: var(--unused-color);
  background-color: var(--page-bg);
}
body {
  --page-bg: var(--theme-bg);
  --theme-bg: var(--base-bg);
  --base-bg: #f8f8f8;
  background-color: var(--page-bg);
}`)
    )
  })

  test('copies each css var referenced by a background fallback', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: var(--theme-bg, #f8f8f8);
  background-color: var(--page-bg, #fff);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  --page-bg: var(--theme-bg, #f8f8f8);
  background-color: var(--page-bg, #fff);
}
body {
  --page-bg: var(--theme-bg, #f8f8f8);
  background-color: var(--page-bg, #fff);
}`)
    )
  })

  test('skips undefined css vars referenced by background fallbacks', async () => {
    const result = await createProcessor().process(
      `page {
  background-color: var(--page-bg, #f8f8f8);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  background-color: var(--page-bg, #f8f8f8);
}
body {
  background-color: var(--page-bg, #f8f8f8);
}`)
    )
  })

  test('handles circular css var dependencies without duplicating vars', async () => {
    const result = await createProcessor().process(
      `page {
  --first-bg: var(--second-bg);
  --second-bg: var(--first-bg);
  background: var(--first-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  --first-bg: var(--second-bg);
  --second-bg: var(--first-bg);
  background: var(--first-bg);
}
body {
  --first-bg: var(--second-bg);
  --second-bg: var(--first-bg);
  background: var(--first-bg);
}`)
    )
  })

  test.each([
    'background',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
    'background-attachment',
  ])('copies %s to body', async (property) => {
    const result = await createProcessor().process(
      `page {
  --page-bg: red;
  ${property}: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toContain(
      `body { --page-bg: red; ${property}: var(--page-bg); }`
    )
  })

  test('preserves background declaration priority when copying to body', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: #f8f8f8;
  background-color: var(--page-bg) !important;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toContain(
      'body { --page-bg: #f8f8f8; background-color: var(--page-bg) !important; }'
    )
  })

  test('does not copy comments as declarations', async () => {
    const result = await createProcessor().process(
      `page {
  /* page background */
  --page-bg: #f8f8f8;
  /* background-color: red; */
  background-color: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  /* page background */
  --page-bg: #f8f8f8;
  /* background-color: red; */
  background-color: var(--page-bg);
}
body {
  --page-bg: #f8f8f8;
  background-color: var(--page-bg);
}`)
    )
  })

  test('does not mirror commented out background declarations', async () => {
    const result = await createProcessor().process(
      `page {
  --page-bg: #f8f8f8;
  /* background-color: var(--page-bg); */
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  --page-bg: #f8f8f8;
  /* background-color: var(--page-bg); */
}`)
    )
  })

  test('copies background from a scoped page selector to body', async () => {
    const result = await createProcessor().process(
      `page[data-v-test] {
  --page-bg: #f8f8f8;
  background: var(--page-bg);
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body[data-v-test] {
  --page-bg: #f8f8f8;
  background: var(--page-bg);
}
body {
  --page-bg: #f8f8f8;
  background: var(--page-bg);
}`)
    )
  })

  test('keeps class selectors named page untouched', async () => {
    const result = await createProcessor().process(
      `.page {
  background-color: red;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`.page {
  background-color: red;
}`)
    )
  })

  test('keeps background rules under their parent media query', async () => {
    const result = await createProcessor().process(
      `@media (min-width: 768px) {
  page {
    --page-bg: #f8f8f8;
    background-color: var(--page-bg);
  }
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`@media (min-width: 768px) {
  uni-page-body {
    --page-bg: #f8f8f8;
    background-color: var(--page-bg);
  }
  body {
    --page-bg: #f8f8f8;
    background-color: var(--page-bg);
  }
}`)
    )
  })

  test('preserves body background order for multiple page rules', async () => {
    const result = await createProcessor().process(
      `page {
  background-color: red;
}

page {
  background-color: blue;
}`,
      { from: 'pages/index/index.css', map: false }
    )

    expect(normalizeCss(result.css)).toBe(
      normalizeCss(`uni-page-body {
  background-color: red;
}
body {
  background-color: red;
}
uni-page-body {
  background-color: blue;
}
body {
  background-color: blue;
}`)
    )
  })
})
