import { transformWithEsbuild } from '../src/esbuild'

describe('transformWithEsbuild', () => {
  it('兼容 bigint', async () => {
    expect(transformWithEsbuild).toBeDefined()

    const res = await transformWithEsbuild(
      'const num = 123n;console.log(num)',
      'test.js',
      {
        format: 'iife',
        target: 'es6',
        minify: false,
        banner: {
          js: `"use weex:vue";`,
        },
        bundle: true,
        write: false,
        supported: { bigint: true },
      }
    )

    expect(res.outputFiles?.[0].text).toContain('123n')
  })
})
