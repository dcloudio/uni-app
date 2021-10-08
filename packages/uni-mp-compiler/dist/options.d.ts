import { ParserPlugin } from '@babel/parser';
import { BindingMetadata, CompilerError } from '@vue/compiler-core';
import IdentifierGenerator from './identifier';
import { DirectiveTransform, NodeTransform } from './transform';
export interface ErrorHandlingOptions {
    onWarn?: (warning: CompilerError) => void;
    onError?: (error: CompilerError) => void;
}
interface SharedTransformCodegenOptions {
    inline?: boolean;
    isTS?: boolean;
    filename?: string;
    bindingMetadata?: BindingMetadata;
    prefixIdentifiers?: boolean;
}
export interface TransformOptions extends SharedTransformCodegenOptions, ErrorHandlingOptions {
    nodeTransforms?: NodeTransform[];
    directiveTransforms?: Record<string, DirectiveTransform | undefined>;
    isBuiltInComponent?: (tag: string) => symbol | void;
    isCustomElement?: (tag: string) => boolean | void;
    expressionPlugins?: ParserPlugin[];
}
export interface CodegenScope {
    id: IdentifierGenerator;
    identifiers: {
        [name: string]: number | undefined;
    };
    body: string[];
    scopes: CodegenVForScope[];
}
export interface CodegenVForScopeInit {
    source: string;
    value?: string;
    key?: string;
    index?: string;
    identifiers: {
        [name: string]: number | undefined;
    };
}
export interface CodegenVForScope extends CodegenScope, CodegenVForScopeInit {
}
export interface CodegenOptions extends SharedTransformCodegenOptions {
    mode?: 'module' | 'function';
    scopeId?: string | null;
    scope?: CodegenScope;
    runtimeModuleName?: string;
    runtimeGlobalName?: string;
}
export declare type CompilerOptions = TransformOptions & CodegenOptions;
export {};
