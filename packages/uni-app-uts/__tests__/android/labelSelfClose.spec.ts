import { assert } from './testUtils'

describe('label self closing', () => {
  test(`built-in`, () => {
    assert(`<view />`, `createElementVNode(\"view\")`)
    assert(
      `<image src='./logo.png' />`,
      `createElementVNode(\"image\", utsMapOf({ src: _imports_0 }))`
    )
  })
  test(`vue`, () => {
    assert(`<template />`, `createVNode(_component_template)`)
    assert(
      `<Teleport to = "#some-id" />`,
      `createVNode(Teleport, utsMapOf({ to: \"#some-id\" }))`
    )
  })
})
