import { IUniPageNode, UniBaseNode } from './Node';
export declare class UniElement extends UniBaseNode {
    tagName: string;
    constructor(nodeName: string, container: UniElement | IUniPageNode);
}
export declare class UniInputElement extends UniElement {
    get value(): string | number;
    set value(val: string | number);
}
export declare class UniTextAreaElement extends UniInputElement {
}
