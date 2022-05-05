import { cac } from 'cac'
import { toKotlin } from '.'

const cli = cac('uts')

export interface CliOptions {
  target: 'kotlin' | 'swift'
  output: string
  sourcemap: boolean
  watch: boolean
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
  .action((root, opts: CliOptions) => {
    console.log('opts', root, opts)
    if (opts.target === 'kotlin') {
      toKotlin({
        watch: opts.watch,
        input: {
          dir: root,
        },
        output: {
          dir: opts.output,
          sourceMap: opts.sourcemap,
        },
      })
    }
  })

cli.help()
cli.version(require('../../package.json').version)
cli.parse()
