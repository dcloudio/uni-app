"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss = __importStar(require("postcss"));
const once = (css) => {
  css.walk(({ type, raws }) => {
    if (type === 'rule' || type === 'atrule') {
      if (raws.before)
        raws.before = '\n';
      if (raws.after)
        raws.after = '\n';
    }
  });
};

const version = Number(require('postcss/package.json').version.split('.')[0])

if (version < 8) {
  const postcss = require('postcss')
  module.exports = postcss.plugin('trim', function (opts) {
    return once
  })
} else {
  module.exports = function (opts) {
    return {
      postcssPlugin: 'trim',
      Once: once
    }
  }

  module.exports.postcss = true
}
