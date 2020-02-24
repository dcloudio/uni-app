const fs = require('fs')
const path = require('path')
const shellExec = require('shell-exec')

const pkgs = fs.readdirSync(path.resolve(__dirname, 'packages')).filter(pkg => pkg.indexOf('.') !== 0)

const version = process.argv[2]
if (!version) {
  throw new Error('必须传入 version')
}

(async function() {
  for (let i = 0; i < pkgs.length; i++) {
    console.log(`npm dist-tag add @dcloudio/${pkgs[i]}@${version} latest`);
    await shellExec(`npm dist-tag add @dcloudio/${pkgs[i]}@${version} latest`)
  }
})();
