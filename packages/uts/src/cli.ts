import { cac } from 'cac'
import { runBuild, runDev, ToOptions, UtsTarget } from '.'

const cli = cac('uts')

export interface CliOptions {
  target: UtsTarget
  silent: boolean
  sourceMap: boolean
  inlineSourcesContent: boolean
  watch: boolean
  extname: string
}

cli
  .command('<input> [output]')
  .option('-t, --target <target>', '[string] kotlin | swift', {
    default: UtsTarget.KOTLIN,
  })
  .option('-s, --sourceMap [sourceMap]', `[boolean|string] output sourceMap`, {
    default: false,
  })
  .option(
    '-i, --inlineSourcesContent [inlineSourcesContent]',
    `[boolean] inline sources content`,
    {
      default: false,
    }
  )
  .option('-w, --watch', `[boolean] rebuilds when uts have changed on disk`, {
    default: false,
  })
  .option('-e, --extname [extname]', `[string] extname`, {
    default: '.uts',
  })
  .option('--silent', `[boolean] disable log`, {
    default: false,
  })
  .action((input, output, opts: CliOptions) => {
    const toOptions: ToOptions = {
      silent: opts.silent,
      input: {
        dir: input,
        extname: opts.extname,
      },
      output: {
        dir: output,
        sourceMap: opts.sourceMap,
        inlineSourcesContent: opts.inlineSourcesContent,
      },
    }
    return opts.watch
      ? runDev(opts.target, toOptions)
      : runBuild(opts.target, toOptions)
  })

cli.help()
cli.version(require('../package.json').version)
cli.parse()
