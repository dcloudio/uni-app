import {
  INDEPENDENT_ROOT_QUERY,
  getIndependentRoots,
  getIndependentSubPackages,
  hasIndependentRoot,
  initIndependentSubPackages,
  parseIndependentRoot,
  updateIndependentSubPackages,
  withIndependentRoot,
  withoutIndependentRoot,
} from '../src/plugins/independentUtils'

describe('independent root query utils', () => {
  test('adds and parses independent root query', () => {
    const id = withIndependentRoot('/src/utils/foo.ts', 'package-a')

    expect(id).toBe(`/src/utils/foo.ts?${INDEPENDENT_ROOT_QUERY}=package-a`)
    expect(parseIndependentRoot(id)).toBe('package-a')
    expect(hasIndependentRoot(id)).toBe(true)
    expect(withoutIndependentRoot(id)).toBe('/src/utils/foo.ts')
  })

  test('preserves vue sfc query', () => {
    const source = '/src/App.vue?vue&type=script&lang.ts'
    const id = withIndependentRoot(source, 'package-a')

    expect(id).toBe(
      `/src/App.vue?vue&type=script&lang.ts&${INDEPENDENT_ROOT_QUERY}=package-a`
    )
    expect(parseIndependentRoot(id)).toBe('package-a')
    expect(withoutIndependentRoot(id)).toBe(source)
  })

  test('replaces existing independent root query', () => {
    const id = withIndependentRoot(
      `/src/App.vue?vue&type=template&${INDEPENDENT_ROOT_QUERY}=package-a`,
      'package-b'
    )

    expect(id).toBe(
      `/src/App.vue?vue&type=template&${INDEPENDENT_ROOT_QUERY}=package-b`
    )
    expect(parseIndependentRoot(id)).toBe('package-b')
  })

  test('supports slash in root value', () => {
    const id = withIndependentRoot('/src/foo.ts?raw', 'pkg/nested')

    expect(id).toBe(`/src/foo.ts?raw&${INDEPENDENT_ROOT_QUERY}=pkg%2Fnested`)
    expect(parseIndependentRoot(id)).toBe('pkg/nested')
    expect(withoutIndependentRoot(id)).toBe('/src/foo.ts?raw')
  })
})

describe('independent subpackage state', () => {
  test('updates pages when roots are unchanged', () => {
    initIndependentSubPackages([
      {
        root: 'package-a',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])

    const result = updateIndependentSubPackages([
      {
        root: 'package-a',
        pages: ['pages/index/index', 'pages/list/list'],
        independent: true,
      },
    ])

    expect(result.rootsChanged).toBe(false)
    expect(getIndependentRoots().has('package-a')).toBe(true)
    expect(getIndependentSubPackages()).toEqual([
      {
        root: 'package-a',
        pages: ['pages/index/index', 'pages/list/list'],
        independent: true,
      },
    ])
  })

  test('keeps previous pages when roots changed', () => {
    initIndependentSubPackages([
      {
        root: 'package-a',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])

    const result = updateIndependentSubPackages([
      {
        root: 'package-b',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])

    expect(result).toEqual({
      rootsChanged: true,
      initialRoots: 'package-a',
      currentRoots: 'package-b',
    })
    expect(getIndependentSubPackages()).toEqual([
      {
        root: 'package-a',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])
  })
})
