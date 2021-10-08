import { ExpressionNode, SimpleExpressionNode } from '@vue/compiler-core';
import { NodeTransform, TransformContext } from '../transform';
export declare const transformExpression: NodeTransform;
export declare function processExpression(node: SimpleExpressionNode, context: TransformContext, asParams?: boolean, asRawStatements?: boolean, localVars?: Record<string, number>): ExpressionNode;
