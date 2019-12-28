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
// postcss-selector-parser does have typings but it's problematic to work with.
const selectorParser = require('postcss-selector-parser');
exports.default = postcss.plugin('add-id', (options) => (root) => {
    const id = options;
    const keyframes = Object.create(null);
    root.each(function rewriteSelector(node) {
        if (!node.selector) {
            // handle media queries
            if (node.type === 'atrule') {
                if (node.name === 'media' || node.name === 'supports') {
                    node.each(rewriteSelector);
                }
                else if (/-?keyframes$/.test(node.name)) {
                    // register keyframes
                    keyframes[node.params] = node.params = node.params + '-' + id;
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
                }
                else {
                    // For deep selectors & standalone pseudo selectors,
                    // the attribute selectors are prepended rather than appended.
                    // So all leading spaces must be eliminated to avoid problems.
                    selector.first.spaces.before = '';
                }
                // fixed by xxxxxx (h5,app-plus v3 平台继续使用 attribute,其他平台使用 className)
                if(
                  process.env.UNI_PLATFORM === 'h5' ||
                  (
                    process.env.UNI_PLATFORM === 'app-plus' &&
                    process.env.UNI_USING_V3
                  )
                ){
                  selector.insertAfter(node, selectorParser.attribute({
                      attribute: id
                  }));
                } else {
                  selector.insertAfter(node, selectorParser.className({
                      value: id
                  }));
                }
            });
        }).processSync(node.selector);
    });
    // If keyframes are found in this <style>, find and rewrite animation names
    // in declarations.
    // Caveat: this only works for keyframes and animation rules in the same
    // <style> element.
    if (Object.keys(keyframes).length) {
        root.walkDecls(decl => {
            // individual animation-name declaration
            if (/^(-\w+-)?animation-name$/.test(decl.prop)) {
                decl.value = decl.value
                    .split(',')
                    .map(v => keyframes[v.trim()] || v.trim())
                    .join(',');
            }
            // shorthand
            if (/^(-\w+-)?animation$/.test(decl.prop)) {
                decl.value = decl.value
                    .split(',')
                    .map(v => {
                    const vals = v.trim().split(/\s+/);
                    const i = vals.findIndex(val => keyframes[val]);
                    if (i !== -1) {
                        vals.splice(i, 1, keyframes[vals[i]]);
                        return vals.join(' ');
                    }
                    else {
                        return v;
                    }
                })
                    .join(',');
            }
        });
    }
});
