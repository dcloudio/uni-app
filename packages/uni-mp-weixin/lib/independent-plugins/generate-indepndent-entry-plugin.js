const crypto = require('crypto');
const { generateAsset } = require('./utils');

const emitFileCaches = {};

function md5 (str) {
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}

function emitFile (filePath, source, compilation) {
    const emitFileMD5 = md5(filePath + source);
    if (emitFileCaches[filePath] !== emitFileMD5) {
        emitFileCaches[filePath] = emitFileMD5;
        compilation.assets[filePath] = generateAsset(source);
    }
}

// 为独立分包【生成】入口执行文件，代替主包中的app.js
class GenerateIndepndentEntryPlugin {
    apply (compiler) {
        compiler.hooks.emit.tapPromise('GenerateIndepndentEntryPlugin', compilation => {
            return new Promise((resolve, reject) => {
                try {
                    // debugger
                    const independentPkgs = Object.values(process.UNI_SUBPACKAGES).filter(subPkgItem => subPkgItem.independent) || [];
                    const independentEntry = independentPkgs.map(independentPkgItem => {
                        return {
                            file: `${independentPkgItem.root}/common/index.js`,
                            source: `require('runtime.js');require('library.js');require('vendor.js');require('main.js');`,
                        };
                    });
                    independentEntry.forEach(({ file, source }) => emitFile(file, source, compilation));

                    resolve();
                } catch (e) {
                    console.error('independent.error', 'GenerateIndepndentEntryPlugin', e);
                    reject(e);
                }
            });
        });
    }
}

module.exports = GenerateIndepndentEntryPlugin;