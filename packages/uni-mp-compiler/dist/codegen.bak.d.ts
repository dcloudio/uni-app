import { RootNode, CodegenContext, CodegenResult, CompoundExpressionNode, SimpleExpressionNode, InterpolationNode, TextNode } from '@vue/compiler-core';
import { CodegenOptions } from './options';
interface MPCodegenContext extends Omit<CodegenContext, 'sourceMap' | 'optimizeImports' | 'ssrRuntimeModuleName' | 'ssr' | 'inSSR'> {
}
export declare function generate(ast: RootNode, options?: CodegenOptions & {
    onContextCreated?: (context: MPCodegenContext) => void;
}): CodegenResult;
declare type CodegenNode = SimpleExpressionNode | CompoundExpressionNode | InterpolationNode | TextNode | string | symbol;
interface GenNodeContext {
    code: string;
    helper(key: symbol): string;
    push(code: string, node?: CodegenNode): void;
}
export declare function genNode(node: CodegenNode | symbol | string, context?: GenNodeContext): GenNodeContext;
export {};
