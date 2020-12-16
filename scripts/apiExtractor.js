const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

exports.extract = async function extract(target) {
  const pkgDir = path.resolve(`packages/${target}`)

  console.log()
  console.log(
    chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`))
  )

  // build types
  const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

  const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(
    extractorConfigPath
  )
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true
  })
  if (extractorResult.succeeded) {
    console.log(
      chalk.bold(chalk.green(`API Extractor completed successfully.`))
    )
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    )
    process.exitCode = 1
  }

  await fs.remove(`${pkgDir}/dist/packages`)
}
