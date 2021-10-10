(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tools = {}));
})(this, (function (exports) { 'use strict';

    const ACTION_TYPE_PAGE_CREATE = 1;
    const ACTION_TYPE_PAGE_CREATED = 2;
    const ACTION_TYPE_CREATE = 3;
    const ACTION_TYPE_INSERT = 4;
    const ACTION_TYPE_REMOVE = 5;
    const ACTION_TYPE_SET_ATTRIBUTE = 6;
    const ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
    const ACTION_TYPE_ADD_EVENT = 8;
    const ACTION_TYPE_REMOVE_EVENT = 9;
    const ACTION_TYPE_SET_TEXT = 10;
    const ACTION_TYPE_ADD_WXS_EVENT = 12;

    const ACTION_TYPE_DICT = 0;

    function createGetDict(dict) {
        if (!dict.length) {
            return (v) => v;
        }
        const getDict = (value, includeValue = true) => {
            if (typeof value === 'number') {
                return dict[value];
            }
            const res = {};
            value.forEach(([n, v]) => {
                if (includeValue) {
                    res[getDict(n)] = getDict(v);
                }
                else {
                    res[getDict(n)] = v;
                }
            });
            return res;
        };
        return getDict;
    }
    function decodeActions(actions) {
        const [type, dict] = actions[0];
        if (type !== ACTION_TYPE_DICT) {
            return actions;
        }
        const getDict = createGetDict(dict);
        return actions.map((action) => {
            switch (action[0]) {
                case ACTION_TYPE_DICT:
                    return action;
                case ACTION_TYPE_PAGE_CREATE:
                    return decodePageCreateAction(action);
                case ACTION_TYPE_PAGE_CREATED:
                    return decodePageCreatedAction(action);
                case ACTION_TYPE_CREATE:
                    return decodeCreateAction(action, getDict);
                case ACTION_TYPE_INSERT:
                    return decodeInsertAction(action);
                case ACTION_TYPE_REMOVE:
                    return decodeRemoveAction(action);
                case ACTION_TYPE_SET_ATTRIBUTE:
                    return decodeSetAttributeAction(action, getDict);
                case ACTION_TYPE_REMOVE_ATTRIBUTE:
                    return decodeRemoveAttributeAction(action, getDict);
                case ACTION_TYPE_ADD_EVENT:
                    return decodeAddEventAction(action, getDict);
                case ACTION_TYPE_ADD_WXS_EVENT:
                    return decodeAddWxsEventAction(action, getDict);
                case ACTION_TYPE_REMOVE_EVENT:
                    return decodeRemoveEventAction(action, getDict);
                case ACTION_TYPE_SET_TEXT:
                    return decodeSetTextAction(action, getDict);
            }
        });
    }
    function decodePageCreateAction([, pageCreateData]) {
        return ['pageCreate', pageCreateData];
    }
    function decodePageCreatedAction([]) {
        return ['pageCreated'];
    }
    function decodeNodeJson(getDict, nodeJson) {
        if (!nodeJson) {
            return;
        }
        if (nodeJson.a) {
            nodeJson.a = getDict(nodeJson.a);
        }
        if (nodeJson.e) {
            nodeJson.e = getDict(nodeJson.e, false);
        }
        if (nodeJson.w) {
            nodeJson.w = getWxsEventDict(nodeJson.w, getDict);
        }
        if (nodeJson.s) {
            nodeJson.s = getDict(nodeJson.s);
        }
        if (nodeJson.t) {
            nodeJson.t = getDict(nodeJson.t);
        }
        return nodeJson;
    }
    function getWxsEventDict(w, getDict) {
        const res = {};
        w.forEach(([name, [wxsEvent, flag]]) => {
            res[getDict(name)] = [getDict(wxsEvent), flag];
        });
        return res;
    }
    function decodeCreateAction([, nodeId, nodeName, parentNodeId, refNodeId, nodeJson], getDict) {
        return [
            'create',
            nodeId,
            getDict(nodeName),
            parentNodeId,
            refNodeId,
            decodeNodeJson(getDict, nodeJson),
        ];
    }
    function decodeInsertAction([, ...action]) {
        return ['insert', ...action];
    }
    function decodeRemoveAction([, ...action]) {
        return ['remove', ...action];
    }
    function decodeAddEventAction([, ...action], getDict) {
        return ['addEvent', action[0], getDict(action[1]), action[2]];
    }
    function decodeAddWxsEventAction([, ...action], getDict) {
        return [
            'addWxsEvent',
            action[0],
            getDict(action[1]),
            getDict(action[2]),
            action[3],
        ];
    }
    function decodeRemoveEventAction([, ...action], getDict) {
        return ['removeEvent', action[0], getDict(action[1])];
    }
    function decodeSetAttributeAction([, ...action], getDict) {
        return [
            'setAttr',
            action[0],
            getDict(action[1]),
            getDict(action[2]),
        ];
    }
    function decodeRemoveAttributeAction([, ...action], getDict) {
        return ['removeAttr', action[0], getDict(action[1])];
    }
    function decodeSetTextAction([, ...action], getDict) {
        return ['setText', action[0], getDict(action[1])];
    }

    exports.createGetDict = createGetDict;
    exports.decodeActions = decodeActions;
    exports.decodeNodeJson = decodeNodeJson;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
