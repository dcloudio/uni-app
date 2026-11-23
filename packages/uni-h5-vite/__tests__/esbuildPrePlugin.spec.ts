import fs from 'fs'
import os from 'os'
import path from 'path'
import { build } from 'esbuild'
import { PREPROCESS_EXCLUDE } from '@dcloudio/uni-cli-shared'
import { esbuildPrePlugin } from '../src/plugin/esbuild/esbuildPrePlugin'

test('预打包保留 pako 的条件注释和代码，同时处理业务条件编译', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-pako-'))
  try {
    const packageDir = path.join(root, 'node_modules', 'pako')
    fs.mkdirSync(packageDir, { recursive: true })
    fs.writeFileSync(
      path.join(packageDir, 'index.js'),
      `/*#ifdef NO_INIT_GLOBAL_POINTERS
init();
#endif*/
//#ifdef GZIP
module.exports = 42;
//#endif`
    )
    const entry = path.join(root, 'entry.js')
    fs.writeFileSync(
      entry,
      `import pako from 'pako';
// #ifdef UNKNOWN
throw new Error('业务条件编译未生效');
// #endif
module.exports = pako;`
    )

    const result = await build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      format: 'cjs',
      plugins: [esbuildPrePlugin({ exclude: PREPROCESS_EXCLUDE })],
    })
    const module = { exports: undefined }
    new Function('module', result.outputFiles![0].text)(module)
    expect(module.exports).toBe(42)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
