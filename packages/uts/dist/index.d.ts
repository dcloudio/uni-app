export declare const enum UtsTarget {
    KOTLIN = "kotlin",
    SWIFT = "swift"
}
export declare type UtsMode = 'dev' | 'build';
export interface ToOptions {
    /**
     * 为 true 时，禁用日志输出，默认为 false
     */
    silent?: boolean;
    input: {
        /**
         * 插件根目录
         */
        dir: string;
        /**
         * 文件后缀，默认 .uts
         */
        extname?: string;
    };
    output: {
        /**
         * 输出目录
         */
        dir: string;
        /**
         * 是否生成 sourceMap，为 string 时，表示生成的 sourceMap 目标目录
         */
        sourceMap: boolean | string;
        /**
         * sourceMap 中是否包含源码
         */
        inlineSourcesContent?: boolean;
    };
}
export declare function runDev(target: UtsTarget, opts: ToOptions): void;
export declare function runBuild(target: UtsTarget, opts: ToOptions): void | Promise<import("./types").UtsResult[]>;
