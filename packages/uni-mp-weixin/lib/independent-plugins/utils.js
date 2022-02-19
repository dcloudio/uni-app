const isWin = /^win/.test(process.platform);
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path);

module.exports = {
  normalizePath,
  generateAsset (stringSource) {
    return {
      size () {
        return Buffer.byteLength(stringSource, 'utf8');
      },
      source () {
        return stringSource;
      },
    };
  },
};
