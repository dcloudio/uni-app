export interface UtsParserConfig {
    /**
     * Defaults to `false`.
     */
    tsx?: boolean;
    /**
     * Defaults to `false`.
     */
    decorators?: boolean;
    /**
     * Defaults to `false`
     */
    dynamicImport?: boolean;
}
export declare type UtsParseOptions = UtsParserConfig & {
    filename?: string;
    comments?: boolean;
};
export declare type InputKotlinOptions = UtsParseOptions & {
    root: string;
    filename: string;
    namespace?: string;
};
export declare type OutputKotlinOptions = {
    outDir: string;
    sourceMap: boolean | string;
    inlineSourcesContent?: boolean;
};
export interface UtsKotlinOptions {
    input: InputKotlinOptions;
    output: OutputKotlinOptions;
}
export declare type InputSwiftOptions = UtsParseOptions;
export declare type OutputSwiftOptions = {};
export interface UtsSwiftOptions {
    input: InputSwiftOptions;
    output: OutputSwiftOptions;
}
export interface UtsResult {
    filename?: string;
    time?: number;
}
