const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const data = fs.readFileSync('./wbox.config.json')
try {
  const content = JSON.parse(data)
  if (Array.isArray(content.pluginPaths) && content.pluginPaths.length) {
    content.pluginPaths.map(folder => {
      const absolutePath = path.resolve(folder)
      exec(`cd ${absolutePath} && npm install`, function(error, stdout, stderr) {
        if(error) {
            console.error('error: ' + error);
            return;
        }
        console.log(`${absolutePath} install完成`);
      })
    })
  } 
} catch(e) {
  throw new Error('check render plugin配置是否正确')
}
