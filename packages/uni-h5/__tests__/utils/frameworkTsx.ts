import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { execFileSync } from 'child_process'
import ts from 'typescript'

export const frameworkRoot = path.resolve(
  __dirname,
  '../../src/framework/components'
)
const requireH5 = createRequire(path.resolve(__dirname, '../../package.json'))
const jsxDir = path.dirname(requireH5.resolve('vue-jsx'))
const babelRequire = createRequire(requireH5.resolve('@vitejs/plugin-vue-jsx'))
const compiler = requireH5.resolve('@vue-jsx/compiler', { paths: [jsxDir] })
export const jsxRuntime = path.join(
  path.dirname(requireH5.resolve('@vue-jsx/runtime', { paths: [jsxDir] })),
  'vapor.js'
)

export function compileFrameworkTsx(file: string, vapor: boolean) {
  if (
    vapor &&
    ['page/pageHead', 'page/pageBody', 'layout/tabBar'].includes(file)
  )
    file += '-vapor'
  return execFileSync(
    process.execPath,
    [
      '-e',
      `
    const fs = require('fs');
    const compiler = require(${JSON.stringify(compiler)});
    const source = fs.readFileSync(0, 'utf8');
    process.stdout.write(${vapor} ? compiler.transform(source, { filename: ${JSON.stringify(
        file + '.tsx'
      )}, vapor: true }).code
      : require(${JSON.stringify(
        babelRequire.resolve('@babel/core')
      )}).transformSync(source, {
        parserOpts:{plugins:['typescript','jsx']}, filename: ${JSON.stringify(
          file + '.tsx'
        )}, babelrc:false, configFile:false,
        plugins:[[require(${JSON.stringify(
          babelRequire.resolve('@vue/babel-plugin-jsx')
        )}), { optimize:true, isCustomElement: tag=>tag.startsWith('uni-') }]]
      }).code);
  `,
    ],
    {
      input: fs.readFileSync(path.join(frameworkRoot, file + '.tsx'), 'utf8'),
      encoding: 'utf8',
    }
  )
}

export function evaluateFramework(code: string, imports: Record<string, any>) {
  const output = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText
  const module = { exports: {} as any }
  new Function('require', 'module', 'exports', output)(
    (id: string) => {
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    module,
    module.exports
  )
  return module.exports
}
