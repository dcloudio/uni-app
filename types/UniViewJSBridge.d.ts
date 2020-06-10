export interface UniViewJSBridge {
    /**
     * 监听 View 的自定义事件。事件由 emit 触发，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    on(event: string | string[], callback: Function);
    /**
     * 监听 View 的自定义事件。仅触发一次，在第一次触发之后移除监听器。
     * @param event
     * @param callback
     */
    once(event: string, callback: Function);
    /**
     * 移除 View 的自定义事件监听器。
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    off(event?: string | string[], callback?: Function);
    /**
     * 触发 View 的事件。附加参数都会传给监听器回调。
     * @param event
     * @param args
     */
    emit(event: string, ...args: any[]);
    /**
     * 订阅 Service 的自定义事件，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event 
     * @param callback 
     */
    subscribe(event: string, callback: Function);
    /**
     * 取消订阅 Service 的自定义事件
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event 
     * @param callback 
     */
    unsubscribe(event: string, callback?: Function);
    /**
     * 接收 Service 层事件(通常由 Service 层调用，并暴露至全局 UniViewJSBridge 对象中)
     * @param event
     * @param args
     */
    subscribeHandler(event: string, args: any)
    /**
     * 向 Service 层发送事件
     * @param event
     * @param args
     * @param pageId
     */
    publishHandler(event: string, args: any, pageId: number);
}
