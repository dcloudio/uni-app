const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const { rollup } = require('rollup')
const rpt2 = require('rollup-plugin-typescript2')
const ts = require('typescript')
const { createBuildTypeScriptPlugin } = require('../buildTypeScript')

test('真实 rpt2 多入口、冷/热及部分缓存命中与原编译器输出和检查行为一致', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), '构建 [集成](test)-'))
  const write = (name, text) =>
    fs.outputFileSync(path.join(directory, name), text)
  try {
    write('src/runtime/flags.ts', 'export const enum Flags { On = 1 }')
    write('src/global.d.ts', 'declare const enum GlobalFlags { On = 2 }')
    write('src/extra.ts', 'export const extra: number = 4')
    write('src/compiler/error.ts', 'export const invalid: string = 123')
    write(
      'src/runtime/first.ts',
      "import { Flags } from './flags'; import { extra } from 'alias'; export const first = Flags.On + GlobalFlags.On + extra"
    )
    write('src/runtime/second.ts', 'export const second = GlobalFlags.On')
    fs.outputJsonSync(path.join(directory, 'tsconfig.json'), {
      compilerOptions: {
        target: 'es2015',
        module: 'esnext',
        moduleResolution: 'node',
        types: [],
        skipLibCheck: true,
        sourceMap: true,
        baseUrl: '.',
        paths: { alias: ['src/extra.ts'] },
      },
      include: ['src'],
    })

    async function build(optimized, check = false) {
      const create = optimized
        ? createBuildTypeScriptPlugin(rpt2, ts)
        : (options) => rpt2(options)
      // 预先创建全部入口插件，覆盖 rpt2 共享编译器实例的真实行为。
      const configs = ['first', 'second'].map((name) => {
        const input = path.join(directory, `src/runtime/${name}.ts`)
        return {
          input,
          plugins: [
            create(
              {
                cwd: directory,
                check,
                tsconfig: path.join(directory, 'tsconfig.json'),
                tsconfigOverride: { compilerOptions: { declaration: false } },
                cacheRoot: path.join(directory, optimized ? 'scoped' : 'full'),
              },
              input,
              false,
              ['src/runtime', 'src/**/*.d.ts']
            ),
          ],
        }
      })
      const outputs = []
      for (const config of configs) {
        const bundle = await rollup(config)
        try {
          const { output } = await bundle.generate({
            format: 'es',
            sourcemap: true,
          })
          outputs.push(
            output.map(({ code, map }) => [code, map && map.toString()])
          )
        } finally {
          await bundle.close()
        }
      }
      return outputs
    }

    const baseline = await build(false)
    expect(await build(true)).toEqual(baseline)
    expect(await build(true)).toEqual(baseline)
    // 修改一个入口，另一个入口继续命中磁盘缓存。
    write(
      'src/runtime/first.ts',
      "import { Flags } from './flags'; import { extra } from 'alias'; export const first = Flags.On + GlobalFlags.On + extra + 8"
    )
    const changed = await build(false)
    expect(changed).not.toEqual(baseline)
    expect(await build(true)).toEqual(changed)
    // rpt2 原本只检查参与转译的文件，不遍历所有 tsconfig 根文件。
    expect(await build(true, true)).toEqual(await build(false, true))
    write('src/runtime/first.ts', 'export const invalid: string = 123')
    await expect(build(false, true)).rejects.toThrow(/not assignable/)
    await expect(build(true, true)).rejects.toThrow(/not assignable/)
  } finally {
    fs.removeSync(directory)
  }
}, 30000)
