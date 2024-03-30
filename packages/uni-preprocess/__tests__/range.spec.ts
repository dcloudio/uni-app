// import { writeFileSync } from 'node:fs'
// import { resolve } from 'node:path'
import { preprocess } from '../src/index'

describe('preprocess', () => {
  test('isInPreprocessor', () => {
    const code = `
.test {
    color:red
}
// #ifdef B
.test {
    color:blue
}
// #ifdef B1
.test {
    color:yellow
}
// #endif
.test {
    color:black
}
// #endif
.test {
    color:green
}
    `
    const { isInPreprocessor } = preprocess(code, {
      context: { B: true },
    })
    const result: [number, string, boolean][] = []
    for (let i = 0; i < code.length; i++) {
      result.push([i, code[i], isInPreprocessor(i)])
    }
    expect(result).toMatchSnapshot()
  })
})
