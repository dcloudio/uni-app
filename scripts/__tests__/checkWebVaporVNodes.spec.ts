import { rollup } from 'rollup'
import { checkWebVaporVNodes } from '../checkWebVaporVNodes'

async function build(code: string, format: 'es' | 'cjs', vapor = true) {
  const bundle = await rollup({
    input: 'entry',
    external: ['vue', '@vue/runtime-core', '@vue/runtime-dom', 'other'],
    plugins: [
      {
        name: 'test-entry',
        resolveId: (id) => (id === 'entry' ? id : null),
        load: (id) => (id === 'entry' ? code : null),
      },
      ...(vapor ? [checkWebVaporVNodes()] : []),
    ],
  })
  try {
    return await bundle.generate({ format, entryFileNames: 'uni-h5.js' })
  } finally {
    await bundle.close()
  }
}

describe.each(['es', 'cjs'] as const)('Web Vapor VNode 检测：%s', (format) => {
  test.each([
    `import { h as make } from 'vue'; export const x = make('div')`,
    `import * as Vue from 'vue'; export const x = Vue.createVNode('div')`,
    `import * as Vue from 'vue'; export const x = Vue['createTextVNode']('a')`,
    `import * as Vue from 'vue'; const { createBlock: make } = Vue; export const x = make('div')`,
    `import * as Vue from 'vue'; const runtime = Vue; export const x = runtime.createVNode('div')`,
    `import * as Vue from 'vue'; export function render() { return runtime.h('div') }; const runtime = Vue`,
    `import * as Vue from 'vue'; export function render() { return runtime.createVNode('div') }; const base = Vue; const runtime = base`,
    `const { h: make } = require('vue'); export const x = make('div')`,
    `import { createElementVNode } from '@vue/runtime-core'; export const x = createElementVNode('div')`,
  ])('拒绝 VNode 创建代码：%s', async (code) => {
    await expect(build(code, format)).rejects.toMatchObject({
      plugin: 'uni:check-web-vapor-vnodes',
      message: expect.stringContaining(
        'Web Vapor 框架产物禁止使用 Vue VNode API'
      ),
      loc: expect.objectContaining({
        file: 'uni-h5.js',
        line: expect.any(Number),
      }),
    })
  })

  test.each([
    `import { createVaporApp, createComponent } from 'vue'; export const x = createVaporApp({setup: () => createComponent({})})`,
    `import * as Vue from 'vue'; export const x = Vue.createVaporApp({})`,
    `import { h } from 'other'; export const x = h('div')`,
    `const h = (x) => x; export const x = h('vnode subTree createVNode')`,
    `import * as Vue from 'vue'; export const x = Vue.ref(0); export function f(Vue) { return Vue.h() }`,
    `import { h } from 'vue'; function unused() { return h('div') }; export const x = 1`,
    `var first = second; var second = first; export function render() { return first.h('div') }`,
    `import * as Vue from 'vue'; import * as other from 'other'; let runtime = Vue; runtime = other; export function render() { return runtime.h('div') }`,
  ])('允许 Vapor 或非 Vue 同名代码：%s', async (code) => {
    await expect(build(code, format)).resolves.toBeDefined()
  })

  test('非 Vapor 构建不启用检测', async () => {
    await expect(
      build(`import { h } from 'vue'; export const x = h('div')`, format, false)
    ).resolves.toBeDefined()
  })

  test.each([
    'createElementBlock',
    'createCommentVNode',
    'createStaticVNode',
    'cloneVNode',
    'openBlock',
  ])('检测其他明确的 VNode API：%s', async (name) => {
    await expect(
      build(
        `import { ${name} as fn } from 'vue'; export const x = fn()`,
        format
      )
    ).rejects.toThrow(`Web Vapor 框架产物禁止使用 Vue VNode API：${name}`)
  })
})
