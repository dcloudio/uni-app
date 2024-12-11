const fs = require('fs')
const path = require('path')
const { parse, bundle, UTSTarget } = require('../packages/uts/dist')
const projectDir = path.resolve(__dirname, '../packages/playground/uts')

const outDir = path.resolve(projectDir, 'unpackage/dist/dev/app-plus')
const sourceMap = path.resolve(projectDir, 'unpackage/dist/dev/.sourcemap/app')

const start = Date.now()
parse(
  fs.readFileSync(
    path.resolve(
      projectDir,
      'uni_modules/test-uniplugin/utssdk/app-android/index.uts'
    ),
    'utf8'
  ), {
  noGetterOrSetterProp: false
}
).then((res) => {
  console.log('parse: ' + (Date.now() - start) + 'ms')
  // console.log(JSON.stringify(res))
})

const kotlinImports = [
  'kotlinx.coroutines.CoroutineScope',
  'kotlinx.coroutines.Deferred',
  'kotlinx.coroutines.Dispatchers',
  'io.dcloud.uts.Map',
  'io.dcloud.uts.*',
]
async function testKotlin() {
  const start = Date.now()
  await bundle(UTSTarget.KOTLIN, {
    mode: 'production',
    input: {
      root: projectDir,
      filename: path.resolve(
        projectDir,
        'uni_modules/test-uniplugin/utssdk/app-android/index.uts'
      ),
      paths: {
        'login': './login'
      }
    },
    output: {
      outDir,
      package: 'uts.sdk.modules.testUniPlugin',
      imports: kotlinImports,
      sourceMap,
      extname: 'kt',
      logFilename: true,
      isPlugin: true,
      transform: {
        uniExtApiDefaultNamespace: 'io.dcloud.uts.extapi'
      }
    },
  }).then((res) => {
    console.log('bundle kotlin: ' + (Date.now() - start) + 'ms')
    // console.log(JSON.stringify(res))
    // console.log(
    //   fs.readFileSync(
    //     path.resolve(
    //       projectDir,
    //       'unpackage/dist/dev/app-plus/uni_modules/test-uniplugin/utssdk/app-android/index.kt'
    //     ),
    //     'utf8'
    //   )
    // )
  })
  await bundle(UTSTarget.KOTLIN, {
    input: {
      root: projectDir,
      filename: path.resolve(
        projectDir,
        'utssdk/test-uts/app-android/index.uts'
      ),
    },
    output: {
      outDir,
      package: 'uts.sdk.testUts',
      imports: kotlinImports,
      sourceMap,
      extname: 'kt',
      logFilename: true,
      isPlugin: true,
    },
  })
}


async function testKotlinComponent() {
  const start = Date.now()
  await bundle(UTSTarget.KOTLIN, {
    input: {
      root: projectDir,
      pluginId: 'animation-view',
      filename: path.resolve(
        projectDir,
        'uni_modules/test-component/utssdk/app-android/index.uts'
      ),
      fileContent: `export { default as AnimationViewComponent } from './index.vue'`
    },
    output: {
      outDir,
      package: 'uts.sdk.modules.testComponent',
      imports: kotlinImports,
      sourceMap,
      extname: 'kt',
      logFilename: true,
      isPlugin: true,
    },
  }).then((res) => {
    console.log('bundle kotlin component: ' + (Date.now() - start) + 'ms')
    // console.log(JSON.stringify(res))
    // console.log(
    //   fs.readFileSync(
    //     path.resolve(
    //       projectDir,
    //       'unpackage/dist/dev/app-plus/uni_modules/test-component/utssdk/app-android/index.kt'
    //     ),
    //     'utf8'
    //   )
    // )
  })
}

async function testSwift() {
  const start = Date.now()
  await bundle(UTSTarget.SWIFT, {
    input: {
      root: projectDir,
      filename: path.resolve(
        projectDir,
        'uni_modules/test-uniplugin/utssdk/app-ios/index.uts'
      ),
    },
    output: {
      outDir,
      package: 'UTSSDKModulesTestUniPlugin',
      imports: ['DCloudUTSFoundation'],
      sourceMap,
      extname: 'swift',
      logFilename: true,
      isPlugin: true,
      transform: {
        uniExtApiDefaultNamespace: 'DCloudUTSExtAPI'
      }
    },
  }).then((res) => {
    console.log('bundle swift: ' + (Date.now() - start) + 'ms')
    // console.log(JSON.stringify(res))
    // console.log(
    //   fs.readFileSync(
    //     path.resolve(
    //       projectDir,
    //       'unpackage/dist/dev/app-plus/uni_modules/test-uniplugin/utssdk/app-ios/index.swift'
    //     ),
    //     'utf8'
    //   )
    // )
  })
  await bundle(UTSTarget.SWIFT, {
    input: {
      root: projectDir,
      filename: path.resolve(
        projectDir,
        'utssdk/test-uts/app-ios/index.uts'
      ),
    },
    output: {
      outDir,
      package: 'UTSSDKModulesTestUts',
      imports: ['DCloudUTSFoundation'],
      sourceMap,
      extname: 'swift',
      logFilename: true,
      isPlugin: true,
    },
    })
}

async function testSwiftComponent() {
  const start = Date.now()
  await bundle(UTSTarget.SWIFT, {
    input: {
      root: projectDir,
      pluginId: 'animation-view',
      filename: path.resolve(
        projectDir,
        'uni_modules/test-component/utssdk/app-ios/index.uts'
      ),
      fileContent: `export { default as AnimationViewComponent } from './index.vue'`
    },
    output: {
      outDir,
      package: 'UTSSDKModulesTestComponent',
      imports: ['DCloudUTSFoundation'],
      sourceMap,
      extname: 'swift',
      logFilename: true,
      isPlugin: true,
    },
  }).then((res) => {
    console.log('bundle swift component: ' + (Date.now() - start) + 'ms')
    // console.log(JSON.stringify(res))
    // console.log(
    //   fs.readFileSync(
    //     path.resolve(
    //       projectDir,
    //       'unpackage/dist/dev/app-plus/uni_modules/test-component/utssdk/app-ios/index.swift'
    //     ),
    //     'utf8'
    //   )
    // )
  })
}

async function testArkTS() {
  const start = Date.now()
  await bundle(UTSTarget.ARKTS, {
    input: {
      root: projectDir,
      filename: path.resolve(
        projectDir,
        'uni_modules/test-uniplugin/utssdk/app-ios/index.uts'
      ),
    },
    output: {
      outDir,
      package: '',
      imports: [],
      sourceMap,
      extname: 'ets',
      logFilename: true,
      isPlugin: true,
      transform: {
      }
    },
  }).then((res) => {
    console.log('bundle: ' + (Date.now() - start) + 'ms')
    // console.log(JSON.stringify(res))
    // console.log(
    //   fs.readFileSync(
    //     path.resolve(
    //       projectDir,
    //       'unpackage/dist/dev/app-plus/uni_modules/test-uniplugin/utssdk/app-ios/index.swift'
    //     ),
    //     'utf8'
    //   )
    // )
  })
}

async function test() {
  await testArkTS()
  await testKotlinComponent()
  await testKotlin()
  await testSwiftComponent()
  await testSwift()
}

test()
