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
      template: '.ksml'
    },
    project: 'project.ks.json'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['kscomponents']
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/kscomponents')
    })
    return copyOptions
  }
}
