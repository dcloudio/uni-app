import { CompilerError, RawSourceMap, RootNode } from '@vue/compiler-dom';
export { parse } from '@vue/compiler-dom';
import * as PostCss from 'postcss';
import { CompilerOptions, VaporCodegenResult, RootIRNode } from '@vue/compiler-vapor';
import tsType, { ClassDeclaration } from 'typescript';

export declare enum RENDERER_TYPE {
    ELEMENT = "element",
    NATIVE_VIEW = "nativeView"
}
export declare enum DOM2_APP_PLATFORM {
    APP_ANDROID = "app-android",
    APP_HARMONY = "app-harmony",
    APP_IOS = "app-ios"
}
declare enum DOM2_APP_TARGET {
    DOM_C = "dom-c",
    DOM_KT = "dom-kt",
    NV_KT = "nv-kt",
    TXT_KT = "txt-kt",
    DOM_OC = "dom-oc",
    NV_C = "nv-c",
    TXT_C = "txt-c",
    DOM_TS = "dom-ts"
}
interface Dom2StaticStylePropertyValue {
    valueCode: string;
    setterCode: string;
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
    root: string;
    componentType: COMPONENT_TYPE;
    className: string;
    platform: DOM2_APP_PLATFORM;
    relativeFilename?: string;
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
    parseStaticStyle?: (target: DOM2_APP_TARGET, tagName: string, style: string) => {
        obj: Record<string, Dom2StaticStylePropertyValue>;
        messages: PostCss.Message[];
    };
    onError?: (error: CompilerError) => void;
    onWarn?: (warning: CompilerError) => void;
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
    platform: DOM2_APP_PLATFORM;
    targetLanguage: TARGET_LANGUAGE;
    ts: typeof tsType;
    componentType: COMPONENT_TYPE;
    renderElementCode: string;
    renderNativeViewCode: string;
}
interface SharedDataGenerateSingleFile {
    name: string;
    code: string;
    class: string;
}
interface SharedDataClassGenerateSingleResult {
    files: SharedDataGenerateSingleFile[];
}
interface SharedDataGenerateFile extends Omit<SharedDataGenerateSingleFile, 'class'> {
    classes: string[];
}
interface SharedDataClassGenerateResult {
    files: SharedDataGenerateFile[];
}

interface ICppSharedDataClassGenerateResult extends SharedDataClassGenerateSingleResult {
    groupName?: string;
}

export declare function genSharedDataClass(decl: ClassDeclaration, options: SharedDataClassGenerateOptions): ICppSharedDataClassGenerateResult;
export declare function genSharedData(decls: ClassDeclaration[], options: SharedDataClassGenerateOptions): SharedDataClassGenerateResult;

export { DOM2_APP_PLATFORM as TARGET_PLATFORM,  };
