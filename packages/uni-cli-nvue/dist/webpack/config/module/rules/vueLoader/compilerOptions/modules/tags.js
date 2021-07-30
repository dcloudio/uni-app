"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTagsModule = void 0;
function createTagsModule() {
    return {
        postTransformNode(el) {
            rewriteText(el);
            rewriteTag(el);
            rewriteEvents(el);
            rewriteVideo(el);
        },
    };
}
exports.createTagsModule = createTagsModule;
function rewriteText(el) {
    const tag = el.tag;
    if (tag === 'text' || tag === 'u-text' || tag === 'button') {
        return;
    }
    const children = el.children;
    children.forEach((child, index) => {
        if (child.text) {
            children.splice(index, 1, {
                type: 1,
                tag: 'u-text',
                attrsList: [],
                attrsMap: {},
                rawAttrsMap: {},
                parent: el,
                children: [child],
                plain: true,
            });
        }
    });
}
const TAGS = [
    'text',
    'image',
    'input',
    'textarea',
    'video',
    'web-view',
    // 'switch',
    'slider',
];
function rewriteTag(el) {
    if (TAGS.includes(el.tag)) {
        el.tag = 'u-' + el.tag;
    }
    else if (el.tag === 'match-media') {
        el.tag = 'uni-match-media';
    }
}
const deprecated = {
    events: {
        tap: 'click',
    },
};
function rewriteEvents(el) {
    if (!el.events) {
        return;
    }
    const { events: eventsMap } = deprecated;
    Object.keys(el.events).forEach((name) => {
        // 过时事件类型转换
        const eventType = eventsMap[name];
        if (eventType) {
            if (!(name === 'tap' && el.tag === 'map')) {
                // map 的 tap 事件不做转换
                el.events[eventType] = el.events[name];
                delete el.events[name];
            }
        }
    });
}
function rewriteVideo(el) {
    if (el.tag !== 'u-video') {
        return;
    }
    if (!Array.isArray(el.children)) {
        return;
    }
    if (!el.children.length) {
        return;
    }
    if (el.children[0].tag === 'u-scalable') {
        return;
    }
    el.children = [
        {
            type: 1,
            tag: 'u-scalable',
            attrsList: [],
            attrsMap: {
                style: 'position: absolute;left: 0;right: 0;top: 0;bottom: 0;',
            },
            rawAttrsMap: {
                style: {
                    name: 'style',
                    value: 'position: absolute;left: 0;right: 0;top: 0;bottom: 0;',
                },
            },
            parent: el,
            plain: false,
            staticStyle: '{position:"absolute",left:"0",right:"0",top:"0",bottom:"0"}',
            children: el.children,
        },
    ];
}
