import { compile as baseCompile } from '../../../src/plugins/android/uvue/compiler/index'
describe('compiler: v-memo transform', () => {
  function compile(content: string) {
    return baseCompile(`<view>${content}</view>`, {
      mode: 'module',
      prefixIdentifiers: true,
    }).code
  }

  test('on root element', () => {
    expect(
      baseCompile(`<view v-memo="[x]"></view>`, {
        mode: 'module',
        prefixIdentifiers: true,
      }).code
    ).toMatchSnapshot()
  })

  test('on normal element', () => {
    expect(compile(`<view v-memo="[x]"></view>`)).toMatchSnapshot()
  })

  test('on component', () => {
    expect(compile(`<Comp v-memo="[x]"></Comp>`)).toMatchSnapshot()
  })

  test('on v-if', () => {
    expect(
      compile(
        `<view v-if="ok" v-memo="[x]"><text>foo</text>bar</view>
        <Comp v-else v-memo="[x]"></Comp>`
      )
    ).toMatchSnapshot()
  })

  test('on v-for', () => {
    expect(
      compile(
        `<view v-for="{ x, y } in list" :key="x" v-memo="[x, y === z]">
          <text>foobar</text>
        </view>`
      )
    ).toMatchSnapshot()
  })

  test('on template v-for', () => {
    expect(
      compile(
        `<template v-for="{ x, y } in list" :key="x" v-memo="[x, y === z]">
          <text>foobar</text>
        </template>`
      )
    ).toMatchSnapshot()
  })
})
