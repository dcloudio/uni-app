import { RawSourceMap, RootNode } from '@vue/compiler-dom';
export { parse } from '@vue/compiler-dom';
import { CompilerOptions, VaporCodegenResult, RootIRNode } from '@vue/compiler-vapor';
import tsType, { ClassDeclaration } from 'typescript';

export declare enum RENDERER_TYPE {
    ELEMENT = "element",
    NATIVE_VIEW = "nativeView"
}
export declare enum TARGET_PLATFORM {
    APP_ANDROID = "app-android",
    APP_HARMONY = "app-harmony",
    APP_IOS = "app-ios"
}
export declare enum TARGET_LANGUAGE {
    TS = "ts",
    CPP = "cpp",
    KOTLIN = "kotlin",
    SWIFT = "swift"
}
export declare enum COMPONENT_TYPE {
    APP = "app",
    PAGE = "page",
    COMPONENT = "component"
}
type BaseDom2SharedOptions = {
    componentType: COMPONENT_TYPE;
    className: string;
    platform: TARGET_PLATFORM;
    /**
     * 是否忽略属性
     * @param name
     * @returns
     */
    isIgnoreAttr?: (name: string) => boolean;
    /**
     * 样式解析函数
     * 用于解析静态样式，主要在代码生成阶段使用
     * @default null
     */
    parseStaticStyle?: (type: RENDERER_TYPE, style: string) => Record<string, unknown>;
};
export interface VaporDom2CompilerOptions extends CompilerOptions, BaseDom2SharedOptions {
    emitElement?: (result: VaporCodegenResult) => void;
    emitNativeView?: (result: VaporCodegenResult) => void;
}
interface BaseCodegenResult {
    sharedData: {
        ast: RootIRNode;
        helpers: Set<string>;
        code: string;
        preamble: string;
        map?: RawSourceMap;
    };
    nativeView: {
        ast: RootIRNode;
        helpers: Set<string>;
        code: string;
        preamble: string;
        map?: RawSourceMap;
    };
    element: {
        ast: RootIRNode;
        helpers: Set<string>;
        code: string;
        preamble: string;
        map?: RawSourceMap;
    };
}
type VaporDom2CodegenResult = BaseCodegenResult & BaseCodegenResult['sharedData'];

export declare function compile(source: string | RootNode, options: VaporDom2CompilerOptions): VaporDom2CodegenResult;

export interface SharedDataClassGenerateOptions {
    platform: TARGET_PLATFORM;
    targetLanguage: TARGET_LANGUAGE;
    ts: typeof tsType;
    componentType: COMPONENT_TYPE;
    renderElementCode: string;
    renderNativeViewCode: string;
}
interface SharedDataClassGenerateResult {
    code: string;
}

export declare function genSharedDataClass(decl: ClassDeclaration, options: SharedDataClassGenerateOptions): SharedDataClassGenerateResult;
export declare function genSharedData(decls: ClassDeclaration[], options: SharedDataClassGenerateOptions): SharedDataClassGenerateResult;


