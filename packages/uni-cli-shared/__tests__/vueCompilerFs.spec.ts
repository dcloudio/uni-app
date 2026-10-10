import fs from 'fs-extra'
import { createVueCompilerFs } from '../src/vue/compilerFs'
import { initPreContext } from '../src/preprocess'

describe('SFC 类型文件读取', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_INPUT_DIR = '/project'
    initPreContext('h5', undefined, 'web', true)
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    jest.restoreAllMocks()
  })

  test.each(['@/props.uts', '/project/props.uts', '/project/props.ts'])(
    '%s 统一解析路径并执行条件编译',
    (file) => {
      const filename = file.replace('@/', '/project/')
      const exists = jest.spyOn(fs, 'existsSync').mockReturnValue(true)
      const read = jest
        .spyOn(fs, 'readFileSync')
        .mockReturnValue(
          '// #ifdef WEB\nexport type Props = { value: string }\n// #endif\n' +
            '// #ifndef WEB\nexport type Props = { value: number }\n// #endif'
        )
      const compilerFs = createVueCompilerFs()

      expect(compilerFs.fileExists(file)).toBe(true)
      expect(exists).toHaveBeenCalledWith(filename)
      expect(compilerFs.readFile(file)).toContain('value: string')
      expect(compilerFs.readFile(file)).not.toContain('value: number')
      expect(read).toHaveBeenCalledWith(filename, 'utf-8')
      expect(compilerFs.realpath!(file)).toBe(filename)
    }
  )
})
