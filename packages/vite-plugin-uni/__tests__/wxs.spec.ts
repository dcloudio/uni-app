import { parseVue } from '../src/utils'
import { normalizeWxsCode } from '../src/configResolved/plugins/preVue'

describe('wxs', () => {
  test('normalizeWxsCode', () => {
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
      normalizeWxsCode(parseVue(renderjsCode, []), renderjsCode)
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
    expect(normalizeWxsCode(parseVue(wxsCode, []), wxsCode)).toMatchSnapshot()
  })
})
