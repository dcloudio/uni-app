import { CodegenResult, CompilerOptions, NodeTransform, RootNode } from "@vue/compiler-dom";
//#region temp/packages/compiler-ssr/src/options.d.ts
export interface SSRCompilerOptions extends CompilerOptions {
  preNodeTransforms?: NodeTransform[];
}
//#endregion
//#region temp/packages/compiler-ssr/src/index.d.ts
export declare function compile(source: string | RootNode, options?: SSRCompilerOptions): CodegenResult;
//#endregion
