import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { State } from '.';
export declare type Slots = t.Identifier | t.ObjectExpression | null;
declare const buildProps: (path: NodePath<t.JSXElement>, state: State) => {
    tag: t.CallExpression | t.Identifier | t.StringLiteral | t.MemberExpression;
    props: t.Expression;
    isComponent: boolean;
    slots: null;
    directives: t.ArrayExpression[];
    patchFlag: number;
    dynamicPropNames: Set<string>;
};
export default buildProps;
