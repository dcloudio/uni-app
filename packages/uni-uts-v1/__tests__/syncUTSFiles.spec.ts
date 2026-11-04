import fs from 'fs-extra'
import path from 'path'
import { tmpdir } from 'os'
import { syncUTSFiles } from '../src/uni_modules'

describe('syncUTSFiles', () => {
  let tempDir: string

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(tmpdir(), 'uni-sync-ts-'))
  })

  afterEach(() => {
    fs.removeSync(tempDir)
  })

  test.each([
    ['helper.ts', true, 'helper.ts', true],
    ['helper.uts', true, 'helper.uts.ts', true],
    ['helper.ts', false, 'helper.ts', false],
  ])(
    '%s rename=%s 保持文件名及预处理行为',
    async (filename, rename, outputName, processed) => {
      const inputDir = path.join(tempDir, 'input')
      const outputDir = path.join(tempDir, 'output')
      fs.outputFileSync(path.join(inputDir, filename), 'original')
      const preprocessor = jest.fn(async () => 'processed')

      await syncUTSFiles('**/*', inputDir, outputDir, rename, preprocessor)

      expect(fs.readFileSync(path.join(outputDir, outputName), 'utf8')).toBe(
        processed ? 'processed' : 'original'
      )
      expect(preprocessor).toHaveBeenCalledTimes(processed ? 1 : 0)
      expect(fs.existsSync(path.join(outputDir, 'helper.ts.ts'))).toBe(false)
    }
  )
})
