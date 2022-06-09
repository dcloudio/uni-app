import { UniElement } from './Element';
import { IUniPageNode, UniBaseNode } from './Node';
export declare class UniTextNode extends UniBaseNode {
    constructor(text: string, container: UniElement | IUniPageNode);
    get nodeValue(): string;
    set nodeValue(text: string);
}
