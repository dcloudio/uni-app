export interface ToOptions {
    watch?: boolean;
    input: {
        dir: string;
        extname?: string;
    };
    output: {
        dir: string;
        sourceMap: boolean | string;
        inlineSourcesContent?: boolean;
    };
}
export declare function runDev(target: 'kotlin' | 'swift', opts: ToOptions): void;
export declare function runBuild(target: 'kotlin' | 'swift', opts: ToOptions): void | Promise<void[]>;
