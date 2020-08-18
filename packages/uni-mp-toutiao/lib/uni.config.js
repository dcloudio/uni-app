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
    project: 'project.tt.json'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    return ['ttcomponents']
  }
}
