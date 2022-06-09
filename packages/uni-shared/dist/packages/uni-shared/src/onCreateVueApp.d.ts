import type { App } from 'vue';
declare type CreateVueAppHook = (app: App) => void;
/**
 * 提供 createApp 的回调事件，方便三方插件接收 App 对象，处理挂靠全局 mixin 之类的逻辑
 */
export declare function onCreateVueApp(hook: CreateVueAppHook): void;
export declare function invokeCreateVueAppHook(app: App): void;
export {};
