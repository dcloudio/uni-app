import path from 'path'

import { parse, compileTemplate, compileScript } from '@vue/compiler-sfc'

import { initEasycom, matchEasycom, vueCompilerOptions } from '../src'

const rootDir = path.resolve(__dirname, 'example')
const dirs = [
  path.resolve(__dirname, 'example/components'),
  path.resolve(__dirname, 'example/uni_modules/plugin/components')
]

const template = `<template><test/><test1/><test1/><test2/><some-other-comp/><checkbox-group/><checkbox-group/></template>`
const sfcParseRes = parse(`${template}<script>export default {}</script>`)
const sfcParseResWithSetup = parse(
  `${template}<script setup>import SomeOtherComp from './some-other-comp';import Test from './test';</script>`
)
const id = 'test'
const sfcScriptCompileOptions = { id }
const sfcScriptBlock = compileScript(
  sfcParseRes.descriptor,
  sfcScriptCompileOptions
)
const sfcScriptBlockWithSetup = compileScript(
  sfcParseResWithSetup.descriptor,
  sfcScriptCompileOptions
)

describe('easycom', () => {
  test('initEasycom with dirs', () => {
    expect(initEasycom({ dirs, rootDir })).toEqual([
      {
        pattern: new RegExp('^test$'),
        replacement: '@/components/test/test.vue'
      },
      {
        pattern: new RegExp('^test1$'),
        replacement: '@/components/test1/test1.vue'
      },
      {
        pattern: new RegExp('^test2$'),
        replacement: '@/uni_modules/plugin/components/test2/test2.vue'
      }
    ])
    expect(matchEasycom('test')).toBe('@/components/test/test.vue')
    expect(matchEasycom('test1')).toBe('@/components/test1/test1.vue')
    expect(matchEasycom('test2')).toBe(
      '@/uni_modules/plugin/components/test2/test2.vue'
    )
  })
  test('initEasycom with custom', () => {
    expect(
      initEasycom({ custom: { '^uni-(.*)': '@/components/uni-$1.vue' } })
    ).toEqual([
      {
        pattern: new RegExp('^uni-(.*)'),
        replacement: '@/components/uni-$1.vue'
      }
    ])
    expect(matchEasycom('test')).toBe(false)
    expect(matchEasycom('uni-test1')).toBe('@/components/uni-test1.vue')
  })
  test('initEasycom with dirs and custom', () => {
    expect(
      initEasycom({
        dirs,
        rootDir,
        custom: { '^test$': '@/components/uni-test.vue' }
      })
    ).toEqual([
      {
        pattern: new RegExp('^test$'),
        replacement: '@/components/uni-test.vue'
      },
      {
        pattern: new RegExp('^test1$'),
        replacement: '@/components/test1/test1.vue'
      },
      {
        pattern: new RegExp('^test2$'),
        replacement: '@/uni_modules/plugin/components/test2/test2.vue'
      }
    ])
    expect(matchEasycom('test')).toBe('@/components/uni-test.vue')
  })
  test('render', () => {
    initEasycom({
      dirs,
      rootDir,
      custom: { '^test$': '@/components/uni-test.vue' }
    })
    const { code } = compileTemplate(
      Object.assign(sfcParseRes.descriptor, {
        id,
        compilerOptions: Object.assign(
          {
            bindingMetadata: sfcScriptBlock.bindings
          },
          vueCompilerOptions
        )
      })
    )
    expect(code).toMatch(`  // const _component_test = _resolveComponent("test")
  // const _component_test1 = _resolveComponent("test1")
  // const _component_test2 = _resolveComponent("test2")
  const _component_some_other_comp = _resolveComponent("some-other-comp")
  // const _component_v_uni_checkbox_group = _resolveComponent("v-uni-checkbox-group")`)
    expect(code)
      .toMatch(`import _component_test from '@/components/uni-test.vue'
import _component_test1 from '@/components/test1/test1.vue'
import _component_test2 from '@/uni_modules/plugin/components/test2/test2.vue'
import { CheckboxGroup as _component_v_uni_checkbox_group } from '@dcloudio/uni-h5/dist/uni-h5.esm.js'
import _style_v_uni_checkbox_group from '@dcloudio/uni-h5/style/checkbox-group.css'`)
    expect(code).toMatchSnapshot()
  })
  test('render with setup', () => {
    initEasycom({
      dirs,
      rootDir,
      custom: { '^test$': '@/components/uni-test.vue' }
    })
    const { code } = compileTemplate(
      Object.assign(sfcParseResWithSetup.descriptor, {
        id,
        compilerOptions: Object.assign(
          { bindingMetadata: sfcScriptBlockWithSetup.bindings },
          vueCompilerOptions
        )
      })
    )
    expect(code)
      .toMatch(`  // const _component_test1 = _resolveComponent("test1")
  // const _component_test2 = _resolveComponent("test2")
  // const _component_v_uni_checkbox_group = _resolveComponent("v-uni-checkbox-group")`)
    expect(code).toMatchSnapshot()
  })
})
