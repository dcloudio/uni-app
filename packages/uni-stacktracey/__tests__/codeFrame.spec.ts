import fs from 'fs'
import path from 'path'

const {
  SourceMapConsumer,
  generateCodeFrameSourceMapConsumer,
  generateCodeFrameWithSourceMapPath,
} = require('../dist/uni-stacktracey.cjs.js')
import type {
  BasicSourceMapConsumer,
  IndexedSourceMapConsumer,
} from '../lib/source-map'

const warnings = [
  {
    type: 'warning',
    message: "'DATA: String' is deprecated. Deprecated in Java",
    file: 'index.kt',
    line: 27,
    column: 71,
  },
  {
    type: 'warning',
    message:
      'Unnecessary non-null assertion (!!) on a non-null receiver of type onImageCatchOptions',
    file: 'index.kt',
    line: 41,
    column: 25,
  },
  {
    type: 'warning',
    message: "Condition 'cursor == null' is always 'false'",
    file: 'index.kt',
    line: 61,
    column: 13,
  },
  {
    type: 'warning',
    message: "'DATA: String' is deprecated. Deprecated in Java",
    file: 'index.kt',
    line: 63,
    column: 78,
  },
  {
    type: 'warning',
    message: "Variable 'width' initializer is redundant",
    file: 'index.kt',
    line: 69,
    column: 21,
  },
  {
    type: 'warning',
    message: "Variable 'height' initializer is redundant",
    file: 'index.kt',
    line: 70,
    column: 22,
  },
  {
    type: 'warning',
    message:
      'Unnecessary non-null assertion (!!) on a non-null receiver of type onImageCatchOptions',
    file: 'index.kt',
    line: 97,
    column: 47,
  },
  {
    type: 'warning',
    message:
      "'getter for defaultDisplay: Display!' is deprecated. Deprecated in Java",
    file: 'index.kt',
    line: 122,
    column: 44,
  },
  {
    type: 'warning',
    message: "'getRealSize(Point!): Unit' is deprecated. Deprecated in Java",
    file: 'index.kt',
    line: 123,
    column: 24,
  },
  {
    type: 'warning',
    message:
      "'getExternalStorageDirectory(): File!' is deprecated. Deprecated in Java",
    file: 'index.kt',
    line: 152,
    column: 51,
  },
  {
    type: 'warning',
    message:
      "'getExternalStorageDirectory(): File!' is deprecated. Deprecated in Java",
    file: 'index.kt',
    line: 153,
    column: 47,
  },
]

const filename = path.resolve(__dirname, 'index.kt.map')

describe('code-frame', () => {
  let consumer: BasicSourceMapConsumer | IndexedSourceMapConsumer
  async function initConsumer() {
    if (!consumer) {
      consumer = await new SourceMapConsumer(fs.readFileSync(filename, 'utf8'))
    }
    return consumer
  }

  test('generateCodeFrame', async () => {
    const consumer = await initConsumer()
    warnings.forEach((w) => {
      expect(
        generateCodeFrameSourceMapConsumer(consumer, w, {
          sourceRoot: '/Users/fxy/Projects/Gitcode/hello-uts',
        })
      ).toMatchSnapshot()
    })
  })

  test('generateCodeFrameWithSourceMapPath', async () => {
    ;(
      await generateCodeFrameWithSourceMapPath(
        filename,
        JSON.stringify(warnings),
        { sourceRoot: '/Users/fxy/Projects/Gitcode/hello-uts' }
      )
    ).forEach((m: unknown) => {
      expect(m).toMatchSnapshot()
    })
  })
})
