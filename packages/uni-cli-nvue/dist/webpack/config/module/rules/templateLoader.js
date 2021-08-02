"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateLoader = void 0;
const loader_1 = require("../../../loader");
function createTemplateLoader() {
    return {
        resourceQuery: function (query) {
            return (query.indexOf('vue&type=template') !== -1 &&
                query.indexOf('mpType=page') !== -1);
        },
        use: [
            { loader: loader_1.resolveLoader('scrollView') },
            {
                loader: loader_1.resolveLoader('pageMeta'),
            },
        ],
    };
}
exports.createTemplateLoader = createTemplateLoader;
