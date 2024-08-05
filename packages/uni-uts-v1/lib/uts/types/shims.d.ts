declare global {
    // 必须补充 new 构造器，后续支持了 new String()，就应该不需要了，不然 vue 的 PropType 会报错 { type: String, default: '' }
    interface StringConstructor {
        new (value?: any): String;
    }
    // @vue/runtime-core 中用到的
    interface Node {}
    interface Element {}
    interface ShadowRoot {}
    interface HTMLElementEventMap {}
    interface HTMLElementTagNameMap {}
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $callMethod(method: string, ...args: Array<any | null>): any | null;
    }
}
export {}