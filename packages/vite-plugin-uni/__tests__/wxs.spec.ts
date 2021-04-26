import { normalizeWxsCode } from '../src/configResolved/plugins/preVue'

describe('wxs', () => {
  test('normalizeWxsCode', () => {
    expect(
      normalizeWxsCode(`<template><view></view><view></view></template>
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
      `)
    ).toMatchSnapshot()
    expect(
      normalizeWxsCode(`<template><view></view><view></view></template>
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
        `)
    ).toMatchSnapshot()
  })
})
