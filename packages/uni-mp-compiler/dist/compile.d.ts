import { CompilerOptions } from './options';
import { DirectiveTransform, NodeTransform } from './transform';
export declare type TransformPreset = [
    NodeTransform[],
    Record<string, DirectiveTransform>
];
export declare function getBaseTransformPreset(prefixIdentifiers?: boolean): TransformPreset;
export declare function baseCompile(template: string, options?: CompilerOptions): import("@vue/compiler-core").CodegenResult;
