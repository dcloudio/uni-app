import fs from 'fs-extra'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import {
  resolveAppRootScrollViewEditRanges,
  resolveAppRootScrollViewEditRangesByCode,
} from '../src/uvue/transforms'

describe('vue transforms', () => {
  let tempDir = ''

  beforeEach(() => {
    tempDir = fs.mkdtempSync(join(tmpdir(), 'uni-uts-v1-vue-'))
  })

  afterEach(() => {
    fs.removeSync(tempDir)
  })

  test('resolveAppRootScrollViewEditRangesByCode 返回 APP 条件编译下根 scroll-view 的修改范围', () => {
    const code = `<template>
<!-- #ifdef APP -->
<scroll-view style="flex: 1">
  <view class="page">hello</view>
</scroll-view>
<!-- #endif -->
</template>`

    expect(
      resolveAppRootScrollViewEditRangesByCode(code, 'pages/index/index.vue')
    ).toEqual([
      {
        start: { line: 2, column: 1 },
        end: { line: 4, column: 3 },
        preserveLineBreaks: true,
        preserveEndIndent: true,
      },
      {
        start: { line: 4, column: 34 },
        end: { line: 6, column: 16 },
        preserveLineBreaks: true,
      },
    ])
  })

  test('resolveAppRootScrollViewEditRangesByCode 不处理带其他属性的 scroll-view', () => {
    const code = `<template>
<!-- #ifdef APP -->
<scroll-view style="flex: 1" scroll-y>
  <view>hello</view>
</scroll-view>
<!-- #endif -->
</template>`

    expect(
      resolveAppRootScrollViewEditRangesByCode(code, 'pages/index/index.vue')
    ).toEqual([])
  })

  test('resolveAppRootScrollViewEditRangesByCode 支持条件编译分别包裹开始和结束标签', () => {
    const code = `<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <view>hello</view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>`

    expect(
      resolveAppRootScrollViewEditRangesByCode(code, 'pages/index/index.vue')
    ).toEqual([
      {
        start: { line: 2, column: 3 },
        end: { line: 4, column: 18 },
        preserveLineBreaks: true,
      },
      {
        start: { line: 6, column: 3 },
        end: { line: 8, column: 18 },
        preserveLineBreaks: true,
      },
    ])
  })

  test('resolveAppRootScrollViewEditRanges 返回变更范围', () => {
    const file = '/pages/index/index.vue'
    const filename = resolve(tempDir, file.slice(1))
    const code = `<template>
<!-- #ifdef APP -->
<scroll-view style="flex:1">
  <view>hello</view>
</scroll-view>
<!-- #endif -->
</template>`
    fs.outputFileSync(filename, code)

    const result = resolveAppRootScrollViewEditRanges([file], tempDir)

    expect(result[file]).toEqual([
      {
        start: { line: 2, column: 1 },
        end: { line: 4, column: 3 },
        preserveLineBreaks: true,
        preserveEndIndent: true,
      },
      {
        start: { line: 4, column: 21 },
        end: { line: 6, column: 16 },
        preserveLineBreaks: true,
      },
    ])
  })

  test('resolveAppRootScrollViewEditRanges 跳过不存在的文件', () => {
    expect(
      resolveAppRootScrollViewEditRanges(['/pages/missing/index.vue'], tempDir)
    ).toEqual({})
  })
})
