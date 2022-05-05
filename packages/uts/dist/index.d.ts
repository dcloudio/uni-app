import { UtsKotlinOptions, UtsResult, UtsSwiftOptions } from './types';
export * from './types';
export declare function toKotlin(options: UtsKotlinOptions): Promise<UtsResult>;
export declare function toSwift(options: UtsSwiftOptions): Promise<UtsResult>;
