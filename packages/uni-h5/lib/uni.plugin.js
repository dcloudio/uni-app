/**
 * @type {import('vite').Plugin}
 */
const UniH5Plugin = {
  name: 'vite:uni-h5',
  uni: {
    transformEvent: {
      tap: 'click',
    },
  },
}

module.exports = UniH5Plugin
