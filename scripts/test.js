const fs = require('fs')
const path = require('path')
const { parse, bundle, UtsTarget } = require('../packages/uts/dist')
const projectDir = path.resolve(__dirname, '../packages/playground/uts')

const start = Date.now()
parse(
  fs.readFileSync(
    path.resolve(
      projectDir,
      'uni_modules/test-uniplugin/app-android/index.uts'
    ),
    'utf8'
  )
).then((res) => {
  console.log('parse: ' + (Date.now() - start) + 'ms')
  console.log(JSON.stringify(res))
})
function testKotlin() {
  const start = Date.now()
  return bundle(UtsTarget.KOTLIN, {
    input: {
      root: projectDir,
      filename: path.resolve(
        projectDir,
        'uni_modules/test-uniplugin/app-android/index.uts'
      ),
    },
    output: {
      outDir: path.resolve(projectDir, 'unpackage/dist/app'),
      package: 'uts.modules.testUniPlugin',
      imports: ['kotlinx.coroutines.*', 'io.dcloud.uts.runtime.*'],
      sourceMap: true,
      extname: 'kt',
      logFilename: true,
    },
  }).then((res) => {
    console.log('bundle: ' + (Date.now() - start) + 'ms')
    console.log(JSON.stringify(res))
    console.log(
      fs.readFileSync(
        path.resolve(
          projectDir,
          'unpackage/dist/app/uni_modules/test-uniplugin/app-android/index.kt'
        ),
        'utf8'
      )
    )
  })
}

function testSwift() {
  const start = Date.now()
  return bundle(UtsTarget.SWIFT, {
    input: {
      root: projectDir,
      filename: path.resolve(
        projectDir,
        'uni_modules/test-uniplugin/app-ios/index.uts'
      ),
    },
    output: {
      outDir: path.resolve(projectDir, 'unpackage/dist/app'),
      package: 'uts.modules.testUniPlugin',
      sourceMap: true,
      extname: 'swift',
      logFilename: true,
    },
  }).then((res) => {
    console.log('bundle: ' + (Date.now() - start) + 'ms')
    console.log(JSON.stringify(res))
    console.log(
      fs.readFileSync(
        path.resolve(
          projectDir,
          'unpackage/dist/app/uni_modules/test-uniplugin/app-ios/index.swift'
        ),
        'utf8'
      )
    )
  })
}

async function test() {
  await testKotlin()
  await testSwift()
}

test()
