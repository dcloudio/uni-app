import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';
import media from '@ohos.multimedia.media';
import image from '@ohos.multimedia.image';
interface MediaFile {
    fileType: string | string;
    tempFilePath: string;
    size: number;
    width?: number;
    height?: number;
    duration?: number;
    thumbTempFilePath?: string;
}
interface chooseMediaOptions {
    mimeType: picker.PhotoViewMIMETypes.VIDEO_TYPE | picker.PhotoViewMIMETypes.IMAGE_TYPE;
    count?: number;
}
interface chooseMediaSuccessCallbackResult {
    tempFiles: MediaFile[];
}
interface VideoInfo {
    size: number;
    orientation?: string | string | string | string | string | string | string | string;
    type?: string;
    duration?: number;
    height?: number;
    width?: number;
}
async function _getVideoInfo(uri: string): Promise<VideoInfo> {
    const file = await fs.open(uri, fs.OpenMode.READ_ONLY);
    const avMetadataExtractor = await media.createAVMetadataExtractor();
    let metadata: media.AVMetadata | null = null;
    let size: number = 0;
    try {
        size = (await fs.stat(file.fd)).size;
        avMetadataExtractor.dataSrc = {
            fileSize: size,
            callback: (buffer: ArrayBuffer, length: number, pos?: number)=>{
                return fs.readSync(file.fd, buffer, {
                    offset: pos,
                    length
                });
            }
        };
        metadata = await avMetadataExtractor.fetchMetadata();
    } catch (error) {
        throw error;
    } finally{
        await avMetadataExtractor.release();
        await fs.close(file);
    }
    const videoOrientationArr = [
        'up',
        'right',
        'down',
        'left'
    ] as VideoInfo[string][];
    return {
        size: size,
        duration: metadata.duration ? Number(metadata.duration) / 1000 : undefined,
        width: metadata.videoWidth ? Number(metadata.videoWidth) : undefined,
        height: metadata.videoHeight ? Number(metadata.videoHeight) : undefined,
        type: metadata.mimeType,
        orientation: metadata.videoOrientation ? videoOrientationArr[Number(metadata.videoOrientation) / 90] : undefined
    };
}
interface ImageInfo {
    path: string;
    orientation: string | string | string | string | string | string | string | string;
    height: number;
    width: number;
}
async function _getImageInfo(uri: string): Promise<ImageInfo> {
    const file = await fs.open(uri, fs.OpenMode.READ_ONLY);
    const imageSource = image.createImageSource(file.fd);
    const imageInfo = await imageSource.getImageInfo();
    const orientation = await imageSource.getImageProperty(image.PropertyKey.ORIENTATION);
    let orientationNum = 0;
    if (typeof orientation === 'string') {
        const matched = orientation.match(/^Unknown value (\d)$/);
        if (matched && matched[1]) {
            orientationNum = Number(matched[1]);
        } else if (/^\d$/.test(orientation)) {
            orientationNum = Number(orientation);
        }
    } else if (typeof orientation === 'number') {
        orientationNum = orientation;
    }
    let orientationStr: ImageInfo[string] = 'up';
    switch(orientationNum){
        case 2:
            orientationStr = 'up-mirrored';
            break;
        case 3:
            orientationStr = 'down';
            break;
        case 4:
            orientationStr = 'down-mirrored';
            break;
        case 5:
            orientationStr = 'left-mirrored';
            break;
        case 6:
            orientationStr = 'right';
            break;
        case 7:
            orientationStr = 'right-mirrored';
            break;
        case 8:
            orientationStr = 'left';
            break;
        case 0:
        case 1:
        default:
            orientationStr = 'up';
            break;
    }
    return {
        path: uri,
        width: imageInfo.size.width,
        height: imageInfo.size.height,
        orientation: orientationStr
    };
}
async function _chooseMedia(options: chooseMediaOptions): Promise<chooseMediaSuccessCallbackResult> {
    const photoSelectOptions = new picker.PhotoSelectOptions();
    const mimeType = options.mimeType;
    photoSelectOptions.MIMEType = mimeType;
    photoSelectOptions.maxSelectNumber = options.count || 9;
    const photoPicker = new picker.PhotoViewPicker();
    const photoSelectResult = await photoPicker.select(photoSelectOptions);
    const uris = photoSelectResult.photoUris;
    if (mimeType !== picker.PhotoViewMIMETypes.VIDEO_TYPE) {
        return {
            tempFiles: uris.map((uri)=>{
                const file = fs.openSync(uri, fs.OpenMode.READ_ONLY);
                const stat = fs.statSync(file.fd);
                fs.closeSync(file);
                return {
                    fileType: 'image',
                    tempFilePath: uri,
                    size: stat.size
                };
            })
        };
    }
    const tempFiles: MediaFile[] = [];
    for(let i = 0; i < uris.length; i++){
        const uri = uris[i];
        const videoInfo = await _getVideoInfo(uri);
        tempFiles.push({
            fileType: 'video',
            tempFilePath: uri,
            size: videoInfo.size,
            duration: videoInfo.duration,
            width: videoInfo.width,
            height: videoInfo.height
        });
    }
    return {
        tempFiles
    };
}
const extend = Object.assign;
const isArray = Array.isArray;
const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE';
const ON_SHOW = 'onShow';
const ON_HIDE = 'onHide';
const ON_LAUNCH = 'onLaunch';
const ON_ERROR = 'onError';
const ON_PAGE_NOT_FOUND = 'onPageNotFound';
const ON_UNHANDLE_REJECTION = 'onUnhandledRejection';
const ON_BACK_PRESS = 'onBackPress';
const ON_PAGE_SCROLL = 'onPageScroll';
const ON_REACH_BOTTOM = 'onReachBottom';
let lastLogTime = 0;
function formatLog(module: string, ...args: Object[]) {
    const now = Date.now();
    const diff = lastLogTime ? now - lastLogTime : 0;
    lastLogTime = now;
    return `[${now}][${diff}ms][${module}]：${args.map((arg)=>JSON.stringify(arg)).join(' ')}`;
}
function hasLeadingSlash(str: string) {
    return str.indexOf('/') === 0;
}
function addLeadingSlash(str: string) {
    return hasLeadingSlash(str) ? str : '/' + str;
}
const invokeArrayFns = (fns: Function[], arg?: Object)=>{
    let ret;
    for(let i = 0; i < fns.length; i++){
        ret = fns[i](arg);
    }
    return ret;
};
function once<T extends (...args: Object[]) => Object>(fn: T, ctx: unknown = null): T {
    let res: Object;
    return (...args: Object[])=>{
        if (fn) {
            res = fn.apply(ctx, args);
            fn = null as Object;
        }
        return res;
    } as T;
}
function decode(text: string | number): string {
    try {
        return UTSiOS.consoleDebugError(decodeURIComponent('' + text));
    } catch (err) {}
    return '' + text;
}
const PLUS_RE = /\+/g;
function parseQuery(search: string) {
    const query: Record<string, Object> = {};
    if (search === '' || search === '?') return query;
    const hasLeadingIM = search[0] === '?';
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    for(let i = 0; i < searchParams.length; ++i){
        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
        let eqPos = searchParam.indexOf('=');
        let key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
        let value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
        if (key in query) {
            let currentValue = query[key];
            if (!isArray(currentValue)) {
                currentValue = query[key] = [
                    currentValue
                ];
            }
            currentValue.push(value);
        } else {
            query[key] = value;
        }
    }
    return query;
}
function parseUrl(url: string) {
    const [path, querystring] = url.split('?', 2);
    return {
        path,
        query: parseQuery(querystring || '')
    };
}
class DOMException extends Error {
    constructor(message?: string){
        super(message);
        this.name = 'DOMException';
    }
}
type UniCSSStyleDeclarationJSON = string | null | Record<string, string | string[]> | [string, Record<string, string | string[]>];
function normalizeEventType(type: string, options?: AddEventListenerOptions) {
    if (options) {
        if (options.capture) {
            type += 'Capture';
        }
        if (options.once) {
            type += 'Once';
        }
        if (options.passive) {
            type += 'Passive';
        }
    }
    return `on${capitalize(camelize(type))}`;
}
type UniNodeType = typeof NODE_TYPE_PAGE | typeof NODE_TYPE_ELEMENT | typeof NODE_TYPE_TEXT | typeof NODE_TYPE_COMMENT;
function sibling(node: UniNode, type: string | string) {
    const { parentNode  } = node;
    if (!parentNode) {
        return null;
    }
    const { childNodes  } = parentNode;
    return childNodes[childNodes.indexOf(node) + (type === 'n' ? 1 : -1)] || null;
}
function removeNode(node: UniNode) {
    const { parentNode  } = node;
    if (parentNode) {
        const { childNodes  } = parentNode;
        const index = childNodes.indexOf(node);
        if (index > -1) {
            node.parentNode = null;
            childNodes.splice(index, 1);
        }
    }
}
function checkNodeId(node: UniNode) {
    if (!node.nodeId && node.pageNode) {
        node.nodeId = node.pageNode!.genId();
    }
}
interface IUniPageNode {
    pageId: number;
    pageNode: IUniPageNode | null;
    isUnmounted: boolean;
    genId: () => number;
    push: (...args: Object[]) => void;
    onCreate: (thisNode: UniNode, nodeName: string | number) => UniNode;
    onInsertBefore: (thisNode: UniNode, newChild: UniNode, refChild: UniNode | null) => UniNode;
    onRemoveChild: (oldChild: UniNode) => UniNode;
    onAddEvent: (thisNode: UniNode, name: string, flag: number) => void;
    onAddWxsEvent: (thisNode: UniNode, name: string, wxsEvent: string, flag: number) => void;
    onRemoveEvent: (thisNode: UniNode, name: string) => void;
    onSetAttribute: (thisNode: UniNode, qualifiedName: string, value: unknown) => void;
    onRemoveAttribute: (thisNode: UniNode, qualifiedName: string) => void;
    onTextContent: (thisNode: UniNode, text: string) => void;
    onNodeValue: (thisNode: UniNode, val: string | null) => void;
}
interface UniEventListener {
    (evt: UniEvent) : void;
    modifiers?: string[];
    wxsEvent?: string;
}
interface UniEventOptions {
    bubbles: boolean;
    cancelable: boolean;
}
class UniEvent {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean = false;
    detail?: Record<string, Object>;
    timeStamp = Date.now();
    _stop: boolean = false;
    _end: boolean = false;
    constructor(type: string, opts: UniEventOptions){
        this.type = type;
        this.bubbles = !!opts.bubbles;
        this.cancelable = !!opts.cancelable;
    }
    preventDefault(): void {
        this.defaultPrevented = true;
    }
    stopImmediatePropagation(): void {
        this._end = this._stop = true;
    }
    stopPropagation(): void {
        this._stop = true;
    }
}
function createUniEvent(evt: Record<string, Object>) {
    if (evt instanceof UniEvent) {
        return evt;
    }
    const [type] = parseEventName(evt.type);
    const uniEvent = new UniEvent(type, {
        bubbles: false,
        cancelable: false
    });
    extend(uniEvent, evt);
    return uniEvent;
}
class UniEventTarget {
    listeners: Record<string, UniEventListener[]> = Object.create(null);
    dispatchEvent(evt: UniEvent): boolean {
        const listeners = this.listeners[evt.type];
        if (!listeners) {
            console.error(formatLog('dispatchEvent', (this as unknown as UniNode).nodeId), evt.type, 'not found');
            return false;
        }
        const event = createUniEvent(evt);
        const len = listeners.length;
        for(let i = 0; i < len; i++){
            listeners[i].call(this, event);
            if (event._end) {
                break;
            }
        }
        return event.cancelable && event.defaultPrevented;
    }
    addEventListener(type: string, listener: UniEventListener, options?: AddEventListenerOptions): void {
        type = normalizeEventType(type, options);
        (this.listeners[type] || (this.listeners[type] = [])).push(listener);
    }
    removeEventListener(type: string, callback: UniEventListener, options?: AddEventListenerOptions): void {
        type = normalizeEventType(type, options);
        const listeners = this.listeners[type];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(callback);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
}
class UniNode extends UniEventTarget {
    nodeId?: number;
    nodeType: UniNodeType;
    nodeName: string;
    childNodes: UniNode[];
    pageNode: IUniPageNode | null = null;
    parentNode: UniNode | null = null;
    __vueParentComponent?: ComponentInternalInstance;
    protected _text: string | null = null;
    constructor(nodeType: UniNodeType, nodeName: string, container: UniElement | IUniPageNode){
        super();
        if (container) {
            const { pageNode  } = container;
            if (pageNode) {
                this.pageNode = pageNode;
                this.nodeId = pageNode!.genId();
                !pageNode!.isUnmounted && pageNode!.onCreate(this, nodeName);
            }
        }
        this.nodeType = nodeType;
        this.nodeName = nodeName;
        this.childNodes = [];
    }
    get firstChild(): UniNode | null {
        return this.childNodes[0] || null;
    }
    get lastChild(): UniNode | null {
        const { childNodes  } = this;
        const length = childNodes.length;
        return length ? childNodes[length - 1] : null;
    }
    get nextSibling(): UniNode | null {
        return sibling(this, 'n');
    }
    get nodeValue() {
        return null;
    }
    set nodeValue(_val: string | null) {}
    get textContent() {
        return this._text || '';
    }
    set textContent(text: string) {
        this._text = text;
        if (this.pageNode && !this.pageNode.isUnmounted) {
            this.pageNode.onTextContent(this, text);
        }
    }
    get parentElement(): UniElement | null {
        const { parentNode  } = this;
        if (parentNode && parentNode.nodeType === 1) {
            return parentNode as unknown as UniElement;
        }
        return null;
    }
    get previousSibling(): UniNode | null {
        return sibling(this, 'p');
    }
    appendChild(newChild: UniNode): UniNode {
        return this.insertBefore(newChild, null);
    }
    cloneNode(deep?: boolean): UniNode {
        const cloned = extend(Object.create(Object.getPrototypeOf(this)), this) as UniNode;
        const { attributes  } = cloned as unknown as UniElement;
        if (attributes) {
            (cloned as unknown as UniElement).attributes = extend({}, attributes);
        }
        if (deep) {
            cloned.childNodes = cloned.childNodes.map((childNode)=>childNode.cloneNode(true));
        }
        return cloned;
    }
    insertBefore(newChild: UniNode, refChild: UniNode | null): UniNode {
        removeNode(newChild);
        newChild.pageNode = this.pageNode;
        newChild.parentNode = this;
        checkNodeId(newChild);
        const { childNodes  } = this;
        if (refChild) {
            const index = childNodes.indexOf(refChild);
            if (index === -1) {
                throw new DOMException(`Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`);
            }
            childNodes.splice(index, 0, newChild);
        } else {
            childNodes.push(newChild);
        }
        return this.pageNode && !this.pageNode.isUnmounted ? this.pageNode.onInsertBefore(this, newChild, refChild) : newChild;
    }
    removeChild(oldChild: UniNode): UniNode {
        const { childNodes  } = this;
        const index = childNodes.indexOf(oldChild);
        if (index === -1) {
            throw new DOMException(`Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`);
        }
        oldChild.parentNode = null;
        childNodes.splice(index, 1);
        return this.pageNode && !this.pageNode.isUnmounted ? this.pageNode.onRemoveChild(oldChild) : oldChild;
    }
}
type DictArray = [number, number][];
interface UniNodeJSONMinify {
    i: number;
    n: string | number;
    a: DictArray;
    e: DictArray;
    w: [number, [number, number]][];
    s?: DictArray;
    t?: number;
}
interface UniNodeJSON {
    i: number;
    n: string | number;
    a: Record<string, unknown>;
    e: Record<string, number>;
    w: Record<string, [string, number]>;
    s?: UniCSSStyleDeclarationJSON;
    t?: string;
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseEventName(name: string): [string, EventListenerOptions | undefined] {
    let options: EventListenerOptions | undefined;
    if (optionsModifierRE.test(name)) {
        options = {};
        let m;
        while(m = name.match(optionsModifierRE)){
            name = name.slice(0, name.length - m[0].length);
            (options as Object)[m[0].toLowerCase()] = true;
            options;
        }
    }
    return [
        hyphenate(name.slice(2)),
        options
    ];
}
const ACTION_TYPE_PAGE_CREATE = 1;
const ACTION_TYPE_PAGE_CREATED = 2;
const ACTION_TYPE_PAGE_SCROLL = 15;
interface PageNodeOptions {
    css: boolean;
    route: string;
    version: number;
    locale: string;
    platform: string;
    pixelRatio: number;
    windowWidth: number;
    disableScroll: boolean;
    onPageScroll: boolean;
    onPageReachBottom: boolean;
    onReachBottomDistance: number;
    statusbarHeight: number;
    windowTop: number;
    windowBottom: number;
}
interface PageCreateData extends PageNodeOptions {
}
type PageCreateAction = [typeof ACTION_TYPE_PAGE_CREATE, PageCreateData];
type PageCreatedAction = [typeof ACTION_TYPE_PAGE_CREATED];
type CreateAction = [typeof ACTION_TYPE_CREATE, number, string | number, number, number, Partial<UniNodeJSON | UniNodeJSONMinify>?];
type InsertAction = [typeof ACTION_TYPE_INSERT, number, number, number, Partial<UniNodeJSON | UniNodeJSONMinify>?];
type RemoveAction = [typeof ACTION_TYPE_REMOVE, number];
type AddEventAction = [typeof ACTION_TYPE_ADD_EVENT, number, string | number, number];
type AddWxsEventAction = [typeof ACTION_TYPE_ADD_WXS_EVENT, number, string | number, string | number, number];
type RemoveEventAction = [typeof ACTION_TYPE_REMOVE_EVENT, number, string | number];
type SetAttributeAction = [typeof ACTION_TYPE_SET_ATTRIBUTE, number, string | number, unknown | number];
type RemoveAttributeAction = [typeof ACTION_TYPE_REMOVE_ATTRIBUTE, number, string | number];
type SetTextAction = [typeof ACTION_TYPE_SET_TEXT, number, string | number];
type PageScrollAction = [typeof ACTION_TYPE_PAGE_SCROLL, number];
type PageUpdateAction = CreateAction | InsertAction | RemoveAction | AddEventAction | AddWxsEventAction | RemoveEventAction | SetAttributeAction | RemoveAttributeAction | SetTextAction;
type PageAction = PageCreateAction | PageCreatedAction | PageUpdateAction | PageScrollAction;
type NavigateToOptionEvents = Record<string, (...args: Object[]) => void>;
interface EventChannelListener {
    type: string | string;
    fn: (...args: Object[]) => void;
}
class EventChannel {
    id?: number;
    private listener: Record<string, EventChannelListener[]>;
    private emitCache: {
        args: Object[];
        eventName: string;
    }[];
    constructor(id?: number, events?: NavigateToOptionEvents){
        this.id = id;
        this.listener = {};
        this.emitCache = [];
        if (events) {
            Object.keys(events).forEach((name)=>{
                this.on(name, events[name]);
            });
        }
    }
    emit(eventName: string, ...args: Object[]) {
        const fns = this.listener[eventName];
        if (!fns) {
            return this.emitCache.push({
                eventName,
                args
            });
        }
        fns.forEach((opt)=>{
            opt.fn.apply(opt.fn, args);
        });
        this.listener[eventName] = fns.filter((opt)=>opt.type !== 'once');
    }
    on(eventName: string, fn: EventChannelListener[string]) {
        this._addListener(eventName, 'on', fn);
        this._clearCache(eventName);
    }
    once(eventName: string, fn: EventChannelListener[string]) {
        this._addListener(eventName, 'once', fn);
        this._clearCache(eventName);
    }
    off(eventName: string, fn: EventChannelListener[string]) {
        const fns = this.listener[eventName];
        if (!fns) {
            return;
        }
        if (fn) {
            for(let i = 0; i < fns.length;){
                if (fns[i].fn === fn) {
                    fns.splice(i, 1);
                    i--;
                }
                i++;
            }
        } else {
            delete this.listener[eventName];
        }
    }
    _clearCache(eventName?: string) {
        for(let index = 0; index < this.emitCache.length; index++){
            const cache = this.emitCache[index];
            const _name = eventName ? cache.eventName === eventName ? eventName : null : cache.eventName;
            if (!_name) continue;
            const location = this.emit.apply(this, [
                _name,
                ...cache.args
            ]);
            if (typeof location === 'number') {
                this.emitCache.pop();
                continue;
            }
            this.emitCache.splice(index, 1);
            index--;
        }
    }
    _addListener(eventName: string, type: EventChannelListener[string], fn: EventChannelListener[string]) {
        (this.listener[eventName] || (this.listener[eventName] = [])).push({
            fn,
            type
        });
    }
}
interface E {
    e: Record<string, unknown>;
    on: (name: EventName, callback: EventCallback, ctx?: Object) => this;
    once: (name: EventName, callback: EventCallback, ctx?: Object) => this;
    emit: (name: EventName, ...args: Object[]) => this;
    off: (name: EventName, callback?: EventCallback) => this;
}
const E = function() {} as unknown as {
    new(): E;
};
type EventName = string;
type EventCallback = Function;
E.prototype = {
    on: function(name: EventName, callback: EventCallback, ctx?: Object) {
        let e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx
        });
        return this;
    },
    once: function(name: EventName, callback: EventCallback, ctx?: Object) {
        let self = this;
        function listener() {
            self.off(name, listener);
            callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
    },
    emit: function(name: EventName) {
        let data = [].slice.call(arguments, 1);
        let evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        let i = 0;
        let len = evtArr.length;
        for(i; i < len; i++){
            evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
    },
    off: function(name: EventName, callback?: EventCallback) {
        let e = this.e || (this.e = {});
        let evts = e[name];
        let liveEvents = [];
        if (evts && callback) {
            for(let i = evts.length - 1; i >= 0; i--){
                if (evts[i].fn === callback || evts[i].fn._ === callback) {
                    evts.splice(i, 1);
                    break;
                }
            }
            liveEvents = evts;
        }
        liveEvents.length ? e[name] = liveEvents : delete e[name];
        return this;
    }
};
const borderStyles = {
    black: 'rgba(0,0,0,0.4)',
    white: 'rgba(255,255,255,0.4)'
};
function normalizeTabBarStyles(borderStyle?: string) {
    if (borderStyle && borderStyle in borderStyles) {
        return borderStyles[borderStyle as keyof typeof borderStyles];
    }
    return borderStyle;
}
function normalizeTitleColor(titleColor: string) {
    return titleColor === 'black' ? '#000000' : '#ffffff';
}
function normalizeStyles<T extends Object>(pageStyle: T, themeConfig: UniApp.ThemeJson = {}, mode: UniApp.ThemeMode = 'light') {
    const modeStyle = themeConfig[mode];
    const styles = {} as T;
    if (!modeStyle) {
        return pageStyle;
    }
    Object.keys(pageStyle).forEach((key)=>{
        type Key = keyof typeof pageStyle;
        let styleItem = pageStyle[key as Key];
        (styles as Object)[key] = (()=>{
            if (isPlainObject(styleItem)) {
                return normalizeStyles(styleItem as T, themeConfig, mode);
            } else if (isArray(styleItem)) {
                return (styleItem as Object[]).map((item)=>isPlainObject(item) ? normalizeStyles(item as T, themeConfig, mode) : item);
            } else if (isString(styleItem) && (styleItem as string).startsWith('@')) {
                const _key = (styleItem as string).replace('@', '');
                let _styleItem = modeStyle[_key] || styleItem;
                switch(key){
                    case 'titleColor':
                        _styleItem = normalizeTitleColor(_styleItem);
                        break;
                    case 'borderStyle':
                        _styleItem = normalizeTabBarStyles(_styleItem)!;
                        break;
                    default:
                        break;
                }
                return _styleItem;
            }
            return styleItem;
        })();
    });
    return styles;
}
function initBridge(subscribeNamespace: string | string | string): Omit<UniApp.UniServiceJSBridge, string | string | string | string> {
    const emitter = new E();
    return {
        on (event: string, callback: UniApp.CallbackFunction) {
            return emitter.on(event, callback);
        },
        once (event: string, callback: UniApp.CallbackFunction) {
            return emitter.once(event, callback);
        },
        off (event: string, callback?: UniApp.CallbackFunction) {
            return emitter.off(event, callback);
        },
        emit (event: string, ...args: Object[]) {
            return emitter.emit(event, ...args);
        },
        subscribe (event: string, callback: UniApp.CallbackFunction, once: boolean = false): void {
            emitter[once ? 'once' : 'on'](`${subscribeNamespace}.${event}`, callback);
        },
        unsubscribe (event: string, callback: UniApp.CallbackFunction): void {
            emitter.off(`${subscribeNamespace}.${event}`, callback);
        },
        subscribeHandler (event: string, args: unknown, pageId?: number): void {
            emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
        }
    };
}
const INVOKE_VIEW_API = 'invokeViewApi';
const INVOKE_SERVICE_API = 'invokeServiceApi';
function getCurrentPage() {
    return (window as Object).__PAGE_INFO__ as Page.PageInstance;
    const pages = getCurrentPages();
    const len = pages.length;
    if (len) {
        return pages[len - 1];
    }
}
function getCurrentPageMeta() {
    const page = getCurrentPage();
    if (page) {
        return page.$page.meta;
    }
}
function getCurrentPageId() {
    if (!(window as Object).__id__) {
        (window as Object).__id__ = plus.webview.currentWebview().id!;
    }
    return parseInt((window as Object).__id__);
    const meta = getCurrentPageMeta();
    if (meta) {
        return meta.id!;
    }
    return -1;
}
function getCurrentPageVm() {
    const page = getCurrentPage();
    if (page) {
        return (page as Object).$vm as ComponentPublicInstance;
    }
}
const PAGE_META_KEYS = [
    'navigationBar',
    'pullToRefresh'
] as const;
function initGlobalStyle() {
    return UTSiOS.consoleDebugError(JSON.parse(JSON.stringify(__uniConfig.globalStyle || {})));
}
function initRouteMeta(pageMeta: UniApp.PageRouteMeta, id?: number): UniApp.PageRouteMeta {
    const globalStyle = initGlobalStyle();
    const res = extend({
        id
    }, globalStyle, pageMeta);
    PAGE_META_KEYS.forEach((name)=>{
        (res as Object)[name] = extend({}, globalStyle[name], pageMeta[name]);
    });
    const { navigationBar  } = res;
    navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = '');
    return res;
}
function initPageInternalInstance(openType: UniApp.OpenType, url: string, pageQuery: Record<string, Object>, meta: UniApp.PageRouteMeta, eventChannel?: EventChannel, themeMode?: UniApp.ThemeMode): Page.PageInstance[string] {
    const { id , route  } = meta;
    const titleColor = normalizeStyles(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
    return {
        id: id!,
        path: addLeadingSlash(route),
        route: route,
        fullPath: url,
        options: pageQuery,
        meta,
        openType,
        eventChannel,
        statusBarStyle: titleColor === '#ffffff' ? 'light' : 'dark'
    };
}
function invokeHook(name: string, args?: unknown): unknown;
function invokeHook(id: number, name: string, args?: unknown): unknown;
function invokeHook(vm: ComponentPublicInstance, name: string, args?: unknown): unknown;
function invokeHook(vm: ComponentPublicInstance | string | number, name?: string | unknown, args?: unknown) {
    if (isString(vm)) {
        args = name;
        name = vm;
        vm = getCurrentPageVm()!;
    } else if (typeof vm === 'number') {
        const page = getCurrentPages().find((page)=>page.$page.id === vm);
        if (page) {
            vm = (page as Object).$vm as ComponentPublicInstance;
        } else {
            vm = getCurrentPageVm() as ComponentPublicInstance;
        }
    }
    if (!vm) {
        return;
    }
    const hooks = (vm.$ as unknown as {
        [name: string]: Function[];
    })[name as string];
    return hooks && invokeArrayFns(hooks, args);
}
function normalizeRoute(toRoute: string) {
    if (toRoute.indexOf('/') === 0) {
        return toRoute;
    }
    let fromRoute = '';
    const pages = getCurrentPages();
    if (pages.length) {
        fromRoute = (pages[pages.length - 1] as Object).$page.route;
    }
    return getRealRoute(fromRoute, toRoute);
}
function getRealRoute(fromRoute: string, toRoute: string): string {
    if (toRoute.indexOf('/') === 0) {
        return toRoute;
    }
    if (toRoute.indexOf('./') === 0) {
        return getRealRoute(fromRoute, toRoute.slice(2));
    }
    const toRouteArray = toRoute.split('/');
    const toRouteLength = toRouteArray.length;
    let i = 0;
    for(; i < toRouteLength && toRouteArray[i] === '..'; i++);
    toRouteArray.splice(0, i);
    toRoute = toRouteArray.join('/');
    const fromRouteArray = fromRoute.length > 0 ? fromRoute.split('/') : [];
    fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
    return addLeadingSlash(fromRouteArray.concat(toRouteArray).join('/'));
}
function getRouteOptions(path: string, alias: boolean = false) {
    if (alias) {
        return __uniRoutes.find((route)=>route.path === path || route.alias === path);
    }
    return __uniRoutes.find((route)=>route.path === path);
}
function getRouteMeta(path: string) {
    const routeOptions = getRouteOptions(path);
    if (routeOptions) {
        return routeOptions.meta;
    }
}
const invokeOnCallback: UniApp.UniServiceJSBridge[string] = (name: string, res: unknown)=>UniServiceJSBridge.emit('api.' + name, res);
let invokeViewMethodId = 1;
function publishViewMethodName(pageId?: number) {
    return (pageId || getCurrentPageId()) + '.' + INVOKE_VIEW_API;
}
const invokeViewMethod: UniApp.UniServiceJSBridge[string] = (name: string, args: unknown, pageId: number, callback?: (res: Object) => void)=>{
    const { subscribe , publishHandler  } = UniServiceJSBridge;
    const id = callback ? invokeViewMethodId++ : 0;
    callback && subscribe(INVOKE_VIEW_API + '.' + id, callback, true);
    publishHandler(publishViewMethodName(pageId), {
        id,
        name,
        args
    }, pageId);
};
const invokeViewMethodKeepAlive: UniApp.UniServiceJSBridge[string] = (name: string, args: unknown, callback: (res: Object) => void, pageId: number)=>{
    const { subscribe , unsubscribe , publishHandler  } = UniServiceJSBridge;
    const id = invokeViewMethodId++;
    const subscribeName = INVOKE_VIEW_API + '.' + id;
    subscribe(subscribeName, callback);
    publishHandler(publishViewMethodName(pageId), {
        id,
        name,
        args
    }, pageId);
    return ()=>{
        unsubscribe(subscribeName);
    };
};
type ServiceMethod<Args = Object, Res = Object> = (args: Args, publish: (res: Res) => void) => void;
const serviceMethods: Record<string, ServiceMethod<Object>> = Object.create(null);
function subscribeServiceMethod() {
    UniServiceJSBridge.subscribe(INVOKE_SERVICE_API, onInvokeServiceMethod);
}
function registerServiceMethod<Args = Object, Res = Object>(name: string, fn: ServiceMethod<Args, Res>) {
    if (!serviceMethods[name]) {
        serviceMethods[name] = fn;
    }
}
function onInvokeServiceMethod({ id , name , args  }: {
    id: number;
    name: string;
    args: Object;
}, pageId: number) {
    const publish = (res: unknown)=>{
        id && UniServiceJSBridge.publishHandler(INVOKE_SERVICE_API + '.' + id, res, pageId);
    };
    const handler = serviceMethods[name];
    if (handler) {
        handler(args, publish);
    } else {
        publish({});
    }
}
const ServiceJSBridge = extend(initBridge('view'), {
    invokeOnCallback,
    invokeViewMethod,
    invokeViewMethodKeepAlive
});
interface LaunchOptions {
    path: string;
    query: Record<string, Object>;
    scene: number;
    referrerInfo: {
        appId: string;
        extraData: Record<string, Object>;
    };
}
function createLaunchOptions() {
    return {
        path: '',
        query: {},
        scene: 1001,
        referrerInfo: {
            appId: '',
            extraData: {}
        }
    };
}
function defineGlobalData(app: ComponentPublicInstance, defaultGlobalData?: Record<string, unknown>) {
    const options = app.$options || {};
    options.globalData = extend(options.globalData || {}, defaultGlobalData);
    Object.defineProperty(app, 'globalData', {
        get () {
            return options.globalData;
        },
        set (newGlobalData) {
            options.globalData = newGlobalData;
        }
    });
}
function initService() {}
function initPageVm(pageVm: ComponentPublicInstance, page: Page.PageInstance[string]) {
    pageVm.route = page.route;
    pageVm.$vm = pageVm;
    pageVm.$page = page;
    pageVm.$mpType = 'page';
    pageVm.$fontFamilySet = new Set();
    if (page.meta.isTabBar) {
        pageVm.$.__isTabBar = true;
        pageVm.$.__isActive = true;
    }
}
function hasCallback(args: unknown) {
    if (isPlainObject(args) && [
        API_SUCCESS,
        API_FAIL,
        API_COMPLETE
    ].find((cb)=>isFunction((args as Record<string, Object>)[cb]))) {
        return true;
    }
    return false;
}
const ANIMATION_IN = [
    'slide-in-right',
    'slide-in-left',
    'slide-in-top',
    'slide-in-bottom',
    'fade-in',
    'zoom-out',
    'zoom-fade-out',
    'pop-in',
    'none'
];
const API_CHOOSE_VIDEO = 'chooseVideo';
const API_CHOOSE_IMAGE = 'chooseImage';
const HOOK_SUCCESS = 'success';
const HOOK_FAIL = 'fail';
const HOOK_COMPLETE = 'complete';
type HOOKS = typeof HOOK_INVOKE | typeof HOOK_SUCCESS | typeof HOOK_FAIL | typeof HOOK_COMPLETE | typeof HOOK_RETURN_VALUE;
type Interceptors = {
    [P in HOOKS]?: Function[];
};
const globalInterceptors: Interceptors = {};
const scopedInterceptors: {
    [key: string]: Interceptors;
} = {};
function formatApiArgs<T extends ApiLike>(args: Object[], options?: ApiOptions<T>) {
    const params = args[0];
    if (!options || (!isPlainObject(options.formatArgs) && isPlainObject(params))) {
        return;
    }
    const formatArgs = options.formatArgs!;
    const keys = Object.keys(formatArgs);
    for(let i = 0; i < keys.length; i++){
        const name = keys[i];
        const formatterOrDefaultValue = formatArgs[name]!;
        if (isFunction(formatterOrDefaultValue)) {
            const errMsg = formatterOrDefaultValue(args[0][name], params);
            if (isString(errMsg)) {
                return errMsg;
            }
        } else {
            if (!hasOwn(params, name)) {
                params[name] = formatterOrDefaultValue;
            }
        }
    }
}
function invokeSuccess(id: number, name: string, res: unknown) {
    const result: {
        errSubject?: string;
        errMsg: string;
    } = {
        errMsg: name + ':ok'
    };
    result.errSubject = name;
    return invokeCallback(id, extend((res || {}) as Object, result));
}
function invokeFail(id: number, name: string, errMsg?: string, errRes: Object = {}) {
    const apiErrMsg = name + ':fail' + (errMsg ? ' ' + errMsg : '');
    let res = extend({
        errMsg: apiErrMsg
    }, errRes);
    if (typeof UniError !== 'undefined') {
        res = typeof errRes.errCode !== 'undefined' ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes);
    }
    return invokeCallback(id, res);
}
const CHOOSE_SIZE_TYPES = [
    'original',
    'compressed'
];
const CHOOSE_SOURCE_TYPES = [
    'album',
    'camera'
];
function elemsInArray(strArr: string[] | string | undefined, optionalVal: string[]) {
    if (!isArray(strArr) || strArr.length === 0 || strArr.find((val)=>optionalVal.indexOf(val) === -1)) {
        return optionalVal;
    }
    return strArr;
}
function validateProtocolFail(name: string, msg: string) {
    console.warn(`${name}: ${msg}`);
}
function validateProtocol(name: string, data: Record<string, Object>, protocol?: ApiProtocol<Object>, onFail?: (name: string, msg: string) => void) {
    if (!onFail) {
        onFail = validateProtocolFail;
    }
    for(const key in protocol){
        const errMsg = validateProp(key, data[key], protocol[key as keyof typeof protocol], !hasOwn(data, key));
        if (isString(errMsg)) {
            onFail(name, errMsg);
        }
    }
}
function validateProtocols(name: string, args: Object[], protocol?: ApiProtocols<Object>, onFail?: (name: string, msg: string) => void) {
    if (!protocol) {
        return;
    }
    if (!isArray(protocol)) {
        return validateProtocol(name, args[0] || Object.create(null), protocol, onFail);
    }
    const len = protocol.length;
    const argsLen = args.length;
    for(let i = 0; i < len; i++){
        const opts = protocol[i];
        const data = Object.create(null);
        if (argsLen > i) {
            data[opts.name!] = args[i];
        }
        validateProtocol(name, data, {
            [opts.name!]: opts
        }, onFail);
    }
}
function beforeInvokeApi<T extends ApiLike>(name: string, args: Object[], protocol?: ApiProtocols<T>, options?: ApiOptions<T>) {
    validateProtocols(name!, args, protocol);
    if (options && options.beforeInvoke) {
        const errMsg = options.beforeInvoke(args);
        if (isString(errMsg)) {
            return errMsg;
        }
    }
    const errMsg = formatApiArgs(args, options);
    if (errMsg) {
        return errMsg;
    }
}
function normalizeErrMsg(errMsg: string | Error) {
    if (!errMsg || isString(errMsg)) {
        return errMsg;
    }
    if (errMsg.stack) {
        console.error(errMsg.message + '\n' + errMsg.stack);
        return errMsg.message;
    }
    return errMsg as unknown as string;
}
function wrapperTaskApi<T extends ApiLike>(name: string, fn: Function, protocol?: ApiProtocols<T>, options?: ApiOptions<T>) {
    return (args: Record<string, Object>)=>{
        const id = createAsyncApiCallback(name, args, options);
        const errMsg = beforeInvokeApi(name, [
            args
        ], protocol, options);
        if (errMsg) {
            return invokeFail(id, name, errMsg);
        }
        return fn(args, {
            resolve: (res: unknown)=>invokeSuccess(id, name, res),
            reject: (errMsg: string | Error, errRes?: Object)=>invokeFail(id, name, normalizeErrMsg(errMsg), errRes)
        });
    };
}
function wrapperAsyncApi<T extends ApiLike>(name: string, fn: Function, protocol?: ApiProtocols<T>, options?: ApiOptions<T>) {
    return wrapperTaskApi(name, fn, protocol, options);
}
function wrapperHook(hook: Function, params?: Record<string, Object>) {
    return function(data: unknown) {
        return hook(data, params) || data;
    };
}
function queue(hooks: Function[], data: unknown, params?: Record<string, Object>): Promise<Object> {
    let promise: Object = false;
    for(let i = 0; i < hooks.length; i++){
        const hook = hooks[i];
        if (promise) {
            promise = Promise.resolve(wrapperHook(hook, params));
        } else {
            const res = hook(data, params);
            if (isPromise(res)) {
                promise = Promise.resolve(res);
            }
            if (res === false) {
                return {
                    then () {},
                    catch () {}
                } as Promise<undefined>;
            }
        }
    }
    return (promise || {
        then (callback: Function) {
            return callback(data);
        },
        catch () {}
    });
}
function wrapperOptions(interceptors: Interceptors, options: Record<string, Object> = {}) {
    [
        HOOK_SUCCESS,
        HOOK_FAIL,
        HOOK_COMPLETE
    ].forEach((name)=>{
        const hooks = interceptors[name as HOOKS];
        if (!isArray(hooks)) {
            return;
        }
        const oldCallback = options[name];
        options[name] = function callbackInterceptor(res: unknown) {
            queue(hooks, res, options).then((res: unknown)=>{
                return (isFunction(oldCallback) && oldCallback(res)) || res;
            });
        };
    });
    return options;
}
function wrapperReturnValue(method: string, returnValue: unknown) {
    const returnValueHooks: Function[] = [];
    if (isArray(globalInterceptors.returnValue)) {
        returnValueHooks.push(...globalInterceptors.returnValue);
    }
    const interceptor = scopedInterceptors[method];
    if (interceptor && isArray(interceptor.returnValue)) {
        returnValueHooks.push(...interceptor.returnValue);
    }
    returnValueHooks.forEach((hook)=>{
        returnValue = hook(returnValue) || returnValue;
    });
    return returnValue;
}
function getApiInterceptorHooks(method: string) {
    const interceptor = Object.create(null);
    Object.keys(globalInterceptors).forEach((hook)=>{
        if (hook !== 'returnValue') {
            interceptor[hook] = (globalInterceptors[hook as HOOKS] as Function[]).slice();
        }
    });
    const scopedInterceptor = scopedInterceptors[method];
    if (scopedInterceptor) {
        Object.keys(scopedInterceptor).forEach((hook)=>{
            if (hook !== 'returnValue') {
                interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook as HOOKS]);
            }
        });
    }
    return interceptor;
}
function invokeApi(method: string, api: Function, options: object, params: unknown[]) {
    const interceptor = getApiInterceptorHooks(method);
    if (interceptor && Object.keys(interceptor).length) {
        if (isArray(interceptor.invoke)) {
            const res = queue(interceptor.invoke, options);
            return res.then((options)=>{
                return api(wrapperOptions(getApiInterceptorHooks(method), options), ...params);
            });
        } else {
            return api(wrapperOptions(interceptor, options), ...params);
        }
    }
    return api(options, ...params);
}
function handlePromise(promise: Promise<unknown>) {
    return promise;
}
function promisify(name: string, fn: Function) {
    return (args = {}, ...rest: unknown[])=>{
        if (hasCallback(args)) {
            return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
        }
        return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject)=>{
            invokeApi(name, fn, extend(args, {
                success: resolve,
                fail: reject
            }), rest);
        })));
    };
}
type DefineAsyncApiFn<T extends AsyncApiLike, P extends AsyncMethodOptionLike = AsyncApiOptions<T>> = (args: P extends undefined ? undefined : Omit<P, CALLBACK_TYPES>, res: {
    resolve: (res: AsyncApiRes<P> | void) => void;
    reject: (errMsg?: string, errRes?: Object) => void;
}) => void;
function defineAsyncApi<T extends AsyncApiLike, P extends AsyncMethodOptionLike = AsyncApiOptions<T>>(name: string, fn: DefineAsyncApiFn<T>, protocol?: ApiProtocols<T>, options?: ApiOptions<T>) {
    return promisify(name, wrapperAsyncApi(name, fn as Object, protocol, options)) as AsyncApi<P>;
}
function getBaseSystemInfo() {
    return {
        platform: 'harmony',
        pixelRatio: vp2px(1),
        windowWidth: lpx2px(720)
    };
}
function getRealPath(filepath: string) {
    return filepath;
}
const TAGS = {
    a: '',
    abbr: '',
    address: '',
    article: '',
    aside: '',
    b: '',
    bdi: '',
    bdo: [
        'dir'
    ],
    big: '',
    blockquote: '',
    br: '',
    caption: '',
    center: '',
    cite: '',
    code: '',
    col: [
        'span',
        'width'
    ],
    colgroup: [
        'span',
        'width'
    ],
    dd: '',
    del: '',
    div: '',
    dl: '',
    dt: '',
    em: '',
    fieldset: '',
    font: '',
    footer: '',
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: '',
    header: '',
    hr: '',
    i: '',
    img: [
        'alt',
        'src',
        'height',
        'width'
    ],
    ins: '',
    label: '',
    legend: '',
    li: '',
    mark: '',
    nav: '',
    ol: [
        'start',
        'type'
    ],
    p: '',
    pre: '',
    q: '',
    rt: '',
    ruby: '',
    s: '',
    section: '',
    small: '',
    span: '',
    strong: '',
    sub: '',
    sup: '',
    table: [
        'width'
    ],
    tbody: '',
    td: [
        'colspan',
        'height',
        'rowspan',
        'width'
    ],
    tfoot: '',
    th: [
        'colspan',
        'height',
        'rowspan',
        'width'
    ],
    thead: '',
    tr: [
        'colspan',
        'height',
        'rowspan',
        'width'
    ],
    tt: '',
    u: '',
    ul: ''
};
const CHARS = {
    amp: '&',
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
    apos: "'",
    ldquo: '“',
    rdquo: '”',
    yen: '￥',
    radic: '√',
    lceil: '⌈',
    rceil: '⌉',
    lfloor: '⌊',
    rfloor: '⌋',
    hellip: '…'
};
function decodeEntities(htmlString: string) {
    return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function(match, stage) {
        if (hasOwn(CHARS, stage) && CHARS[stage]) {
            return CHARS[stage];
        }
        if (/^#[0-9]{1,4}$/.test(stage)) {
            return String.fromCharCode(stage.slice(1));
        }
        if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
            return String.fromCharCode(0 + stage.slice(1));
        }
        return match;
    });
}
interface Node {
    type: string;
    text?: string;
    name: string;
    attrs: Data;
    children?: Node[];
}
function processClickEvent(node: Node, triggerItemClick: Function) {
    if ([
        'a',
        'img'
    ].includes(node.name) && triggerItemClick) {
        return {
            onClick: (e: Event)=>{
                triggerItemClick(e, {
                    node
                });
                e.stopPropagation();
                e.preventDefault();
                e.returnValue = false;
            }
        };
    }
}
function normalizeAttrs(tagName: string, attrs: Data) {
    if (!isPlainObject(attrs)) return;
    for(const key in attrs){
        if (hasOwn(attrs, key)) {
            const value = attrs[key];
            if (tagName === 'img' && key === 'src') attrs[key] = getRealPath(value as string);
        }
    }
}
const nodeList2VNode = (scopeId: string, triggerItemClick: Function, nodeList?: Node[]): Array<VNode | undefined> =>{
    if (!nodeList || (isArray(nodeList) && !nodeList.length)) return [];
    return nodeList.map((node)=>{
        if (!isPlainObject(node)) {
            return;
        }
        if (!hasOwn(node, 'type') || node.type === 'node') {
            let nodeProps = {
                [scopeId]: ''
            };
            const tagName = node.name?.toLowerCase();
            if (!hasOwn(TAGS, tagName)) {
                return;
            }
            normalizeAttrs(tagName, node.attrs);
            nodeProps = extend(nodeProps, processClickEvent(node, triggerItemClick), node.attrs);
            return h(node.name, nodeProps, nodeList2VNode(scopeId, triggerItemClick, node.children));
        }
        if (node.type === 'text' && isString(node.text) && node.text !== '') return createTextVNode(decodeEntities(node.text || ''));
    });
};
type AppShowHook = (options: UniApp.GetLaunchOptionsSyncOptions) => void;
const API_GET_IMAGE_INFO = 'getImageInfo';
const API_GET_VIDEO_INFO = 'getVideoInfo';
const ANIMATION_OUT = [
    'slide-out-right',
    'slide-out-left',
    'slide-out-top',
    'slide-out-bottom',
    'fade-out',
    'zoom-in',
    'zoom-fade-in',
    'pop-out',
    'none'
];
const BaseRouteProtocol: ApiProtocol<API_TYPE_NAVIGATE_TO> = {
    url: {
        type: String,
        required: true
    }
};
const API_NAVIGATE_TO = 'navigateTo';
type API_TYPE_NAVIGATE_TO = typeof uni.navigateTo;
const API_REDIRECT_TO = 'redirectTo';
const API_SWITCH_TAB = 'switchTab';
type API_TYPE_SWITCH_TAB = typeof uni.switchTab;
const API_NAVIGATE_BACK = 'navigateBack';
type API_TYPE_NAVIGATE_BACK = typeof uni.navigateBack;
const API_PRELOAD_PAGE = 'preloadPage';
const API_UN_PRELOAD_PAGE = 'unPreloadPage';
const NavigateToProtocol: ApiProtocol<API_TYPE_NAVIGATE_TO> = extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
const NavigateBackProtocol: ApiProtocol<API_TYPE_NAVIGATE_BACK> = extend({
    delta: {
        type: Number
    }
}, createAnimationProtocol(ANIMATION_OUT));
const NavigateToOptions: ApiOptions<API_TYPE_NAVIGATE_TO> = createRouteOptions(API_NAVIGATE_TO);
const NavigateBackOptions: ApiOptions<API_TYPE_NAVIGATE_BACK> = {
    formatArgs: {
        delta (value, params) {
            value = parseInt(value + '') || 1;
            params.delta = Math.min(getCurrentPages().length - 1, value);
        }
    }
};
function createAnimationProtocol(animationTypes: string[]) {
    return {
        animationType: {
            type: String as Object,
            validator (type?: string) {
                if (type && animationTypes.indexOf(type) === -1) {
                    return ('`' + type + '` is not supported for `animationType` (supported values are: `' + animationTypes.join('`|`') + '`)');
                }
            }
        },
        animationDuration: {
            type: Number
        }
    };
}
let navigatorLock: string;
function beforeRoute() {
    navigatorLock = '';
}
function createRouteOptions(type: string): ApiOptions<API_TYPE_NAVIGATE_TO> {
    return {
        formatArgs: {
            url: createNormalizeUrl(type)
        },
        beforeAll: beforeRoute
    };
}
function createNormalizeUrl(type: string) {
    return function normalizeUrl(url: string, params: Record<string, Object>) {
        if (!url) {
            return `Missing required args: "url"`;
        }
        url = normalizeRoute(url);
        const pagePath = url.split('?')[0];
        const routeOptions = getRouteOptions(pagePath, true);
        if (!routeOptions) {
            return 'page `' + url + '` is not found';
        }
        if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
            if (routeOptions.meta.isTabBar) {
                return `can not ${type} a tabbar page`;
            }
        } else if (type === API_SWITCH_TAB) {
            if (!routeOptions.meta.isTabBar) {
                return 'can not switch to no-tabBar page';
            }
        }
        if ((type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) && routeOptions.meta.isTabBar && params.openType !== 'appLaunch') {
            url = pagePath;
        }
        if (routeOptions.meta.isEntry) {
            url = url.replace(routeOptions.alias!, '/');
        }
        params.url = encodeQueryString(url);
        if (type === API_UN_PRELOAD_PAGE) {
            return;
        } else if (type === API_PRELOAD_PAGE) {
            if (routeOptions.meta.isTabBar) {
                const pages = getCurrentPages();
                const tabBarPagePath = routeOptions.path.slice(1);
                if (pages.find((page)=>page.route === tabBarPagePath)) {
                    return 'tabBar page `' + tabBarPagePath + '` already exists';
                }
            }
            return;
        }
        if (navigatorLock === url && params.openType !== 'appLaunch') {
            return `${navigatorLock} locked`;
        }
        if (__uniConfig.ready) {
            navigatorLock = url;
        }
    };
}
type API_TYPE_CHOOSE_VIDEO = typeof uni.chooseVideo;
const ChooseVideoOptions: ApiOptions<API_TYPE_CHOOSE_VIDEO> = {
    formatArgs: {
        sourceType (sourceType, params) {
            params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
        },
        compressed: true,
        maxDuration: 60,
        camera: 'back',
        extension (extension, params) {
            if (extension instanceof Array && extension.length === 0) {
                return 'param extension should not be empty.';
            }
            if (!extension) params.extension = [
                '*'
            ];
        }
    }
};
const ChooseVideoProtocol: ApiProtocol<API_TYPE_CHOOSE_VIDEO> = {
    sourceType: Array,
    compressed: Boolean,
    maxDuration: Number,
    camera: String as Object,
    extension: Array
};
type API_TYPE_CHOOSE_IMAGE = typeof uni.chooseImage;
const ChooseImageOptions: ApiOptions<API_TYPE_CHOOSE_IMAGE> = {
    formatArgs: {
        count (value, params) {
            if (!value || value <= 0) {
                params.count = 9;
            }
        },
        sizeType (sizeType, params) {
            params.sizeType = elemsInArray(sizeType, CHOOSE_SIZE_TYPES);
        },
        sourceType (sourceType, params) {
            params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
        },
        extension (extension, params) {
            if (extension instanceof Array && extension.length === 0) {
                return 'param extension should not be empty.';
            }
            if (!extension) params.extension = [
                '*'
            ];
        }
    }
};
const ChooseImageProtocol: ApiProtocol<API_TYPE_CHOOSE_IMAGE> = {
    count: Number,
    sizeType: [
        Array,
        String
    ],
    sourceType: Array,
    extension: Array
};
function validateProp(name: string, value: unknown, prop: ProtocolOptions | ProtocolType<Object>, isAbsent: boolean) {
    if (!isPlainObject(prop)) {
        prop = {
            type: prop
        };
    }
    const { type , required , validator  } = prop as ProtocolOptions;
    if (required && isAbsent) {
        return 'Missing required args: "' + name + '"';
    }
    if (value == null && !required) {
        return;
    }
    if (type != null) {
        let isValid = false;
        const types = isArray(type) ? type : [
            type
        ];
        const expectedTypes: string[] = [];
        for(let i = 0; i < types.length && !isValid; i++){
            const { valid , expectedType  } = assertType(value, types[i]);
            expectedTypes.push(expectedType || '');
            isValid = valid;
        }
        if (!isValid) {
            return getInvalidTypeMessage(name, value, expectedTypes);
        }
    }
    if (validator) {
        return validator(value);
    }
}
const isSimpleType = makeMap('String,Number,Boolean,Function,Symbol');
type AssertionResult = {
    valid: boolean;
    expectedType: string;
};
function assertType(value: unknown, type: ProtocolConstructor): AssertionResult {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
        if (!valid && t === 'object') {
            valid = value instanceof type;
        }
    } else if (expectedType === 'Object') {
        valid = isObject(value);
    } else if (expectedType === 'Array') {
        valid = isArray(value);
    } else {
        valid = value instanceof type;
    }
    return {
        valid,
        expectedType
    };
}
function getInvalidTypeMessage(name: string, value: unknown, expectedTypes: string[]): string {
    let message = `Invalid args: type check failed for args "${name}".` + ` Expected ${expectedTypes.map(capitalize).join(', ')}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
        message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
        message += `with value ${receivedValue}.`;
    }
    return message;
}
function getType(ctor: ProtocolConstructor): string {
    const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
}
function styleValue(value: unknown, type: string): string {
    if (type === 'String') {
        return `"${value}"`;
    } else if (type === 'Number') {
        return `${Number(value)}`;
    } else {
        return `${value}`;
    }
}
function isExplicable(type: string): boolean {
    const explicitTypes = [
        'string',
        'number',
        'boolean'
    ];
    return explicitTypes.some((elem)=>type.toLowerCase() === elem);
}
function isBoolean(...args: string[]): boolean {
    return args.some((elem)=>elem.toLowerCase() === 'boolean');
}
type ActionsItemType = string | number | boolean | undefined | Array<number>;
type ActionsItemData = Array<ActionsItemType>;
type ActionsItem = {
    method: string;
    data: ActionsItemData | Array<ActionsItem>;
};
type AppHideHook = () => void;
interface AppHooks {
    onUnhandledRejection: UniApp.OnUnhandledRejectionCallback[];
    onPageNotFound: UniApp.OnPageNotFoundCallback[];
    onError: UniApp.OnAppErrorCallback[];
    onShow: AppShowHook[];
    onHide: AppHideHook[];
}
const appHooks: AppHooks = {
    [ON_UNHANDLE_REJECTION]: [],
    [ON_PAGE_NOT_FOUND]: [],
    [ON_ERROR]: [],
    [ON_SHOW]: [],
    [ON_HIDE]: []
};
function injectAppHooks(appInstance: ComponentInternalInstance) {
    Object.keys(appHooks).forEach((type)=>{
        appHooks[type as keyof AppHooks].forEach((hook)=>{
            injectHook(type, hook, appInstance);
        });
    });
}
type API_TYPE_GET_IMAGE_INFO = typeof uni.getImageInfo;
const GetImageInfoOptions: ApiOptions<API_TYPE_GET_IMAGE_INFO> = {
    formatArgs: {
        src (src, params) {
            params.src = getRealPath(src);
        }
    }
};
const GetImageInfoProtocol: ApiProtocol<API_TYPE_GET_IMAGE_INFO> = {
    src: {
        type: String,
        required: true
    }
};
type API_TYPE_GET_VIDEO_INFO = typeof uni.getVideoInfo;
const GetVideoInfoOptions: ApiOptions<API_TYPE_GET_VIDEO_INFO> = {
    formatArgs: {
        src (src, params) {
            params.src = getRealPath(src);
        }
    }
};
const GetVideoInfoProtocol: ApiProtocol<API_TYPE_GET_VIDEO_INFO> = {
    src: {
        type: String,
        required: true
    }
};
import picker1 from '@ohos.file.picker';
const chooseImage: API_TYPE_CHOOSE_IMAGE = defineAsyncApi(API_CHOOSE_IMAGE, function({ count  } = {}, { resolve , reject  }) {
    _chooseMedia({
        mimeType: picker1.PhotoViewMIMETypes.IMAGE_TYPE,
        count
    }).then((res)=>{
        return {
            tempFilePaths: res.tempFiles.map((file)=>file.tempFilePath),
            tempFiles: res.tempFiles.map((file)=>{
                return {
                    path: file.tempFilePath,
                    size: file.size
                };
            })
        };
    }).then(resolve, reject);
}, ChooseImageProtocol, ChooseImageOptions);
import picker2 from '@ohos.file.picker';
const chooseVideo: API_TYPE_CHOOSE_VIDEO = defineAsyncApi(API_CHOOSE_VIDEO, function({} = {}, { resolve , reject  }) {
    _chooseMedia({
        mimeType: picker2.PhotoViewMIMETypes.VIDEO_TYPE
    }).then((res)=>{
        const file = res.tempFiles[0];
        return {
            tempFilePath: file.tempFilePath,
            duration: file.duration,
            size: file.size,
            width: file.width,
            height: file.height
        };
    }).then(resolve, reject);
}, ChooseVideoProtocol, ChooseVideoOptions);
const getImageInfo: API_TYPE_GET_IMAGE_INFO = defineAsyncApi(API_GET_IMAGE_INFO, function({ src  }, { resolve , reject  }) {
    _getImageInfo(src).then(resolve, reject);
}, GetImageInfoProtocol, GetImageInfoOptions);
const getVideoInfo: API_TYPE_GET_VIDEO_INFO = defineAsyncApi(API_GET_VIDEO_INFO, function({ src  }, { resolve , reject  }) {
    _getVideoInfo(src).then((res)=>{
        return {
            size: res.size,
            duration: res.duration!,
            width: res.width!,
            height: res.height!,
            type: res.type!,
            orientation: res.orientation!
        };
    }).then(resolve, reject);
}, GetVideoInfoProtocol, GetVideoInfoOptions);
function getLocale() {
    return 'zh-CN';
}
function getSystemInfoSync() {
    return getBaseSystemInfo();
}
const downgrade = false && plus.os.name === 'Android' && parseInt(plus.os.version!) < 6;
const ANI_SHOW = downgrade ? 'slide-in-right' : 'pop-in';
const ANI_CLOSE = downgrade ? 'slide-out-right' : 'pop-out';
const VIEW_WEBVIEW_PATH = '_www/__uniappview.html';
const WEBVIEW_ID_PREFIX = 'webviewId';
const VD_SYNC = 'vdSync';
const ON_WEBVIEW_READY = 'onWebviewReady';
let ACTION_MINIFY = true;
type Value = string | number | boolean | null;
type Dictionary = Value[];
type DictAction = [typeof ACTION_TYPE_DICT, Dictionary];
const WEBVIEW_INSERTED = 'webviewInserted';
const WEBVIEW_REMOVED = 'webviewRemoved';
const pages: ComponentPublicInstance[] = [];
interface VueApp extends App {
    mountPage: (pageComponent: VuePageComponent, pageProps: Record<string, Object>, pageContainer: UniNode) => ComponentPublicInstance;
    unmountPage: (pageInstance: ComponentPublicInstance) => void;
}
type VuePageComponent = DefineComponent<PageProps>;
class UniPageNode extends UniNode implements IUniPageNode {
    pageId: number;
    private _id: number = 1;
    private _created: boolean = false;
    private _updating: boolean = false;
    private options: PageNodeOptions;
    private createAction: PageCreateAction;
    private createdAction: PageCreatedAction;
    private scrollAction?: PageScrollAction;
    private _createActionMap = new Map<number, CreateAction>();
    updateActions: (PageAction | DictAction)[] = [];
    dicts: Dictionary = [];
    normalizeDict: (value: unknown, normalizeValue?: boolean) => Object | number;
    isUnmounted: boolean;
    private _update: () => void;
    constructor(pageId: number, options: PageNodeOptions, setup: boolean = false){
        super(0, '#page', null as unknown as IUniPageNode);
        this.nodeId = 0;
        this.pageId = pageId;
        this.pageNode = this;
        this.options = options;
        this.isUnmounted = false;
        this.createAction = [
            ACTION_TYPE_PAGE_CREATE,
            options
        ];
        this.createdAction = [
            ACTION_TYPE_PAGE_CREATED
        ];
        this.normalizeDict = this._normalizeDict.bind(this);
        this._update = this.update.bind(this);
        setup && this.setup();
    }
    _normalizeDict(value: unknown, normalizeValue: boolean = true) {
        if (!ACTION_MINIFY) {
            return value;
        }
        if (!isPlainObject(value)) {
            return this.addDict(value as Value);
        }
        const dictArray: [number, number][] = [];
        Object.keys(value).forEach((n)=>{
            const dict = [
                this.addDict(n) as number
            ];
            const v = value[n as keyof typeof value] as Value;
            if (normalizeValue) {
                dict.push(this.addDict(v) as number);
            } else {
                dict.push(v as number);
            }
            dictArray.push(dict as [number, number]);
        });
        return dictArray;
    }
    addDict<T extends Value>(value: T): T | number {
        if (!ACTION_MINIFY) {
            return value;
        }
        const { dicts  } = this;
        const index = dicts.indexOf(value);
        if (index > -1) {
            return index;
        }
        return dicts.push(value) - 1;
    }
    onInjectHook(hook: string) {
        if ((hook === ON_PAGE_SCROLL || hook === ON_REACH_BOTTOM) && !this.scrollAction) {
            this.scrollAction = [
                ACTION_TYPE_PAGE_SCROLL,
                this.options.onReachBottomDistance
            ];
            this.push(this.scrollAction);
        }
    }
    onCreate(thisNode: UniNode, nodeName: string | number) {
        pushCreateAction(this, thisNode.nodeId!, nodeName);
        return thisNode;
    }
    onInsertBefore(thisNode: UniNode, newChild: UniNode, refChild: UniNode | null) {
        pushInsertAction(this, newChild as UniBaseNode, thisNode.nodeId!, (refChild && refChild.nodeId!) || -1);
        return newChild;
    }
    onRemoveChild(oldChild: UniNode) {
        pushRemoveAction(this, oldChild.nodeId!);
        return oldChild;
    }
    onAddEvent(thisNode: UniNode, name: string, flag: number) {
        if (thisNode.parentNode) {
            pushAddEventAction(this, thisNode.nodeId!, name, flag);
        }
    }
    onAddWxsEvent(thisNode: UniNode, name: string, wxsEvent: string, flag: number) {
        if (thisNode.parentNode) {
            pushAddWxsEventAction(this, thisNode.nodeId!, name, wxsEvent, flag);
        }
    }
    onRemoveEvent(thisNode: UniNode, name: string) {
        if (thisNode.parentNode) {
            pushRemoveEventAction(this, thisNode.nodeId!, name);
        }
    }
    onSetAttribute(thisNode: UniNode, qualifiedName: string, value: unknown) {
        if (thisNode.parentNode) {
            pushSetAttributeAction(this, thisNode.nodeId!, qualifiedName, value);
        }
    }
    onRemoveAttribute(thisNode: UniNode, qualifiedName: string) {
        if (thisNode.parentNode) {
            pushRemoveAttributeAction(this, thisNode.nodeId!, qualifiedName);
        }
    }
    onTextContent(thisNode: UniNode, text: string) {
        if (thisNode.parentNode) {
            pushSetTextAction(this, thisNode.nodeId!, text);
        }
    }
    onNodeValue(thisNode: UniNode, val: string | null) {
        if (thisNode.parentNode) {
            pushSetTextAction(this, thisNode.nodeId!, val as string);
        }
    }
    genId() {
        return this._id++;
    }
    push(action: PageAction, extras?: unknown) {
        if (this.isUnmounted) {
            console.log(formatLog('PageNode', 'push.prevent', action));
            return;
        }
        switch(action[0]){
            case 3:
                this._createActionMap.set(action[1], action);
                break;
            case 4:
                const createAction = this._createActionMap.get(action[1]);
                if (createAction) {
                    createAction[3] = action[2];
                    createAction[4] = action[3];
                    if (extras) {
                        createAction[5] = extras as UniNodeJSON;
                    }
                } else {
                    if (extras) {
                        action[4] = extras as UniNodeJSON;
                    }
                    this.updateActions.push(action);
                }
                break;
        }
        if (action[0] !== 4) {
            this.updateActions.push(action);
        }
        if (!this._updating) {
            this._updating = true;
            queuePostFlushCb(this._update);
        }
    }
    restore() {
        this.clear();
        this.setup();
        if (this.scrollAction) {
            this.push(this.scrollAction);
        }
        const restoreNode = (node: UniNode)=>{
            this.onCreate(node, node.nodeName);
            this.onInsertBefore(node.parentNode!, node, null);
            node.childNodes.forEach((childNode)=>{
                restoreNode(childNode);
            });
        };
        this.childNodes.forEach((childNode)=>restoreNode(childNode));
        this.push(this.createdAction);
    }
    setup() {
        this.send([
            this.createAction
        ]);
    }
    update() {
        const { dicts , updateActions , _createActionMap  } = this;
        console.log(formatLog('PageNode', 'update', updateActions.length, _createActionMap.size));
        if (!this._created) {
            this._created = true;
            updateActions.push(this.createdAction);
        }
        if (updateActions.length) {
            if (dicts.length) {
                updateActions.unshift([
                    0,
                    dicts
                ]);
            }
            this.send(updateActions);
        }
        this.clear();
    }
    clear() {
        this.dicts.length = 0;
        this.updateActions.length = 0;
        this._updating = false;
        this._createActionMap.clear();
    }
    send(action: (PageAction | DictAction)[]) {
        UniServiceJSBridge.publishHandler(VD_SYNC, action, this.pageId);
    }
    fireEvent(id: number, evt: UniEvent) {
        const node = findNodeById(id, this);
        if (node) {
            node.dispatchEvent(evt);
        } else {
            console.error(formatLog('PageNode', 'fireEvent', id, 'not found', evt));
        }
    }
}
function addCurrentPage(page: ComponentPublicInstance) {
    const $page = page.$page;
    if (!$page.meta.isNVue) {
        return pages.push(page);
    }
    const index = pages.findIndex((p)=>p.$page.id === page.$page.id);
    if (index > -1) {
        pages.splice(index, 1, page);
    } else {
        pages.push(page);
    }
}
function setupPage(component: VuePageComponent) {
    const oldSetup = component.setup;
    component.inheritAttrs = false;
    component.setup = (_, ctx)=>{
        const { attrs: { __pageId , __pagePath , __pageQuery , __pageInstance  }  } = ctx;
        console.log(formatLog(__pagePath as string, 'setup'));
        const instance = getCurrentInstance()!;
        const pageVm = instance.proxy!;
        initPageVm(pageVm, __pageInstance as Page.PageInstance[string]);
        addCurrentPage(initScope(__pageId as number, pageVm, __pageInstance as Page.PageInstance[string]));
        if (oldSetup) {
            return oldSetup(__pageQuery as Object, ctx);
        }
    };
    return component;
}
function getPageById(id: number) {
    return pages.find((page)=>page.$page.id === id);
}
function getAllPages() {
    return pages;
}
function getCurrentPages1() {
    const curPages: ComponentPublicInstance[] = [];
    pages.forEach((page)=>{
        if (page.$.__isTabBar) {
            if (page.$.__isActive) {
                curPages.push(page);
            }
        } else {
            curPages.push(page);
        }
    });
    return curPages;
}
let vueApp: VueApp;
function getVueApp() {
    return vueApp;
}
function removePage(curPage: ComponentPublicInstance | Page.PageInstance) {
    const index = pages.findIndex((page)=>page === curPage);
    if (index === -1) {
        return;
    }
    if (!curPage.$page.meta.isNVue) {
        getVueApp().unmountPage(curPage as ComponentPublicInstance);
    }
    pages.splice(index, 1);
    console.log(formatLog('removePage', curPage.$page));
}
function initVueApp(appVm: ComponentPublicInstance) {
    const internalInstance = appVm.$;
    Object.defineProperty((internalInstance as Object).ctx, '$children', {
        get () {
            return getAllPages().map((page)=>page.$vm);
        }
    });
    const appContext = internalInstance.appContext;
    vueApp = extend(appContext.app, {
        mountPage (pageComponent: VuePageComponent, pageProps: Record<string, Object>, pageContainer: UniNode) {
            const vnode = createVNode(pageComponent, pageProps);
            vnode.appContext = appContext;
            (vnode as Object).__page_container__ = pageContainer;
            render(vnode, pageContainer as unknown as Element);
            const publicThis = vnode.component!.proxy!;
            (publicThis as Object).__page_container__ = pageContainer;
            return publicThis;
        },
        unmountPage: (pageInstance: ComponentPublicInstance)=>{
            const { __page_container__  } = pageInstance as Object;
            if (__page_container__) {
                __page_container__.isUnmounted = true;
                render(null, __page_container__);
            }
        }
    });
}
type VuePageAsyncComponent = () => Promise<VuePageComponent>;
function isVuePageAsyncComponent(component: unknown): component is VuePageAsyncComponent {
    return isFunction(component);
}
const pagesMap = new Map<string, ReturnType<typeof createFactory>>();
function definePage(pagePath: string, asyncComponent: VuePageAsyncComponent | VuePageComponent) {
    pagesMap.set(pagePath, once(createFactory(asyncComponent)));
}
interface PageProps {
    __pageId: number;
    __pagePath: string;
    __pageQuery: Record<string, Object>;
    __pageInstance: Page.PageInstance[string];
}
function getPageNode(pageId: number): UniPageNode | null {
    const page = getPageById(pageId);
    if (!page) return null;
    return (page as Object).__page_container__ as UniPageNode;
}
function findNode(name: string | string, value: string | number, uniNode: UniNode | number): UniNode | null {
    if (typeof uniNode === 'number') {
        uniNode = getPageNode(uniNode) as UniNode;
    }
    if (uniNode[name] === value) {
        return uniNode;
    }
    const { childNodes  } = uniNode;
    for(let i = 0; i < childNodes.length; i++){
        const uniNode = findNode(name, value, childNodes[i]);
        if (uniNode) {
            return uniNode;
        }
    }
    return null;
}
function findNodeById(nodeId: number, uniNode: UniNode | number) {
    return findNode('nodeId', nodeId, uniNode);
}
function findNodeByTagName(tagName: string, uniNode: UniNode | number): UniNode | null {
    return findNode('nodeName', tagName.toUpperCase(), uniNode);
}
function pushCreateAction(pageNode: UniPageNode, nodeId: number, nodeName: string | number) {
    pageNode.push([
        3,
        nodeId,
        pageNode.addDict(nodeName),
        -1,
        -1
    ]);
}
function pushInsertAction(pageNode: UniPageNode, newChild: UniBaseNode, parentNodeId: number, refChildId: number) {
    const nodeJson = newChild.toJSON({
        attr: true,
        normalize: pageNode.normalizeDict
    });
    pageNode.push([
        4,
        newChild.nodeId!,
        parentNodeId,
        refChildId
    ], Object.keys(nodeJson).length ? nodeJson : undefined);
}
function pushRemoveAction(pageNode: UniPageNode, nodeId: number) {
    pageNode.push([
        5,
        nodeId
    ]);
}
function pushAddEventAction(pageNode: UniPageNode, nodeId: number, name: string, value: number) {
    pageNode.push([
        8,
        nodeId,
        pageNode.addDict(name),
        value
    ]);
}
function pushAddWxsEventAction(pageNode: UniPageNode, nodeId: number, name: string, wxsEvent: string, value: number) {
    pageNode.push([
        12,
        nodeId,
        pageNode.addDict(name),
        pageNode.addDict(wxsEvent),
        value
    ]);
}
function pushRemoveEventAction(pageNode: UniPageNode, nodeId: number, name: string) {
    pageNode.push([
        9,
        nodeId,
        pageNode.addDict(name)
    ]);
}
function normalizeAttrValue(pageNode: UniPageNode, name: string, value: unknown) {
    return name === 'style' && isPlainObject(value) ? pageNode.normalizeDict(value) : pageNode.addDict(value as Value);
}
function pushSetAttributeAction(pageNode: UniPageNode, nodeId: number, name: string, value: unknown) {
    pageNode.push([
        6,
        nodeId,
        pageNode.addDict(name),
        normalizeAttrValue(pageNode, name, value)
    ]);
}
function pushRemoveAttributeAction(pageNode: UniPageNode, nodeId: number, name: string) {
    pageNode.push([
        7,
        nodeId,
        pageNode.addDict(name)
    ]);
}
function pushSetTextAction(pageNode: UniPageNode, nodeId: number, text: string) {
    pageNode.push([
        10,
        nodeId,
        pageNode.addDict(text)
    ]);
}
function createPageNode(pageId: number, pageOptions: PageNodeOptions, setup?: boolean) {
    return new UniPageNode(pageId, pageOptions, setup);
}
function createVuePage(__pageId: number, __pagePath: string, __pageQuery: Record<string, Object>, __pageInstance: Page.PageInstance[string], pageOptions: PageNodeOptions) {
    const pageNode = createPageNode(__pageId, pageOptions, true);
    const app = getVueApp();
    const component = pagesMap.get(__pagePath)!();
    const mountPage = (component: VuePageComponent)=>app.mountPage(component, {
            __pageId,
            __pagePath,
            __pageQuery,
            __pageInstance
        }, pageNode);
    if (isPromise(component)) {
        return component.then((component)=>mountPage(component));
    }
    return mountPage(component);
}
function createFactory(component: VuePageAsyncComponent | VuePageComponent) {
    return ()=>{
        if (isVuePageAsyncComponent(component)) {
            return component().then((component)=>setupPage(component));
        }
        return setupPage(component);
    };
}
function initScope(pageId: number, vm: ComponentPublicInstance, pageInstance: Page.PageInstance[string]) {
    Object.defineProperty(vm, '$viewToTempFilePath', {
        get () {
            return vm.$nativePage!.viewToTempFilePath.bind(vm.$nativePage!);
        }
    });
    Object.defineProperty(vm, '$getPageStyle', {
        get () {
            return vm.$nativePage!.getPageStyle.bind(vm.$nativePage!);
        }
    });
    Object.defineProperty(vm, '$setPageStyle', {
        get () {
            return vm.$nativePage!.setPageStyle.bind(vm.$nativePage!);
        }
    });
    vm.getOpenerEventChannel = ()=>{
        if (!pageInstance.eventChannel) {
            pageInstance.eventChannel = new EventChannel(pageId);
        }
        return pageInstance.eventChannel as EventChannel;
    };
    return vm;
}
let id = 1;
function getWebviewId() {
    return id;
}
function genWebviewId() {
    return id++;
}
type SetStatusBarStyle = typeof plus.navigator.setStatusBarStyle;
type StatusBarStyle = Parameters<SetStatusBarStyle>[number];
let oldSetStatusBarStyle = plus.navigator.setStatusBarStyle;
function newSetStatusBarStyle(style: StatusBarStyle) {
    style;
    oldSetStatusBarStyle(style);
}
plus.navigator.setStatusBarStyle = newSetStatusBarStyle;
let preloadWebview: PlusWebviewWebviewObject & {
    loaded?: boolean;
    __uniapp_route?: string;
};
function setPreloadWebview(webview: PlusWebviewWebviewObject) {
    return preloadWebview = webview;
}
function getPreloadWebview() {
    return preloadWebview;
}
function createPreloadWebview() {
    if (!preloadWebview || (preloadWebview as Object).__uniapp_route) {
        preloadWebview = plus.webview.create(VIEW_WEBVIEW_PATH, String(genWebviewId()), {
            contentAdjust: false
        });
        console.log(formatLog('createPreloadWebview', preloadWebview.id));
    }
    return preloadWebview;
}
function isDirectPage(page: Page.PageInstance) {
    return (__uniConfig.realEntryPagePath && page.$page.route === __uniConfig.entryPagePath);
}
function reLaunchEntryPage() {
    __uniConfig.entryPagePath = __uniConfig.realEntryPagePath;
    delete __uniConfig.realEntryPagePath;
    .reLaunch({
        url: addLeadingSlash(__uniConfig.entryPagePath!)
    } as ReLaunchOptions);
}
const enterOptions: LaunchOptions = createLaunchOptions();
const launchOptions: LaunchOptions = createLaunchOptions();
function initLaunchOptions({ path , query , referrerInfo  }: Partial<RedirectInfo>) {
    extend(launchOptions, {
        path,
        query: query ? parseQuery(query) : {},
        referrerInfo: referrerInfo || {},
        channel: undefined,
        launcher: undefined
    });
    extend(enterOptions, launchOptions);
    return extend({}, launchOptions);
}
interface RedirectInfo extends Omit<LaunchOptions, string | string> {
    query: string;
    userAction: boolean;
}
interface CreateWebviewOptions {
    path: string;
    query: Record<string, string>;
    routeOptions: UniApp.UniRoute;
    webviewExtras?: Record<string, Object>;
}
function onWebviewReady(pageId: string, callback: (...args: Object[]) => void) {
    UniServiceJSBridge.once(ON_WEBVIEW_READY + '.' + pageId, callback);
}
interface RouteOptions {
    url: string;
    path: string;
    query: Record<string, Object>;
}
function closeWebview(webview: PlusWebviewWebviewObject, animationType: string, animationDuration?: number) {
    webview[(webview as Object).__preload__ ? 'hide' : 'close'](animationType as Object, animationDuration);
}
interface PendingNavigator {
    path: string;
    nvue?: boolean;
    callback: Function;
}
let pendingNavigator: PendingNavigator | false = false;
function getPendingNavigator() {
    return pendingNavigator;
}
function setPendingNavigator(path: string, callback: Function, msg: string) {
    pendingNavigator = {
        path,
        nvue: getRouteMeta(path)!.isNVue,
        callback
    };
    console.log(formatLog('setPendingNavigator', path, msg));
}
function pendingNavigate() {
    if (!pendingNavigator) {
        return;
    }
    const { callback  } = pendingNavigator;
    console.log(formatLog('pendingNavigate', pendingNavigator.path));
    pendingNavigator = false;
    return callback();
}
function navigateFinish() {
    if (__uniConfig.renderer === 'native') {
        if (!pendingNavigator) {
            return;
        }
        if (pendingNavigator.nvue) {
            return pendingNavigate();
        }
        return;
    }
    const preloadWebview = createPreloadWebview();
    console.log(formatLog('navigateFinish', 'preloadWebview', preloadWebview.id));
    if (!pendingNavigator) {
        return;
    }
    if (pendingNavigator.nvue) {
        return pendingNavigate();
    }
    preloadWebview.loaded ? pendingNavigator.callback() : onWebviewReady(preloadWebview.id!, pendingNavigate);
}
function showWebview(webview: PlusWebviewWebviewObject, animationType: string, animationDuration: number, showCallback: Function, delay?: number) {
    if (typeof delay === 'undefined') {
        delay = (webview as Object).nvue ? 0 : 100;
    }
    console.log(formatLog('showWebview', 'delay', delay));
    const execShowCallback = function() {
        if (execShowCallback._called) {
            console.log(formatLog('execShowCallback', 'prevent'));
            return;
        }
        execShowCallback._called = true;
        showCallback && showCallback();
        navigateFinish();
    };
    execShowCallback._called = false;
    setTimeout(()=>{
        const timer = setTimeout(()=>{
            console.log(formatLog('showWebview', 'callback', 'timer'));
            execShowCallback();
        }, animationDuration + 150);
        webview.show(animationType as Object, animationDuration, ()=>{
            console.log(formatLog('showWebview', 'callback'));
            if (!execShowCallback._called) {
                clearTimeout(timer);
            }
            execShowCallback();
        });
    }, delay);
}
function backWebview(webview: PlusWebviewWebviewObject, callback: () => void) {
    const children = webview.children();
    if (!children || !children.length) {
        return callback();
    }
    const childWebview = children.find((webview)=>webview.id!.indexOf(WEBVIEW_ID_PREFIX) === 0) || children[0];
    childWebview.canBack(({ canBack  })=>{
        if (canBack) {
            childWebview.back();
        } else {
            callback();
        }
    });
}
function navigate(path: string, callback: () => void, isAppLaunch: boolean) {
    const pendingNavigator = getPendingNavigator();
    if (!isAppLaunch && pendingNavigator) {
        return console.error(`Waiting to navigate to: ${pendingNavigator.path}, do not operate continuously: ${path}.`);
    }
    const preloadWebview = getPreloadWebview();
    const waitPreloadWebview = !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route);
    const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded;
    if (waitPreloadWebview || waitPreloadWebviewReady) {
        setPendingNavigator(path, callback, waitPreloadWebview ? 'waitForCreate' : 'waitForReady');
    } else {
        callback();
    }
    if (waitPreloadWebviewReady) {
        onWebviewReady(preloadWebview.id!, pendingNavigate);
    }
}
function initRouteOptions(path: string, openType: UniApp.OpenType) {
    const routeOptions = UTSiOS.consoleDebugError(JSON.parse(JSON.stringify(getRouteOptions(path)!))) as UniApp.UniRoute;
    routeOptions.meta = initRouteMeta(routeOptions.meta);
    if (openType !== 'preloadPage' && !__uniConfig.realEntryPagePath && (openType === 'reLaunch' || getCurrentPages().length === 0)) {
        routeOptions.meta.isQuit = true;
    } else if (!routeOptions.meta.isTabBar) {
        routeOptions.meta.isQuit = false;
    }
    return routeOptions;
}
interface RegisterPageOptions {
    url: string;
    path: string;
    query: Record<string, string>;
    openType: UniApp.OpenType;
    webview?: PlusWebviewWebviewObject;
    nvuePageVm?: ComponentPublicInstance;
    eventChannel?: EventChannel;
}
function createWebview(options: CreateWebviewOptions) {
    if (getWebviewId() === 2) {
        return plus.webview.getLaunchWebview();
    }
    return getPreloadWebview();
}
function getStatusbarHeight() {
    return 0;
}
function registerPage({ url , path , query , openType , webview , nvuePageVm , eventChannel  }: RegisterPageOptions) {
    const routeOptions = initRouteOptions(path, openType);
    if (!webview) {
        webview = createWebview({
            path,
            routeOptions,
            query
        });
    } else {
        webview = plus.webview.getWebviewById(webview.id);
        (webview as Object).nvue = routeOptions.meta.isNVue;
    }
    routeOptions.meta.id = parseInt(webview.id!);
    console.log(formatLog('registerPage', path, webview.id));
    const route = path.slice(1);
    (webview as Object).__uniapp_route = route;
    const pageInstance = initPageInternalInstance(openType, url, query, routeOptions.meta, eventChannel, 'light');
    const id = parseInt(webview.id!);
    createVuePage(id, route, query, pageInstance, initPageOptions(routeOptions));
    return webview;
}
function initPageOptions({ meta  }: UniApp.UniRoute): PageNodeOptions {
    const statusbarHeight = getStatusbarHeight();
    const { platform , pixelRatio , windowWidth  } = getBaseSystemInfo();
    return {
        css: true,
        route: meta.route,
        version: 1,
        locale: '',
        platform,
        pixelRatio,
        windowWidth,
        disableScroll: meta.disableScroll === true,
        onPageScroll: false,
        onPageReachBottom: false,
        onReachBottomDistance: hasOwn(meta, 'onReachBottomDistance') ? meta.onReachBottomDistance! : 50,
        statusbarHeight,
        windowTop: 0,
        windowBottom: 0
    };
}
interface NavigateToOptions extends RouteOptions {
    events: Record<string, Object>;
    aniType: string;
    aniDuration: number;
}
function initAnimation(path: string, animationType?: string, animationDuration?: number) {
    const { globalStyle  } = __uniConfig;
    const meta = getRouteMeta(path)!;
    return [
        animationType || meta.animationType || globalStyle.animationType || ANI_SHOW,
        animationDuration || meta.animationDuration || globalStyle.animationDuration || 300
    ] as const;
}
const $navigateTo: DefineAsyncApiFn<API_TYPE_NAVIGATE_TO> = (args, { resolve , reject  })=>{
    const { url , events , animationType , animationDuration  } = args;
    const { path , query  } = parseUrl(url);
    const [aniType, aniDuration] = initAnimation(path, animationType, animationDuration);
    navigate(path, ()=>{
        _navigateTo({
            url,
            path,
            query,
            events,
            aniType,
            aniDuration
        }).then(resolve).catch(reject);
    }, (args as Object).openType === 'appLaunch');
};
const navigateTo = defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
interface NavigateToOptions extends RouteOptions {
    events: Record<string, Object>;
    aniType: string;
    aniDuration: number;
}
function _navigateTo({ url , path , query , events , aniType , aniDuration  }: NavigateToOptions): Promise<void | {
    eventChannel: EventChannel;
}> {
    invokeHook(ON_HIDE);
    invokeHook(ON_HIDE);
    const eventChannel = new EventChannel(getWebviewId() + 1, events);
    return new Promise((resolve)=>{
        showWebview(registerPage({
            url,
            path,
            query,
            openType: 'navigateTo',
            eventChannel
        }), aniType, aniDuration, ()=>{
            resolve({
                eventChannel
            });
        });
    });
}
const navigateBack = defineAsyncApi(API_NAVIGATE_BACK, (args, { resolve , reject  })=>{
    const page = getCurrentPage();
    if (!page) {
        return reject(`getCurrentPages is empty`);
    }
    if (invokeHook(page as ComponentPublicInstance, ON_BACK_PRESS, {
        from: (args as Object).from || 'navigateBack'
    })) {
        return resolve();
    }
    if (.hideToast) {
        .hideToast();
    }
    if (.hideLoading) {
        .hideLoading();
    }
    if (page.$page.meta.isQuit) {
        quit();
    } else if (isDirectPage(page)) {
        reLaunchEntryPage();
    } else {
        const { delta , animationType , animationDuration  } = args!;
        back(delta!, animationType, animationDuration);
    }
    return resolve();
}, NavigateBackProtocol, NavigateBackOptions);
function quit() {}
function back(delta: number, animationType?: string, animationDuration?: number) {
    const pages = getCurrentPages();
    const len = pages.length;
    const currentPage = pages[len - 1];
    if (delta > 1) {
        pages.slice(len - delta, len - 1).reverse().forEach((deltaPage)=>{
            closeWebview(plus.webview.getWebviewById(deltaPage.$page.id + ''), 'none', 0);
        });
    }
    const backPage = function(webview: PlusWebviewWebviewObject) {
        if (animationType) {
            closeWebview(webview, animationType, animationDuration || 300);
        } else {
            if (currentPage.$page.openType === 'redirectTo') {
                closeWebview(webview, ANI_CLOSE, 300);
            } else {
                closeWebview(webview, 'auto');
            }
        }
        pages.slice(len - delta, len).forEach((page)=>removePage(page as ComponentPublicInstance));
        invokeHook(ON_SHOW);
    };
    const webview = plus.webview.getWebviewById(currentPage.$page.id + '');
    if (!(currentPage as Object).__uniapp_webview) {
        return backPage(webview);
    }
    backWebview(webview, ()=>{
        backPage(webview);
    });
}
const mod = {
    navigateTo: navigateTo,
    navigateBack: navigateBack,
    getSystemInfoSync,
    getVideoInfo,
    getLocale,
    chooseVideo,
    chooseImage,
    getImageInfo
};
const UniServiceJSBridge1 = extend(ServiceJSBridge, {
    publishHandler
});
function publishHandler(event: string, args: unknown, pageIds: number | number[]) {
    args = JSON.stringify(args);
    console.log(formatLog('publishHandler', event, args, pageIds));
    if (!isArray(pageIds)) {
        pageIds = [
            pageIds
        ];
    }
    const evalJSCode = `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${event}",${args},__PAGE_ID__)`;
    console.log(formatLog('publishHandler', 'size', evalJSCode.length));
    pageIds.forEach((id)=>{
        const idStr = String(id);
        const webview = plus.webview.getWebviewById(idStr);
        const code = evalJSCode.replace('__PAGE_ID__', idStr);
        webview && webview.evalJS(code);
    });
}
let focusTimeout = 0;
let keyboardHeight = 0;
let focusTimer: ReturnType<typeof setTimeout> | null = null;
function hookKeyboardEvent(event: UniEvent, callback: (event: UniEvent) => void) {
    null;
    if (focusTimer) {
        clearTimeout(focusTimer);
        focusTimer = null;
    }
    if (event.type === 'onFocus') {
        if (keyboardHeight > 0) {
            event.detail!.height = keyboardHeight;
        } else {
            focusTimer = setTimeout(function() {
                event.detail!.height = keyboardHeight;
                callback(event);
            }, focusTimeout);
            (function() {
                if (focusTimer) {
                    clearTimeout(focusTimer);
                    focusTimer = null;
                }
                event.detail!.height = keyboardHeight;
                callback(event);
            });
            return;
        }
    }
    callback(event);
}
type EventAction = [typeof ACTION_TYPE_EVENT, Parameters<typeof onNodeEvent>[number], Parameters<typeof onNodeEvent>[number]];
function onNodeEvent(nodeId: number, evt: UniEvent, pageNode: UniPageNode) {
    const type = evt.type;
    if (type === 'onFocus' || type === 'onBlur') {
        hookKeyboardEvent(evt, (evt)=>{
            pageNode.fireEvent(nodeId, evt);
        });
    } else {
        pageNode.fireEvent(nodeId, evt);
    }
}
function onVdSync(actions: EventAction[], pageId: string) {
    const page = getPageById(parseInt(pageId));
    if (!page) {
        console.error(formatLog('onVdSync', 'page', pageId, 'not found'));
        return;
    }
    const pageNode = (page as Object).__page_container__ as UniPageNode;
    actions.forEach((action)=>{
        switch(action[0]){
            case 20:
                onNodeEvent(action[1], action[2], pageNode);
                break;
        }
    });
}
function subscribePlusMessage({ data  }: {
    data: {
        type: string;
        args: Record<string, Object>;
    };
}) {
    console.log(formatLog('plusMessage', data));
    if (data && data.type) {
        UniServiceJSBridge.subscribeHandler('plusMessage.' + data.type, data.args);
    }
}
function onPlusMessage<T>(type: string, callback: (args: T) => void, once: boolean = false) {
    UniServiceJSBridge.subscribe('plusMessage.' + type, callback, once);
}
const API_ROUTE = [
    'switchTab',
    'reLaunch',
    'redirectTo',
    'navigateTo',
    'navigateBack'
] as const;
function subscribeNavigator() {
    API_ROUTE.forEach((name)=>{
        registerServiceMethod(name, (args)=>{
            (uni[name] as (options: Object) => void)(extend(args, {
                fail (res: {
                    errMsg: string;
                }) {
                    console.error(res.errMsg);
                }
            }));
        });
    });
}
const $switchTab: DefineAsyncApiFn<API_TYPE_SWITCH_TAB> = (args, { resolve , reject  })=>{
    throw new Error('API $switchTab is not yet implemented');
};
let isLaunchWebviewReady = false;
function subscribeWebviewReady(_data: unknown, pageId: string) {
    const isLaunchWebview = pageId === '1';
    if (isLaunchWebview && isLaunchWebviewReady) {
        console.log('[uni-app] onLaunchWebviewReady.prevent');
        return;
    }
    let preloadWebview = getPreloadWebview();
    if (isLaunchWebview) {
        isLaunchWebviewReady = true;
        preloadWebview = setPreloadWebview(plus.webview.getLaunchWebview());
    } else if (!preloadWebview) {
        preloadWebview = setPreloadWebview(plus.webview.getWebviewById(pageId));
    }
    if (!preloadWebview.loaded) {
        if (preloadWebview.id !== pageId) {
            return console.error(`webviewReady[${preloadWebview.id}][${pageId}] not match`);
        }
        (preloadWebview as Object).loaded = true;
    }
    UniServiceJSBridge.emit(ON_WEBVIEW_READY + '.' + pageId);
    isLaunchWebview && onLaunchWebviewReady();
}
function onLaunchWebviewReady() {
    const entryPagePath = addLeadingSlash(__uniConfig.entryPagePath!);
    const routeOptions = getRouteOptions(entryPagePath)!;
    const args = {
        url: entryPagePath + (__uniConfig.entryPageQuery || ''),
        openType: 'appLaunch'
    };
    const handler = {
        resolve () {},
        reject () {}
    };
    if (routeOptions.meta.isTabBar) {
        return $switchTab(args, handler);
    }
    return $navigateTo(args, handler);
}
function onWebviewInserted(_: unknown, pageId: string) {
    const page = getPageById(parseInt(pageId));
    page && ((page as Object).__uniapp_webview = true);
}
function onWebviewRemoved(_: unknown, pageId: string) {
    const page = getPageById(parseInt(pageId));
    page && delete (page as Object).__uniapp_webview;
}
type Name = string | string | string | string | string | string;
type WebInvokeData = {
    name: Name;
    arg: Object;
};
type WebInvokeAppService = (webInvokeData: WebInvokeData, pageIds: string[]) => void;
const onWebInvokeAppService: WebInvokeAppService = ({ name , arg  }, pageIds)=>{
    if (name === 'postMessage') {
        onMessage(pageIds[0], arg);
    } else {
        (uni[name] as (options: Object) => void)(extend(arg, {
            fail (res: {
                errMsg: string;
            }) {
                console.error(res.errMsg);
            }
        }));
    }
};
function onMessage(pageId: string, arg: Object) {
    const uniNode = findNodeByTagName('web-view', parseInt(pageId));
    uniNode && uniNode.dispatchEvent(createUniEvent({
        type: 'onMessage',
        target: Object.create(null),
        currentTarget: Object.create(null),
        detail: {
            data: [
                arg
            ]
        }
    }));
}
function initSubscribeHandlers() {
    const { subscribe , subscribeHandler , publishHandler  } = UniServiceJSBridge;
    onPlusMessage('subscribeHandler', ({ type , data , pageId  })=>{
        subscribeHandler(type, data, pageId);
    });
    onPlusMessage(WEB_INVOKE_APPSERVICE, ({ data , webviewIds  })=>{
        onWebInvokeAppService(data, webviewIds);
    });
    subscribe(ON_WEBVIEW_READY, subscribeWebviewReady);
    subscribe(VD_SYNC, onVdSync);
    subscribeServiceMethod();
    subscribeNavigator();
    subscribe(WEBVIEW_INSERTED, onWebviewInserted);
    subscribe(WEBVIEW_REMOVED, onWebviewRemoved);
    const routeOptions = getRouteOptions(addLeadingSlash(__uniConfig.entryPagePath!));
    if (routeOptions) {
        publishHandler(ON_WEBVIEW_READY, {}, 1);
    }
}
function initGlobalEvent() {
    const plusGlobalEvent = (plus as Object).globalEvent;
    plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage);
}
function initAppLaunch(appVm: ComponentPublicInstance) {
    injectAppHooks(appVm.$);
    const { entryPagePath , entryPageQuery , referrerInfo  } = __uniConfig;
    const args = initLaunchOptions({
        path: entryPagePath,
        query: entryPageQuery,
        referrerInfo: referrerInfo
    });
    invokeHook(appVm, ON_LAUNCH, args);
    invokeHook(appVm, ON_SHOW, args);
}
let appCtx: ComponentPublicInstance;
const defaultApp = {
    globalData: {}
};
function initAppVm(appVm: ComponentPublicInstance) {
    appVm.$vm = appVm;
    appVm.$mpType = 'app';
}
function registerApp(appVm: ComponentPublicInstance) {
    console.log(formatLog('registerApp'));
    initVueApp(appVm);
    appCtx = appVm;
    initAppVm(appCtx);
    extend(appCtx, defaultApp);
    defineGlobalData(appCtx, defaultApp.globalData);
    initService();
    initGlobalEvent();
    initSubscribeHandlers();
    initAppLaunch(appVm);
    __uniConfig.ready = true;
}
const default = {
    uni: mod,
    getCurrentPages: getCurrentPages1,
    __definePage: definePage,
    __registerApp: registerApp,
    UniServiceJSBridge: UniServiceJSBridge1
};
export { default as default,  };
'use strict';
function tryCatch(fn: Function): Function {
    return function() {
        try {
            return fn.apply(fn, arguments);
        } catch (e) {
            console.error(e);
        }
    };
}
let invokeCallbackId = 1;
const invokeCallbacks: {
    [id: string]: {
        name: string;
        keepAlive: boolean;
        callback: Function;
    };
} = {};
function addInvokeCallback(id: number, name: string, callback: Function, keepAlive: boolean = false) {
    invokeCallbacks[id] = {
        name,
        keepAlive,
        callback
    };
    return id;
}
function invokeCallback(id: number, res: unknown, extras?: unknown) {
    if (typeof id === 'number') {
        const opts = invokeCallbacks[id];
        if (opts) {
            if (!opts.keepAlive) {
                delete invokeCallbacks[id];
            }
            return opts.callback(res, extras);
        }
    }
    return res;
}
const API_SUCCESS = 'success';
const API_FAIL = 'fail';
const API_COMPLETE = 'complete';
type CALLBACK_TYPES = typeof API_SUCCESS | typeof API_FAIL | typeof API_COMPLETE;
type ApiCallbacks = {
    [key in CALLBACK_TYPES]?: Function;
};
function getApiCallbacks(args: Record<string, Object>) {
    const apiCallbacks: ApiCallbacks = {};
    for(const name in args){
        const fn = args[name];
        if (isFunction(fn)) {
            apiCallbacks[name as CALLBACK_TYPES] = tryCatch(fn);
            delete args[name];
        }
    }
    return apiCallbacks;
}
interface ApiRes {
    errMsg: string;
}
function normalizeErrMsg1(errMsg: string, name: string) {
    if (!errMsg || errMsg.indexOf(':fail') === -1) {
        return name + ':ok';
    }
    return name + errMsg.substring(errMsg.indexOf(':fail'));
}
function createAsyncApiCallback(name: string, args: Record<string, Object> = {}, { beforeAll , beforeSuccess  }: ApiOptions<Object> = {}) {
    if (!isPlainObject(args)) {
        args = {};
    }
    const { success , fail , complete  } = getApiCallbacks(args);
    const hasSuccess = isFunction(success);
    const hasFail = isFunction(fail);
    const hasComplete = isFunction(complete);
    const callbackId = invokeCallbackId++;
    addInvokeCallback(callbackId, name, (res: ApiRes)=>{
        res = res || {};
        res.errMsg = normalizeErrMsg1(res.errMsg, name);
        isFunction(beforeAll) && beforeAll(res);
        if (res.errMsg === name + ':ok') {
            isFunction(beforeSuccess) && beforeSuccess(res, args);
            hasSuccess && success(res);
        } else {
            hasFail && fail(res);
        }
        hasComplete && complete(res);
    });
    return callbackId;
}
function encodeQueryString(url: string) {
    if (!isString(url)) {
        return url;
    }
    const index = url.indexOf('?');
    if (index === -1) {
        return url;
    }
    const query = url.slice(index + 1).trim().replace(/^(\?|#|&)/, '');
    if (!query) {
        return url;
    }
    url = url.slice(0, index);
    const params: string[] = [];
    query.split('&').forEach((param)=>{
        const parts = param.replace(/\+/g, ' ').split('=');
        const key = parts.shift();
        const val = parts.length > 0 ? parts.join('=') : '';
        params.push(key + '=' + UTSiOS.consoleDebugError(encodeURIComponent(val)));
    });
    return params.length ? url + '?' + params.join('&') : url;
}
