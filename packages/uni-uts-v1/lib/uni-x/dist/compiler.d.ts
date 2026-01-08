import { IUTSCompiler } from '@uts/compiler';
import * as tsTypes from 'typescript';
import tsTypes__default, { CompilerOptions } from 'typescript';
import * as _uts_transforms_base from '@uts/transforms_base';

declare function isTypeRelatedTo(ts: typeof tsTypes__default, typeChecker: tsTypes__default.TypeChecker, source: tsTypes__default.Type, target: tsTypes__default.Type): true | undefined;

declare function isRelatedTo(ts: typeof tsTypes__default, checker: tsTypes__default.TypeChecker, source: tsTypes__default.Type, target: tsTypes__default.Type): true | undefined;

declare function filterReferencedByPaths(referencedFilePath: tsTypes__default.Path, keys: Set<tsTypes__default.Path> | undefined): void;

declare function componentPublicInstancePropertyAccessFallback(ts: typeof tsTypes, typeChecker: tsTypes.TypeChecker, node: tsTypes.PropertyAccessExpression | tsTypes.QualifiedName, left: tsTypes.Expression | tsTypes.QualifiedName, leftType: tsTypes.Type, right: tsTypes.Identifier | tsTypes.PrivateIdentifier): tsTypes.Type | undefined;

declare enum TargetLanguage {
    Kotlin = "Kotlin",
    Swift = "Swift",
    ArkTS = "ArkTS",
    JavaScript = "JavaScript"
}
declare function initTargetHacker(_targetLanguage: TargetLanguage): {
    componentPublicInstancePropertyAccessFallback: typeof componentPublicInstancePropertyAccessFallback;
    filterReferencedByPaths: typeof filterReferencedByPaths;
    isRelatedTo: typeof isRelatedTo;
    isTypeRelatedTo: typeof isTypeRelatedTo;
    useTypeAndInterfaceAsValue: boolean;
};
interface CreateTransformerOptions {
    enableUTSNumber?: boolean;
    enableNarrowType?: boolean;
    enableGenericsParameterDefaults?: boolean;
    isPureSwift?: boolean;
    workers?: {
        resolve?: () => Record<string, string>;
        extname?: '.ets' | '.js';
        rewriteRootDir?: string;
    };
}
declare function initTargetTransformers(targetLanguage: TargetLanguage, options?: CreateTransformerOptions): _uts_transforms_base.UTSTransformerFactoryCreator[];

interface TransformOptions {
    transformArguments?: {
        shouldTransform(node: tsTypes__default.Node, type: tsTypes__default.Type): boolean;
    };
    transformReturnType?: {
        shouldTransform(node: tsTypes__default.Node, type: tsTypes__default.Type): boolean;
    };
}
type InvalidateEventKind = 'create' | 'update' | 'delete';
type UniXCompilerOptions = {
    mode: 'development' | 'production';
    targetLanguage: TargetLanguage;
    sourceMap?: boolean;
    inlineSources?: boolean;
    tsFactory: (__utsHacker__: unknown) => typeof tsTypes__default;
    inputDir: string;
    cacheDir: string;
    rootFiles?: string[];
    utsLibDir: string;
    hxLanguageServiceDir?: string;
    hxPluginDir?: string;
    outputDir: string;
    paths?: CompilerOptions['paths'];
    incremental?: boolean;
    normalizeFileName: (fileName: string) => string;
    watchFile?(path: string, callback: tsTypes__default.FileWatcherCallback, pollingInterval?: number, options?: tsTypes__default.WatchOptions): tsTypes__default.FileWatcher;
    transformOptions?: CreateTransformerOptions;
};
declare class UniXCompiler implements IUTSCompiler {
    private _options;
    private _utsCompiler;
    constructor(options: UniXCompilerOptions);
    debug(formatter: any, ...args: any[]): void;
    getProgram(): tsTypes__default.Program | undefined;
    getTypeScript(): typeof tsTypes__default;
    close(): Promise<void>;
    wait(timeout?: number): Promise<void>;
    getRootFiles(): string[];
    hasRootFile(fileName: string): boolean;
    addRootFile(fileName: string, timeout?: number): Promise<void>;
    addRootFiles(fileNames: string[], timeout?: number): Promise<void>;
    getDiagnostics(): tsTypes__default.Diagnostic[];
    invalidate(files: {
        fileName: string;
        event: InvalidateEventKind;
    }[]): Promise<void>;
    init(): Promise<void>;
}

export { type InvalidateEventKind, TargetLanguage, type TransformOptions, UniXCompiler, type UniXCompilerOptions, initTargetHacker, initTargetTransformers };
