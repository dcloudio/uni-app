import { IUTSCompiler } from '@uts/compiler';
import { MappedPosition } from 'source-map-js';
import * as tsTypes from 'typescript';
import tsTypes__default, { CompilerOptions } from 'typescript';
import * as _uts_transforms_base from '@uts/transforms_base';

declare function isTypeRelatedTo(ts: typeof tsTypes, typeChecker: tsTypes.TypeChecker, source: tsTypes.Type, target: tsTypes.Type): true | undefined;

declare function isRelatedTo(ts: typeof tsTypes, checker: tsTypes.TypeChecker, source: tsTypes.Type, target: tsTypes.Type): true | undefined;

declare function filterReferencedByPaths(referencedFilePath: tsTypes__default.Path, keys: Set<tsTypes__default.Path> | undefined): void;

declare function componentPublicInstancePropertyAccessFallback(ts: typeof tsTypes, typeChecker: tsTypes.TypeChecker, node: tsTypes.PropertyAccessExpression | tsTypes.QualifiedName, left: tsTypes.Expression | tsTypes.QualifiedName, leftType: tsTypes.Type, right: tsTypes.Identifier | tsTypes.PrivateIdentifier): tsTypes.Type | undefined;

declare function initTargetHacker(_targetLanguage: 'Kotlin' | 'Swift'): {
    componentPublicInstancePropertyAccessFallback: typeof componentPublicInstancePropertyAccessFallback;
    filterReferencedByPaths: typeof filterReferencedByPaths;
    isRelatedTo: typeof isRelatedTo;
    isTypeRelatedTo: typeof isTypeRelatedTo;
    useTypeAndInterfaceAsValue: boolean;
};
declare function initTargetTransformers(targetLanguage: 'Kotlin' | 'Swift'): _uts_transforms_base.UTSTransformerFactoryCreator[];

interface TransformOptions {
    transformArguments?: {
        shouldTransform(node: tsTypes__default.Node, type: tsTypes__default.Type): boolean;
    };
    transformReturnType?: {
        shouldTransform(node: tsTypes__default.Node, type: tsTypes__default.Type): boolean;
    };
}
type InvalidateEventKind = 'create' | 'update' | 'delete';
interface PositionFor {
    sourceMapFile: string;
    filename: string;
    line: number;
    column: number;
    withSourceContent?: boolean;
}
type UniXCompilerOptions = {
    mode: 'development' | 'production';
    targetLanguage: 'Kotlin' | 'Swift';
    tsFactory: (__utsHacker__: unknown) => typeof tsTypes__default;
    inputDir: string;
    cacheDir: string;
    rootFiles?: string[];
    utsLibDir: string;
    hxLanguageServiceDir?: string;
    outputDir: string;
    paths?: CompilerOptions['paths'];
    incremental?: boolean;
    normalizeFileName: (fileName: string) => string;
    originalPositionForSync?: (generatedPosition: Omit<PositionFor, 'filename'>) => MappedPosition & {
        sourceContent?: string;
    };
    watchFile?(path: string, callback: tsTypes__default.FileWatcherCallback, pollingInterval?: number, options?: tsTypes__default.WatchOptions): tsTypes__default.FileWatcher;
};
declare class UniXCompiler implements IUTSCompiler {
    private _options;
    private _utsCompiler;
    constructor(options: UniXCompilerOptions);
    debug(formatter: any, ...args: any[]): void;
    close(): Promise<void>;
    wait(timeout?: number): Promise<void>;
    getRootFiles(): string[];
    addRootFile(fileName: string, timeout?: number): Promise<void>;
    getDiagnostics(): tsTypes__default.Diagnostic[];
    invalidate(files: {
        fileName: string;
        event: InvalidateEventKind;
    }[]): Promise<void>;
    init(): Promise<void>;
}

export { type InvalidateEventKind, type TransformOptions, UniXCompiler, type UniXCompilerOptions, initTargetHacker, initTargetTransformers };
