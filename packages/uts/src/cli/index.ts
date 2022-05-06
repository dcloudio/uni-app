import { cac } from 'cac'
import { runBuild, runDev, ToOptions } from './action'

const cli = cac('uts')

export interface CliOptions {
  target: 'kotlin' | 'swift'
  output: string
  sourcemap: boolean
  watch: boolean
  extname: string
}

cli
  .command('<root>')
  .option('-t, --target <target>', '[string] kotlin | swift', {
    default: 'kotlin',
  })
  .option('-o, --output <output>', `[string] output dir path`)
  .option('-s, --sourcemap', `[boolean] output sourcemap`, {
    default: false,
  })
  .option('-w, --watch', `[boolean] rebuilds when uts have changed on disk`, {
    default: false,
  })
  .option('-e, --extname [extname]', `[string] extname`, {
    default: '.uts',
  })
  .action((root, opts: CliOptions) => {
    const toOptions: ToOptions = {
      watch: opts.watch,
      input: {
        dir: root,
        extname: opts.extname,
      },
      output: {
        dir: opts.output,
        sourceMap: opts.sourcemap,
      },
    }
    return opts.watch
      ? runDev(opts.target, toOptions)
      : runBuild(opts.target, toOptions)
  })

cli.help()
cli.version(require('../../package.json').version)
cli.parse()
