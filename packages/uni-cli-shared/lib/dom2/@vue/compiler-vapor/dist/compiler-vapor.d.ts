import { SimpleExpressionNode, RootNode, Node, TemplateChildNode, DirectiveNode, CompoundExpressionNode, AllNode, ElementNode, CompilerCompatOptions, CommentNode, TransformOptions as TransformOptions$1, CodegenOptions as CodegenOptions$1, BaseCodegenResult, SourceLocation, CodegenSourceMapGenerator, TemplateNode, CompilerOptions as CompilerOptions$1, CompilerError, BindingMetadata } from '@vue/compiler-dom';
export { parse } from '@vue/compiler-dom';
import * as packages_runtime_vapor_src from 'packages/runtime-vapor/src';
import * as packages_runtime_dom_src from 'packages/runtime-dom/src';
import { Prettify } from '@vue/shared';

export interface IRProp extends Omit<DirectiveTransformResult, 'value'> {
    values: SimpleExpressionNode[];
}
export declare enum IRDynamicPropsKind {
    EXPRESSION = 0,// v-bind="value"
    ATTRIBUTE = 1
}
export type IRPropsStatic = IRProp[];
export interface IRPropsDynamicExpression {
    kind: IRDynamicPropsKind.EXPRESSION;
    value: SimpleExpressionNode;
    handler?: boolean;
}
export interface IRPropsDynamicAttribute extends IRProp {
    kind: IRDynamicPropsKind.ATTRIBUTE;
}
export type IRProps = IRPropsStatic | IRPropsDynamicAttribute | IRPropsDynamicExpression;
export interface SlotBlockIRNode extends BlockIRNode {
    props?: SimpleExpressionNode;
}
export declare enum IRSlotType {
    STATIC = 0,
    DYNAMIC = 1,
    LOOP = 2,
    CONDITIONAL = 3,
    EXPRESSION = 4
}
export type IRSlotsStatic = {
    slotType: IRSlotType.STATIC;
    slots: Record<string, SlotBlockIRNode>;
};
export interface IRSlotDynamicBasic {
    slotType: IRSlotType.DYNAMIC;
    name: SimpleExpressionNode;
    fn: SlotBlockIRNode;
}
export interface IRSlotDynamicLoop {
    slotType: IRSlotType.LOOP;
    name: SimpleExpressionNode;
    fn: SlotBlockIRNode;
    loop: IRFor;
}
export interface IRSlotDynamicConditional {
    slotType: IRSlotType.CONDITIONAL;
    condition: SimpleExpressionNode;
    positive: IRSlotDynamicBasic;
    negative?: IRSlotDynamicBasic | IRSlotDynamicConditional;
}
export interface IRSlotsExpression {
    slotType: IRSlotType.EXPRESSION;
    slots: SimpleExpressionNode;
}
export type IRSlotDynamic = IRSlotDynamicBasic | IRSlotDynamicLoop | IRSlotDynamicConditional;
export type IRSlots = IRSlotsStatic | IRSlotDynamic | IRSlotsExpression;

export declare enum IRNodeTypes {
    ROOT = 0,
    BLOCK = 1,
    SET_PROP = 2,
    SET_DYNAMIC_PROPS = 3,
    SET_TEXT = 4,
    SET_EVENT = 5,
    SET_DYNAMIC_EVENTS = 6,
    SET_HTML = 7,
    SET_TEMPLATE_REF = 8,
    INSERT_NODE = 9,
    PREPEND_NODE = 10,
    CREATE_COMPONENT_NODE = 11,
    SLOT_OUTLET_NODE = 12,
    DIRECTIVE = 13,
    DECLARE_OLD_REF = 14,// consider make it more general
    IF = 15,
    FOR = 16,
    GET_TEXT_CHILD = 17
}
export interface BaseIRNode {
    type: IRNodeTypes;
    node: Node;
}
export type CoreHelper = keyof typeof packages_runtime_dom_src;
export type VaporHelper = keyof typeof packages_runtime_vapor_src;
export interface BlockIRNode extends BaseIRNode {
    type: IRNodeTypes.BLOCK;
    node: RootNode | TemplateChildNode;
    dynamic: IRDynamicInfo;
    tempId: number;
    effect: IREffect[];
    operation: OperationNode[];
    returns: number[];
}
export interface RootIRNode {
    type: IRNodeTypes.ROOT;
    node: RootNode;
    source: string;
    template: string[];
    rootTemplateIndex?: number;
    component: Set<string>;
    directive: Set<string>;
    block: BlockIRNode;
    hasTemplateRef: boolean;
}
export interface IfIRNode extends BaseIRNode {
    type: IRNodeTypes.IF;
    id: number;
    condition: SimpleExpressionNode;
    positive: BlockIRNode;
    negative?: BlockIRNode | IfIRNode;
    once?: boolean;
    parent?: number;
    anchor?: number;
}
export interface IRFor {
    source: SimpleExpressionNode;
    value?: SimpleExpressionNode;
    key?: SimpleExpressionNode;
    index?: SimpleExpressionNode;
}
export interface ForIRNode extends BaseIRNode, IRFor {
    type: IRNodeTypes.FOR;
    id: number;
    keyProp?: SimpleExpressionNode;
    render: BlockIRNode;
    once: boolean;
    component: boolean;
    onlyChild: boolean;
    parent?: number;
    anchor?: number;
}
export interface SetPropIRNode extends BaseIRNode {
    type: IRNodeTypes.SET_PROP;
    element: number;
    prop: IRProp;
    root: boolean;
    tag: string;
}
export interface SetDynamicPropsIRNode extends BaseIRNode {
    type: IRNodeTypes.SET_DYNAMIC_PROPS;
    element: number;
    props: IRProps[];
    root: boolean;
    /**
     * fixed by uts 当前整个动态绑定表达式对应的标识符，因为动态绑定需要在sharedData层对数据做格式化，不能单个生成标识符，不然需要在c层再格式化一次
     */
    sharedData?: SimpleExpressionNode['sharedData'];
}
export interface SetDynamicEventsIRNode extends BaseIRNode {
    type: IRNodeTypes.SET_DYNAMIC_EVENTS;
    element: number;
    event: SimpleExpressionNode;
}
export interface SetTextIRNode extends BaseIRNode {
    type: IRNodeTypes.SET_TEXT;
    element: number;
    values: SimpleExpressionNode[];
    generated?: boolean;
    jsx?: boolean;
}
export type KeyOverride = [find: string, replacement: string];
export interface SetEventIRNode extends BaseIRNode {
    type: IRNodeTypes.SET_EVENT;
    element: number;
    key: SimpleExpressionNode;
    value?: SimpleExpressionNode;
    modifiers: {
        options: string[];
        keys: string[];
        nonKeys: string[];
    };
    keyOverride?: KeyOverride;
    delegate: boolean;
    /** Whether it's in effect */
    effect: boolean;
    /**
     * fixed by uts 因为 value 可能不存在，所以挂在 SetEventIRNode 上
     */
    sharedData?: SimpleExpressionNode['sharedData'];
}
export interface SetHtmlIRNode extends BaseIRNode {
    type: IRNodeTypes.SET_HTML;
    element: number;
    value: SimpleExpressionNode;
}
export interface SetTemplateRefIRNode extends BaseIRNode {
    type: IRNodeTypes.SET_TEMPLATE_REF;
    element: number;
    value: SimpleExpressionNode;
    refFor: boolean;
    effect: boolean;
}
export interface InsertNodeIRNode extends BaseIRNode {
    type: IRNodeTypes.INSERT_NODE;
    elements: number[];
    parent: number;
    anchor?: number;
}
export interface PrependNodeIRNode extends BaseIRNode {
    type: IRNodeTypes.PREPEND_NODE;
    elements: number[];
    parent: number;
}
export interface DirectiveIRNode extends BaseIRNode {
    type: IRNodeTypes.DIRECTIVE;
    element: number;
    dir: VaporDirectiveNode;
    name: string;
    builtin?: boolean;
    asset?: boolean;
    modelType?: 'text' | 'dynamic' | 'radio' | 'checkbox' | 'select';
}
export interface CreateComponentIRNode extends BaseIRNode {
    type: IRNodeTypes.CREATE_COMPONENT_NODE;
    id: number;
    tag: string;
    props: IRProps[];
    slots: IRSlots[];
    asset: boolean;
    root: boolean;
    once: boolean;
    dynamic?: SimpleExpressionNode;
    parent?: number;
    anchor?: number;
    /**
     * fixed by uts 当前表达式对应的标识符
     */
    sharedData?: SimpleExpressionNode['sharedData'];
}
export interface DeclareOldRefIRNode extends BaseIRNode {
    type: IRNodeTypes.DECLARE_OLD_REF;
    id: number;
}
export interface SlotOutletIRNode extends BaseIRNode {
    type: IRNodeTypes.SLOT_OUTLET_NODE;
    id: number;
    name: SimpleExpressionNode;
    props: IRProps[];
    fallback?: BlockIRNode;
    parent?: number;
    anchor?: number;
}
export interface GetTextChildIRNode extends BaseIRNode {
    type: IRNodeTypes.GET_TEXT_CHILD;
    parent: number;
}
export type IRNode = OperationNode | RootIRNode;
export type OperationNode = SetPropIRNode | SetDynamicPropsIRNode | SetTextIRNode | SetEventIRNode | SetDynamicEventsIRNode | SetHtmlIRNode | SetTemplateRefIRNode | InsertNodeIRNode | PrependNodeIRNode | DirectiveIRNode | IfIRNode | ForIRNode | CreateComponentIRNode | DeclareOldRefIRNode | SlotOutletIRNode | GetTextChildIRNode;
export declare enum DynamicFlag {
    NONE = 0,
    /**
     * This node is referenced and needs to be saved as a variable.
     */
    REFERENCED = 1,
    /**
     * This node is not generated from template, but is generated dynamically.
     */
    NON_TEMPLATE = 2,
    /**
     * This node needs to be inserted back into the template.
     */
    INSERT = 4
}
export interface IRDynamicInfo {
    id?: number;
    flags: DynamicFlag;
    anchor?: number;
    children: IRDynamicInfo[];
    template?: number;
    hasDynamicChild?: boolean;
    operation?: OperationNode;
}
export interface IREffect {
    expressions: SimpleExpressionNode[];
    operations: OperationNode[];
    /**
     * fixed by uts 标记当前 effect 是否已生成代码
     */
    generated?: boolean;
}
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & Pick<U, Extract<keyof U, keyof T>>;
export type HackOptions<T> = Prettify<Overwrite<T, {
    nodeTransforms?: NodeTransform[];
    directiveTransforms?: Record<string, DirectiveTransform | undefined>;
}>>;
export type VaporDirectiveNode = Overwrite<DirectiveNode, {
    exp: Exclude<DirectiveNode['exp'], CompoundExpressionNode>;
    arg: Exclude<DirectiveNode['arg'], CompoundExpressionNode>;
}>;
export type InsertionStateTypes = IfIRNode | ForIRNode | SlotOutletIRNode | CreateComponentIRNode;
export declare function isBlockOperation(op: OperationNode): op is InsertionStateTypes;

export type NodeTransform = (node: RootNode | TemplateChildNode, context: TransformContext<RootNode | TemplateChildNode>) => void | (() => void) | (() => void)[];
export type DirectiveTransform = (dir: VaporDirectiveNode, node: ElementNode, context: TransformContext<ElementNode>) => DirectiveTransformResult | void;
interface DirectiveTransformResult {
    key: SimpleExpressionNode;
    value: SimpleExpressionNode;
    modifier?: '.' | '^';
    runtimeCamelize?: boolean;
    handler?: boolean;
    handlerModifiers?: string[];
    model?: boolean;
    modelModifiers?: string[];
}
export type StructuralDirectiveTransform = (node: ElementNode, dir: VaporDirectiveNode, context: TransformContext<ElementNode>) => void | (() => void);
type TransformOptions = HackOptions<TransformOptions$1>;
export declare class TransformContext<T extends AllNode = AllNode> {
    ir: RootIRNode;
    node: T;
    selfName: string | null;
    parent: TransformContext<RootNode | ElementNode> | null;
    root: TransformContext<RootNode>;
    index: number;
    block: BlockIRNode;
    options: Required<Omit<TransformOptions, 'filename' | keyof CompilerCompatOptions>>;
    template: string;
    childrenTemplate: (string | null)[];
    dynamic: IRDynamicInfo;
    inVOnce: boolean;
    inVFor: number;
    comment: CommentNode[];
    component: Set<string>;
    directive: Set<string>;
    slots: IRSlots[];
    private globalId;
    constructor(ir: RootIRNode, node: T, options?: TransformOptions);
    enterBlock(ir: BlockIRNode, isVFor?: boolean): () => void;
    increaseId: () => number;
    reference(): number;
    pushTemplate(content: string): number;
    registerTemplate(): number;
    registerEffect(expressions: SimpleExpressionNode[], operation: OperationNode | OperationNode[], getIndex?: () => number): void;
    registerOperation(...node: OperationNode[]): void;
    create<T extends TemplateChildNode>(node: T, index: number): TransformContext<T>;
}
export declare function transform(node: RootNode, options?: TransformOptions): RootIRNode;
export declare function createStructuralDirectiveTransform(name: string | string[], fn: StructuralDirectiveTransform): NodeTransform;

export type CodegenOptions = Omit<CodegenOptions$1, 'optimizeImports'>;
export declare class CodegenContext {
    ir: RootIRNode;
    options: Required<CodegenOptions>;
    helpers: Set<string>;
    helper: (name: CoreHelper | VaporHelper) => string;
    delegates: Set<string>;
    identifiers: Record<string, (string | SimpleExpressionNode)[]>;
    seenInlineHandlerNames: Record<string, number>;
    block: BlockIRNode;
    withId<T>(fn: () => T, map: Record<string, string | SimpleExpressionNode | null>): T;
    enterBlock(block: BlockIRNode): () => BlockIRNode;
    scopeLevel: number;
    enterScope(): [level: number, exit: () => number];
    constructor(ir: RootIRNode, options: CodegenOptions);
}
export interface VaporCodegenResult extends BaseCodegenResult {
    ast: RootIRNode;
    helpers: Set<string>;
}
export declare function generate(ir: RootIRNode, options?: CodegenOptions): VaporCodegenResult;

export declare const NEWLINE: unique symbol;
/** increase offset but don't push actual code */
export declare const LF: unique symbol;
export declare const INDENT_START: unique symbol;
export declare const INDENT_END: unique symbol;
type FalsyValue = false | null | undefined;
export type CodeFragment = typeof NEWLINE | typeof LF | typeof INDENT_START | typeof INDENT_END | string | [code: string, newlineIndex?: number, loc?: SourceLocation, name?: string] | FalsyValue;
export type CodeFragments = Exclude<CodeFragment, any[]> | CodeFragment[];
export declare function buildCodeFragment(...frag: CodeFragment[]): [
    CodeFragment[],
    (...items: CodeFragment[]) => number,
    (...items: CodeFragment[]) => number
];
export type CodeFragmentDelimiters = [
    left: CodeFragments,
    right: CodeFragments,
    delimiter: CodeFragments,
    placeholder?: CodeFragments
];
export declare function genMulti([left, right, seg, placeholder]: CodeFragmentDelimiters, ...frags: CodeFragments[]): CodeFragment[];
export declare const DELIMITERS_ARRAY: CodeFragmentDelimiters;
export declare const DELIMITERS_ARRAY_NEWLINE: CodeFragmentDelimiters;
export declare const DELIMITERS_OBJECT: CodeFragmentDelimiters;
export declare const DELIMITERS_OBJECT_NEWLINE: CodeFragmentDelimiters;
export declare function genCall(name: string | [name: string, placeholder?: CodeFragments], ...frags: CodeFragments[]): CodeFragment[];
export declare function codeFragmentToString(code: CodeFragment[], context: CodegenContext): [code: string, map: CodegenSourceMapGenerator | undefined];

export declare function wrapTemplate(node: ElementNode, dirs: string[]): TemplateNode;

export declare function compile(source: string | RootNode, options?: CompilerOptions): VaporCodegenResult;
export type CompilerOptions = HackOptions<CompilerOptions$1>;
export type TransformPreset = [
    NodeTransform[],
    Record<string, DirectiveTransform>
];
export declare function getBaseTransformPreset(): TransformPreset;

export interface VaporCompilerError extends CompilerError {
    code: VaporErrorCodes;
}
export declare function createVaporCompilerError(code: VaporErrorCodes, loc?: SourceLocation): VaporCompilerError;
export declare enum VaporErrorCodes {
    X_V_PLACEHOLDER = 100,
    __EXTEND_POINT__ = 101
}
export declare const VaporErrorMessages: Record<VaporErrorCodes, string>;

export declare const transformElement: NodeTransform;

export declare const transformChildren: NodeTransform;

export declare const transformTemplateRef: NodeTransform;

export declare const transformText: NodeTransform;

export declare const transformVBind: DirectiveTransform;

export declare const transformVHtml: DirectiveTransform;

export declare const transformVOn: DirectiveTransform;

export declare const transformVOnce: NodeTransform;

export declare const transformVShow: DirectiveTransform;

export declare const transformVText: DirectiveTransform;

export declare const transformVIf: NodeTransform;

export declare const transformVFor: NodeTransform;

export declare const transformVModel: DirectiveTransform;

export declare const transformComment: NodeTransform;

export declare const transformSlotOutlet: NodeTransform;

export declare const transformVSlot: NodeTransform;

export declare function isConstantExpression(exp: SimpleExpressionNode): boolean;
export declare function isStaticExpression(node: SimpleExpressionNode, bindings: BindingMetadata): boolean;
export declare function getLiteralExpressionValue(exp: SimpleExpressionNode): number | string | boolean | null;


