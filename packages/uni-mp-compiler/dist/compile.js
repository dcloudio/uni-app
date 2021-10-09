"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseCompile = exports.getBaseTransformPreset = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const shared_1 = require("@vue/shared");
const codegen_1 = require("./codegen");
const transform_1 = require("./transform");
const transformExpression_1 = require("./transforms/transformExpression");
const transformIdentifier_1 = require("./transforms/transformIdentifier");
const vIf_1 = require("./transforms/vIf");
const vFor_1 = require("./transforms/vFor");
const codegen_2 = require("./template/codegen");
function getBaseTransformPreset(prefixIdentifiers) {
    const nodeTransforms = [vIf_1.transformIf, vFor_1.transformFor];
    if (prefixIdentifiers) {
        nodeTransforms.push(transformExpression_1.transformExpression);
    }
    return [nodeTransforms, {}];
}
exports.getBaseTransformPreset = getBaseTransformPreset;
function baseCompile(template, options = {}) {
    const prefixIdentifiers = options.prefixIdentifiers === true || options.mode === 'module';
    const ast = (0, shared_1.isString)(template) ? (0, compiler_core_1.baseParse)(template, options) : template;
    const [nodeTransforms, directiveTransforms] = getBaseTransformPreset(prefixIdentifiers);
    const context = (0, transform_1.transform)(ast, (0, shared_1.extend)({}, options, {
        prefixIdentifiers,
        nodeTransforms: [
            ...nodeTransforms,
            ...(options.nodeTransforms || []),
            ...(options.skipTransformIdentifier ? [] : [transformIdentifier_1.transformIdentifier]),
        ],
        directiveTransforms: (0, shared_1.extend)({}, directiveTransforms, options.directiveTransforms || {}),
    }));
    const result = (0, shared_1.extend)((0, codegen_1.generate)(context.scope, options), { ast });
    if (options.filename && options.emitFile) {
        (0, codegen_2.generate)(ast, { filename: options.filename, emitFile: options.emitFile });
    }
    return result;
}
exports.baseCompile = baseCompile;
