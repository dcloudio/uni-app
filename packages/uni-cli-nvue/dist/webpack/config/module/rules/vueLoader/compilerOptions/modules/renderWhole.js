"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRenderWholeModule = void 0;
// render-whole => append="tree"
function createRenderWholeModule() {
    return {
        preTransformNode(el) {
            if (!Object.hasOwnProperty.call(el.attrsMap, 'append')) {
                const name = 'render-whole';
                const value = el.attrsMap[name];
                if (value === true || value === 'true') {
                    // remove
                    delete el.attrsMap.append;
                    const index = el.attrsList.findIndex((item) => item.name === name);
                    const attr = el.attrsList[index];
                    el.attrsList.splice(index, 1);
                    el.appendAsTree = true;
                    el.attrsMap.append = 'tree';
                    el.attrsList.push({
                        name: 'append',
                        value: 'tree',
                        bool: false,
                        start: attr.start,
                        end: attr.end,
                    });
                }
            }
            return el;
        },
    };
}
exports.createRenderWholeModule = createRenderWholeModule;
