"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVueLoader = void 0;
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const compilerOptions_1 = require("./compilerOptions");
const utils_1 = require("../../../../../utils");
const easycom_1 = require("./easycom");
function createVueLoader() {
    uni_cli_shared_1.initEasycomsOnce(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM);
    return {
        test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
        use: [
            {
                loader: utils_1.resolveLib('vue-loader'),
                options: {
                    hotReload: false,
                    compiler: createCompiler(),
                    compilerOptions: compilerOptions_1.createCompilerOptions(),
                },
            },
        ],
    };
}
exports.createVueLoader = createVueLoader;
const isUnaryTag = shared_1.makeMap('image,area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr');
function compileTemplate(source, options, compile) {
    const res = compile(source, options);
    res.components = easycom_1.generateEasycomCode([
        ...(options.isUnaryTag.autoComponents || []),
    ]);
    return res;
}
function createCompiler() {
    const compiler = require(utils_1.resolveLib('weex-template-compiler'));
    const oldCompile = compiler.compile;
    compiler.compile = function (source, options = {}) {
        ;
        options.isUnaryTag = isUnaryTag;
        options.isUnaryTag.autoComponents = new Set();
        options.preserveWhitespace = false;
        return compileTemplate(source, options, oldCompile);
    };
    return compiler;
}
