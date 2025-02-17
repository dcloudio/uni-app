import path from 'path'
import { normalizePath } from '../src/utils'
import { initEasycoms, matchEasycom } from '../src/easycom'

const rootDir = path.resolve(__dirname, 'examples/easycom')

describe('easycom', () => {
  test('initEasycom with dirs', () => {
    expect(
      initEasycoms(rootDir, { platform: 'h5', dirs: [] }).easycoms
    ).toEqual([
      {
        name: 'test3',
        pattern: new RegExp('^test3$'),
        replacement: normalizePath(
          path.resolve(
            rootDir,
            'uni_modules/plugin/customElements/test3/test3.uts'
          )
        ),
      },
      {
        name: 'test',
        pattern: new RegExp('^test$'),
        replacement: normalizePath(
          path.resolve(rootDir, 'components/test/test.vue')
        ),
      },
      {
        name: 'test1',
        pattern: new RegExp('^test1$'),
        replacement: normalizePath(
          path.resolve(rootDir, 'components/test1/test1.vue')
        ),
      },
      {
        name: 'test2',
        pattern: new RegExp('^test2$'),
        replacement: normalizePath(
          path.resolve(rootDir, 'uni_modules/plugin/components/test2/test2.vue')
        ),
      },
      {
        name: '^uni-(.*)',
        pattern: new RegExp('^uni-(.*)'),
        replacement: normalizePath(
          path.resolve(rootDir, 'components/uni-$1.vue')
        ),
      },
    ])
    expect(matchEasycom('test')).toBe(
      normalizePath(path.resolve(rootDir, 'components/test/test.vue'))
    )
    expect(matchEasycom('test1')).toBe(
      normalizePath(path.resolve(rootDir, 'components/test1/test1.vue'))
    )
    expect(matchEasycom('test2')).toBe(
      normalizePath(
        path.resolve(rootDir, 'uni_modules/plugin/components/test2/test2.vue')
      )
    )
    expect(matchEasycom('uni-test1')).toBe(
      normalizePath(path.resolve(rootDir, 'components/uni-test1.vue'))
    )
  })
})
