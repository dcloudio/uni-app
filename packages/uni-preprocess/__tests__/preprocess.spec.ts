// import { writeFileSync } from 'node:fs'
// import { resolve } from 'node:path'
import { type SourceMapOptions, preprocess } from '../src/index'

describe('preprocess', () => {
  const sourceMap: SourceMapOptions = {
    includeContent: true,
    hires: true,
    file: 'test',
    source: 'test',
  }

  test('html and js', () => {
    const res = preprocess(
      `<template>
<view>a</view>
<!-- #ifdef B -->
<view>b</view>
  <!-- #ifdef B1 -->
<view>b1</view>
    <!-- #ifdef B11 -->
<view>b11</view>
    <!-- #endif -->
  <!-- #endif -->
  <!-- #ifdef B2 -->
<view>b2</view>
  <!-- #endif -->
<view>b3</view>
<!-- #endif -->
<view>c</view>
<template>
<script>
a
// #ifdef B
b
    // #ifdef B1
b1
        // #ifdef B11
b11
        // #endif
    // #endif
    // #ifdef B2
b2
    // #endif
b3
// #endif
c
</script>
<style>
a
/* #ifdef B */
b
    /* #ifdef B1 */
b1
        /* #ifdef B11 */
b11
        /* #endif */
    /* #endif */
    /* #ifdef B2 */
b2
    /* #endif */
b3
/* #endif */
c
</style>
`,
      {
        context: { B: true, B1: true, B11: true, B2: false },
        sourceMap: sourceMap,
      }
    )
    // 内联sourceMap
    //     writeFileSync(
    //       resolve(__dirname, './test.js'),
    //       `${res.code}
    // //# sourceMappingURL=data:application/json;charset=utf-8;base64,${Buffer.from(
    //         JSON.stringify(res.map)
    //       ).toString('base64')}`
    //     )
    expect(res).toMatchSnapshot()
  })

  describe('html', () => {
    test(`#ifdef match`, () => {
      const res = preprocess(
        `<template>
<view>a</view>
<!-- #ifdef B -->
<view>b</view>
<!-- #endif -->
<view>c</view>
<template>
  `,
        { type: 'html', context: { B: true }, sourceMap: sourceMap }
      )
      expect(res).toMatchSnapshot()
    })
    test(`#ifdef not match`, () => {
      const res = preprocess(
        `<template>
<view>a</view>
<!-- #ifdef B -->
<view>b</view>
<!-- #endif -->
<view>c</view>
<template>
`,
        { type: 'html', context: {}, sourceMap: sourceMap }
      )

      expect(res).toMatchSnapshot()
    })
  })

  describe('js', () => {
    test(`#ifdef match`, () => {
      const res = preprocess(
        `a
// #ifdef B
b
// #endif
c
`,
        { type: 'js', context: { B: true }, sourceMap: sourceMap }
      )
      expect(res).toMatchSnapshot()
    })

    test(`#ifdef match with \\n`, () => {
      const res = preprocess(
        `a
// #ifdef B


b


// #endif
c
`,
        { type: 'js', context: { B: true }, sourceMap: sourceMap }
      )
      expect(res).toMatchSnapshot()
    })

    test(`#ifdef not match`, () => {
      const res = preprocess(
        `a
// #ifdef B
b
// #endif
c
`,
        { type: 'js', context: {}, sourceMap: sourceMap }
      )
      expect(res).toMatchSnapshot()
    })

    test(`#ifndef match`, () => {
      const res = preprocess(
        `a
// #ifndef B
b
// #endif
c
`,
        { type: 'js', context: {}, sourceMap: sourceMap }
      )

      expect(res).toMatchSnapshot()
    })

    test(`#ifndef not match`, () => {
      const res = preprocess(
        `a
// #ifndef B
b
// #endif
c
`,
        { type: 'js', context: { B: true }, sourceMap: sourceMap }
      )
      expect(res).toMatchSnapshot()
    })

    test(`#ifdef nesting match`, () => {
      const res = preprocess(
        `a
// #ifdef B
b
    // #ifdef B1
b1
        // #ifdef B11
b11
        // #endif
    // #endif
    // #ifdef B2
b2
    // #endif
b3
// #endif
c
`,
        {
          type: 'js',
          context: { B: true, B1: true, B11: true, B2: false },
          sourceMap: sourceMap,
        }
      )
      expect(res).toMatchSnapshot()
    })

    test(`Unmatched use of #ifdef/#endif.`, () => {
      expect(() => {
        preprocess(
          `a
  // #ifdef B
  b
  // #endif
  // #endif
  c
  `,
          { type: 'js', context: { B: true }, sourceMap: sourceMap }
        )
      }).toThrowErrorMatchingSnapshot()
    })
  })
})
