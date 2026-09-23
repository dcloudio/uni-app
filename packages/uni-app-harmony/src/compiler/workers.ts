import path from 'path'
import fs from 'fs'
import {
  getWorkers,
  resolveUTSCompiler,
  uvueOutDir,
} from '@dcloudio/uni-cli-shared'

/**
 * 临时放在此处，其他地方没有这种需求
 * 所有含utssdk的uni_modules都可能是worker的依赖
 */
function resolveAllUniModules(): string[] {
  const inputDir = process.env.UNI_INPUT_DIR
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  return fs
    .readdirSync(uniModulesDir)
    .filter((module) =>
      fs.statSync(path.resolve(uniModulesDir, module, 'utssdk')).isDirectory()
    )
}

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
      footer: `;(new ${workers[workPath]}()).entry()`,
      uni_modules: resolveAllUniModules(),
    })
    if (result && result.error) {
      throw parseUTSSyntaxError(result.error, process.env.UNI_INPUT_DIR)
    }
  }
}
