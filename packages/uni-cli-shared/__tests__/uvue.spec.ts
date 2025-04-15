import { replaceScriptLang } from '../src/vite'

describe('uvue', () => {
  test('replaceScriptLang add lang="uts" if no lang attribute', () => {
    const code = `<template></template>
  <script>
  export default {}
  </script>
  <style>
  </style>
  `
    expect(replaceScriptLang('test.vue', code, false)).toMatchSnapshot()
  })
  test('replaceScriptLang replace lang="ts" to lang="uts"', () => {
    const code = `<template></template>
  <script lang="ts">
  export default {}
  </script>
  `
    expect(replaceScriptLang('test.vue', code, false)).toMatchSnapshot()
  })
  test('replaceScriptLang with lang="uts" not change', () => {
    const code = `<template></template>
  <script lang="uts">
  export default {}
  </script>
  `
    expect(replaceScriptLang('test.vue', code, false)).toMatchSnapshot()
  })
})
