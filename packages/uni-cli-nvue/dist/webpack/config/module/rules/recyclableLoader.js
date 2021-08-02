"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecyclableLoader = void 0;
const loader_1 = require("../../../loader");
function createRecyclableLoader() {
    return {
        resourceQuery: function (query) {
            return (query.indexOf('vue&type=template') !== -1 &&
                query.indexOf('mpType=page') === -1);
        },
        use: [{ loader: loader_1.resolveLoader('recyclable') }],
    };
}
exports.createRecyclableLoader = createRecyclableLoader;
