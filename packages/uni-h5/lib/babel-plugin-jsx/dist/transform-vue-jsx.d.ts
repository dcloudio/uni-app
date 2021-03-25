import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { State } from '.';
declare const transformJSXElement: (path: NodePath<t.JSXElement>, state: State) => t.CallExpression;
export { transformJSXElement };
declare const _default: {
    JSXElement: {
        exit(path: NodePath<t.JSXElement>, state: State): void;
    };
};
export default _default;
