/// <reference types="@dcloudio/uni-app-x/types/uni/global" />
// 之所以又写了一份，是因为外层的socket，connectSocket的时候必须传入multiple:true
// 但是android又不能传入，目前代码里又不能写条件编译之类的。
function initRuntimeSocket(hosts, port, id) {
    if (hosts == '' || port == '' || id == '')
        return Promise.resolve(null);
    return hosts
        .split(',')
        .reduce((promise, host) => {
        return promise.then((socket) => {
            if (socket != null)
                return Promise.resolve(socket);
            return tryConnectSocket(host, port, id);
        });
    }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host, port, id) {
    return new Promise((resolve, reject) => {
        const socket = uni.connectSocket({
            url: `ws://${host}:${port}/${id}`,
            fail() {
                resolve(null);
            },
        });
        const timer = setTimeout(() => {
            // @ts-expect-error
            socket.close({
                code: 1006,
                reason: 'connect timeout',
            });
            resolve(null);
        }, SOCKET_TIMEOUT);
        socket.onOpen((e) => {
            clearTimeout(timer);
            resolve(socket);
        });
        socket.onClose((e) => {
            clearTimeout(timer);
            resolve(null);
        });
        socket.onError((e) => {
            clearTimeout(timer);
            resolve(null);
        });
    });
}

function initRuntimeSocketService() {
    const hosts = process.env.UNI_SOCKET_HOSTS;
    const port = process.env.UNI_SOCKET_PORT;
    const id = process.env.UNI_SOCKET_ID;
    if (hosts == '' || port == '' || id == '')
        return Promise.resolve(false);
    let socketTask = null;
    __registerWebViewUniConsole(() => {
        return "!function(){\"use strict\";function e(e,t){try{return{type:e,args:n(t)}}catch(e){}return{type:e,args:[]}}function n(e){return e.map((function(e){return t(e)}))}function t(e,n){if(void 0===n&&(n=0),n>=7)return{type:\"object\",value:\"[Maximum depth reached]\"};switch(typeof e){case\"string\":return{type:\"string\",value:e};case\"number\":return function(e){return{type:\"number\",value:String(e)}}(e);case\"boolean\":return function(e){return{type:\"boolean\",value:String(e)}}(e);case\"object\":return function(e,n){if(null===e)return{type:\"null\"};if(function(e){return e.$&&r(e.$)}(e))return function(e,n){return{type:\"object\",className:\"ComponentPublicInstance\",value:{properties:Object.entries(e.$.type).map((function(e){return o(e[0],e[1],n+1)}))}}}(e,n);if(r(e))return function(e,n){return{type:\"object\",className:\"ComponentInternalInstance\",value:{properties:Object.entries(e.type).map((function(e){return o(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return e.style&&null!=e.tagName&&null!=e.nodeName}(e))return function(e,n){return{type:\"object\",value:{properties:Object.entries(e).filter((function(e){var n=e[0];return[\"id\",\"tagName\",\"nodeName\",\"dataset\",\"offsetTop\",\"offsetLeft\",\"style\"].includes(n)})).map((function(e){return o(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return\"function\"==typeof e.getPropertyValue&&\"function\"==typeof e.setProperty&&e.$styles}(e))return function(e,n){return{type:\"object\",value:{properties:Object.entries(e.$styles).map((function(e){return o(e[0],e[1],n+1)}))}}}(e,n);if(Array.isArray(e))return{type:\"object\",subType:\"array\",value:{properties:e.map((function(e,r){return function(e,n,r){var o=t(e,r);return o.name=\"\".concat(n),o}(e,r,n+1)}))}};if(e instanceof Set)return{type:\"object\",subType:\"set\",className:\"Set\",description:\"Set(\".concat(e.size,\")\"),value:{entries:Array.from(e).map((function(e){return function(e,n){return{value:t(e,n)}}(e,n+1)}))}};if(e instanceof Map)return{type:\"object\",subType:\"map\",className:\"Map\",description:\"Map(\".concat(e.size,\")\"),value:{entries:Array.from(e.entries()).map((function(e){return function(e,n){return{key:t(e[0],n),value:t(e[1],n)}}(e,n+1)}))}};if(e instanceof Promise)return{type:\"object\",subType:\"promise\",value:{properties:[]}};if(e instanceof RegExp)return{type:\"object\",subType:\"regexp\",value:String(e),className:\"Regexp\"};if(e instanceof Date)return{type:\"object\",subType:\"date\",value:String(e),className:\"Date\"};if(e instanceof Error)return{type:\"object\",subType:\"error\",value:e.message||String(e),className:e.name||\"Error\"};var a=void 0,i=e.constructor;i&&i.get$UTSMetadata$&&(a=i.get$UTSMetadata$().name);return{type:\"object\",className:a,value:{properties:Object.entries(e).map((function(e){return o(e[0],e[1],n+1)}))}}}(e,n);case\"undefined\":return{type:\"undefined\"};case\"function\":return function(e){return{type:\"function\",value:\"function \".concat(e.name,\"() {}\")}}(e);case\"symbol\":return function(e){return{type:\"symbol\",value:e.description}}(e);case\"bigint\":return function(e){return{type:\"bigint\",value:String(e)}}(e)}}function r(e){return e.type&&null!=e.uid&&e.appContext}function o(e,n,r){var o=t(n,r);return o.name=e,o}\"function\"==typeof SuppressedError&&SuppressedError;var a=[\"log\",\"warn\",\"error\",\"info\",\"debug\"],i=null,u=[],c={};function s(e){null!=i?i(JSON.stringify(Object.assign({type:\"console\",data:e},c))):u.push.apply(u,e)}var f=a.reduce((function(e,n){return e[n]=console[n].bind(console),e}),{}),p=/^\\s*at\\s+[\\w/./-]+:\\d+$/;function l(){function n(n){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o=function(e,n,t){if(t||2===arguments.length)for(var r,o=0,a=n.length;o<a;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))}([],t,!0);if(o.length){var a=o[o.length-1];\"string\"==typeof a&&p.test(a)&&o.pop()}f[n].apply(f,o),s([e(n,t)])}}return function(){var e=console.log,n=Symbol();try{console.log=n}catch(e){return!1}var t=console.log===n;return console.log=e,t}()?(a.forEach((function(e){console[e]=n(e)})),function(){a.forEach((function(e){console[e]=f[e]}))}):function(){}}var y=null,g=new Set,d={};function v(e){if(null!=y){var n=e.map((function(e){var n=e&&\"promise\"in e&&\"reason\"in e,t=n?\"UnhandledPromiseRejection: \":\"\";if(n&&(e=e.reason),e instanceof Error&&e.stack)return e.message&&!e.stack.includes(e.message)?\"\".concat(t).concat(e.message,\"\\n\").concat(e.stack):\"\".concat(t).concat(e.stack);if(\"object\"==typeof e&&null!==e)try{return t+JSON.stringify(e)}catch(e){return t+String(e)}return t+String(e)})).filter(Boolean);n.length>0&&y(JSON.stringify(Object.assign({type:\"error\",data:n},d)))}else e.forEach((function(e){g.add(e)}))}function m(e){var n={type:\"WEB_INVOKE_APPSERVICE\",args:{data:{name:\"console\",arg:e}}};return window.__uniapp_x_postMessageToService?window.__uniapp_x_postMessageToService(n):window.__uniapp_x_.postMessageToService(JSON.stringify(n))}!function(){if(!window.__UNI_CONSOLE_WEBVIEW__){window.__UNI_CONSOLE_WEBVIEW__=!0;var e=\"[web-view]\".concat(window.__UNI_PAGE_ROUTE__?\"[\".concat(window.__UNI_PAGE_ROUTE__,\"]\"):\"\");l(),function(e,n){if(void 0===n&&(n={}),i=e,Object.assign(c,n),null!=e&&u.length>0){var t=u.slice();u.length=0,s(t)}}((function(e){m(e)}),{channel:e}),function(e,n){if(void 0===n&&(n={}),y=e,Object.assign(d,n),null!=e&&g.size>0){var t=Array.from(g);g.clear(),v(t)}}((function(e){m(e)}),{channel:e}),window.addEventListener(\"error\",(function(e){v([e.error])})),window.addEventListener(\"unhandledrejection\",(function(e){v([e])}))}}()}();";
    }, (data) => {
        socketTask === null || socketTask === void 0 ? void 0 : socketTask.send({
            data,
        });
    });
    return Promise.resolve()
        .then(() => {
        return initRuntimeSocket(hosts, port, id).then((socket) => {
            if (socket == null) {
                return false;
            }
            socketTask = socket;
            return true;
        });
    })
        .catch(() => {
        return false;
    });
}
initRuntimeSocketService();

export { initRuntimeSocketService };
