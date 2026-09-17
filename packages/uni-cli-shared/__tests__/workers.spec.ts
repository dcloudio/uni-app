import path from 'path'
import {
  genAlipayWorkerRuntimeImportCode,
  initWorkers,
  normalizeJavaScriptWorkerSource,
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
})
