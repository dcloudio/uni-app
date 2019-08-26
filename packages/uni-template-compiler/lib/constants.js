const METHOD_CREATE_ELEMENT = '_c' // createElement
const METHOD_MARK_ONCE = '_o' // markOnce
const METHOD_TO_NUMBER = '_n' // toNumber
const METHOD_TO_STRING = '_s' // toString
const METHOD_RENDER_LIST = '_l' // renderList
const METHOD_RENDER_SLOT = '_t' // renderSlot
const METHOD_LOOSE_EQUAL = '_q' // looseEqual
const METHOD_LOOSE_INDEX_OF = '_i' // looseIndexOf
const METHOD_RENDER_STATIC = '_m' // renderStatic
const METHOD_RESOLVE_FILTER = '_f' // resolveFilter
const METHOD_CHECK_KEY_CODES = '_k' // checkKeyCodes
const METHOD_BIND_OBJECT_PROPS = '_b' // bindObjectProps
const METHOD_CREATE_TEXT_VNODE = '_v' // createTextVNode
const METHOD_CREATE_EMPTY_VNODE = '_e' // createEmptyVNode
const METHOD_RESOLVE_SCOPED_SLOTS = '_u' // resolveScopedSlots
const METHOD_BIND_OBJECT_LISTENERS = '_g' // bindObjectListeners
const METHOD_BIND_DYNAMIC_KEYS = '_d' // bindDynamicKeys
const METHOD_PREPEND_MODIFIER = '_p' // prependModifier

const METHOD_SET = '$set' // $set

const INTERNAL_SET_MODEL = '__set_model'
const INTERNAL_SET_SYNC = '__set_sync'
const INTERNAL_GET_ORIG = '__get_orig'
const INTERNAL_GET_CLASS = '__get_class'
const INTERNAL_GET_STYLE = '__get_style'
const INTERNAL_GET_EVENT = '__get_event'
const INTERNAL_GET_REFS = '__get_refs'
const INTERNAL_EVENT_PROXY = '__e'
const INTERNAL_EVENT_LINK = '__l'

const ALLOWED_GLOBAL_OBJECT = [
  'Math',
  'Number',
  'Date',
  'Array',
  'Object',
  'Boolean',
  'String',
  'RegExp',
  'Map',
  'Set',
  'JSON',
  'Intl',
  'console'
]

module.exports = {
  SELF_CLOSING_TAGS: ['input'], // 百度需要自闭合
  VUE_EVENT_MODIFIERS: {
    capture: '!',
    once: '~',
    passive: '&',
    custom: '^'
  },
  ALLOWED_GLOBAL_OBJECT,
  CLASS_REF: 'vue-ref',
  CLASS_REF_IN_FOR: 'vue-ref-in-for',
  VAR_MP: '$mp',
  VAR_ROOT: '$root',
  VAR_ORIGINAL: '$orig',
  VAR_FILTER: 'F',
  ATTR_DATA_EVENT_OPTS: 'data-event-opts',
  ATTR_DATA_COM_TYPE: 'data-com-type',
  INTERNAL_GET_ORIG,
  INTERNAL_GET_CLASS,
  INTERNAL_GET_STYLE,
  INTERNAL_GET_EVENT,
  INTERNAL_GET_REFS,
  INTERNAL_EVENT_PROXY,
  INTERNAL_EVENT_LINK,
  INTERNAL_SET_MODEL,
  INTERNAL_SET_SYNC,
  METHOD_BUILT_IN: [
    METHOD_SET,
    INTERNAL_SET_MODEL,
    INTERNAL_SET_SYNC,
    INTERNAL_GET_ORIG,
    INTERNAL_GET_CLASS,
    INTERNAL_GET_STYLE,
    INTERNAL_GET_EVENT,
    INTERNAL_GET_REFS,
    INTERNAL_EVENT_PROXY,
    METHOD_CREATE_ELEMENT, // createElement
    METHOD_MARK_ONCE, // markOnce
    METHOD_TO_NUMBER, // toNumber
    METHOD_TO_STRING, // toString
    METHOD_RENDER_LIST, // renderList
    METHOD_RENDER_SLOT, // renderSlot
    METHOD_LOOSE_EQUAL, // looseEqual
    METHOD_LOOSE_INDEX_OF, // looseIndexOf
    METHOD_RENDER_STATIC, // renderStatic
    METHOD_RESOLVE_FILTER, // resolveFilter
    METHOD_CHECK_KEY_CODES, // checkKeyCodes
    METHOD_BIND_OBJECT_PROPS, // bindObjectProps
    METHOD_CREATE_TEXT_VNODE, // createTextVNode
    METHOD_CREATE_EMPTY_VNODE, // createEmptyVNode
    METHOD_RESOLVE_SCOPED_SLOTS, // resolveScopedSlots
    METHOD_BIND_OBJECT_LISTENERS, // bindObjectListeners
    METHOD_BIND_DYNAMIC_KEYS, // bindDynamicKeys
    METHOD_PREPEND_MODIFIER // prependModifier
  ],
  METHOD_CREATE_ELEMENT,
  METHOD_TO_STRING,
  METHOD_RENDER_LIST,
  METHOD_RESOLVE_FILTER,
  PREFIX_GLOBAL: 'g',
  PREFIX_ATTR: 'a',
  PREFIX_METHOD: 'm',
  PREFIX_FILTER: 'f',
  PREFIX_FOR: 'l',
  PREFIX_CLASS: 'c',
  PREFIX_STYLE: 's',
  PREFIX_EVENT: 'e',
  IDENTIFIER_FOR: '__$$for$$__',
  IDENTIFIER_ATTR: '__$$attr$$__',
  IDENTIFIER_METHOD: '__$$method$$__',
  IDENTIFIER_FILTER: '__$$filter$$__',
  IDENTIFIER_CLASS: '__$$class$$__',
  IDENTIFIER_STYLE: '__$$style$$__',
  IDENTIFIER_EVENT: '__$$event$$__',
  IDENTIFIER_GLOBAL: '__$$global$$__'
}
