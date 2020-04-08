#!/usr/bin/env node

const yargsParser = require('yargs-parser')
const argv = yargsParser(process.argv.slice(2))
const action = argv._[0]
if (action === 'custom') {
  require('../lib/commands/custom')(argv)
} else if (action === 'invoke') {
  require('../lib/commands/invoke')(argv)
} else {
  process.exit(0)
}
