import { DirectiveNode, ElementNode, IfNode } from '@vue/compiler-core';
import { NodeTransform, TransformContext } from '../transform';
interface IfOptions {
    name: string;
    condition?: string;
}
export declare type IfElementNode = ElementNode & {
    vIf: IfOptions;
};
export declare function isIfElementNode(node: unknown): node is IfElementNode;
export declare const transformIf: NodeTransform;
export declare function processIf(node: ElementNode, dir: DirectiveNode, context: TransformContext, processCodegen?: (node: IfNode, branch: IfElementNode, isRoot: boolean) => (() => void) | undefined): (() => void) | undefined;
export {};
