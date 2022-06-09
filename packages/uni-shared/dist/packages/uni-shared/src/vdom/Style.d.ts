export declare type UniCSSStyleDeclarationJSON = string | null | Record<string, string | string[]> | [string, Record<string, string | string[]>];
export declare class UniCSSStyleDeclaration {
    [name: string]: string | unknown;
    private _cssText;
    private _value;
    setProperty(property: string, value: string | null): void;
    getPropertyValue(property: string): string | string[];
    removeProperty(property: string): string;
    get cssText(): string;
    set cssText(cssText: string);
    toJSON(): UniCSSStyleDeclarationJSON | undefined;
}
export declare function proxyStyle(uniCssStyle: UniCSSStyleDeclaration): UniCSSStyleDeclaration;
