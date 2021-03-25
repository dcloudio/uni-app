"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("@babel/types"));
const utils_1 = require("./utils");
const transformFragment = (path, Fragment) => {
    const children = path.get('children') || [];
    return t.jsxElement(t.jsxOpeningElement(Fragment, []), t.jsxClosingElement(Fragment), children.map(({ node }) => node), false);
};
exports.default = ({
    JSXFragment: {
        enter(path, state) {
            const fragmentCallee = utils_1.createIdentifier(state, utils_1.FRAGMENT);
            path.replaceWith(transformFragment(path, t.isIdentifier(fragmentCallee)
                ? t.jsxIdentifier(fragmentCallee.name)
                : t.jsxMemberExpression(t.jsxIdentifier(fragmentCallee.object.name), t.jsxIdentifier(fragmentCallee.property.name))));
        },
    },
});
