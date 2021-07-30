"use strict";
var __importStar = (this && this.__importStar) || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null)
    for (var k in mod)
      if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const postcss = __importStar(require("postcss"));
// postcss-selector-parser does have typings but it's problematic to work with.
const selectorParser = require('postcss-selector-parser');
exports.default = postcss.plugin('remove-scoped', (options) => (root) => {
  root.each(function rewriteSelector(node) {
    if (!node.selector) {
      // handle media queries
      if (node.type === 'atrule') {
        if (node.name === 'media' || node.name === 'supports') {
          node.each(rewriteSelector);
        }
      }
      return;
    }
    node.selector = selectorParser((selectors) => {
      selectors.each((selector) => {
        let node = null;
        // find the last child node to insert attribute selector
        selector.each((n) => {
          // ">>>" combinator
          // and /deep/ alias for >>>, since >>> doesn't work in SASS
          if (n.type === 'combinator' &&
            (n.value === '>>>' || n.value === '/deep/')) {
            n.value = ' ';
            n.spaces.before = n.spaces.after = '';
            return false;
          }
          // in newer versions of sass, /deep/ support is also dropped, so add a ::v-deep alias
          if (n.type === 'pseudo' && n.value === '::v-deep') {
            n.value = n.spaces.before = n.spaces.after = '';
            return false;
          }
          if (n.type !== 'pseudo' && n.type !== 'combinator') {
            node = n;
          }
        });
        if (node) {
          node.spaces.after = '';
        } else {
          // For deep selectors & standalone pseudo selectors,
          // the attribute selectors are prepended rather than appended.
          // So all leading spaces must be eliminated to avoid problems.
          selector.first.spaces.before = '';
        }
      });
    }).processSync(node.selector);
  });
});
