import {
  INDEPENDENT_MAIN_PREFIX,
  INDEPENDENT_ROOT_PARAM,
  INDEPENDENT_ROOT_QUERY,
  formatIndependentVirtualId,
  getIndependentRootByFilename,
  getIndependentRoots,
  getIndependentSubPackages,
  hasIndependentRoot,
  initIndependentSubPackages,
  isAppPagesJson,
  parseIndependentMainRoot,
  parseIndependentRoot,
  parseIndependentVirtualRoot,
  updateIndependentSubPackages,
  withIndependentRoot,
  withoutIndependentRoot,
} from '../src/plugins/independentUtils'

afterEach(() => {
  initIndependentSubPackages([])
})

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

describe('independent virtual module utils', () => {
  test('formats and parses independent main root', () => {
    const id = formatIndependentVirtualId(
      INDEPENDENT_MAIN_PREFIX,
      'package-a/nested'
    )

    expect(id).toBe(
      `${INDEPENDENT_MAIN_PREFIX}?${INDEPENDENT_ROOT_PARAM}=package-a%2Fnested`
    )
    expect(parseIndependentMainRoot(id)).toBe('package-a/nested')
    expect(parseIndependentVirtualRoot(id, INDEPENDENT_MAIN_PREFIX)).toBe(
      'package-a/nested'
    )
  })
})

describe('independent subpackage state', () => {
  test('matches app pages json with query', () => {
    expect(
      isAppPagesJson('/project/src/pages.json?foo=bar', '/project/src')
    ).toBe(true)
    expect(isAppPagesJson('/project/src/pages.json.ts', '/project/src')).toBe(
      true
    )
    expect(
      isAppPagesJson('/project/src/package-a/pages.json', '/project/src')
    ).toBe(false)
  })

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

  test('normalizes independent roots when updating state', () => {
    initIndependentSubPackages([
      {
        root: '/package-a/',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])

    const result = updateIndependentSubPackages([
      {
        root: 'package-a',
        pages: ['pages/list/list'],
        independent: true,
      },
    ])

    expect(result.rootsChanged).toBe(false)
    expect(getIndependentSubPackages()).toEqual([
      {
        root: 'package-a',
        pages: ['pages/list/list'],
        independent: true,
      },
    ])
  })

  test('matches independent root by project filename', () => {
    initIndependentSubPackages([
      {
        root: '/package-a/',
        pages: ['pages/index/index'],
        independent: true,
      },
      {
        root: 'package-a-extra',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])

    expect(
      getIndependentRootByFilename(
        '/project/src/package-a/components/foo.vue',
        '/project/src'
      )
    ).toBe('package-a')
    expect(
      getIndependentRootByFilename(
        '/project/src/package-a-extra/components/foo.vue',
        '/project/src'
      )
    ).toBe('package-a-extra')
    expect(
      getIndependentRootByFilename(
        '/project/src/components/foo.vue',
        '/project/src'
      )
    ).toBeUndefined()
  })
})
