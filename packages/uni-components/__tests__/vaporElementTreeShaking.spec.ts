import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { rollup } from 'rollup'

test.each(['input', 'textarea'])(
  '未使用 %s 时，Element 和共享描述符应一起被裁剪',
  async (name) => {
    const source = fs.readFileSync(
      path.resolve(__dirname, `../src/vue/${name}/element-vapor.ts`),
      'utf8'
    )
    const code = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2015,
        module: ts.ModuleKind.ESNext,
      },
    }).outputText
    // 只导入模块、不使用任何导出，验证顶层描述符读取不会单独留下运行时代码。
    const bundle = await rollup({
      input: 'entry',
      plugins: [
        {
          name: 'element-fixture',
          resolveId: (id) => id,
          load: (id) => {
            if (id === 'entry') return `import 'element'; export const kept = 1`
            if (id === 'element') {
              const type = name === 'input' ? 'Input' : 'Textarea'
              // 框架组件会将类型和初始化函数传给组件工厂；即使组件最终被裁剪，
              // Rollup 也不能据此推断工厂不会修改类原型。
              // Input 已使用原生根，无需安装转发描述符；Textarea 仍保留初始化。
              return `${code}
                export const component = /* @__PURE__ */ globalThis.defineComponent({
                  rootElement: { class: Uni${type}Element },
                  setup: ${
                    name === 'input' ? '() => {}' : 'initTextareaElement'
                  }
                })`
            }
            if (id === '../../helpers/UniElement')
              return 'export class UniElement {}'
            if (id === '../web-vapor-elements')
              return 'export class UniViewElement {}'
          },
        },
      ],
    })
    try {
      const { output } = await bundle.generate({ format: 'es' })
      expect(output[0].code).not.toMatch(
        /Uni\w*Element|getOwnPropertyDescriptor/
      )
      expect(output[0].code).toContain('kept')
    } finally {
      await bundle.close()
    }
  }
)
