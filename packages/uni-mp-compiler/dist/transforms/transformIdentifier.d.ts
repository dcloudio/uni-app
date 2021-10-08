import { Expression } from '@babel/types';
import { ExpressionNode, SimpleExpressionNode } from '@vue/compiler-core';
import { CodegenScope } from '../options';
import { NodeTransform } from '../transform';
export declare const transformIdentifier: NodeTransform;
export declare function rewriteExpression(node: ExpressionNode, scope: CodegenScope, babelNode?: Expression): SimpleExpressionNode;
