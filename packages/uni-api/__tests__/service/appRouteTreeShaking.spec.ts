import fs from 'fs'
import path from 'path'
import { rollup } from 'rollup'
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript'

async function bundleRoute(entry: string) {
  const bundle = await rollup({
    input: 'entry',
    // 保留真实路由源码，以外部依赖检验未使用的 define API 调用能否被裁剪。
    external: ['@dcloudio/uni-shared', '../../helpers/api'],
    treeshake: { moduleSideEffects: false },
    plugins: [
      {
        name: 'route-source',
        resolveId(id) {
          if (id === 'entry' || id === 'route-runtime') return id
        },
        load(id) {
          if (id === 'entry') return entry
          if (id === 'route-runtime') {
            return transpileModule(
              fs.readFileSync(
                path.resolve(__dirname, '../../src/service/route/appRoute.ts'),
                'utf8'
              ),
              {
                compilerOptions: {
                  module: ModuleKind.ESNext,
                  target: ScriptTarget.ESNext,
                },
              }
            ).outputText
          }
        },
      },
    ],
  })
  try {
    const { output } = await bundle.generate({ format: 'es' })
    return output[0].code
  } finally {
    await bundle.close()
  }
}

describe('app route tree shaking', () => {
  test('内部路由派发不保留公开 API 及其调用封装', async () => {
    const code = await bundleRoute(`
      import { createAppRouteRuntime } from 'route-runtime'
      export const runtime = createAppRouteRuntime()
    `)
    expect(code).toContain('dispatchBeforeAppRoute')
    expect(code).toContain('dispatchAppRoute')
    expect(code).not.toContain('../../helpers/api')
    expect(code).not.toContain('rewriteRoute is only allowed')
  })

  test('路由监听只保留用到的 API', async () => {
    const code = await bundleRoute(`
      export { onAppRoute } from 'route-runtime'
    `)
    expect(code).toContain('defineOnApi')
    expect(code).not.toContain('defineOffApi')
    expect(code).not.toContain('defineAsyncApi')
    expect(code).not.toContain('createAppRouteRuntime')
  })

  test('使用路由重写时保留校验和异步调用封装', async () => {
    const code = await bundleRoute(`
      export { rewriteRoute, createAppRouteRuntime } from 'route-runtime'
    `)
    expect(code).toContain('defineAsyncApi')
    expect(code).toContain('rewriteRoute is only allowed')
    expect(code).toContain('activeBeforeAppRouteContext = context')
    expect(code).not.toContain('defineOnApi')
    expect(code).not.toContain('defineOffApi')
  })
})
