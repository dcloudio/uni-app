import { cac } from 'cac'
import { runBuild, runDev, ToOptions } from '..'

const cli = cac('uts')

export interface CliOptions {
  target: 'kotlin' | 'swift'
  sourceMap: boolean
  inlineSourcesContent: boolean
  watch: boolean
  extname: string
}

cli
  .command('<input> [output]')
  .option('-t, --target <target>', '[string] kotlin | swift', {
    default: 'kotlin',
  })
  .option('-s, --sourceMap [sourceMap]', `[boolean] output sourceMap`, {
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
  .action((input, output, opts: CliOptions) => {
    const toOptions: ToOptions = {
      watch: opts.watch,
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
    console.log(opts, toOptions)
    return opts.watch
      ? runDev(opts.target, toOptions)
      : runBuild(opts.target, toOptions)
  })

cli.help()
cli.version(require('../../package.json').version)
cli.parse()
