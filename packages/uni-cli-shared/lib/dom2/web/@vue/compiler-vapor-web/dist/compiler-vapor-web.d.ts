import { CodegenResult, CompilerOptions as CompilerOptions$1, ElementNode, NodeTransform, ParserOptions, RootNode } from "@vue/compiler-dom";
import { CompilerOptions as CompilerOptions$2, VaporCodegenResult, VaporCodegenResult as VaporCodegenResult$1 } from "@vue/compiler-vapor";
import { UNI_APP_SCOPE_ID } from "@vue/shared";
//#region temp/packages/compiler-vapor-web/src/parse.d.ts
export declare function parse(source: string, options?: ParserOptions): RootNode;
//#endregion
//#region temp/packages/compiler-vapor-web/src/compile.d.ts
export interface CompilerOptions extends CompilerOptions$2 {
  /** 页面默认接收 App 样式；组件默认隔离，显式配置由 SFC 脚本分析提供。 */
  isUniPage?: (filename: string) => boolean;
}
export declare function compile(source: string | RootNode, options?: CompilerOptions): VaporCodegenResult$1;
export declare function compileSSR(source: string | RootNode, options?: SSRCompilerOptions): CodegenResult;
interface SSRCompilerOptions extends CompilerOptions$1 {
  /** 仅用于在 SSR 组件解析前转换物理标签。 */
  ssrPreTagTransforms?: NodeTransform[];
}
//#endregion
//#region temp/packages/compiler-vapor-web/src/uniElement.d.ts
export declare function resolveUniElementRoots(ast: RootNode | undefined, name: string): ElementNode[] | undefined;
//#endregion
export { UNI_APP_SCOPE_ID, type VaporCodegenResult };