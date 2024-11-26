'use strict';

var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefault(path);

const uniConsoleRuntimePlugin = () => {
    return {
        name: 'uni:console:runtime',
        config() {
            const isProd = process.env.NODE_ENV === 'production';
            return {
                define: {
                    __UNI_SOCKET_HOSTS__: JSON.stringify(isProd ? '' : process.env.UNI_SOCKET_HOSTS),
                    __UNI_SOCKET_PORT__: JSON.stringify(isProd ? '' : process.env.UNI_SOCKET_PORT),
                    __UNI_SOCKET_ID__: JSON.stringify(isProd ? '' : process.env.UNI_SOCKET_ID),
                },
            };
        },
    };
};
var index = () => {
    return [
        uniConsoleRuntimePlugin(),
        uniCliShared.defineUniMainJsPlugin((opts) => {
            const hasRuntimeSocket = uniCliShared.isEnableConsole();
            return {
                name: 'uni:console-main-js',
                enforce: 'post',
                resolveId(id) {
                    if (id === '@dcloudio/uni-console') {
                        return uniCliShared.resolveBuiltIn(path__default.default.join('@dcloudio/uni-console', 'dist/index.esm.js'));
                    }
                },
                transform(code, id) {
                    if (!hasRuntimeSocket) {
                        return;
                    }
                    if (!opts.filter(id)) {
                        return;
                    }
                    return {
                        code: `import '@dcloudio/uni-console'
            ${code}
            `,
                        map: {
                            mappings: '',
                        },
                    };
                },
            };
        }),
    ];
};

module.exports = index;
