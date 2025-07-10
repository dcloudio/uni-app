import { assert } from './testUtils'

describe('label self closing', () => {
  test(`built-in`, () => {
    assert(`<view />`, `_cE(\"view\")`)
    assert(
      `<image src='./logo.png' />`,
      `_cE(\"image\", _uM({ src: _imports_0 }))`
    )
  })
  test(`vue`, () => {
    assert(`<template />`, `_cV(_component_template)`)
    assert(
      `<Teleport to = "#some-id" />`,
      `_cV(Teleport, _uM({ to: \"#some-id\" }))`
    )
  })
})
