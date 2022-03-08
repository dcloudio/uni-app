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
      style: '.jxss',
      template: '.jxml'
    },
    subPackages: false,
    project: 'project.config.json'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['jdcomponents']
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/jdcomponents')
    })
    return copyOptions
  }
}
