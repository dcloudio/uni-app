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
declare class WatchProgramHelper {
    watch(timeout?: number): void;
    wait(): Promise<void>;
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
    uniAppXTypesDir?: string;
    outputDir: string;
    normalizeFileName: (fileName: string) => string;
    originalPositionForSync?: (generatedPosition: Omit<PositionFor, 'filename'>) => MappedPosition & {
        sourceContent?: string;
    };
};
declare function runAndroid(mode: 'development' | 'production', options: RunAndroidOptions): {
    watcher?: WatchProgramHelper;
};

export { type RunAndroidOptions, type TransformOptions, WatchProgramHelper, runAndroid };
