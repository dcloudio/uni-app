import { addScoped, uniCssScopedPlugin } from '../src/vite/plugins/cssScoped'
import { normalizeUniAppXVaporEnv } from '../src/hbx/alias'

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

  test('Web Vapor 未配置隔离版本时，App 热更新仍应保留 scoped', async () => {
    const env = {
      UNI_APP_X: process.env.UNI_APP_X,
      UNI_APP_X_VAPOR: process.env.UNI_APP_X_VAPOR,
      UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
      UNI_APP_X_VAPOR_BUILD: process.env.UNI_APP_X_VAPOR_BUILD,
      UNI_PLATFORM: process.env.UNI_PLATFORM,
      UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
      UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
      UNI_APP_STYLE_ISOLATION_VERSION:
        process.env.UNI_APP_STYLE_ISOLATION_VERSION,
    }
    try {
      Object.assign(process.env, {
        UNI_APP_X: 'true',
        UNI_APP_X_VAPOR: 'true',
        UNI_APP_X_DOM2: 'true',
        UNI_APP_X_VAPOR_BUILD: 'true',
        UNI_PLATFORM: 'h5',
        UNI_UTS_PLATFORM: 'web',
        UNI_INPUT_DIR: '/web-vapor-scope-test',
      })
      delete process.env.UNI_APP_STYLE_ISOLATION_VERSION
      normalizeUniAppXVaporEnv()
      const plugin = uniCssScopedPlugin({ filter: () => true })
      const source =
        '<script setup></script><style>.sample { color: red }</style>'
      const ctx = {
        file: '/web-vapor-scope-test/App.vue',
        read: async () => source,
      }
      // 初次转换与热更新必须采用同一隔离规则。
      expect((plugin.transform as Function)(source, ctx.file).code).toContain(
        '<style scoped>'
      )
      ;(plugin.handleHotUpdate as Function)(ctx)
      expect(await ctx.read()).toContain('<style scoped>')
    } finally {
      for (const [key, value] of Object.entries(env)) {
        if (value === undefined) delete process.env[key]
        else process.env[key] = value
      }
    }
  })
})
