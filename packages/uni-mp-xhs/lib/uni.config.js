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
      style: '.css',
      template: '.xhsml'
    },
    project: 'project.config.json',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['xhscomponents']
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/xhscomponents')
    })
    return copyOptions
  }
}
