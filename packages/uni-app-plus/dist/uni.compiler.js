'use strict';

var appVite = require('@dcloudio/uni-app-vite');
var appUVue = require('@dcloudio/uni-app-uts');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var appVite__default = /*#__PURE__*/_interopDefault(appVite);
var appUVue__default = /*#__PURE__*/_interopDefault(appUVue);

var index = [process.env.UNI_APP_X === 'true' ? appUVue__default.default : appVite__default.default];

module.exports = index;
