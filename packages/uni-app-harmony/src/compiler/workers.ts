import path from 'path'
import {
  getWorkers,
  resolveUTSCompiler,
  uvueOutDir,
} from '@dcloudio/uni-cli-shared'
export async function buildWorkers() {
  const workers = getWorkers()
  if (!Object.keys(workers).length) {
    return
  }
  const rootDir = uvueOutDir('app-harmony')
  const { bundleArkTS, parseUTSSyntaxError } = resolveUTSCompiler()
  for (const workPath in workers) {
    const result = await bundleArkTS({
      isX: true,
      filename: path.resolve(rootDir, workPath),
      rootDir,
      outDir: process.env.UNI_OUTPUT_DIR,
      footer: `new ${workers[workPath]}()`,
    })
    if (result && result.error) {
      throw parseUTSSyntaxError(result.error, process.env.UNI_INPUT_DIR)
    }
  }
}
