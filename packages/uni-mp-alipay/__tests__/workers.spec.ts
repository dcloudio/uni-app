import fs from 'fs'
import os from 'os'
import path from 'path'
import { initWorkers, resolveWorkersDir } from '@dcloudio/uni-cli-shared'
import { options } from '../src/compiler/options'

jest.mock('estree-walker', () => ({ walk: jest.fn() }), { virtual: true })

describe('Alipay workers app option', () => {
  const originalAppX = process.env.UNI_APP_X
  const originalInputDir = process.env.UNI_INPUT_DIR

  afterEach(() => {
    initWorkers([], process.env.UNI_INPUT_DIR || '')
    restoreEnv('UNI_APP_X', originalAppX)
    restoreEnv('UNI_INPUT_DIR', originalInputDir)
  })

  test('writes worker entry paths to app json', () => {
    process.env.UNI_APP_X = 'true'
    const inputDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'uni-alipay-workers-')
    )
    process.env.UNI_INPUT_DIR = inputDir

    try {
      fs.writeFileSync(
        path.join(inputDir, 'manifest.json'),
        JSON.stringify({ workers: 'workers' })
      )
      writeWorker(inputDir, 'workers/helloWorkerTask.uts', 'HelloWorkerTask')
      writeWorker(
        inputDir,
        'workers/sendableTransferWorker.uts',
        'SendableTransferWorker'
      )
      writeWorker(
        inputDir,
        'uni_modules/test-workers/workers/request/index.uts',
        'RequestTask'
      )

      initWorkers(resolveWorkersDir(inputDir), inputDir)
      const appJson: Record<string, unknown> = { workers: 'workers' }
      options.json!.formatAppJson!(appJson, {}, {})

      expect(appJson.workers).toEqual([
        'workers/helloWorkerTask.js',
        'workers/sendableTransferWorker.js',
        'workers/uni_modules/test-workers/workers/request/index.js',
      ])
    } finally {
      fs.rmSync(inputDir, { recursive: true, force: true })
    }
  })
})

function writeWorker(inputDir: string, file: string, className: string) {
  const filename = path.join(inputDir, file)
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(
    filename,
    `export class ${className} extends WorkerTaskImpl {}`
  )
}

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    Reflect.deleteProperty(process.env, name)
  } else {
    process.env[name] = value
  }
}
