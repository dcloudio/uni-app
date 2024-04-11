import { isSrcImport, isSrcImportVue } from '../src/vite/plugins/sfc'

describe('sfc', () => {
  test(`isSrcImport`, () => {
    expect(isSrcImport(`<template src="./template.html"></template>`)).toBe(
      true
    )
    expect(isSrcImport(`<script src="./template.uts"></script>`)).toBe(true)
    expect(isSrcImport(`<style src="./template.css"></style>`)).toBe(true)

    expect(isSrcImport(`<template src='./template.uvue'></template>`)).toBe(
      true
    )
    expect(isSrcImport(`<script src='./template.uts'></script>`)).toBe(true)
    expect(isSrcImport(`<style src='./template.css'></style>`)).toBe(true)

    expect(isSrcImport(`<template></template>`)).toBe(false)
    expect(
      isSrcImport(`<template></template><script src="./template.vue"></script>`)
    ).toBe(true)

    expect(
      isSrcImport(`<script lang="uts" src='./template.uvue'></script>`)
    ).toBe(true)

    expect(
      isSrcImport(`<style lang="scss" scoped src='./template.uvue'></style>`)
    ).toBe(true)
  })
  test(`isSrcImportVue`, () => {
    expect(isSrcImportVue(`<template src="./template.uvue"></template>`)).toBe(
      true
    )
    expect(isSrcImportVue(`<script src="./template.uvue"></script>`)).toBe(true)
    expect(isSrcImportVue(`<style src="./template.uvue"></style>`)).toBe(true)

    expect(isSrcImportVue(`<template src='./template.uvue'></template>`)).toBe(
      true
    )
    expect(isSrcImportVue(`<script src='./template.uvue'></script>`)).toBe(true)
    expect(isSrcImportVue(`<style src='./template.uvue'></style>`)).toBe(true)

    expect(isSrcImportVue(`<template></template>`)).toBe(false)
    expect(
      isSrcImportVue(
        `<template></template><script src="./template.vue"></script>`
      )
    ).toBe(true)

    expect(
      isSrcImportVue(`<script lang="uts" src='./template.uvue'></script>`)
    ).toBe(true)

    expect(
      isSrcImportVue(`<style lang="scss" scoped src='./template.uvue'></style>`)
    ).toBe(true)
  })
})
