module.exports = {
  options: {
    global: 'my',
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
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
    return ['mycomponents']
  }
}
