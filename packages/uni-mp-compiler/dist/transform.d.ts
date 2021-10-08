import { DirectiveNode, ElementNode, Property, RootNode, ParentNode, TemplateChildNode, CompilerError, ExpressionNode } from '@vue/compiler-core';
import { CodegenRootScope, CodegenScope, CodegenVForScope, CodegenVForScopeInit, CodegenVIfScope, CodegenVIfScopeInit, TransformOptions } from './options';
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
    scope: CodegenRootScope;
    currentScope: CodegenScope;
    helper<T extends symbol>(name: T): T;
    removeHelper<T extends symbol>(name: T): void;
    helperString(name: symbol): string;
    replaceNode(node: TemplateChildNode): void;
    removeNode(node?: TemplateChildNode): void;
    onNodeRemoved(): void;
    addIdentifiers(exp: ExpressionNode | string): void;
    removeIdentifiers(exp: ExpressionNode | string): void;
    popScope(): CodegenScope | undefined;
    addVIfScope(initScope: CodegenVIfScopeInit): CodegenVIfScope;
    addVForScope(initScope: CodegenVForScopeInit): CodegenVForScope;
}
export declare function isRootScope(scope: CodegenScope): scope is CodegenRootScope;
export declare function isVIfScope(scope: CodegenScope): scope is CodegenVIfScope;
export declare function isVForScope(scope: CodegenScope): scope is CodegenVForScope;
export declare function transform(root: RootNode, options: TransformOptions): TransformContext;
export declare function traverseNode(node: RootNode | TemplateChildNode, context: TransformContext): void;
export declare function traverseChildren(parent: ParentNode, context: TransformContext): void;
export declare function createTransformContext(root: RootNode, { isTS, inline, bindingMetadata, prefixIdentifiers, nodeTransforms, directiveTransforms, isBuiltInComponent, isCustomElement, expressionPlugins, onError, onWarn, }: TransformOptions): TransformContext;
export declare type StructuralDirectiveTransform = (node: ElementNode, dir: DirectiveNode, context: TransformContext) => void | (() => void);
export declare function createStructuralDirectiveTransform(name: string | RegExp, fn: StructuralDirectiveTransform): NodeTransform;
export {};
