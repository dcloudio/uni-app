import { CodegenResult, CompoundExpressionNode, InterpolationNode, SimpleExpressionNode, TextNode } from '@vue/compiler-core';
import { CodegenOptions, CodegenScope } from './options';
export declare function generate(scope: CodegenScope, options: CodegenOptions): Omit<CodegenResult, 'ast'>;
declare type CodegenNode = SimpleExpressionNode | CompoundExpressionNode | InterpolationNode | TextNode | string | symbol;
interface GenNodeContext {
    code: string;
    helper(key: symbol): string;
    push(code: string, node?: CodegenNode): void;
}
export declare function genNode(node: CodegenNode | symbol | string, context?: GenNodeContext): GenNodeContext;
export {};
