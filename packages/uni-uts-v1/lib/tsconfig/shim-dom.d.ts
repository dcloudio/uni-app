type AnyFunction = (...args: (any | null)[]) => any | null
type AnyClass<T> = {
  new(...args: any[]): T
}

declare global {
  type AbortController = any
  const AbortController: AnyClass<AbortController>
  type AbortSignal = any
  const AbortSignal: AnyClass<AbortSignal>
  type AbstractRange = any
  const AbstractRange: AnyClass<AbstractRange>
  type ActiveXObject = any
  const ActiveXObject: AnyClass<ActiveXObject>
  const addEventListener: AnyFunction
  const alert: AnyFunction
  type AnalyserNode = any
  const AnalyserNode: AnyClass<AnalyserNode>
  type Animation = any
  const Animation: AnyClass<Animation>
  type AnimationEffect = any
  const AnimationEffect: AnyClass<AnimationEffect>
  type AnimationEvent = any
  const AnimationEvent: AnyClass<AnimationEvent>
  type AnimationPlaybackEvent = any
  const AnimationPlaybackEvent: AnyClass<AnimationPlaybackEvent>
  type AnimationTimeline = any
  const AnimationTimeline: AnyClass<AnimationTimeline>
  type Array = any
  const Array: AnyClass<Array>
  type ArrayBuffer = any
  const ArrayBuffer: AnyClass<ArrayBuffer>
  const atob: AnyFunction
  type Atomics = any
  const Atomics: AnyClass<Atomics>
  type Attr = any
  const Attr: AnyClass<Attr>
  type Audio = any
  const Audio: AnyClass<Audio>
  type AudioBuffer = any
  const AudioBuffer: AnyClass<AudioBuffer>
  type AudioBufferSourceNode = any
  const AudioBufferSourceNode: AnyClass<AudioBufferSourceNode>
  type AudioContext = any
  const AudioContext: AnyClass<AudioContext>
  type AudioDestinationNode = any
  const AudioDestinationNode: AnyClass<AudioDestinationNode>
  type AudioListener = any
  const AudioListener: AnyClass<AudioListener>
  type AudioNode = any
  const AudioNode: AnyClass<AudioNode>
  type AudioParam = any
  const AudioParam: AnyClass<AudioParam>
  type AudioParamMap = any
  const AudioParamMap: AnyClass<AudioParamMap>
  type AudioScheduledSourceNode = any
  const AudioScheduledSourceNode: AnyClass<AudioScheduledSourceNode>
  type AudioWorklet = any
  const AudioWorklet: AnyClass<AudioWorklet>
  type AudioWorkletNode = any
  const AudioWorkletNode: AnyClass<AudioWorkletNode>
  type AuthenticatorAssertionResponse = any
  const AuthenticatorAssertionResponse: AnyClass<AuthenticatorAssertionResponse>
  type AuthenticatorAttestationResponse = any
  const AuthenticatorAttestationResponse: AnyClass<AuthenticatorAttestationResponse>
  type AuthenticatorResponse = any
  const AuthenticatorResponse: AnyClass<AuthenticatorResponse>
  type BarProp = any
  const BarProp: AnyClass<BarProp>
  type BaseAudioContext = any
  const BaseAudioContext: AnyClass<BaseAudioContext>
  type BeforeUnloadEvent = any
  const BeforeUnloadEvent: AnyClass<BeforeUnloadEvent>
  type BiquadFilterNode = any
  const BiquadFilterNode: AnyClass<BiquadFilterNode>
  type Blob = any
  const Blob: AnyClass<Blob>
  type BlobEvent = any
  const BlobEvent: AnyClass<BlobEvent>
  const blur: AnyFunction
  type Boolean = any
  const Boolean: AnyClass<Boolean>
  type BroadcastChannel = any
  const BroadcastChannel: AnyClass<BroadcastChannel>
  const btoa: AnyFunction
  type ByteLengthQueuingStrategy = any
  const ByteLengthQueuingStrategy: AnyClass<ByteLengthQueuingStrategy>
  type Cache = any
  const Cache: AnyClass<Cache>
  const caches: any
  type CacheStorage = any
  const CacheStorage: AnyClass<CacheStorage>
  const cancelAnimationFrame: AnyFunction
  const cancelIdleCallback: AnyFunction
  type CanvasCaptureMediaStreamTrack = any
  const CanvasCaptureMediaStreamTrack: AnyClass<CanvasCaptureMediaStreamTrack>
  type CanvasGradient = any
  const CanvasGradient: AnyClass<CanvasGradient>
  type CanvasPattern = any
  const CanvasPattern: AnyClass<CanvasPattern>
  type CanvasRenderingContext2D = any
  const CanvasRenderingContext2D: AnyClass<CanvasRenderingContext2D>
  type CDATASection = any
  const CDATASection: AnyClass<CDATASection>
  type ChannelMergerNode = any
  const ChannelMergerNode: AnyClass<ChannelMergerNode>
  type ChannelSplitterNode = any
  const ChannelSplitterNode: AnyClass<ChannelSplitterNode>
  type CharacterData = any
  const CharacterData: AnyClass<CharacterData>
  const clearInterval: AnyFunction
  const clearTimeout: AnyFunction
  type Clipboard = any
  const Clipboard: AnyClass<Clipboard>
  type ClipboardEvent = any
  const ClipboardEvent: AnyClass<ClipboardEvent>
  type ClipboardItem = any
  const ClipboardItem: AnyClass<ClipboardItem>
  const close: AnyFunction
  const closed: any
  type CloseEvent = any
  const CloseEvent: AnyClass<CloseEvent>
  type Comment = any
  const Comment: AnyClass<Comment>
  type CompositionEvent = any
  const CompositionEvent: AnyClass<CompositionEvent>
  type CompressionStream = any
  const CompressionStream: AnyClass<CompressionStream>
  const confirm: AnyFunction
  const console: any
  type ConstantSourceNode = any
  const ConstantSourceNode: AnyClass<ConstantSourceNode>
  type ConvolverNode = any
  const ConvolverNode: AnyClass<ConvolverNode>
  type CountQueuingStrategy = any
  const CountQueuingStrategy: AnyClass<CountQueuingStrategy>
  const createImageBitmap: AnyFunction
  type Credential = any
  const Credential: AnyClass<Credential>
  type CredentialsContainer = any
  const CredentialsContainer: AnyClass<CredentialsContainer>
  const crossOriginIsolated: any
  const crypto: any
  type Crypto = any
  const Crypto: AnyClass<Crypto>
  type CryptoKey = any
  const CryptoKey: AnyClass<CryptoKey>
  type CSSAnimation = any
  const CSSAnimation: AnyClass<CSSAnimation>
  type CSSConditionRule = any
  const CSSConditionRule: AnyClass<CSSConditionRule>
  type CSSContainerRule = any
  const CSSContainerRule: AnyClass<CSSContainerRule>
  type CSSCounterStyleRule = any
  const CSSCounterStyleRule: AnyClass<CSSCounterStyleRule>
  type CSSFontFaceRule = any
  const CSSFontFaceRule: AnyClass<CSSFontFaceRule>
  type CSSFontFeatureValuesRule = any
  const CSSFontFeatureValuesRule: AnyClass<CSSFontFeatureValuesRule>
  type CSSFontPaletteValuesRule = any
  const CSSFontPaletteValuesRule: AnyClass<CSSFontPaletteValuesRule>
  type CSSGroupingRule = any
  const CSSGroupingRule: AnyClass<CSSGroupingRule>
  type CSSImageValue = any
  const CSSImageValue: AnyClass<CSSImageValue>
  type CSSImportRule = any
  const CSSImportRule: AnyClass<CSSImportRule>
  type CSSKeyframeRule = any
  const CSSKeyframeRule: AnyClass<CSSKeyframeRule>
  type CSSKeyframesRule = any
  const CSSKeyframesRule: AnyClass<CSSKeyframesRule>
  type CSSKeywordValue = any
  const CSSKeywordValue: AnyClass<CSSKeywordValue>
  type CSSLayerBlockRule = any
  const CSSLayerBlockRule: AnyClass<CSSLayerBlockRule>
  type CSSLayerStatementRule = any
  const CSSLayerStatementRule: AnyClass<CSSLayerStatementRule>
  type CSSMathClamp = any
  const CSSMathClamp: AnyClass<CSSMathClamp>
  type CSSMathInvert = any
  const CSSMathInvert: AnyClass<CSSMathInvert>
  type CSSMathMax = any
  const CSSMathMax: AnyClass<CSSMathMax>
  type CSSMathMin = any
  const CSSMathMin: AnyClass<CSSMathMin>
  type CSSMathNegate = any
  const CSSMathNegate: AnyClass<CSSMathNegate>
  type CSSMathProduct = any
  const CSSMathProduct: AnyClass<CSSMathProduct>
  type CSSMathSum = any
  const CSSMathSum: AnyClass<CSSMathSum>
  type CSSMathValue = any
  const CSSMathValue: AnyClass<CSSMathValue>
  type CSSMatrixComponent = any
  const CSSMatrixComponent: AnyClass<CSSMatrixComponent>
  type CSSMediaRule = any
  const CSSMediaRule: AnyClass<CSSMediaRule>
  type CSSNamespaceRule = any
  const CSSNamespaceRule: AnyClass<CSSNamespaceRule>
  type CSSNumericArray = any
  const CSSNumericArray: AnyClass<CSSNumericArray>
  type CSSNumericValue = any
  const CSSNumericValue: AnyClass<CSSNumericValue>
  type CSSPageRule = any
  const CSSPageRule: AnyClass<CSSPageRule>
  type CSSPerspective = any
  const CSSPerspective: AnyClass<CSSPerspective>
  type CSSPropertyRule = any
  const CSSPropertyRule: AnyClass<CSSPropertyRule>
  type CSSRotate = any
  const CSSRotate: AnyClass<CSSRotate>
  type CSSRule = any
  const CSSRule: AnyClass<CSSRule>
  type CSSRuleList = any
  const CSSRuleList: AnyClass<CSSRuleList>
  type CSSScale = any
  const CSSScale: AnyClass<CSSScale>
  type CSSSkew = any
  const CSSSkew: AnyClass<CSSSkew>
  type CSSSkewX = any
  const CSSSkewX: AnyClass<CSSSkewX>
  type CSSSkewY = any
  const CSSSkewY: AnyClass<CSSSkewY>
  type CSSStyleDeclaration = any
  const CSSStyleDeclaration: AnyClass<CSSStyleDeclaration>
  type CSSStyleRule = any
  const CSSStyleRule: AnyClass<CSSStyleRule>
  type CSSStyleSheet = any
  const CSSStyleSheet: AnyClass<CSSStyleSheet>
  type CSSStyleValue = any
  const CSSStyleValue: AnyClass<CSSStyleValue>
  type CSSSupportsRule = any
  const CSSSupportsRule: AnyClass<CSSSupportsRule>
  type CSSTransformComponent = any
  const CSSTransformComponent: AnyClass<CSSTransformComponent>
  type CSSTransformValue = any
  const CSSTransformValue: AnyClass<CSSTransformValue>
  type CSSTransition = any
  const CSSTransition: AnyClass<CSSTransition>
  type CSSTranslate = any
  const CSSTranslate: AnyClass<CSSTranslate>
  type CSSUnitValue = any
  const CSSUnitValue: AnyClass<CSSUnitValue>
  type CSSUnparsedValue = any
  const CSSUnparsedValue: AnyClass<CSSUnparsedValue>
  type CSSVariableReferenceValue = any
  const CSSVariableReferenceValue: AnyClass<CSSVariableReferenceValue>
  type CustomElementRegistry = any
  const CustomElementRegistry: AnyClass<CustomElementRegistry>
  const customElements: any
  type CustomEvent = any
  const CustomEvent: AnyClass<CustomEvent>
  type DataTransfer = any
  const DataTransfer: AnyClass<DataTransfer>
  type DataTransferItem = any
  const DataTransferItem: AnyClass<DataTransferItem>
  type DataTransferItemList = any
  const DataTransferItemList: AnyClass<DataTransferItemList>
  type DataView = any
  const DataView: AnyClass<DataView>
  type Date = any
  const Date: AnyClass<Date>
  const decodeURI: AnyFunction
  const decodeURIComponent: AnyFunction
  type DecompressionStream = any
  const DecompressionStream: AnyClass<DecompressionStream>
  type DelayNode = any
  const DelayNode: AnyClass<DelayNode>
  type DeviceMotionEvent = any
  const DeviceMotionEvent: AnyClass<DeviceMotionEvent>
  type DeviceOrientationEvent = any
  const DeviceOrientationEvent: AnyClass<DeviceOrientationEvent>
  const devicePixelRatio: any
  const dispatchEvent: AnyFunction
  const document: any
  type Document = any
  const Document: AnyClass<Document>
  type DocumentFragment = any
  const DocumentFragment: AnyClass<DocumentFragment>
  type DocumentTimeline = any
  const DocumentTimeline: AnyClass<DocumentTimeline>
  type DocumentType = any
  const DocumentType: AnyClass<DocumentType>
  type DOMException = any
  const DOMException: AnyClass<DOMException>
  type DOMImplementation = any
  const DOMImplementation: AnyClass<DOMImplementation>
  type DOMMatrix = any
  const DOMMatrix: AnyClass<DOMMatrix>
  type DOMMatrixReadOnly = any
  const DOMMatrixReadOnly: AnyClass<DOMMatrixReadOnly>
  type DOMParser = any
  const DOMParser: AnyClass<DOMParser>
  type DOMPoint = any
  const DOMPoint: AnyClass<DOMPoint>
  type DOMPointReadOnly = any
  const DOMPointReadOnly: AnyClass<DOMPointReadOnly>
  type DOMQuad = any
  const DOMQuad: AnyClass<DOMQuad>
  type DOMRect = any
  const DOMRect: AnyClass<DOMRect>
  type DOMRectList = any
  const DOMRectList: AnyClass<DOMRectList>
  type DOMRectReadOnly = any
  const DOMRectReadOnly: AnyClass<DOMRectReadOnly>
  type DOMStringList = any
  const DOMStringList: AnyClass<DOMStringList>
  type DOMStringMap = any
  const DOMStringMap: AnyClass<DOMStringMap>
  type DOMTokenList = any
  const DOMTokenList: AnyClass<DOMTokenList>
  type DragEvent = any
  const DragEvent: AnyClass<DragEvent>
  type DynamicsCompressorNode = any
  const DynamicsCompressorNode: AnyClass<DynamicsCompressorNode>
  type Element = any
  const Element: AnyClass<Element>
  type ElementInternals = any
  const ElementInternals: AnyClass<ElementInternals>
  type EncodedVideoChunk = any
  const EncodedVideoChunk: AnyClass<EncodedVideoChunk>
  const encodeURI: AnyFunction
  const encodeURIComponent: AnyFunction
  type Enumerator = any
  const Enumerator: AnyClass<Enumerator>
  type Error = any
  const Error: AnyClass<Error>
  type ErrorEvent = any
  const ErrorEvent: AnyClass<ErrorEvent>
  const eval: AnyFunction
  type EvalError = any
  const EvalError: AnyClass<EvalError>
  type Event = any
  const Event: AnyClass<Event>
  type EventCounts = any
  const EventCounts: AnyClass<EventCounts>
  type EventSource = any
  const EventSource: AnyClass<EventSource>
  type EventTarget = any
  const EventTarget: AnyClass<EventTarget>
  const fetch: AnyFunction
  type File = any
  const File: AnyClass<File>
  type FileList = any
  const FileList: AnyClass<FileList>
  type FileReader = any
  const FileReader: AnyClass<FileReader>
  type FileSystem = any
  const FileSystem: AnyClass<FileSystem>
  type FileSystemDirectoryEntry = any
  const FileSystemDirectoryEntry: AnyClass<FileSystemDirectoryEntry>
  type FileSystemDirectoryHandle = any
  const FileSystemDirectoryHandle: AnyClass<FileSystemDirectoryHandle>
  type FileSystemDirectoryReader = any
  const FileSystemDirectoryReader: AnyClass<FileSystemDirectoryReader>
  type FileSystemEntry = any
  const FileSystemEntry: AnyClass<FileSystemEntry>
  type FileSystemFileEntry = any
  const FileSystemFileEntry: AnyClass<FileSystemFileEntry>
  type FileSystemFileHandle = any
  const FileSystemFileHandle: AnyClass<FileSystemFileHandle>
  type FileSystemHandle = any
  const FileSystemHandle: AnyClass<FileSystemHandle>
  type FileSystemWritableFileStream = any
  const FileSystemWritableFileStream: AnyClass<FileSystemWritableFileStream>
  type Float32Array = any
  const Float32Array: AnyClass<Float32Array>
  type Float64Array = any
  const Float64Array: AnyClass<Float64Array>
  const focus: AnyFunction
  type FocusEvent = any
  const FocusEvent: AnyClass<FocusEvent>
  type FontFace = any
  const FontFace: AnyClass<FontFace>
  type FontFaceSet = any
  const FontFaceSet: AnyClass<FontFaceSet>
  type FontFaceSetLoadEvent = any
  const FontFaceSetLoadEvent: AnyClass<FontFaceSetLoadEvent>
  type FormData = any
  const FormData: AnyClass<FormData>
  type FormDataEvent = any
  const FormDataEvent: AnyClass<FormDataEvent>
  const frameElement: any
  const frames: any
  type Function = any
  const Function: AnyClass<Function>
  type GainNode = any
  const GainNode: AnyClass<GainNode>
  type Gamepad = any
  const Gamepad: AnyClass<Gamepad>
  type GamepadButton = any
  const GamepadButton: AnyClass<GamepadButton>
  type GamepadEvent = any
  const GamepadEvent: AnyClass<GamepadEvent>
  type GamepadHapticActuator = any
  const GamepadHapticActuator: AnyClass<GamepadHapticActuator>
  type Geolocation = any
  const Geolocation: AnyClass<Geolocation>
  type GeolocationCoordinates = any
  const GeolocationCoordinates: AnyClass<GeolocationCoordinates>
  type GeolocationPosition = any
  const GeolocationPosition: AnyClass<GeolocationPosition>
  type GeolocationPositionError = any
  const GeolocationPositionError: AnyClass<GeolocationPositionError>
  const getComputedStyle: AnyFunction
  const getSelection: AnyFunction
  type HashChangeEvent = any
  const HashChangeEvent: AnyClass<HashChangeEvent>
  type Headers = any
  const Headers: AnyClass<Headers>
  const history: any
  type History = any
  const History: AnyClass<History>
  type HTMLAllCollection = any
  const HTMLAllCollection: AnyClass<HTMLAllCollection>
  type HTMLAnchorElement = any
  const HTMLAnchorElement: AnyClass<HTMLAnchorElement>
  type HTMLAreaElement = any
  const HTMLAreaElement: AnyClass<HTMLAreaElement>
  type HTMLAudioElement = any
  const HTMLAudioElement: AnyClass<HTMLAudioElement>
  type HTMLBaseElement = any
  const HTMLBaseElement: AnyClass<HTMLBaseElement>
  type HTMLBodyElement = any
  const HTMLBodyElement: AnyClass<HTMLBodyElement>
  type HTMLBRElement = any
  const HTMLBRElement: AnyClass<HTMLBRElement>
  type HTMLButtonElement = any
  const HTMLButtonElement: AnyClass<HTMLButtonElement>
  type HTMLCanvasElement = any
  const HTMLCanvasElement: AnyClass<HTMLCanvasElement>
  type HTMLCollection = any
  const HTMLCollection: AnyClass<HTMLCollection>
  type HTMLDataElement = any
  const HTMLDataElement: AnyClass<HTMLDataElement>
  type HTMLDataListElement = any
  const HTMLDataListElement: AnyClass<HTMLDataListElement>
  type HTMLDetailsElement = any
  const HTMLDetailsElement: AnyClass<HTMLDetailsElement>
  type HTMLDialogElement = any
  const HTMLDialogElement: AnyClass<HTMLDialogElement>
  type HTMLDivElement = any
  const HTMLDivElement: AnyClass<HTMLDivElement>
  type HTMLDListElement = any
  const HTMLDListElement: AnyClass<HTMLDListElement>
  type HTMLElement = any
  const HTMLElement: AnyClass<HTMLElement>
  type HTMLEmbedElement = any
  const HTMLEmbedElement: AnyClass<HTMLEmbedElement>
  type HTMLFieldSetElement = any
  const HTMLFieldSetElement: AnyClass<HTMLFieldSetElement>
  type HTMLFormControlsCollection = any
  const HTMLFormControlsCollection: AnyClass<HTMLFormControlsCollection>
  type HTMLFormElement = any
  const HTMLFormElement: AnyClass<HTMLFormElement>
  type HTMLHeadElement = any
  const HTMLHeadElement: AnyClass<HTMLHeadElement>
  type HTMLHeadingElement = any
  const HTMLHeadingElement: AnyClass<HTMLHeadingElement>
  type HTMLHRElement = any
  const HTMLHRElement: AnyClass<HTMLHRElement>
  type HTMLHtmlElement = any
  const HTMLHtmlElement: AnyClass<HTMLHtmlElement>
  type HTMLIFrameElement = any
  const HTMLIFrameElement: AnyClass<HTMLIFrameElement>
  type HTMLImageElement = any
  const HTMLImageElement: AnyClass<HTMLImageElement>
  type HTMLInputElement = any
  const HTMLInputElement: AnyClass<HTMLInputElement>
  type HTMLLabelElement = any
  const HTMLLabelElement: AnyClass<HTMLLabelElement>
  type HTMLLegendElement = any
  const HTMLLegendElement: AnyClass<HTMLLegendElement>
  type HTMLLIElement = any
  const HTMLLIElement: AnyClass<HTMLLIElement>
  type HTMLLinkElement = any
  const HTMLLinkElement: AnyClass<HTMLLinkElement>
  type HTMLMapElement = any
  const HTMLMapElement: AnyClass<HTMLMapElement>
  type HTMLMediaElement = any
  const HTMLMediaElement: AnyClass<HTMLMediaElement>
  type HTMLMenuElement = any
  const HTMLMenuElement: AnyClass<HTMLMenuElement>
  type HTMLMetaElement = any
  const HTMLMetaElement: AnyClass<HTMLMetaElement>
  type HTMLMeterElement = any
  const HTMLMeterElement: AnyClass<HTMLMeterElement>
  type HTMLModElement = any
  const HTMLModElement: AnyClass<HTMLModElement>
  type HTMLObjectElement = any
  const HTMLObjectElement: AnyClass<HTMLObjectElement>
  type HTMLOListElement = any
  const HTMLOListElement: AnyClass<HTMLOListElement>
  type HTMLOptGroupElement = any
  const HTMLOptGroupElement: AnyClass<HTMLOptGroupElement>
  type HTMLOptionElement = any
  const HTMLOptionElement: AnyClass<HTMLOptionElement>
  type HTMLOptionsCollection = any
  const HTMLOptionsCollection: AnyClass<HTMLOptionsCollection>
  type HTMLOutputElement = any
  const HTMLOutputElement: AnyClass<HTMLOutputElement>
  type HTMLParagraphElement = any
  const HTMLParagraphElement: AnyClass<HTMLParagraphElement>
  type HTMLPictureElement = any
  const HTMLPictureElement: AnyClass<HTMLPictureElement>
  type HTMLPreElement = any
  const HTMLPreElement: AnyClass<HTMLPreElement>
  type HTMLProgressElement = any
  const HTMLProgressElement: AnyClass<HTMLProgressElement>
  type HTMLQuoteElement = any
  const HTMLQuoteElement: AnyClass<HTMLQuoteElement>
  type HTMLScriptElement = any
  const HTMLScriptElement: AnyClass<HTMLScriptElement>
  type HTMLSelectElement = any
  const HTMLSelectElement: AnyClass<HTMLSelectElement>
  type HTMLSlotElement = any
  const HTMLSlotElement: AnyClass<HTMLSlotElement>
  type HTMLSourceElement = any
  const HTMLSourceElement: AnyClass<HTMLSourceElement>
  type HTMLSpanElement = any
  const HTMLSpanElement: AnyClass<HTMLSpanElement>
  type HTMLStyleElement = any
  const HTMLStyleElement: AnyClass<HTMLStyleElement>
  type HTMLTableCaptionElement = any
  const HTMLTableCaptionElement: AnyClass<HTMLTableCaptionElement>
  type HTMLTableCellElement = any
  const HTMLTableCellElement: AnyClass<HTMLTableCellElement>
  type HTMLTableColElement = any
  const HTMLTableColElement: AnyClass<HTMLTableColElement>
  type HTMLTableElement = any
  const HTMLTableElement: AnyClass<HTMLTableElement>
  type HTMLTableRowElement = any
  const HTMLTableRowElement: AnyClass<HTMLTableRowElement>
  type HTMLTableSectionElement = any
  const HTMLTableSectionElement: AnyClass<HTMLTableSectionElement>
  type HTMLTemplateElement = any
  const HTMLTemplateElement: AnyClass<HTMLTemplateElement>
  type HTMLTextAreaElement = any
  const HTMLTextAreaElement: AnyClass<HTMLTextAreaElement>
  type HTMLTimeElement = any
  const HTMLTimeElement: AnyClass<HTMLTimeElement>
  type HTMLTitleElement = any
  const HTMLTitleElement: AnyClass<HTMLTitleElement>
  type HTMLTrackElement = any
  const HTMLTrackElement: AnyClass<HTMLTrackElement>
  type HTMLUListElement = any
  const HTMLUListElement: AnyClass<HTMLUListElement>
  type HTMLUnknownElement = any
  const HTMLUnknownElement: AnyClass<HTMLUnknownElement>
  type HTMLVideoElement = any
  const HTMLVideoElement: AnyClass<HTMLVideoElement>
  type IDBCursor = any
  const IDBCursor: AnyClass<IDBCursor>
  type IDBCursorWithValue = any
  const IDBCursorWithValue: AnyClass<IDBCursorWithValue>
  type IDBDatabase = any
  const IDBDatabase: AnyClass<IDBDatabase>
  type IDBFactory = any
  const IDBFactory: AnyClass<IDBFactory>
  type IDBIndex = any
  const IDBIndex: AnyClass<IDBIndex>
  type IDBKeyRange = any
  const IDBKeyRange: AnyClass<IDBKeyRange>
  type IDBObjectStore = any
  const IDBObjectStore: AnyClass<IDBObjectStore>
  type IDBOpenDBRequest = any
  const IDBOpenDBRequest: AnyClass<IDBOpenDBRequest>
  type IDBRequest = any
  const IDBRequest: AnyClass<IDBRequest>
  type IDBTransaction = any
  const IDBTransaction: AnyClass<IDBTransaction>
  type IDBVersionChangeEvent = any
  const IDBVersionChangeEvent: AnyClass<IDBVersionChangeEvent>
  type IdleDeadline = any
  const IdleDeadline: AnyClass<IdleDeadline>
  type IIRFilterNode = any
  const IIRFilterNode: AnyClass<IIRFilterNode>
  type Image = any
  const Image: AnyClass<Image>
  type ImageBitmap = any
  const ImageBitmap: AnyClass<ImageBitmap>
  type ImageBitmapRenderingContext = any
  const ImageBitmapRenderingContext: AnyClass<ImageBitmapRenderingContext>
  type ImageData = any
  const ImageData: AnyClass<ImageData>
  const importScripts: AnyFunction
  const indexedDB: any
  type Infinity = any
  const Infinity: AnyClass<Infinity>
  const innerHeight: any
  const innerWidth: any
  type InputDeviceInfo = any
  const InputDeviceInfo: AnyClass<InputDeviceInfo>
  type InputEvent = any
  const InputEvent: AnyClass<InputEvent>
  type Int16Array = any
  const Int16Array: AnyClass<Int16Array>
  type Int32Array = any
  const Int32Array: AnyClass<Int32Array>
  type Int8Array = any
  const Int8Array: AnyClass<Int8Array>
  type IntersectionObserver = any
  const IntersectionObserver: AnyClass<IntersectionObserver>
  type IntersectionObserverEntry = any
  const IntersectionObserverEntry: AnyClass<IntersectionObserverEntry>
  const isFinite: AnyFunction
  const isNaN: AnyFunction
  const isSecureContext: any
  type JSON = any
  const JSON: AnyClass<JSON>
  type KeyboardEvent = any
  const KeyboardEvent: AnyClass<KeyboardEvent>
  type KeyframeEffect = any
  const KeyframeEffect: AnyClass<KeyframeEffect>
  const length: any
  const localStorage: any
  const location: any
  type Location = any
  const Location: AnyClass<Location>
  const locationbar: any
  type Lock = any
  const Lock: AnyClass<Lock>
  type LockManager = any
  const LockManager: AnyClass<LockManager>
  type Map = any
  const Map: AnyClass<Map>
  const matchMedia: AnyFunction
  type Math = any
  const Math: AnyClass<Math>
  type MathMLElement = any
  const MathMLElement: AnyClass<MathMLElement>
  type MediaCapabilities = any
  const MediaCapabilities: AnyClass<MediaCapabilities>
  type MediaDeviceInfo = any
  const MediaDeviceInfo: AnyClass<MediaDeviceInfo>
  type MediaDevices = any
  const MediaDevices: AnyClass<MediaDevices>
  type MediaElementAudioSourceNode = any
  const MediaElementAudioSourceNode: AnyClass<MediaElementAudioSourceNode>
  type MediaEncryptedEvent = any
  const MediaEncryptedEvent: AnyClass<MediaEncryptedEvent>
  type MediaError = any
  const MediaError: AnyClass<MediaError>
  type MediaKeyMessageEvent = any
  const MediaKeyMessageEvent: AnyClass<MediaKeyMessageEvent>
  type MediaKeys = any
  const MediaKeys: AnyClass<MediaKeys>
  type MediaKeySession = any
  const MediaKeySession: AnyClass<MediaKeySession>
  type MediaKeyStatusMap = any
  const MediaKeyStatusMap: AnyClass<MediaKeyStatusMap>
  type MediaKeySystemAccess = any
  const MediaKeySystemAccess: AnyClass<MediaKeySystemAccess>
  type MediaList = any
  const MediaList: AnyClass<MediaList>
  type MediaMetadata = any
  const MediaMetadata: AnyClass<MediaMetadata>
  type MediaQueryList = any
  const MediaQueryList: AnyClass<MediaQueryList>
  type MediaQueryListEvent = any
  const MediaQueryListEvent: AnyClass<MediaQueryListEvent>
  type MediaRecorder = any
  const MediaRecorder: AnyClass<MediaRecorder>
  type MediaSession = any
  const MediaSession: AnyClass<MediaSession>
  type MediaSource = any
  const MediaSource: AnyClass<MediaSource>
  type MediaStream = any
  const MediaStream: AnyClass<MediaStream>
  type MediaStreamAudioDestinationNode = any
  const MediaStreamAudioDestinationNode: AnyClass<MediaStreamAudioDestinationNode>
  type MediaStreamAudioSourceNode = any
  const MediaStreamAudioSourceNode: AnyClass<MediaStreamAudioSourceNode>
  type MediaStreamTrack = any
  const MediaStreamTrack: AnyClass<MediaStreamTrack>
  type MediaStreamTrackEvent = any
  const MediaStreamTrackEvent: AnyClass<MediaStreamTrackEvent>
  const menubar: any
  type MessageChannel = any
  const MessageChannel: AnyClass<MessageChannel>
  type MessageEvent = any
  const MessageEvent: AnyClass<MessageEvent>
  type MessagePort = any
  const MessagePort: AnyClass<MessagePort>
  type MIDIAccess = any
  const MIDIAccess: AnyClass<MIDIAccess>
  type MIDIConnectionEvent = any
  const MIDIConnectionEvent: AnyClass<MIDIConnectionEvent>
  type MIDIInput = any
  const MIDIInput: AnyClass<MIDIInput>
  type MIDIInputMap = any
  const MIDIInputMap: AnyClass<MIDIInputMap>
  type MIDIMessageEvent = any
  const MIDIMessageEvent: AnyClass<MIDIMessageEvent>
  type MIDIOutput = any
  const MIDIOutput: AnyClass<MIDIOutput>
  type MIDIOutputMap = any
  const MIDIOutputMap: AnyClass<MIDIOutputMap>
  type MIDIPort = any
  const MIDIPort: AnyClass<MIDIPort>
  type MimeTypeArray = any
  const MimeTypeArray: AnyClass<MimeTypeArray>
  type MouseEvent = any
  const MouseEvent: AnyClass<MouseEvent>
  const moveBy: AnyFunction
  const moveTo: AnyFunction
  type MutationObserver = any
  const MutationObserver: AnyClass<MutationObserver>
  type MutationRecord = any
  const MutationRecord: AnyClass<MutationRecord>
  type NamedNodeMap = any
  const NamedNodeMap: AnyClass<NamedNodeMap>
  type NaN = any
  const NaN: AnyClass<NaN>
  type NavigationPreloadManager = any
  const NavigationPreloadManager: AnyClass<NavigationPreloadManager>
  const navigator: any
  type Navigator = any
  const Navigator: AnyClass<Navigator>
  type Node = any
  const Node: AnyClass<Node>
  type NodeFilter = any
  const NodeFilter: AnyClass<NodeFilter>
  type NodeIterator = any
  const NodeIterator: AnyClass<NodeIterator>
  type NodeList = any
  const NodeList: AnyClass<NodeList>
  type Notification = any
  const Notification: AnyClass<Notification>
  type Number = any
  const Number: AnyClass<Number>
  type Object = any
  const Object: AnyClass<Object>
  type OfflineAudioCompletionEvent = any
  const OfflineAudioCompletionEvent: AnyClass<OfflineAudioCompletionEvent>
  type OfflineAudioContext = any
  const OfflineAudioContext: AnyClass<OfflineAudioContext>
  type OffscreenCanvas = any
  const OffscreenCanvas: AnyClass<OffscreenCanvas>
  type OffscreenCanvasRenderingContext2D = any
  const OffscreenCanvasRenderingContext2D: AnyClass<OffscreenCanvasRenderingContext2D>
  const onabort: any
  const onafterprint: any
  const onanimationcancel: any
  const onanimationend: any
  const onanimationiteration: any
  const onanimationstart: any
  const onauxclick: any
  const onbeforeinput: any
  const onbeforeprint: any
  const onbeforeunload: any
  const onblur: any
  const oncancel: any
  const oncanplay: any
  const oncanplaythrough: any
  const onchange: any
  const onclick: any
  const onclose: any
  const oncontextmenu: any
  const oncopy: any
  const oncuechange: any
  const oncut: any
  const ondblclick: any
  const ondevicemotion: any
  const ondeviceorientation: any
  const ondrag: any
  const ondragend: any
  const ondragenter: any
  const ondragleave: any
  const ondragover: any
  const ondragstart: any
  const ondrop: any
  const ondurationchange: any
  const onemptied: any
  const onended: any
  const onerror: any
  const onfocus: any
  const onformdata: any
  const ongamepadconnected: any
  const ongamepaddisconnected: any
  const ongotpointercapture: any
  const onhashchange: any
  const oninput: any
  const oninvalid: any
  const onkeydown: any
  const onkeyup: any
  const onlanguagechange: any
  const onload: any
  const onloadeddata: any
  const onloadedmetadata: any
  const onloadstart: any
  const onlostpointercapture: any
  const onmessage: any
  const onmessageerror: any
  const onmousedown: any
  const onmouseenter: any
  const onmouseleave: any
  const onmousemove: any
  const onmouseout: any
  const onmouseover: any
  const onmouseup: any
  const onoffline: any
  const ononline: any
  const onpagehide: any
  const onpageshow: any
  const onpaste: any
  const onpause: any
  const onplay: any
  const onplaying: any
  const onpointercancel: any
  const onpointerdown: any
  const onpointerenter: any
  const onpointerleave: any
  const onpointermove: any
  const onpointerout: any
  const onpointerover: any
  const onpointerup: any
  const onpopstate: any
  const onprogress: any
  const onratechange: any
  const onrejectionhandled: any
  const onreset: any
  const onresize: any
  const onscroll: any
  const onscrollend: any
  const onsecuritypolicyviolation: any
  const onseeked: any
  const onseeking: any
  const onselect: any
  const onselectionchange: any
  const onselectstart: any
  const onslotchange: any
  const onstalled: any
  const onstorage: any
  const onsubmit: any
  const onsuspend: any
  const ontimeupdate: any
  const ontoggle: any
  const ontouchcancel: any
  const ontouchend: any
  const ontouchmove: any
  const ontouchstart: any
  const ontransitioncancel: any
  const ontransitionend: any
  const ontransitionrun: any
  const ontransitionstart: any
  const onunhandledrejection: any
  const onunload: any
  const onvolumechange: any
  const onwaiting: any
  const onwheel: any
  const open: AnyFunction
  const opener: any
  type Option = any
  const Option: AnyClass<Option>
  const origin: any
  type OscillatorNode = any
  const OscillatorNode: AnyClass<OscillatorNode>
  const outerHeight: any
  const outerWidth: any
  type OverconstrainedError = any
  const OverconstrainedError: AnyClass<OverconstrainedError>
  type PageTransitionEvent = any
  const PageTransitionEvent: AnyClass<PageTransitionEvent>
  type PannerNode = any
  const PannerNode: AnyClass<PannerNode>
  const parent: any
  const parseFloat: AnyFunction
  const parseInt: AnyFunction
  type Path2D = any
  const Path2D: AnyClass<Path2D>
  type PaymentMethodChangeEvent = any
  const PaymentMethodChangeEvent: AnyClass<PaymentMethodChangeEvent>
  type PaymentRequest = any
  const PaymentRequest: AnyClass<PaymentRequest>
  type PaymentRequestUpdateEvent = any
  const PaymentRequestUpdateEvent: AnyClass<PaymentRequestUpdateEvent>
  type PaymentResponse = any
  const PaymentResponse: AnyClass<PaymentResponse>
  const performance: any
  type Performance = any
  const Performance: AnyClass<Performance>
  type PerformanceEntry = any
  const PerformanceEntry: AnyClass<PerformanceEntry>
  type PerformanceEventTiming = any
  const PerformanceEventTiming: AnyClass<PerformanceEventTiming>
  type PerformanceMark = any
  const PerformanceMark: AnyClass<PerformanceMark>
  type PerformanceMeasure = any
  const PerformanceMeasure: AnyClass<PerformanceMeasure>
  type PerformanceNavigationTiming = any
  const PerformanceNavigationTiming: AnyClass<PerformanceNavigationTiming>
  type PerformanceObserver = any
  const PerformanceObserver: AnyClass<PerformanceObserver>
  type PerformanceObserverEntryList = any
  const PerformanceObserverEntryList: AnyClass<PerformanceObserverEntryList>
  type PerformancePaintTiming = any
  const PerformancePaintTiming: AnyClass<PerformancePaintTiming>
  type PerformanceResourceTiming = any
  const PerformanceResourceTiming: AnyClass<PerformanceResourceTiming>
  type PerformanceServerTiming = any
  const PerformanceServerTiming: AnyClass<PerformanceServerTiming>
  type PeriodicWave = any
  const PeriodicWave: AnyClass<PeriodicWave>
  type Permissions = any
  const Permissions: AnyClass<Permissions>
  type PermissionStatus = any
  const PermissionStatus: AnyClass<PermissionStatus>
  const personalbar: any
  type PictureInPictureEvent = any
  const PictureInPictureEvent: AnyClass<PictureInPictureEvent>
  type PictureInPictureWindow = any
  const PictureInPictureWindow: AnyClass<PictureInPictureWindow>
  type Plugin = any
  const Plugin: AnyClass<Plugin>
  type PluginArray = any
  const PluginArray: AnyClass<PluginArray>
  type PointerEvent = any
  const PointerEvent: AnyClass<PointerEvent>
  type PopStateEvent = any
  const PopStateEvent: AnyClass<PopStateEvent>
  const postMessage: AnyFunction
  const print: AnyFunction
  type ProcessingInstruction = any
  const ProcessingInstruction: AnyClass<ProcessingInstruction>
  type ProgressEvent = any
  const ProgressEvent: AnyClass<ProgressEvent>
  type Promise = any
  const Promise: AnyClass<Promise>
  type PromiseRejectionEvent = any
  const PromiseRejectionEvent: AnyClass<PromiseRejectionEvent>
  const prompt: AnyFunction
  type Proxy = any
  const Proxy: AnyClass<Proxy>
  type PublicKeyCredential = any
  const PublicKeyCredential: AnyClass<PublicKeyCredential>
  type PushManager = any
  const PushManager: AnyClass<PushManager>
  type PushSubscription = any
  const PushSubscription: AnyClass<PushSubscription>
  type PushSubscriptionOptions = any
  const PushSubscriptionOptions: AnyClass<PushSubscriptionOptions>
  const queueMicrotask: AnyFunction
  type RadioNodeList = any
  const RadioNodeList: AnyClass<RadioNodeList>
  type Range = any
  const Range: AnyClass<Range>
  type RangeError = any
  const RangeError: AnyClass<RangeError>
  type ReadableByteStreamController = any
  const ReadableByteStreamController: AnyClass<ReadableByteStreamController>
  type ReadableStream = any
  const ReadableStream: AnyClass<ReadableStream>
  type ReadableStreamBYOBReader = any
  const ReadableStreamBYOBReader: AnyClass<ReadableStreamBYOBReader>
  type ReadableStreamBYOBRequest = any
  const ReadableStreamBYOBRequest: AnyClass<ReadableStreamBYOBRequest>
  type ReadableStreamDefaultController = any
  const ReadableStreamDefaultController: AnyClass<ReadableStreamDefaultController>
  type ReadableStreamDefaultReader = any
  const ReadableStreamDefaultReader: AnyClass<ReadableStreamDefaultReader>
  type ReferenceError = any
  const ReferenceError: AnyClass<ReferenceError>
  type RegExp = any
  const RegExp: AnyClass<RegExp>
  type RemotePlayback = any
  const RemotePlayback: AnyClass<RemotePlayback>
  const removeEventListener: AnyFunction
  type Report = any
  const Report: AnyClass<Report>
  type ReportBody = any
  const ReportBody: AnyClass<ReportBody>
  const reportError: AnyFunction
  type ReportingObserver = any
  const ReportingObserver: AnyClass<ReportingObserver>
  type Request = any
  const Request: AnyClass<Request>
  // const requestAnimationFrame: AnyFunction
  const requestIdleCallback: AnyFunction
  const resizeBy: AnyFunction
  type ResizeObserver = any
  const ResizeObserver: AnyClass<ResizeObserver>
  type ResizeObserverEntry = any
  const ResizeObserverEntry: AnyClass<ResizeObserverEntry>
  type ResizeObserverSize = any
  const ResizeObserverSize: AnyClass<ResizeObserverSize>
  const resizeTo: AnyFunction
  type Response = any
  const Response: AnyClass<Response>
  type RTCCertificate = any
  const RTCCertificate: AnyClass<RTCCertificate>
  type RTCDataChannel = any
  const RTCDataChannel: AnyClass<RTCDataChannel>
  type RTCDataChannelEvent = any
  const RTCDataChannelEvent: AnyClass<RTCDataChannelEvent>
  type RTCDtlsTransport = any
  const RTCDtlsTransport: AnyClass<RTCDtlsTransport>
  type RTCDTMFSender = any
  const RTCDTMFSender: AnyClass<RTCDTMFSender>
  type RTCDTMFToneChangeEvent = any
  const RTCDTMFToneChangeEvent: AnyClass<RTCDTMFToneChangeEvent>
  type RTCEncodedAudioFrame = any
  const RTCEncodedAudioFrame: AnyClass<RTCEncodedAudioFrame>
  type RTCEncodedVideoFrame = any
  const RTCEncodedVideoFrame: AnyClass<RTCEncodedVideoFrame>
  type RTCError = any
  const RTCError: AnyClass<RTCError>
  type RTCErrorEvent = any
  const RTCErrorEvent: AnyClass<RTCErrorEvent>
  type RTCIceCandidate = any
  const RTCIceCandidate: AnyClass<RTCIceCandidate>
  type RTCIceTransport = any
  const RTCIceTransport: AnyClass<RTCIceTransport>
  type RTCPeerConnection = any
  const RTCPeerConnection: AnyClass<RTCPeerConnection>
  type RTCPeerConnectionIceErrorEvent = any
  const RTCPeerConnectionIceErrorEvent: AnyClass<RTCPeerConnectionIceErrorEvent>
  type RTCPeerConnectionIceEvent = any
  const RTCPeerConnectionIceEvent: AnyClass<RTCPeerConnectionIceEvent>
  type RTCRtpReceiver = any
  const RTCRtpReceiver: AnyClass<RTCRtpReceiver>
  type RTCRtpSender = any
  const RTCRtpSender: AnyClass<RTCRtpSender>
  type RTCRtpTransceiver = any
  const RTCRtpTransceiver: AnyClass<RTCRtpTransceiver>
  type RTCSctpTransport = any
  const RTCSctpTransport: AnyClass<RTCSctpTransport>
  type RTCSessionDescription = any
  const RTCSessionDescription: AnyClass<RTCSessionDescription>
  type RTCStatsReport = any
  const RTCStatsReport: AnyClass<RTCStatsReport>
  type RTCTrackEvent = any
  const RTCTrackEvent: AnyClass<RTCTrackEvent>
  const screen: any
  type Screen = any
  const Screen: AnyClass<Screen>
  const screenLeft: any
  type ScreenOrientation = any
  const ScreenOrientation: AnyClass<ScreenOrientation>
  const screenTop: any
  const screenX: any
  const screenY: any
  const scroll: AnyFunction
  const scrollbars: any
  const scrollBy: AnyFunction
  const scrollTo: AnyFunction
  const scrollX: any
  const scrollY: any
  type SecurityPolicyViolationEvent = any
  const SecurityPolicyViolationEvent: AnyClass<SecurityPolicyViolationEvent>
  type Selection = any
  const Selection: AnyClass<Selection>
  const self: any
  type ServiceWorker = any
  const ServiceWorker: AnyClass<ServiceWorker>
  type ServiceWorkerContainer = any
  const ServiceWorkerContainer: AnyClass<ServiceWorkerContainer>
  type ServiceWorkerRegistration = any
  const ServiceWorkerRegistration: AnyClass<ServiceWorkerRegistration>
  const sessionStorage: any
  type Set = any
  const Set: AnyClass<Set>
  const setInterval: AnyFunction
  const setTimeout: AnyFunction
  type ShadowRoot = any
  const ShadowRoot: AnyClass<ShadowRoot>
  type SharedArrayBuffer = any
  const SharedArrayBuffer: AnyClass<SharedArrayBuffer>
  type SharedWorker = any
  const SharedWorker: AnyClass<SharedWorker>
  type SourceBuffer = any
  const SourceBuffer: AnyClass<SourceBuffer>
  type SourceBufferList = any
  const SourceBufferList: AnyClass<SourceBufferList>
  type SpeechRecognitionAlternative = any
  const SpeechRecognitionAlternative: AnyClass<SpeechRecognitionAlternative>
  type SpeechRecognitionResult = any
  const SpeechRecognitionResult: AnyClass<SpeechRecognitionResult>
  type SpeechRecognitionResultList = any
  const SpeechRecognitionResultList: AnyClass<SpeechRecognitionResultList>
  const speechSynthesis: any
  type SpeechSynthesis = any
  const SpeechSynthesis: AnyClass<SpeechSynthesis>
  type SpeechSynthesisErrorEvent = any
  const SpeechSynthesisErrorEvent: AnyClass<SpeechSynthesisErrorEvent>
  type SpeechSynthesisEvent = any
  const SpeechSynthesisEvent: AnyClass<SpeechSynthesisEvent>
  type SpeechSynthesisUtterance = any
  const SpeechSynthesisUtterance: AnyClass<SpeechSynthesisUtterance>
  type SpeechSynthesisVoice = any
  const SpeechSynthesisVoice: AnyClass<SpeechSynthesisVoice>
  type StaticRange = any
  const StaticRange: AnyClass<StaticRange>
  const statusbar: any
  type StereoPannerNode = any
  const StereoPannerNode: AnyClass<StereoPannerNode>
  const stop: AnyFunction
  type Storage = any
  const Storage: AnyClass<Storage>
  type StorageEvent = any
  const StorageEvent: AnyClass<StorageEvent>
  type StorageManager = any
  const StorageManager: AnyClass<StorageManager>
  type String = any
  const String: AnyClass<String>
  const structuredClone: AnyFunction
  type StylePropertyMap = any
  const StylePropertyMap: AnyClass<StylePropertyMap>
  type StylePropertyMapReadOnly = any
  const StylePropertyMapReadOnly: AnyClass<StylePropertyMapReadOnly>
  type StyleSheet = any
  const StyleSheet: AnyClass<StyleSheet>
  type StyleSheetList = any
  const StyleSheetList: AnyClass<StyleSheetList>
  type SubmitEvent = any
  const SubmitEvent: AnyClass<SubmitEvent>
  type SubtleCrypto = any
  const SubtleCrypto: AnyClass<SubtleCrypto>
  type SVGAElement = any
  const SVGAElement: AnyClass<SVGAElement>
  type SVGAngle = any
  const SVGAngle: AnyClass<SVGAngle>
  type SVGAnimatedAngle = any
  const SVGAnimatedAngle: AnyClass<SVGAnimatedAngle>
  type SVGAnimatedBoolean = any
  const SVGAnimatedBoolean: AnyClass<SVGAnimatedBoolean>
  type SVGAnimatedEnumeration = any
  const SVGAnimatedEnumeration: AnyClass<SVGAnimatedEnumeration>
  type SVGAnimatedInteger = any
  const SVGAnimatedInteger: AnyClass<SVGAnimatedInteger>
  type SVGAnimatedLength = any
  const SVGAnimatedLength: AnyClass<SVGAnimatedLength>
  type SVGAnimatedLengthList = any
  const SVGAnimatedLengthList: AnyClass<SVGAnimatedLengthList>
  type SVGAnimatedNumber = any
  const SVGAnimatedNumber: AnyClass<SVGAnimatedNumber>
  type SVGAnimatedNumberList = any
  const SVGAnimatedNumberList: AnyClass<SVGAnimatedNumberList>
  type SVGAnimatedPreserveAspectRatio = any
  const SVGAnimatedPreserveAspectRatio: AnyClass<SVGAnimatedPreserveAspectRatio>
  type SVGAnimatedRect = any
  const SVGAnimatedRect: AnyClass<SVGAnimatedRect>
  type SVGAnimatedString = any
  const SVGAnimatedString: AnyClass<SVGAnimatedString>
  type SVGAnimatedTransformList = any
  const SVGAnimatedTransformList: AnyClass<SVGAnimatedTransformList>
  type SVGAnimateElement = any
  const SVGAnimateElement: AnyClass<SVGAnimateElement>
  type SVGAnimateMotionElement = any
  const SVGAnimateMotionElement: AnyClass<SVGAnimateMotionElement>
  type SVGAnimateTransformElement = any
  const SVGAnimateTransformElement: AnyClass<SVGAnimateTransformElement>
  type SVGAnimationElement = any
  const SVGAnimationElement: AnyClass<SVGAnimationElement>
  type SVGCircleElement = any
  const SVGCircleElement: AnyClass<SVGCircleElement>
  type SVGClipPathElement = any
  const SVGClipPathElement: AnyClass<SVGClipPathElement>
  type SVGComponentTransferFunctionElement = any
  const SVGComponentTransferFunctionElement: AnyClass<SVGComponentTransferFunctionElement>
  type SVGDefsElement = any
  const SVGDefsElement: AnyClass<SVGDefsElement>
  type SVGDescElement = any
  const SVGDescElement: AnyClass<SVGDescElement>
  type SVGElement = any
  const SVGElement: AnyClass<SVGElement>
  type SVGEllipseElement = any
  const SVGEllipseElement: AnyClass<SVGEllipseElement>
  type SVGFEBlendElement = any
  const SVGFEBlendElement: AnyClass<SVGFEBlendElement>
  type SVGFEColorMatrixElement = any
  const SVGFEColorMatrixElement: AnyClass<SVGFEColorMatrixElement>
  type SVGFEComponentTransferElement = any
  const SVGFEComponentTransferElement: AnyClass<SVGFEComponentTransferElement>
  type SVGFECompositeElement = any
  const SVGFECompositeElement: AnyClass<SVGFECompositeElement>
  type SVGFEConvolveMatrixElement = any
  const SVGFEConvolveMatrixElement: AnyClass<SVGFEConvolveMatrixElement>
  type SVGFEDiffuseLightingElement = any
  const SVGFEDiffuseLightingElement: AnyClass<SVGFEDiffuseLightingElement>
  type SVGFEDisplacementMapElement = any
  const SVGFEDisplacementMapElement: AnyClass<SVGFEDisplacementMapElement>
  type SVGFEDistantLightElement = any
  const SVGFEDistantLightElement: AnyClass<SVGFEDistantLightElement>
  type SVGFEDropShadowElement = any
  const SVGFEDropShadowElement: AnyClass<SVGFEDropShadowElement>
  type SVGFEFloodElement = any
  const SVGFEFloodElement: AnyClass<SVGFEFloodElement>
  type SVGFEFuncAElement = any
  const SVGFEFuncAElement: AnyClass<SVGFEFuncAElement>
  type SVGFEFuncBElement = any
  const SVGFEFuncBElement: AnyClass<SVGFEFuncBElement>
  type SVGFEFuncGElement = any
  const SVGFEFuncGElement: AnyClass<SVGFEFuncGElement>
  type SVGFEFuncRElement = any
  const SVGFEFuncRElement: AnyClass<SVGFEFuncRElement>
  type SVGFEGaussianBlurElement = any
  const SVGFEGaussianBlurElement: AnyClass<SVGFEGaussianBlurElement>
  type SVGFEImageElement = any
  const SVGFEImageElement: AnyClass<SVGFEImageElement>
  type SVGFEMergeElement = any
  const SVGFEMergeElement: AnyClass<SVGFEMergeElement>
  type SVGFEMergeNodeElement = any
  const SVGFEMergeNodeElement: AnyClass<SVGFEMergeNodeElement>
  type SVGFEMorphologyElement = any
  const SVGFEMorphologyElement: AnyClass<SVGFEMorphologyElement>
  type SVGFEOffsetElement = any
  const SVGFEOffsetElement: AnyClass<SVGFEOffsetElement>
  type SVGFEPointLightElement = any
  const SVGFEPointLightElement: AnyClass<SVGFEPointLightElement>
  type SVGFESpecularLightingElement = any
  const SVGFESpecularLightingElement: AnyClass<SVGFESpecularLightingElement>
  type SVGFESpotLightElement = any
  const SVGFESpotLightElement: AnyClass<SVGFESpotLightElement>
  type SVGFETileElement = any
  const SVGFETileElement: AnyClass<SVGFETileElement>
  type SVGFETurbulenceElement = any
  const SVGFETurbulenceElement: AnyClass<SVGFETurbulenceElement>
  type SVGFilterElement = any
  const SVGFilterElement: AnyClass<SVGFilterElement>
  type SVGForeignObjectElement = any
  const SVGForeignObjectElement: AnyClass<SVGForeignObjectElement>
  type SVGGElement = any
  const SVGGElement: AnyClass<SVGGElement>
  type SVGGeometryElement = any
  const SVGGeometryElement: AnyClass<SVGGeometryElement>
  type SVGGradientElement = any
  const SVGGradientElement: AnyClass<SVGGradientElement>
  type SVGGraphicsElement = any
  const SVGGraphicsElement: AnyClass<SVGGraphicsElement>
  type SVGImageElement = any
  const SVGImageElement: AnyClass<SVGImageElement>
  type SVGLength = any
  const SVGLength: AnyClass<SVGLength>
  type SVGLengthList = any
  const SVGLengthList: AnyClass<SVGLengthList>
  type SVGLinearGradientElement = any
  const SVGLinearGradientElement: AnyClass<SVGLinearGradientElement>
  type SVGLineElement = any
  const SVGLineElement: AnyClass<SVGLineElement>
  type SVGMarkerElement = any
  const SVGMarkerElement: AnyClass<SVGMarkerElement>
  type SVGMaskElement = any
  const SVGMaskElement: AnyClass<SVGMaskElement>
  type SVGMatrix = any
  const SVGMatrix: AnyClass<SVGMatrix>
  type SVGMetadataElement = any
  const SVGMetadataElement: AnyClass<SVGMetadataElement>
  type SVGMPathElement = any
  const SVGMPathElement: AnyClass<SVGMPathElement>
  type SVGNumber = any
  const SVGNumber: AnyClass<SVGNumber>
  type SVGNumberList = any
  const SVGNumberList: AnyClass<SVGNumberList>
  type SVGPathElement = any
  const SVGPathElement: AnyClass<SVGPathElement>
  type SVGPatternElement = any
  const SVGPatternElement: AnyClass<SVGPatternElement>
  type SVGPoint = any
  const SVGPoint: AnyClass<SVGPoint>
  type SVGPointList = any
  const SVGPointList: AnyClass<SVGPointList>
  type SVGPolygonElement = any
  const SVGPolygonElement: AnyClass<SVGPolygonElement>
  type SVGPolylineElement = any
  const SVGPolylineElement: AnyClass<SVGPolylineElement>
  type SVGPreserveAspectRatio = any
  const SVGPreserveAspectRatio: AnyClass<SVGPreserveAspectRatio>
  type SVGRadialGradientElement = any
  const SVGRadialGradientElement: AnyClass<SVGRadialGradientElement>
  type SVGRect = any
  const SVGRect: AnyClass<SVGRect>
  type SVGRectElement = any
  const SVGRectElement: AnyClass<SVGRectElement>
  type SVGScriptElement = any
  const SVGScriptElement: AnyClass<SVGScriptElement>
  type SVGSetElement = any
  const SVGSetElement: AnyClass<SVGSetElement>
  type SVGStopElement = any
  const SVGStopElement: AnyClass<SVGStopElement>
  type SVGStringList = any
  const SVGStringList: AnyClass<SVGStringList>
  type SVGStyleElement = any
  const SVGStyleElement: AnyClass<SVGStyleElement>
  type SVGSVGElement = any
  const SVGSVGElement: AnyClass<SVGSVGElement>
  type SVGSwitchElement = any
  const SVGSwitchElement: AnyClass<SVGSwitchElement>
  type SVGSymbolElement = any
  const SVGSymbolElement: AnyClass<SVGSymbolElement>
  type SVGTextContentElement = any
  const SVGTextContentElement: AnyClass<SVGTextContentElement>
  type SVGTextElement = any
  const SVGTextElement: AnyClass<SVGTextElement>
  type SVGTextPathElement = any
  const SVGTextPathElement: AnyClass<SVGTextPathElement>
  type SVGTextPositioningElement = any
  const SVGTextPositioningElement: AnyClass<SVGTextPositioningElement>
  type SVGTitleElement = any
  const SVGTitleElement: AnyClass<SVGTitleElement>
  type SVGTransform = any
  const SVGTransform: AnyClass<SVGTransform>
  type SVGTransformList = any
  const SVGTransformList: AnyClass<SVGTransformList>
  type SVGTSpanElement = any
  const SVGTSpanElement: AnyClass<SVGTSpanElement>
  type SVGUnitTypes = any
  const SVGUnitTypes: AnyClass<SVGUnitTypes>
  type SVGUseElement = any
  const SVGUseElement: AnyClass<SVGUseElement>
  type SVGViewElement = any
  const SVGViewElement: AnyClass<SVGViewElement>
  type Symbol = any
  const Symbol: AnyClass<Symbol>
  type SyntaxError = any
  const SyntaxError: AnyClass<SyntaxError>
  type Text = any
  const Text: AnyClass<Text>
  type TextDecoder = any
  const TextDecoder: AnyClass<TextDecoder>
  type TextDecoderStream = any
  const TextDecoderStream: AnyClass<TextDecoderStream>
  type TextEncoder = any
  const TextEncoder: AnyClass<TextEncoder>
  type TextEncoderStream = any
  const TextEncoderStream: AnyClass<TextEncoderStream>
  type TextMetrics = any
  const TextMetrics: AnyClass<TextMetrics>
  type TextTrack = any
  const TextTrack: AnyClass<TextTrack>
  type TextTrackCue = any
  const TextTrackCue: AnyClass<TextTrackCue>
  type TextTrackCueList = any
  const TextTrackCueList: AnyClass<TextTrackCueList>
  type TextTrackList = any
  const TextTrackList: AnyClass<TextTrackList>
  type TimeRanges = any
  const TimeRanges: AnyClass<TimeRanges>
  type ToggleEvent = any
  const ToggleEvent: AnyClass<ToggleEvent>
  const toolbar: any
  const top: any
  const toString: AnyFunction
  type Touch = any
  const Touch: AnyClass<Touch>
  type TouchEvent = any
  const TouchEvent: AnyClass<TouchEvent>
  type TouchList = any
  const TouchList: AnyClass<TouchList>
  type TrackEvent = any
  const TrackEvent: AnyClass<TrackEvent>
  type TransformStream = any
  const TransformStream: AnyClass<TransformStream>
  type TransformStreamDefaultController = any
  const TransformStreamDefaultController: AnyClass<TransformStreamDefaultController>
  type TransitionEvent = any
  const TransitionEvent: AnyClass<TransitionEvent>
  type TreeWalker = any
  const TreeWalker: AnyClass<TreeWalker>
  type TypeError = any
  const TypeError: AnyClass<TypeError>
  type UIEvent = any
  const UIEvent: AnyClass<UIEvent>
  type Uint16Array = any
  const Uint16Array: AnyClass<Uint16Array>
  type Uint32Array = any
  const Uint32Array: AnyClass<Uint32Array>
  type Uint8Array = any
  const Uint8Array: AnyClass<Uint8Array>
  type Uint8ClampedArray = any
  const Uint8ClampedArray: AnyClass<Uint8ClampedArray>
  type URIError = any
  const URIError: AnyClass<URIError>
  type URL = any
  const URL: AnyClass<URL>
  type URLSearchParams = any
  const URLSearchParams: AnyClass<URLSearchParams>
  type UserActivation = any
  const UserActivation: AnyClass<UserActivation>
  type ValidityState = any
  const ValidityState: AnyClass<ValidityState>
  type VBArray = any
  const VBArray: AnyClass<VBArray>
  type VideoColorSpace = any
  const VideoColorSpace: AnyClass<VideoColorSpace>
  type VideoDecoder = any
  const VideoDecoder: AnyClass<VideoDecoder>
  type VideoEncoder = any
  const VideoEncoder: AnyClass<VideoEncoder>
  type VideoFrame = any
  const VideoFrame: AnyClass<VideoFrame>
  type VideoPlaybackQuality = any
  const VideoPlaybackQuality: AnyClass<VideoPlaybackQuality>
  const visualViewport: any
  type VisualViewport = any
  const VisualViewport: AnyClass<VisualViewport>
  type VTTCue = any
  const VTTCue: AnyClass<VTTCue>
  type VTTRegion = any
  const VTTRegion: AnyClass<VTTRegion>
  type WakeLock = any
  const WakeLock: AnyClass<WakeLock>
  type WakeLockSentinel = any
  const WakeLockSentinel: AnyClass<WakeLockSentinel>
  type WaveShaperNode = any
  const WaveShaperNode: AnyClass<WaveShaperNode>
  type WeakMap = any
  const WeakMap: AnyClass<WeakMap>
  type WeakSet = any
  const WeakSet: AnyClass<WeakSet>
  type WebGL2RenderingContext = any
  const WebGL2RenderingContext: AnyClass<WebGL2RenderingContext>
  type WebGLActiveInfo = any
  const WebGLActiveInfo: AnyClass<WebGLActiveInfo>
  type WebGLBuffer = any
  const WebGLBuffer: AnyClass<WebGLBuffer>
  type WebGLContextEvent = any
  const WebGLContextEvent: AnyClass<WebGLContextEvent>
  type WebGLFramebuffer = any
  const WebGLFramebuffer: AnyClass<WebGLFramebuffer>
  type WebGLProgram = any
  const WebGLProgram: AnyClass<WebGLProgram>
  type WebGLQuery = any
  const WebGLQuery: AnyClass<WebGLQuery>
  type WebGLRenderbuffer = any
  const WebGLRenderbuffer: AnyClass<WebGLRenderbuffer>
  type WebGLRenderingContext = any
  const WebGLRenderingContext: AnyClass<WebGLRenderingContext>
  type WebGLSampler = any
  const WebGLSampler: AnyClass<WebGLSampler>
  type WebGLShader = any
  const WebGLShader: AnyClass<WebGLShader>
  type WebGLShaderPrecisionFormat = any
  const WebGLShaderPrecisionFormat: AnyClass<WebGLShaderPrecisionFormat>
  type WebGLSync = any
  const WebGLSync: AnyClass<WebGLSync>
  type WebGLTexture = any
  const WebGLTexture: AnyClass<WebGLTexture>
  type WebGLTransformFeedback = any
  const WebGLTransformFeedback: AnyClass<WebGLTransformFeedback>
  type WebGLUniformLocation = any
  const WebGLUniformLocation: AnyClass<WebGLUniformLocation>
  type WebGLVertexArrayObject = any
  const WebGLVertexArrayObject: AnyClass<WebGLVertexArrayObject>
  type WebKitCSSMatrix = any
  const WebKitCSSMatrix: AnyClass<WebKitCSSMatrix>
  const webkitURL: any
  type WebSocket = any
  const WebSocket: AnyClass<WebSocket>
  type WebTransport = any
  const WebTransport: AnyClass<WebTransport>
  type WebTransportBidirectionalStream = any
  const WebTransportBidirectionalStream: AnyClass<WebTransportBidirectionalStream>
  type WebTransportDatagramDuplexStream = any
  const WebTransportDatagramDuplexStream: AnyClass<WebTransportDatagramDuplexStream>
  type WebTransportError = any
  const WebTransportError: AnyClass<WebTransportError>
  type WheelEvent = any
  const WheelEvent: AnyClass<WheelEvent>
  const window: any
  type Window = any
  const Window: AnyClass<Window>
  type Worker = any
  const Worker: AnyClass<Worker>
  type Worklet = any
  const Worklet: AnyClass<Worklet>
  type WritableStream = any
  const WritableStream: AnyClass<WritableStream>
  type WritableStreamDefaultController = any
  const WritableStreamDefaultController: AnyClass<WritableStreamDefaultController>
  type WritableStreamDefaultWriter = any
  const WritableStreamDefaultWriter: AnyClass<WritableStreamDefaultWriter>
  type WScript = any
  const WScript: AnyClass<WScript>
  type WSH = any
  const WSH: AnyClass<WSH>
  type XMLDocument = any
  const XMLDocument: AnyClass<XMLDocument>
  type XMLHttpRequest = any
  const XMLHttpRequest: AnyClass<XMLHttpRequest>
  type XMLHttpRequestEventTarget = any
  const XMLHttpRequestEventTarget: AnyClass<XMLHttpRequestEventTarget>
  type XMLHttpRequestUpload = any
  const XMLHttpRequestUpload: AnyClass<XMLHttpRequestUpload>
  type XMLSerializer = any
  const XMLSerializer: AnyClass<XMLSerializer>
  type XPathEvaluator = any
  const XPathEvaluator: AnyClass<XPathEvaluator>
  type XPathExpression = any
  const XPathExpression: AnyClass<XPathExpression>
  type XPathResult = any
  const XPathResult: AnyClass<XPathResult>
  type XSLTProcessor = any
  const XSLTProcessor: AnyClass<XSLTProcessor>
}
export { }