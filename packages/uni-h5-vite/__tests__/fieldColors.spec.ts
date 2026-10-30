import fs from 'fs'
import os from 'os'
import path from 'path'
import { compileStyle } from '@vue/compiler-sfc'
import {
  buildInCssSet,
  minifyCSS,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'
import { uniCssPlugin } from '../src/plugins/css'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  resolveBuiltIn: (id: string) =>
    require('path').resolve(
      __dirname,
      '../../..',
      id.replace('@dcloudio/', 'packages/')
    ),
  minifyCSS: jest.fn(async (code: string) => code),
}))

function parseStyles(css: string) {
  const result = compileStyle({
    source: css,
    filename: 'field.css',
    id: 'field',
  })
  expect(result.errors).toEqual([])
  return result.rawResult!.root!
}

function expectLayeredSelectionFallback(css: string) {
  const probes: unknown[] = []
  parseStyles(css).walkRules(':where(.uni-field-selection-probe)', (rule) => {
    probes.push(rule)
    expect(rule.parent).toMatchObject({
      type: 'atrule',
      name: 'layer',
      params: 'uni-field-selection',
    })
  })
  expect(probes.length).toBeGreaterThan(0)
}

describe('Web input and textarea default colors', () => {
  const originalEnv = {
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
  }
  let inputDir: string
  let originalStyles: string[]

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'h5-field-colors-'))
    process.env.UNI_INPUT_DIR = inputDir
    delete process.env.UNI_COMPILE_TARGET
    originalStyles = [...buildInCssSet]
    buildInCssSet.clear()
    ;(minifyCSS as jest.Mock).mockClear()
  })
  afterEach(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    })
    buildInCssSet.clear()
    originalStyles.forEach((style) => buildInCssSet.add(style))
    fs.rmSync(inputDir, { recursive: true, force: true })
  })

  test.each(['input', 'textarea'])(
    'adds Web defaults after the shared %s stylesheet, including direct requests',
    (name) => {
      const plugin = uniCssPlugin() as any
      const id = resolveBuiltIn(`@dcloudio/uni-components/style/${name}.css`)
      const base = fs.readFileSync(id, 'utf8')
      for (const query of [
        '',
        '?direct',
        '?direct&t=123',
        '?inline',
        '?transform-only',
      ]) {
        const addWatchFile = jest.fn()
        const result = plugin.transform.call({ addWatchFile }, base, id + query)
        expect(result?.code).toContain('color: #757575')
        expect(result.code).toContain('background-color: #3b3b3b')
        expect(result.code).toContain('prefers-color-scheme: dark')
        expect(result.code).toContain(
          `.uni-${name}-${name}.uni-field-selection[data-uni-selection]::selection`
        )
        expectLayeredSelectionFallback(result.code)
        expect(result.code).toContain(
          'var(--uni-selection-probe-background-color)'
        )
        expect(result.code.startsWith(base)).toBe(true)
        expect(addWatchFile).toHaveBeenCalledWith(
          resolveBuiltIn(`@dcloudio/uni-h5/style/${name}.css`)
        )
      }
    }
  )

  describe.each(['input', 'textarea'])('%s asset imports', (name) => {
    test.each([
      '?raw',
      '?url',
      '?raw&v=123',
      '?url&v=123',
      '?v=123&raw&import',
      '?v=123&url&import',
    ])('does not append CSS to %s JavaScript modules', (query) => {
      const plugin = uniCssPlugin() as any
      const id = resolveBuiltIn(`@dcloudio/uni-components/style/${name}.css`)
      const addWatchFile = jest.fn()
      expect(
        plugin.transform.call(
          { addWatchFile },
          'export default "asset"',
          id + query
        )
      ).toBeUndefined()
      expect(addWatchFile).not.toHaveBeenCalled()
    })
  })

  test.each([false, true])(
    'includes both controls in combined production CSS (extra slash=%s)',
    async (extraSlash) => {
      const plugin = uniCssPlugin() as any
      plugin.configResolved({
        root: inputDir,
        command: 'build',
        base: '/',
        build: { cssCodeSplit: true, assetsDir: 'assets' },
      })
      buildInCssSet.add('@dcloudio/uni-h5/style/framework/base.css')
      for (const name of ['input', 'textarea']) {
        buildInCssSet.add(
          `@dcloudio/uni-components/style/${extraSlash ? '/' : ''}${name}.css`
        )
      }
      const emitFile = jest.fn()
      await plugin.generateBundle.call({ emitFile })
      const css = emitFile.mock.calls[0][0].source as string
      for (const name of ['input', 'textarea']) {
        expect(css).toContain(`.uni-${name}-placeholder {\n  color: #757575;`)
        expect(css).toContain(`div:where([uni-${name}])`)
        expect(css).toContain(
          `.uni-${name}-${name}.uni-field-selection[data-uni-selection]::selection`
        )
      }
      expectLayeredSelectionFallback(css)
      expect(css).toContain('@layer uni-field-selection;')
      expect(css).toContain('var(--uni-selection-probe-background-color)')
      expect(css.match(/background-color: #3b3b3b/g)).toHaveLength(4)
      expect(css).not.toContain('@import')
    }
  )

  test('reserves the fallback layer before application and lazy component styles', () => {
    const css = fs.readFileSync(
      resolveBuiltIn('@dcloudio/uni-h5/style/framework/base.css'),
      'utf8'
    )
    const first = parseStyles(css).nodes.find((node) => node.type !== 'comment')
    expect(first).toMatchObject({
      type: 'atrule',
      name: 'layer',
      params: 'uni-field-selection',
    })
    expect(first).not.toHaveProperty('nodes')
  })

  test.each(['input', 'textarea'])(
    'preserves %s defaults and business colors without :where() or layers',
    (name) => {
      const framework = fs.readFileSync(
        resolveBuiltIn('@dcloudio/uni-h5/style/framework/base.css'),
        'utf8'
      )
      const plugin = uniCssPlugin() as any
      const id = resolveBuiltIn(`@dcloudio/uni-components/style/${name}.css`)
      const component = plugin.transform.call(
        { addWatchFile: jest.fn() },
        fs.readFileSync(id, 'utf8'),
        id
      ).code
      // Business CSS may load before an async component's stylesheet.
      const legacy = parseStyles(`${framework}
        .selected { background-color: rgb(18, 52, 86) }
        .transparent { background-color: transparent }
        @media (prefers-color-scheme: dark) {
          .dark-only { background-color: red }
        }
        ${component}`)
      // Model a browser that ignores cascade layers and :where(), and takes
      // the legacy @supports branch. JSDOM cannot resolve CSS variables, so
      // substitute the sentinel used by resolveSelectionColor.
      legacy.walkAtRules('layer', (rule) => {
        rule.remove()
      })
      legacy.walkAtRules('supports', (rule) => {
        if (rule.params === 'not (background-color: revert-layer)') {
          rule.replaceWith(...rule.nodes!)
        } else {
          rule.remove()
        }
      })
      legacy.walkRules((rule) => {
        if (rule.selector.includes(':where(')) rule.remove()
      })
      const { JSDOM } = jest.requireActual('jsdom')
      const dom = new JSDOM('<style></style><div></div>')
      try {
        const { document } = dom.window
        document.querySelector('style')!.textContent = legacy
          .toString()
          .replace(/var\(--uni-selection-probe-background-color\)/g, '#000000')
        const probe = document.querySelector('div')!
        for (const [className, expected] of [
          ['unmatched', 'rgb(0, 0, 0)'],
          ['dark-only', 'rgb(0, 0, 0)'],
          ['selected', 'rgb(18, 52, 86)'],
          ['transparent', 'transparent'],
        ]) {
          probe.className = 'uni-field-selection-probe ' + className
          expect(dom.window.getComputedStyle(probe).backgroundColor).toBe(
            expected
          )
        }
      } finally {
        dom.window.close()
      }
    }
  )

  test('leaves shared App WebView styles and unrelated H5 styles unchanged', () => {
    const plugin = uniCssPlugin() as any
    for (const name of ['input', 'textarea']) {
      const shared = fs.readFileSync(
        resolveBuiltIn(`@dcloudio/uni-components/style/${name}.css`),
        'utf8'
      )
      expect(shared).not.toContain('#757575')
      expect(shared).not.toContain('#3b3b3b')
      expect(shared).not.toContain('uni-field-selection')
    }
    const id = resolveBuiltIn('@dcloudio/uni-components/style/button.css')
    const css = fs.readFileSync(id, 'utf8')
    expect(
      plugin.transform.call({ addWatchFile: jest.fn() }, css, id)
    ).toBeUndefined()
  })
})
