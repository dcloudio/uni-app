import { CodegenResult, ParserOptions, RootNode } from '@vue/compiler-core';
import { CompilerOptions } from './options';
export declare function parse(template: string, options?: ParserOptions): RootNode;
export declare function compile(template: string, options?: CompilerOptions): CodegenResult;
