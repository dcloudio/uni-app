import { DirectiveNode, ElementNode, Property, RootNode, ParentNode, TemplateChildNode, CompilerError, ExpressionNode } from '@vue/compiler-core';
import { CodegenScope, CodegenVForScope, CodegenVForScopeInit, TransformOptions } from './options';
export declare type NodeTransform = (node: RootNode | TemplateChildNode, context: TransformContext) => void | (() => void) | (() => void)[];
export declare type DirectiveTransform = (dir: DirectiveNode, node: ElementNode, context: TransformContext, augmentor?: (ret: DirectiveTransformResult) => DirectiveTransformResult) => DirectiveTransformResult;
interface DirectiveTransformResult {
    props: Property[];
    needRuntime?: boolean | symbol;
}
export interface ErrorHandlingOptions {
    onWarn?: (warning: CompilerError) => void;
    onError?: (error: CompilerError) => void;
}
export interface TransformContext extends Required<Omit<TransformOptions, 'filename'>> {
    currentNode: RootNode | TemplateChildNode | null;
    parent: ParentNode | null;
    childIndex: number;
    helpers: Map<symbol, number>;
    identifiers: {
        [name: string]: number | undefined;
    };
    scopes: {
        vFor: number;
    };
    scope: CodegenScope;
    currentScope: CodegenScope | CodegenVForScope;
    helper<T extends symbol>(name: T): T;
    removeHelper<T extends symbol>(name: T): void;
    helperString(name: symbol): string;
    onNodeRemoved(): void;
    addIdentifiers(exp: ExpressionNode | string): void;
    removeIdentifiers(exp: ExpressionNode | string): void;
    addVForScope(initScope: CodegenVForScopeInit): CodegenVForScope;
}
export declare function transform(root: RootNode, options: TransformOptions): TransformContext;
export declare function traverseNode(node: RootNode | TemplateChildNode, context: TransformContext): void;
export declare function traverseChildren(parent: ParentNode, context: TransformContext): void;
export declare function createTransformContext(root: RootNode, { isTS, inline, bindingMetadata, prefixIdentifiers, nodeTransforms, directiveTransforms, isBuiltInComponent, isCustomElement, expressionPlugins, onError, onWarn, }: TransformOptions): TransformContext;
export {};
