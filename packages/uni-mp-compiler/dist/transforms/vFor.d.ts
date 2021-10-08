import { ExpressionNode, SimpleExpressionNode, ElementTypes, ElementNode } from '@vue/compiler-core';
import { NodeTransform, TransformContext } from '../transform';
export interface VForOptions {
    source: string;
    value: string;
    key: string;
    index: string;
}
export declare type ForElementNode = ElementNode & {
    vFor: VForOptions;
};
export declare function isForElementNode(node: unknown): node is ForElementNode;
export declare const transformFor: NodeTransform;
export interface ForParseResult {
    source: ExpressionNode;
    value: ExpressionNode | undefined;
    key: ExpressionNode | undefined;
    index: ExpressionNode | undefined;
    tagType: ElementTypes;
}
export declare function parseForExpression(input: SimpleExpressionNode, context: TransformContext): ForParseResult | undefined;
export declare function createForLoopParams({ value, key, index }: ForParseResult, memoArgs?: ExpressionNode[]): ExpressionNode[];
