export declare type UtsTarget = 'es3' | 'es5' | 'es2015' | 'es2016' | 'es2017' | 'es2018' | 'es2019' | 'es2020' | 'es2021' | 'es2022';
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
    /**
     * default es2022
     */
    target?: UtsTarget;
};
export declare type InputKotlinOptions = UtsParseOptions & {
    root: string;
    filename: string;
    namespace?: string;
};
export declare type OutputKotlinOptions = {
    outDir: string;
    sourceMap: boolean | string;
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
}
