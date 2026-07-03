import { transformScopedCss } from '../src/mp/style'
import { resetOutput } from '../src/logs'

describe('mp style', () => {
  beforeEach(() => {
    resetOutput('warn')
  })

  afterEach(() => {
    resetOutput('warn')
    jest.restoreAllMocks()
  })

  test('ignores html tag selectors inside comments', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    transformScopedCss(
      '/* p { color: red; }\n span, div { color: blue; } */ .foo[data-v-12345678]{color:red;}'
    )

    expect(warnSpy).not.toHaveBeenCalled()
  })

  test('warns html tag selectors outside comments', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    transformScopedCss('/* p { color: red; } */ .foo, p { color: blue; }')

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('p 标签选择器')
    )
  })
})
