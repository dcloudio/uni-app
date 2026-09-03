import { IndependentVendorChunk } from '../src/plugin/independentVendorChunk'
import { virtualPagePath } from '../src/plugins/entry'

const inputDir = '/proj/src'
const independentRoots = ['pkg6051indep/']

describe('IndependentVendorChunk.resolve', () => {
  test('only independent subpackage importers go to that vendor', () => {
    expect(
      IndependentVendorChunk.resolve(
        [`${inputDir}/pkg6051indep/class-probe.vue?vue&type=script`],
        inputDir,
        independentRoots
      )
    ).toBe('pkg6051indep/common/vendor')
  })

  test('regular subpackage importers stay on main vendor', () => {
    expect(
      IndependentVendorChunk.resolve(
        [`${inputDir}/pkg6051/class-probe.vue`],
        inputDir,
        independentRoots
      )
    ).toBeUndefined()
  })

  test('shared with main package stays on main vendor', () => {
    expect(
      IndependentVendorChunk.resolve(
        [
          `${inputDir}/pkg6051indep/class-probe.vue`,
          `${inputDir}/pages/index/index.vue`,
        ],
        inputDir,
        independentRoots
      )
    ).toBeUndefined()
  })

  test('shared by two independent subpackages stays on main vendor', () => {
    expect(
      IndependentVendorChunk.resolve(
        [
          `${inputDir}/pkg6051indep/a.vue`,
          `${inputDir}/pkgOther/b.vue`,
        ],
        inputDir,
        ['pkg6051indep/', 'pkgOther/']
      )
    ).toBeUndefined()
  })

  test('virtual page importer resolves into the independent root', () => {
    expect(
      IndependentVendorChunk.resolve(
        [virtualPagePath('pkg6051indep/class-probe.vue')],
        inputDir,
        independentRoots
      )
    ).toBe('pkg6051indep/common/vendor')
  })

  test('empty importers or roots do not move the chunk', () => {
    expect(
      IndependentVendorChunk.resolve(
        [`${inputDir}/pkg6051indep/class-probe.vue`],
        inputDir,
        []
      )
    ).toBeUndefined()
    expect(
      IndependentVendorChunk.resolve([], inputDir, independentRoots)
    ).toBeUndefined()
  })
})
