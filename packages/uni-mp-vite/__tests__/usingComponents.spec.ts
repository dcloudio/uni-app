import {
  parseVirtualComponentPathInfo,
  virtualComponentPath,
} from '../src/plugins/entry'
import { withIndependentRoot } from '../src/plugins/independentUtils'
import { dynamicImport } from '../src/plugins/usingComponents'

describe('mp vite usingComponents', () => {
  test('keeps independent root when generating dynamic component imports', () => {
    const code = dynamicImport(
      'ComponentA',
      withIndependentRoot(
        '/project/src/package-a/components/component-a.vue',
        'package-a'
      )
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
