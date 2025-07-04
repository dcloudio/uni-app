import {
  type BasicSourceMapConsumer,
  type IndexedSourceMapConsumer,
  type Position,
  SourceMapConsumer,
} from '../lib/source-map/source-map'
import { getFileContent } from './utils'
export { SourceMapConsumer } from '../lib/source-map/source-map'
// @ts-expect-error
if (__PLATFORM_WEB__) {
  // @ts-expect-error
  if (SourceMapConsumer.initialize) {
    // @ts-expect-error
    SourceMapConsumer.initialize({
      'lib/mappings.wasm':
        'https://unpkg.com/source-map@0.7.3/lib/mappings.wasm',
    })
  }
}

function getSourceMapConsumer(
  content: string
): Promise<BasicSourceMapConsumer | IndexedSourceMapConsumer> {
  return new Promise((resolve, reject) => {
    try {
      if (SourceMapConsumer.with) {
        SourceMapConsumer.with(content, null, (consumer) => {
          resolve(consumer)
        })
      } else {
        // @ts-expect-error
        const consumer = SourceMapConsumer(content)
        resolve(consumer)
      }
    } catch (error) {
      reject()
    }
  })
}
const enum BIAS {
  GREATEST_LOWER_BOUND = 1,
  LEAST_UPPER_BOUND = 2,
}

type SourceMapContent = {
  source: string
  sourcePath: string
  sourceLine: number
  sourceColumn: number
  sourceContent?: string
  fileName?: string
}
export function originalPositionFor(
  sourceMapContent: string,
  position: Position & { bias?: number },
  withSourceContent: boolean = false
) {
  return getSourceMapConsumer(sourceMapContent).then((consumer) => {
    if (position.column === 0) {
      position.bias = BIAS.LEAST_UPPER_BOUND
    }
    // source -> 'uni-app:///node_modules/@sentry/browser/esm/helpers.js'
    const {
      source,
      line: sourceLine,
      column: sourceColumn,
    } = consumer.originalPositionFor(position)
    if (source) {
      const sourcePathSplit = source.split('/')
      const sourcePath = sourcePathSplit.slice(3).join('/')
      const fileName = sourcePathSplit.pop()

      return {
        source,
        sourcePath,
        sourceLine: sourceLine === null ? 0 : sourceLine,
        sourceColumn: sourceColumn === null ? 0 : sourceColumn,
        fileName,
        sourceContent: withSourceContent
          ? consumer.sourceContentFor(source, true) || ''
          : '',
      } as SourceMapContent
    }
  })
}

const sourcemapCatch: Record<string, string | Promise<string>> = {}
export function getSourceMapContent(sourcemapUrl: string) {
  try {
    return sourcemapCatch[sourcemapUrl]
      ? Promise.resolve(sourcemapCatch[sourcemapUrl])
      : (sourcemapCatch[sourcemapUrl] = new Promise((resolve, reject) => {
          try {
            getFileContent(sourcemapUrl).then((content) => {
              resolve((sourcemapCatch[sourcemapUrl] = content))
            })
          } catch (error) {
            resolve((sourcemapCatch[sourcemapUrl] = ''))
          }
        }))
  } catch (error) {
    return Promise.resolve((sourcemapCatch[sourcemapUrl] = ''))
  }
}
