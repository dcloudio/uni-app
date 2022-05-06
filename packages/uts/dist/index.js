"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuild = exports.runDev = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const chokidar_1 = require("chokidar");
const api_1 = require("./api");
function resolveDefaultOutputDir(mode, inputDir) {
    return path_1.default.resolve(inputDir, '../dist/' + mode + '/kotlin');
}
function parseOptions(mode, opts) {
    const { input } = opts;
    if (!(input === null || input === void 0 ? void 0 : input.dir)) {
        throw new Error(`input.dir is required`);
    }
    if (!fs_1.default.existsSync(input.dir)) {
        throw new Error(`${input} is not found`);
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
    return opts;
}
const EXTNAME = '.uts';
function watchSwift(_) { }
function buildSwift(_) { }
function watchKotlin({ input: { dir: inputDir, extname }, output: { dir: outputDir, sourceMap }, }) {
    const input = {
        root: inputDir,
        filename: '',
    };
    const output = {
        outDir: outputDir,
        sourceMap,
    };
    (0, chokidar_1.watch)('**/*' + (extname || EXTNAME), {
        cwd: inputDir,
        ignored: ['**/*.d' + (extname || EXTNAME)],
    })
        .on('add', (filename) => buildKotlinFile(path_1.default.resolve(inputDir, filename), input, output))
        .on('change', (filename) => buildKotlinFile(path_1.default.resolve(inputDir, filename), input, output))
        .on('unlink', (filename) => {
        try {
            fs_1.default.unlinkSync(path_1.default.resolve(outputDir, filename));
        }
        catch (e) { }
    });
}
function buildKotlin({ input: { dir: inputDir, extname }, output: { dir: outputDir, sourceMap, inlineSourcesContent }, }) {
    const files = fast_glob_1.default.sync('**/*' + (extname || EXTNAME), {
        absolute: true,
        cwd: inputDir,
        ignore: ['**/*.d' + (extname || EXTNAME)],
    });
    const input = {
        root: inputDir,
        filename: '',
    };
    const output = {
        outDir: outputDir,
        sourceMap,
        inlineSourcesContent: !!inlineSourcesContent,
    };
    return Promise.all(files.map((filename) => buildKotlinFile(filename, input, output)));
}
function buildKotlinFile(filename, input, output) {
    const label = path_1.default.posix.relative(input.root, filename);
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
    console.time(label);
    return (0, api_1.toKotlin)(toKotlinOptions).then(() => {
        console.timeEnd(label);
    });
}
function runDev(target, opts) {
    opts = parseOptions('dev', opts);
    switch (target) {
        case 'kotlin':
            return watchKotlin(opts);
        case 'swift':
            return watchSwift(opts);
    }
}
exports.runDev = runDev;
function runBuild(target, opts) {
    opts = parseOptions('build', opts);
    switch (target) {
        case 'kotlin':
            return buildKotlin(opts);
        case 'swift':
            return buildSwift(opts);
    }
}
exports.runBuild = runBuild;
