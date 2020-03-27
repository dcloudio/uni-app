module.exports = {
  options: {
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
    },
    extnames: {
      style: '.css',
      template: '.swan',
      filter: '.filter.js'
    },
    filterTag: 'filter',
    project: 'project.swan.json',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    return ['swancomponents']
  }
}
