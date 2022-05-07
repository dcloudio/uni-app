export interface ToOptions {
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
export declare function runDev(target: 'kotlin' | 'swift', opts: ToOptions): void;
export declare function runBuild(target: 'kotlin' | 'swift', opts: ToOptions): void | Promise<void[]>;
