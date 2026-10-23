import { CodegenResult, CompilerOptions as CompilerOptions$1, NodeTransform, ParserOptions, RootNode } from "@vue/compiler-dom";
import { CompilerOptions, CompilerOptions as CompilerOptions$2, VaporCodegenResult, VaporCodegenResult as VaporCodegenResult$1 } from "@vue/compiler-vapor";
//#region temp/packages/compiler-vapor-web/src/parse.d.ts
export declare function parse(source: string, options?: ParserOptions): RootNode;
//#endregion
//#region temp/packages/compiler-vapor-web/src/compile.d.ts
export declare function compile(source: string | RootNode, options?: CompilerOptions$2): VaporCodegenResult$1;
export declare function compileSSR(source: string | RootNode, options?: SSRCompilerOptions): CodegenResult;
interface SSRCompilerOptions extends CompilerOptions$1 {
  /** 仅用于在 SSR 组件解析前转换物理标签。 */
  ssrPreTagTransforms?: NodeTransform[];
}
//#endregion
export type { CompilerOptions, VaporCodegenResult };