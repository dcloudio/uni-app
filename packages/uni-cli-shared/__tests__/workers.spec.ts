import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import {
  genAlipayWorkerRuntimeImportCode,
  initWorkers,
  normalizeJavaScriptWorkerSource,
  resolveMiniProgramWorkerPaths,
  syncWorkersFiles,
} from '../src/workers'

describe('workers', () => {
  test('initWorkers', () => {
    const workers = initWorkers(
      ['custom-workers', 'uni_modules/test-workers/workers'],
      path.join(__dirname, 'examples', 'workers')
    )
    expect(workers).toEqual({
      'custom-workers/request/index.uts': 'RequestTask',
      'custom-workers/response/index.uts': 'ResponseTask',
      'uni_modules/test-workers/workers/request/index.uts': 'RequestTask',
      'uni_modules/test-workers/workers/response/index.uts': 'ResponseTask',
    })
  })

  test('normalizeJavaScriptWorkerSource keeps worker task scoped to module', () => {
    expect(
      normalizeJavaScriptWorkerSource(
        'export class HelloWorkerTask extends WorkerTaskImpl {\n}'
      )
    ).toContain('class HelloWorkerTask extends WorkerTaskImpl {\n}\nexport {}')
  })

  test('genAlipayWorkerRuntimeImportCode keeps runtime relative', () => {
    expect(
      genAlipayWorkerRuntimeImportCode('workers/index.js', 'workers')
    ).toBe("import './uni-worker.js';")
    expect(
      genAlipayWorkerRuntimeImportCode('workers/request/index.js', 'workers')
    ).toBe("import '../uni-worker.js';")
  })

  test('resolveMiniProgramWorkerPaths maps source files to output files', () => {
    initWorkers(
      ['custom-workers', 'uni_modules/test-workers/workers'],
      path.join(__dirname, 'examples', 'workers')
    )

    expect(resolveMiniProgramWorkerPaths('custom-workers')).toEqual([
      'custom-workers/request/index.js',
      'custom-workers/response/index.js',
      'custom-workers/uni_modules/test-workers/workers/request/index.js',
      'custom-workers/uni_modules/test-workers/workers/response/index.js',
    ])
  })

  test('syncWorkersFiles returns synchronized root files', async () => {
    const inputDir = path.join(__dirname, 'examples', 'workers')
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-workers-'))
    const originalTscDir = process.env.UNI_APP_X_TSC_DIR
    process.env.UNI_APP_X_TSC_DIR = outputDir

    try {
      initWorkers(
        ['custom-workers', 'uni_modules/test-workers/workers'],
        inputDir
      )
      const resolvePreprocessor = jest.fn(
        () => async (content: string) => content
      )
      const rootFiles = await syncWorkersFiles(
        'app-android',
        inputDir,
        async (content) => content,
        {
          workersDirs: ['custom-workers', 'uni_modules/test-workers/workers'],
          resolvePreprocessor,
        }
      )

      expect(resolvePreprocessor).toHaveBeenCalledTimes(2)
      expect(rootFiles.sort()).toEqual(
        [
          'custom-workers/request/index.uts.ts',
          'custom-workers/response/index.uts.ts',
          'uni_modules/test-workers/workers/request/index.uts.ts',
          'uni_modules/test-workers/workers/response/index.uts.ts',
        ]
          .map((file) => path.join(outputDir, 'app-android', file))
          .sort()
      )
    } finally {
      if (originalTscDir === undefined) {
        Reflect.deleteProperty(process.env, 'UNI_APP_X_TSC_DIR')
      } else {
        process.env.UNI_APP_X_TSC_DIR = originalTscDir
      }
      fs.removeSync(outputDir)
    }
  }, 30_000)
})
