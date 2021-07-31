"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return {
        postcssPlugin: 'trim',
        Once (css) {
            css.walk(({ type, raws }) => {
                if (type === 'rule' || type === 'atrule') {
                    if (raws.before)
                        raws.before = '\n';
                    if (raws.after)
                        raws.after = '\n';
                }
            });
        }
    }
}