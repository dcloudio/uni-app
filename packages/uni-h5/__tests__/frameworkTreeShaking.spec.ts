import { execFileSync } from 'child_process'
import { createRequire } from 'module'
import path from 'path'
import { compileFrameworkTsx } from './utils/frameworkTsx'

const requireH5 = createRequire(path.resolve(__dirname, '../package.json'))
const esbuild = requireH5.resolve('esbuild', {
  paths: [path.dirname(requireH5.resolve('vite'))],
})
const files = [
  'layout/index-vapor',
  'page/index-vapor',
  'page/pageHead',
  'page/pageBody',
  'layout/tabBar',
]

function bundle(code: string, enabled: boolean, vapor: boolean) {
  return execFileSync(
    process.execPath,
    [
      '-e',
      `
    const fs = require('fs'), esbuild = require(${JSON.stringify(esbuild)});
    const source = fs.readFileSync(0, 'utf8');
    const flags = Object.fromEntries([...new Set(source.match(/__UNI_FEATURE_\\w+__/g))].map(flag => [flag, '${enabled}']));
    (async () => {
      const {code} = await esbuild.transform(source, {loader:'tsx',
        define:{...flags,__X__:'true',__VAPOR__:'${vapor}',__NODE_JS__:'false'}});
      // 与实际发行一致，由 Rollup 裁剪未使用的依赖，再进行压缩。
      const {rollup} = require(${JSON.stringify(requireH5.resolve('rollup'))});
      const build = await rollup({input:'entry',makeAbsoluteExternalsRelative:false,treeshake:{moduleSideEffects:false},
        plugins:[{name:'fixture',resolveId:id=>id==='entry'?id:{id,external:true},load:id=>id==='entry'?code:null}]});
      const {output} = await build.generate({format:'esm'});
      const result = await esbuild.transform(output[0].code,{minify:true,format:'esm'});
      process.stdout.write(result.code);
      await build.close();
    })().catch(error=>{console.error(error);process.exitCode=1});
  `,
    ],
    { input: code, encoding: 'utf8' }
  )
}

describe('框架 TSX 发行功能裁剪', () => {
  test.each([true, false])(
    '关闭开关移除组件依赖，开启时保留（Vapor=%s）',
    (vapor) => {
      for (const file of files) {
        if (!vapor && file.endsWith('index-vapor')) continue
        const code = compileFrameworkTsx(file, vapor)
        const disabled = bundle(code, false, vapor)
        const enabled = bundle(code, true, vapor)
        const dependencies =
          file === 'layout/index-vapor'
            ? ['./tabBar-vapor', 'VaporRouterView', 'KeepAlive']
            : file === 'page/index-vapor'
            ? ['./pageHead-vapor']
            : file === 'page/pageHead'
            ? ['Input as']
            : file === 'page/pageBody'
            ? ['./page-refresh/component.vue']
            : ['uni-tabbar__mid']
        for (const dependency of dependencies) {
          expect(enabled).toContain(dependency)
          // 模板提升的纯调用由实际 Vue runtime 联合摇树处理；此处验证依赖裁剪。
          if (file !== 'layout/tabBar')
            expect(disabled).not.toContain(dependency)
        }
      }
    }
  )

  test('Page 不再直接依赖 dialogPage 列表渲染', () => {
    const code = compileFrameworkTsx('page/index-vapor', true)
    expect(code).not.toContain('createFor')
    expect(code).not.toContain('createDynamicComponent')
    expect(code).toContain('dialogPageRenderer')
  })

  test('Vapor 列表继续生成 createFor，保持按 key 复用', () => {
    for (const file of ['layout/tabBar', 'page/pageHead']) {
      const code = compileFrameworkTsx(file, true)
      expect(code).toContain('createFor')
      expect(code).not.toMatch(
        /(?:visibleList\.value|buttons\.(?:left|right)|getDialogPages\(\))\.map\(/
      )
    }
  })
})
