import { MappedPosition } from 'source-map-js';
import tsTypes, { Diagnostic } from 'typescript';

interface WatchProgramHelper {
    invalidate(files?: {
        fileName: string;
        event: 'create' | 'update' | 'delete';
    }[]): Promise<void>;
    updateRootFileNames(fileNames: string[]): void;
    watch(timeout?: number): void;
    handleStatus(diagnostic: Diagnostic): void;
    wait(): Promise<void>;
}
interface TransformOptions {
    transformArguments?: {
        shouldTransform(node: tsTypes.Node, type: tsTypes.Type): boolean;
    };
    transformReturnType?: {
        shouldTransform(node: tsTypes.Node, type: tsTypes.Type): boolean;
    };
}
interface PositionFor {
    sourceMapFile: string;
    filename: string;
    line: number;
    column: number;
    withSourceContent?: boolean;
}
type RunAndroidOptions = {
    typescript: typeof tsTypes;
    inputDir: string;
    cacheDir: string;
    rootFiles?: string[];
    utsLibDir: string;
    hxLanguageServiceDir?: string;
    outputDir: string;
    normalizeFileName: (fileName: string) => string;
    originalPositionForSync?: (generatedPosition: Omit<PositionFor, 'filename'>) => MappedPosition & {
        sourceContent?: string;
    };
    watchFile?(path: string, callback: tsTypes.FileWatcherCallback, pollingInterval?: number, options?: tsTypes.WatchOptions): tsTypes.FileWatcher;
};
type RunAndroidResult = {
    watcher?: WatchProgramHelper;
    result?: tsTypes.EmitResult;
};
declare function runAndroid(mode: 'development', options: RunAndroidOptions): {
    watcher: WatchProgramHelper;
};
declare function runAndroid(mode: 'production', options: RunAndroidOptions): {
    result: tsTypes.EmitResult;
};

export { type RunAndroidOptions, type RunAndroidResult, type TransformOptions, type WatchProgramHelper, runAndroid };
