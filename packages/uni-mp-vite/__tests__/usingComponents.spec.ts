import {
  parseVirtualComponentPathInfo,
  virtualComponentPath,
} from '../src/plugins/entry'
import { dynamicImport } from '../src/plugins/usingComponents'

describe('mp vite usingComponents', () => {
  test('keeps independent root when generating dynamic component imports', () => {
    const code = dynamicImport(
      'ComponentA',
      '/project/src/package-a/components/component-a.vue?uni_mp_independent_root=package-a'
    )
    const [, id] = code.match(/import\('(.+)'\)/)!

    expect(id).toBe(
      virtualComponentPath(
        '/project/src/package-a/components/component-a.vue',
        'package-a'
      )
    )
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath: '/project/src/package-a/components/component-a.vue',
      root: 'package-a',
    })
  })
})
