const fs = require('fs')
const {
  execSync
} = require('child_process')

const message = fs.readFileSync(process.argv[2]).toString('utf8').toLowerCase()
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

if (
  (branch === 'master' || branch === 'alpha') &&
  !message.startsWith('merge') &&
  !message.startsWith('*')
) {
  console.log('You are not allowed to commit directly to master or alpha branch')
  process.exit(1)
}
