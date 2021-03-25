import * as t from '@babel/types';
import * as BabelCore from '@babel/core';
import { NodePath } from '@babel/traverse';
export declare type State = {
    get: (name: string) => any;
    set: (name: string, value: any) => any;
    opts: VueJSXPluginOptions;
};
export interface VueJSXPluginOptions {
    /** transform `on: { click: xx }` to `onClick: xxx` */
    transformOn?: boolean;
    /** enable optimization or not. */
    optimize?: boolean;
    /** merge static and dynamic class / style attributes / onXXX handlers */
    mergeProps?: boolean;
    /** configuring custom elements */
    isCustomElement?: (tag: string) => boolean;
    /** enable object slots syntax */
    enableObjectSlots?: boolean;
}
export declare type ExcludesBoolean = <T>(x: T | false | true) => x is T;
declare const _default: ({ types }: typeof BabelCore) => {
    name: string;
    inherits: any;
    visitor: {
        Program: {
            enter(path: NodePath<t.Program>, state: State): void;
            exit(path: NodePath<t.Program>): void;
        };
        JSXFragment: {
            enter(path: BabelCore.NodePath<t.JSXElement>, state: State): void;
        };
        JSXElement: {
            exit(path: BabelCore.NodePath<t.JSXElement>, state: State): void;
        };
    };
};
export default _default;
