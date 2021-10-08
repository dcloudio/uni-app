import { NodeTransform } from '../transform';
export interface IfNode {
    name: string;
    condition: string;
}
export declare const transformIf: NodeTransform;
