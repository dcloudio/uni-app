import { parseVue } from '../src/utils'
import { parseBlockCode } from '../src/configResolved/plugins/preVue'

describe('block', () => {
  test('parseBlockCode', () => {
    const blockCode1 = `<template><view><block></block></view></template>
  <script>
  export default {}
  </script>
  <style></style>
  `
    expect(
      parseBlockCode(parseVue(blockCode1, []), blockCode1)
    ).toMatchSnapshot()
    const blockCode2 = `<template><view><block v-if="a">a</block><block v-else>b</block></view></template>
  <script>
  export default {}
  </script>
  <style></style>
  `
    expect(
      parseBlockCode(parseVue(blockCode2, []), blockCode2)
    ).toMatchSnapshot()
  })
})
