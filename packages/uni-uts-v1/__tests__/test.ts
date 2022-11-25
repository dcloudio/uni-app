import { readFileSync } from 'fs'
import { join } from 'path'
import { SourceMapConsumer } from 'source-map'

async function run() {
  const consumer = await new SourceMapConsumer(
    readFileSync(join(__dirname, './examples/sourcemap/demo.swift.map'), 'utf8')
  )
  console.log(
    consumer.originalPositionFor({
      line: 1,
      column: 8,
    })
  )
  console.log(
    consumer.generatedPositionFor({
      source: 'uni_modules/uts-getbatteryinfo/utssdk/app-ios/index.uts',
      line: 1,
      column: 8,
    })
  )
}
run()
