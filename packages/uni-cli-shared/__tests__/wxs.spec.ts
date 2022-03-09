import { parseVue } from '../src/vite'
import { parseWxsCode, parseWxsNodes } from '../src/vue'

describe('wxs', () => {
  test('parseWxsCode', () => {
    const renderjsCode = `<template><view></view><view></view></template>
  <script>
  export default {}
  </script>
  <script lang="renderjs" module="echarts">
  export default{
      mounted(){
          console.log('mounted')
      }
  }
  </script>
  <style>
  .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  </style>
  `
    expect(
      parseWxsCode(parseWxsNodes(parseVue(renderjsCode, [])), renderjsCode)
    ).toMatchSnapshot()
    const wxsCode = `<template><view></view><view></view></template>
    <script>
    export default {}
    </script>
    <script lang="wxs" module="echarts">
    export default{
        mounted(){
            console.log('mounted')
        }
    }
    </script>
    <style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    </style>
    `
    expect(
      parseWxsCode(parseWxsNodes(parseVue(wxsCode, [])), wxsCode)
    ).toMatchSnapshot()
  })
})
