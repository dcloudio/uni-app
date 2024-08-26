import { IUTSCompiler } from '@uts/compiler';
import { MappedPosition } from 'source-map-js';
import tsTypes from 'typescript';

interface TransformOptions {
    transformArguments?: {
        shouldTransform(node: tsTypes.Node, type: tsTypes.Type): boolean;
    };
    transformReturnType?: {
        shouldTransform(node: tsTypes.Node, type: tsTypes.Type): boolean;
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
    typescript: typeof tsTypes;
    inputDir: string;
    cacheDir: string;
    rootFiles?: string[];
    utsLibDir: string;
    hxLanguageServiceDir?: string;
    outputDir: string;
    incremental?: boolean;
    normalizeFileName: (fileName: string) => string;
    originalPositionForSync?: (generatedPosition: Omit<PositionFor, 'filename'>) => MappedPosition & {
        sourceContent?: string;
    };
    watchFile?(path: string, callback: tsTypes.FileWatcherCallback, pollingInterval?: number, options?: tsTypes.WatchOptions): tsTypes.FileWatcher;
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
    getDiagnostics(): tsTypes.Diagnostic[];
    invalidate(files: {
        fileName: string;
        event: InvalidateEventKind;
    }[]): Promise<void>;
    init(): Promise<void>;
}

export { type InvalidateEventKind, type TransformOptions, UniXCompiler, type UniXCompilerOptions };
