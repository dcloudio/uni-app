import { AttributeNode, DirectiveNode, ElementNode, RootNode, TemplateChildNode } from '@vue/compiler-core';
import { TemplateCodegenOptions } from '../options';
interface TemplateCodegenContext {
    code: string;
    push(code: string): void;
}
export declare function generate({ children }: RootNode, { emitFile, filename }: TemplateCodegenOptions): void;
export declare function genNode(node: TemplateChildNode, context: TemplateCodegenContext): void;
export declare function genElement(node: ElementNode, context: TemplateCodegenContext): void;
export declare function genElementProps(props: Array<AttributeNode | DirectiveNode>, context: TemplateCodegenContext): void;
export {};
