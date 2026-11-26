import fs from 'fs/promises'
import path from 'path'
import { M, output } from '@dcloudio/uni-cli-shared'

export async function publishChangedFiles(
  files: string[],
  snapshotRoot?: string
) {
  if (snapshotRoot && files.length) {
    // Rollup 等待 BUNDLE_END 回调结束才会开始下一轮编译。
    const id = await tryCreateCompileSnapshot(snapshotRoot, files)
    if (id) {
      // HBuilderX 消费成功后清理快照目录。
      return output('log', M['dev.watching.end.snapshot'].replace('{id}', id))
    }
  }
  return output(
    'log',
    M['dev.watching.end.files'].replace('{files}', () => JSON.stringify(files))
  )
}

async function tryCreateCompileSnapshot(snapshotRoot: string, files: string[]) {
  const outputDir = process.env.UNI_OUTPUT_DIR
  let snapshotDir: string | undefined
  try {
    const root = path.resolve(snapshotRoot)
    await fs.mkdir(root, { recursive: true })
    snapshotDir = await fs.mkdtemp(path.join(root, path.sep))
    const snapshotPrefix = snapshotDir + path.sep
    const createdDirs = new Set([snapshotDir])
    const copies: { source: string; target: string }[] = []

    for (const file of new Set(files)) {
      const target = path.resolve(snapshotDir, file)
      if (path.parse(file).root || !target.startsWith(snapshotPrefix)) {
        throw new Error(`Invalid build output file: ${file}`)
      }
      const parent = path.dirname(target)
      if (!createdDirs.has(parent)) {
        await fs.mkdir(parent, { recursive: true })
        createdDirs.add(parent)
      }
      copies.push({ source: path.join(outputDir, file), target })
    }

    // 等所有复制结束后再清理失败的快照，避免仍有文件在写入。
    const results = await Promise.allSettled(
      copies.map(({ source, target }) => fs.copyFile(source, target))
    )
    const failed = results.find((result) => result.status === 'rejected')
    if (failed?.status === 'rejected') {
      throw failed.reason
    }
    return path.basename(snapshotDir)
  } catch {
    if (snapshotDir) {
      try {
        await fs.rm(snapshotDir, { recursive: true, force: true })
      } catch {
        // 清理失败时继续回退到 FILES。
      }
    }
  }
}
