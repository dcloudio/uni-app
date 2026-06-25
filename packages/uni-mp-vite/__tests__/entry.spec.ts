import {
  parseVirtualComponentPath,
  parseVirtualComponentPathInfo,
  parseVirtualPagePath,
  parseVirtualPagePathInfo,
  virtualComponentPath,
  virtualPagePath,
} from '../src/plugins/entry'

describe('entry virtual paths', () => {
  test('keeps legacy page virtual path format', () => {
    const id = virtualPagePath('pages/index/index.vue')

    expect(parseVirtualPagePath(id)).toBe('pages/index/index.vue')
    expect(parseVirtualPagePathInfo(id)).toEqual({
      filepath: 'pages/index/index.vue',
    })
  })

  test('encodes page root metadata', () => {
    const id = virtualPagePath('package-a/pages/index/index.vue', 'package-a')

    expect(parseVirtualPagePath(id)).toBe('package-a/pages/index/index.vue')
    expect(parseVirtualPagePathInfo(id)).toEqual({
      filepath: 'package-a/pages/index/index.vue',
      root: 'package-a',
    })
  })

  test('keeps legacy component virtual path format', () => {
    const id = virtualComponentPath('components/foo.vue')

    expect(parseVirtualComponentPath(id)).toBe('components/foo.vue')
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath: 'components/foo.vue',
    })
  })

  test('encodes component root metadata', () => {
    const id = virtualComponentPath('package-a/components/foo.vue', 'package-a')

    expect(parseVirtualComponentPath(id)).toBe('package-a/components/foo.vue')
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath: 'package-a/components/foo.vue',
      root: 'package-a',
    })
  })
})
