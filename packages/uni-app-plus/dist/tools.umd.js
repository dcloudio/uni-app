(function (window, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : window || self, factory(window.Tools = {}));
}(this, (function (exports) { 'use strict';

    const COMPONENT_MAP = {
        VIEW: 1,
        IMAGE: 2,
        TEXT: 3,
        '#text': 4,
        '#comment': 5,
        NAVIGATOR: 6,
        FORM: 7,
        BUTTON: 8,
        INPUT: 9,
        LABEL: 10,
        RADIO: 11,
        CHECKBOX: 12,
        'CHECKBOX-GROUP': 13,
        AD: 14,
        AUDIO: 15,
        CAMERA: 16,
        CANVAS: 17,
        'COVER-IMAGE': 18,
        'COVER-VIEW': 19,
        EDITOR: 20,
        'FUNCTIONAL-PAGE-NAVIGATOR': 21,
        ICON: 22,
        'RADIO-GROUP': 23,
        'LIVE-PLAYER': 24,
        'LIVE-PUSHER': 25,
        MAP: 26,
        'MOVABLE-AREA': 27,
        'MOVABLE-VIEW': 28,
        'OFFICIAL-ACCOUNT': 29,
        'OPEN-DATA': 30,
        PICKER: 31,
        'PICKER-VIEW': 32,
        'PICKER-VIEW-COLUMN': 33,
        PROGRESS: 34,
        'RICH-TEXT': 35,
        'SCROLL-VIEW': 36,
        SLIDER: 37,
        SWIPER: 38,
        'SWIPER-ITEM': 39,
        SWITCH: 40,
        TEXTAREA: 41,
        VIDEO: 42,
        'WEB-VIEW': 43,
    };
    function decodeArrMap(objMap) {
        return Object.keys(objMap).reduce((arr, name) => {
            arr.push(name.toLowerCase());
            return arr;
        }, ['']);
    }
    const DECODED_COMPONENT_ARR = /*#__PURE__*/ decodeArrMap(COMPONENT_MAP);
    function decodeTag(tag) {
        return (DECODED_COMPONENT_ARR[tag] || tag);
    }

    const ACTION_TYPE_PAGE_CREATE = 1;
    const ACTION_TYPE_PAGE_CREATED = 2;
    const ACTION_TYPE_CREATE = 3;
    const ACTION_TYPE_INSERT = 4;
    const ACTION_TYPE_REMOVE = 5;
    const ACTION_TYPE_SET_ATTRIBUTE = 6;
    const ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
    const ACTION_TYPE_SET_TEXT = 8;

    function decodePageCreateAction([, pageCreateData]) {
        return ['pageCreate', pageCreateData];
    }
    function decodePageCreatedAction([]) {
        return ['pageCreated'];
    }
    function decodeCreateAction([, nodeId, nodeName, parentNodeId, nodeJson,]) {
        return ['create', nodeId, decodeTag(nodeName), parentNodeId, nodeJson];
    }
    function decodeInsertAction([, ...action]) {
        return ['insert', ...action];
    }
    function decodeRemoveAction([, ...action]) {
        return ['remove', ...action];
    }
    function decodeSetAttributeAction([, ...action]) {
        return ['setAttr', ...action];
    }
    function decodeRemoveAttributeAction([, ...action]) {
        return ['removeAttr', ...action];
    }
    function decodeSetTextAction([, ...action]) {
        return ['setText', action];
    }
    function decodeActions(actions) {
        return actions.map((action) => {
            switch (action[0]) {
                case ACTION_TYPE_PAGE_CREATE:
                    return decodePageCreateAction(action);
                case ACTION_TYPE_PAGE_CREATED:
                    return decodePageCreatedAction(action);
                case ACTION_TYPE_CREATE:
                    return decodeCreateAction(action);
                case ACTION_TYPE_INSERT:
                    return decodeInsertAction(action);
                case ACTION_TYPE_REMOVE:
                    return decodeRemoveAction(action);
                case ACTION_TYPE_SET_ATTRIBUTE:
                    return decodeSetAttributeAction(action);
                case ACTION_TYPE_REMOVE_ATTRIBUTE:
                    return decodeRemoveAttributeAction(action);
                case ACTION_TYPE_SET_TEXT:
                    return decodeSetTextAction(action);
            }
            return action;
        });
    }

    exports.decodeActions = decodeActions;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
