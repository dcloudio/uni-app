const fs = require('fs')
const path = require('path')
const shellExec = require('shell-exec')

const pkgs = fs.readdirSync(path.resolve(__dirname, 'packages'))

const version = process.argv[2]
if (!version) {
  throw new Error('必须传入 version')
}

(async function() {
  for (let i = 0; i < pkgs.length; i++) {
    console.log(`npm unpublish @dcloudio/${pkgs[i]}@${version}`);
    await shellExec(`npm unpublish @dcloudio/${pkgs[i]}@${version}`)
  }
})();
