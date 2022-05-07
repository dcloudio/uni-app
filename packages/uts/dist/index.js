"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuild = exports.runDev = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const chokidar_1 = require("chokidar");
const api_1 = require("./api");
const utils_1 = require("./utils");
const targetDirs = {
    ["kotlin" /* KOTLIN */]: 'android',
    ["swift" /* SWIFT */]: 'ios',
};
function resolveDefaultOutputDir(mode, inputDir) {
    return path_1.default.resolve(inputDir, '../dist/' + mode);
}
function parseOptions(mode, target, opts) {
    const { input } = opts;
    if (!(input === null || input === void 0 ? void 0 : input.dir)) {
        throw new Error(`input.dir is required.`);
    }
    if (!fs_extra_1.default.existsSync(input.dir)) {
        throw new Error(`${input} is not found.`);
    }
    let inputSrcDir = '';
    if (target === "kotlin" /* KOTLIN */) {
        inputSrcDir = resolveKotlinSrcDir(input.dir);
    }
    else {
        throw new Error(`${target} is unsupported.`);
    }
    if (!fs_extra_1.default.existsSync(inputSrcDir)) {
        throw new Error(`${inputSrcDir} is not found.`);
    }
    if (!opts.output) {
        opts.output = {
            dir: '',
            sourceMap: '',
        };
    }
    if (!opts.output.dir) {
        opts.output.dir = resolveDefaultOutputDir(mode, input.dir);
    }
    opts.silent = opts.silent === true;
    return opts;
}
const EXTNAME = '.uts';
function resolveKotlinSrcDir(dir) {
    return path_1.default.join(dir, targetDirs["kotlin" /* KOTLIN */] + '/src');
}
function initInputKotlinOptions(root) {
    return {
        root,
        filename: '',
    };
}
function initOutputKotlinOptions(outDir, sourceMap, inlineSourcesContent) {
    return {
        outDir,
        sourceMap,
        inlineSourcesContent,
    };
}
function watchSwift(_) { }
function buildSwift(_) { }
function watchKotlin({ silent, input: { dir: inputDir, extname }, output: { dir: outputDir, sourceMap, inlineSourcesContent }, }) {
    fs_extra_1.default.emptyDirSync(outputDir);
    extname = extname || EXTNAME;
    const inputSrcDir = resolveKotlinSrcDir(inputDir);
    const outputSrcDir = resolveKotlinSrcDir(outputDir);
    const input = initInputKotlinOptions(inputSrcDir);
    const output = initOutputKotlinOptions(outputSrcDir, sourceMap, !!inlineSourcesContent);
    (0, chokidar_1.watch)('**/*' + extname, {
        cwd: inputSrcDir,
        ignored: ['**/*.d' + extname],
    })
        .on('add', (filename) => {
        buildKotlinFile(path_1.default.resolve(inputSrcDir, filename), input, output).then((res) => {
            !silent && (0, utils_1.printUtsResult)(res);
        });
    })
        .on('change', (filename) => {
        buildKotlinFile(path_1.default.resolve(inputSrcDir, filename), input, output).then((res) => {
            !silent && (0, utils_1.printUtsResult)(res);
        });
    })
        .on('unlink', (filename) => {
        try {
            fs_extra_1.default.unlinkSync(path_1.default.resolve(outputSrcDir, filename));
        }
        catch (e) { }
    })
        .on('ready', () => {
        copyAssets("kotlin" /* KOTLIN */, inputDir, outputDir, extname);
    });
}
function buildKotlin({ silent, input: { dir: inputDir, extname }, output: { dir: outputDir, sourceMap, inlineSourcesContent }, }) {
    fs_extra_1.default.emptyDirSync(outputDir);
    extname = extname || EXTNAME;
    const inputSrcDir = resolveKotlinSrcDir(inputDir);
    const outputSrcDir = resolveKotlinSrcDir(outputDir);
    const input = initInputKotlinOptions(inputSrcDir);
    const output = initOutputKotlinOptions(outputSrcDir, sourceMap, !!inlineSourcesContent);
    const files = fast_glob_1.default.sync('**/*' + extname, {
        absolute: true,
        cwd: inputSrcDir,
        ignore: ['**/*.d' + extname],
    });
    return Promise.all(files.map((filename) => buildKotlinFile(filename, input, output)))
        .then((res) => {
        return copyAssets("kotlin" /* KOTLIN */, inputDir, outputDir, extname).then(() => res);
    })
        .then((res) => {
        !silent && (0, utils_1.printUtsResults)(res);
        return res;
    });
}
function copyAssets(target, inputDir, outputDir, extname) {
    inputDir = path_1.default.resolve(inputDir);
    outputDir = path_1.default.resolve(outputDir);
    const kotlinRootDir = path_1.default.join(inputDir, targetDirs["kotlin" /* KOTLIN */]);
    const swiftRootDir = path_1.default.join(inputDir, targetDirs["swift" /* SWIFT */]);
    return fs_extra_1.default.copy(inputDir, outputDir, {
        filter(src) {
            if (target === "kotlin" /* KOTLIN */) {
                if (src === swiftRootDir) {
                    return false;
                }
            }
            else if (target === "swift" /* SWIFT */) {
                if (src === kotlinRootDir) {
                    return false;
                }
            }
            return ![extname, '.ts'].includes(path_1.default.extname(src));
        },
    });
}
function buildKotlinFile(filename, input, output) {
    const toKotlinOptions = {
        input: {
            ...input,
            filename,
            namespace: '',
        },
        output: {
            ...output,
        },
    };
    const start = process.hrtime();
    return (0, api_1.toKotlin)(toKotlinOptions).then((res) => {
        res.time = (0, utils_1.timeEnd)(start);
        return res;
    });
}
function runDev(target, opts) {
    opts = parseOptions('dev', target, opts);
    !opts.silent && (0, utils_1.printStartup)(target, 'development');
    switch (target) {
        case "kotlin" /* KOTLIN */:
            return watchKotlin(opts);
        case "swift" /* SWIFT */:
            return watchSwift(opts);
    }
}
exports.runDev = runDev;
function runBuild(target, opts) {
    opts = parseOptions('build', target, opts);
    !opts.silent && (0, utils_1.printStartup)(target, 'production');
    switch (target) {
        case "kotlin" /* KOTLIN */:
            return buildKotlin(opts);
        case "swift" /* SWIFT */:
            return buildSwift(opts);
    }
}
exports.runBuild = runBuild;
