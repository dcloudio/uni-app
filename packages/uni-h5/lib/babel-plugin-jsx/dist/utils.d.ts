import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { State } from '.';
import SlotFlags from './slotFlags';
declare const JSX_HELPER_KEY = "JSX_HELPER_KEY";
declare const FRAGMENT = "Fragment";
/**
 * create Identifier
 * @param path NodePath
 * @param state
 * @param name string
 * @returns MemberExpression
 */
declare const createIdentifier: (state: State, name: string) => t.Identifier | t.MemberExpression;
/**
 * Checks if string is describing a directive
 * @param src string
 */
declare const isDirective: (src: string) => boolean;
/**
 * Should transformed to slots
 * @param tag string
 * @returns boolean
 */
declare const shouldTransformedToSlots: (tag: string) => boolean;
/**
 * Check if a Node is a component
 *
 * @param t
 * @param path JSXOpeningElement
 * @returns boolean
 */
declare const checkIsComponent: (path: NodePath<t.JSXOpeningElement>) => boolean;
/**
 * Transform JSXMemberExpression to MemberExpression
 * @param path JSXMemberExpression
 * @returns MemberExpression
 */
declare const transformJSXMemberExpression: (path: NodePath<t.JSXMemberExpression>) => t.MemberExpression;
/**
 * Get tag (first attribute for h) from JSXOpeningElement
 * @param path JSXElement
 * @param state State
 * @returns Identifier | StringLiteral | MemberExpression | CallExpression
 */
declare const getTag: (path: NodePath<t.JSXElement>, state: State) => t.Identifier | t.CallExpression | t.StringLiteral | t.MemberExpression;
declare const getJSXAttributeName: (path: NodePath<t.JSXAttribute>) => string;
/**
 * Transform JSXText to StringLiteral
 * @param path JSXText
 * @returns StringLiteral | null
 */
declare const transformJSXText: (path: NodePath<t.JSXText>) => t.StringLiteral | null;
/**
 * Transform JSXExpressionContainer to Expression
 * @param path JSXExpressionContainer
 * @returns Expression
 */
declare const transformJSXExpressionContainer: (path: NodePath<t.JSXExpressionContainer>) => (t.Expression);
/**
 * Transform JSXSpreadChild
 * @param path JSXSpreadChild
 * @returns SpreadElement
 */
declare const transformJSXSpreadChild: (path: NodePath<t.JSXSpreadChild>) => t.SpreadElement;
declare const walksScope: (path: NodePath, name: string, slotFlag: SlotFlags) => void;
declare const buildIIFE: (path: NodePath<t.JSXElement>, children: t.Expression[]) => t.Expression[];
export { createIdentifier, isDirective, checkIsComponent, transformJSXMemberExpression, getTag, getJSXAttributeName, transformJSXText, transformJSXSpreadChild, transformJSXExpressionContainer, shouldTransformedToSlots, FRAGMENT, walksScope, buildIIFE, JSX_HELPER_KEY, };
