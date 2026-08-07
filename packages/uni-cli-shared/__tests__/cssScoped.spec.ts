import { addScoped } from '../src/vite/plugins/cssScoped'

describe('css scoped', () => {
  test('add scoped', () => {
    expect(addScoped(`<style></style>`)).toBe(`<style scoped></style>`)
    expect(addScoped(`<style lang="scss"></style>`)).toBe(
      `<style lang="scss" scoped></style>`
    )
    expect(addScoped(`<style  scoped></style>`)).toBe(`<style  scoped></style>`)
    expect(
      addScoped(`<style></style><style scoped></style><style  scoped></style>`)
    ).toBe(
      `<style scoped></style><style scoped></style><style  scoped></style>`
    )
    expect(addScoped(`<style></style><style scoped lang="scss"></style>`)).toBe(
      `<style scoped></style><style scoped lang="scss"></style>`
    )
    expect(
      addScoped(`<template><view>{{ '<style>12</style>' }}</view></template>`)
    ).toBe(`<template><view>{{ '<style>12</style>' }}</view></template>`)
    expect(
      addScoped(
        `<script setup>
const style = '<style>12</style>'
</script>`
      )
    ).toBe(
      `<script setup>
const style = '<style>12</style>'
</script>`
    )
    expect(
      addScoped(
        `<template><view>{{ style }}</view></template>
<script>
const style2 = '<style>12</style>'
</script>
<script setup>
const style = '<style>12</style>'
</script>
<style>
.content {}
</style>
<style lang="scss">
view {}
</style>`
      )
    ).toBe(
      `<template><view>{{ style }}</view></template>
<script>
const style2 = '<style>12</style>'
</script>
<script setup>
const style = '<style>12</style>'
</script>
<style scoped>
.content {}
</style>
<style lang="scss" scoped>
view {}
</style>`
    )
    expect(
      addScoped(
        `<template><view>{{ style }}</view></template>
<script setup>
const style = '<style>12</style>'
</script>
<style>
.content {}
</style>
<style lang="scss">
view {}
</style>`
      )
    ).toBe(
      `<template><view>{{ style }}</view></template>
<script setup>
const style = '<style>12</style>'
</script>
<style scoped>
.content {}
</style>
<style lang="scss" scoped>
view {}
</style>`
    )
    expect(
      addScoped(
        `<template><view>{{ '<style>12</style>' }}</view></template>
<style>
.content {}
</style>`
      )
    ).toBe(
      `<template><view>{{ '<style>12</style>' }}</view></template>
<style scoped>
.content {}
</style>`
    )
    expect(
      addScoped(
        `<template><view>{{ '<style>12</style>' }}</view></template>
<!-- comment -->
<style>
.content {}
</style>`
      )
    ).toBe(
      `<template><view>{{ '<style>12</style>' }}</view></template>
<!-- comment -->
<style scoped>
.content {}
</style>`
    )
    expect(
      addScoped(
        `<template><view>{{ '<style>12</style>' }}</view></template>
<i18n></i18n>
<style>
.content {}
</style>`
      )
    ).toBe(
      `<template><view>{{ '<style>12</style>' }}</view></template>
<i18n></i18n>
<style scoped>
.content {}
</style>`
    )
  })
})
