/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (process.platform === 'win32' && process.env.CI === 'true' && browser.name === 'chrome') {
      // 仅在 Windows CI 禁用 Chrome GPU 加速，并记录实际启动配置。
      if (!launchOptions.args.includes('--disable-gpu')) {
        launchOptions.args.push('--disable-gpu')
      }
      console.log('[Cypress Chrome]', JSON.stringify({
        version: browser.version,
        path: browser.path,
        args: launchOptions.args,
      }))
    }
    return launchOptions
  })
}
