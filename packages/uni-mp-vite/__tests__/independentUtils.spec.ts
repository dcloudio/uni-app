import {
  hasIndependentRoot,
  parseIndependentRoot,
  withIndependentRoot,
  withoutIndependentRoot,
} from '../src/plugins/independentUtils'

describe('independent root query utils', () => {
  test('adds and parses independent root query', () => {
    const id = withIndependentRoot('/src/utils/foo.ts', 'package-a')

    expect(id).toBe('/src/utils/foo.ts?uni_mp_independent_root=package-a')
    expect(parseIndependentRoot(id)).toBe('package-a')
    expect(hasIndependentRoot(id)).toBe(true)
    expect(withoutIndependentRoot(id)).toBe('/src/utils/foo.ts')
  })

  test('preserves vue sfc query', () => {
    const source = '/src/App.vue?vue&type=script&lang.ts'
    const id = withIndependentRoot(source, 'package-a')

    expect(id).toBe(
      '/src/App.vue?vue&type=script&lang.ts&uni_mp_independent_root=package-a'
    )
    expect(parseIndependentRoot(id)).toBe('package-a')
    expect(withoutIndependentRoot(id)).toBe(source)
  })

  test('replaces existing independent root query', () => {
    const id = withIndependentRoot(
      '/src/App.vue?vue&type=template&uni_mp_independent_root=package-a',
      'package-b'
    )

    expect(id).toBe(
      '/src/App.vue?vue&type=template&uni_mp_independent_root=package-b'
    )
    expect(parseIndependentRoot(id)).toBe('package-b')
  })

  test('supports slash in root value', () => {
    const id = withIndependentRoot('/src/foo.ts?raw', 'pkg/nested')

    expect(id).toBe('/src/foo.ts?raw&uni_mp_independent_root=pkg%2Fnested')
    expect(parseIndependentRoot(id)).toBe('pkg/nested')
    expect(withoutIndependentRoot(id)).toBe('/src/foo.ts?raw')
  })
})
