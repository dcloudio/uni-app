'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);

const uniMiniProgramWeixinPlugin = {
    name: 'vite:uni-mp-weixin',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: JSON.stringify('false'),
            },
        };
    },
};
var index = [
    uniMiniProgramWeixinPlugin,
    ...initMiniProgramPlugin__default["default"]({
        global: 'wx',
        alias: {
            'uni-mp-runtime': uniCliShared.resolveBuiltIn('@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js'),
        },
    }),
];

module.exports = index;
