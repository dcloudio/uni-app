import { parseFilterNames } from '../src/filter'

describe('filter', () => {
  test(`basic`, () => {
    expect(
      parseFilterNames(
        'wxs',
        `<script src="./wx.wxs" module="swipe" lang="wxs"></script>`
      )[0]
    ).toBe('swipe')
  })
  test(`self close`, () => {
    expect(
      parseFilterNames(
        'wxs',
        `<script src="./wx.wxs" module="swipe" lang="wxs"/>`
      )[0]
    ).toBe('swipe')
  })
  test(`multi filter`, () => {
    expect(
      parseFilterNames(
        'wxs',
        `<script module="swipe1" lang="wxs">
module.exports = { message:'hello' }
</script>
<script src="./wx.wxs" module="swipe2" lang="wxs"/>
`
      )
    ).toMatchObject(['swipe1', 'swipe2'])
  })
  test(`complex`, () => {
    expect(
      parseFilterNames(
        'wxs',
        `<template><view/></template>
<script module="swipe1" lang="wxs">
module.exports = { message:'hello' }
</script>
<script src="./wx.wxs" module="swipe2" lang="wxs"/>
<script src="./renderjs.js" module="swipe3" lang="renderjs"/>
<script setup>
const title = '123'
</script>
`
      )
    ).toMatchObject(['swipe1', 'swipe2'])
  })
})
