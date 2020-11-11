module.exports = {
  options: {
    global: 'my',
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px',
      '--window-left': '0px',
      '--window-right': '0px'
    },
    extnames: {
      style: '.acss',
      template: '.axml',
      filter: '.sjs'
    },
    filterTag: 'sjs',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['mycomponents']
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/mycomponents')
    })
    return copyOptions
  }
}
