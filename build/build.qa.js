const fs = require('fs')
const del = require('del')
const path = require('path')
const copy = require('copy')
const rollup = require('rollup')

const genConfig = require('./rollup.config.qa')

const filename = 'vue.' + (process.env.NODE_ENV === 'production' ? 'prod' : 'dev') + '.js'

async function build () {
  const bridgeBundle = await rollup.rollup(genConfig('bridge'))
  const {
    output: bridgeOutput
  } = await bridgeBundle.generate({
    format: 'iife'
  })
  const bridgeCode = bridgeOutput[0].code
  const appBundle = await rollup.rollup(genConfig('app'))
  const {
    output: appOutput
  } = await appBundle.generate({
    format: 'iife',
    banner: `
dsl.onInitApp(function({
    inst,
    context,
    instRequireModule
}) {
    if(!context.quickapp.dock.makeEvaluateBuildScript){
      context.quickapp.dock.makeEvaluateBuildScript = args => args
    }
    const $app_require$ = instRequireModule;
`,
    footer: `
});`
  })
  const appCode = appOutput[0].code
  //   const pageBundle = await rollup.rollup(genConfig('page'))
  //   const {
  //     output: pageOutput
  //   } = await pageBundle.generate({
  //     format: 'iife',
  //     banner: `
  // dsl.onInitPage(function({
  //   $app_require$,
  //   Vue
  // }) {
  // `,
  //     footer: `
  // });`
  //   })
  //   const pageCode = pageOutput[0].code
  const vueCode = fs.readFileSync(path.resolve(__dirname, '../packages/uni-quickapp/assets/' + filename))

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/uni-quickapp/dist/' + filename),
    vueCode + bridgeCode + appCode, {
      encoding: 'utf8'
    }
  )

  if (process.env.NODE_ENV === 'production') { // 命令会执行dev,prod两次,仅prod时执行copy
    const componentsSrc = path.resolve(__dirname, '../src/platforms/quickapp/view/components/**/*')
    const componentsDest = path.resolve(__dirname, '../packages/uni-quickapp/components')

    del.sync([componentsDest])

    copy(componentsSrc, componentsDest, function (err, file) {
      if (err) {
        throw err
      }
    })
  }
}

build()
