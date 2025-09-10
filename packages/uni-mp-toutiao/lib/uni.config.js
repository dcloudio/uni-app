module.exports = {
  options: {
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px',
      '--window-left': '0px',
      '--window-right': '0px'
    },
    extnames: {
      style: '.ttss',
      template: '.ttml'
    },
    subPackages: true,
    project: 'project.tt.json'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['ttcomponents', 'package.json', 'project.private.config.json']
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/ttcomponents')
    })
    copyOptions.push({
      from: path.resolve(process.env.UNI_INPUT_DIR, 'ext.json'),
      transform: content => JSON.stringify(parseJson(content.toString(), true), null, 2)
    })
    return copyOptions
  }
}
