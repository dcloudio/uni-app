"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEasycomCode = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function generateEasycomCode(names) {
    const components = [];
    resolveEasycom(names).forEach(({ name, source }) => {
        // 统一转换为驼峰命名
        name = name.replace(/-(\w)/g, (_, str) => str.toUpperCase());
        components.push(`'${name}': require('${source}').default`);
    });
    if (process.env.NODE_ENV === 'production') {
        return `var components = {${components.join(',')}}`;
    }
    return `var components;
try{
  components = {${components.join(',')}}
}catch(e){
  if(e.message.indexOf('Cannot find module') !== -1 && e.message.indexOf('.vue') !== -1){
    console.error(e.message)
    console.error('1. 排查组件名称拼写是否正确')
    console.error('2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom')
    console.error('3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件')
  } else {
    throw e
  }
}`;
}
exports.generateEasycomCode = generateEasycomCode;
function resolveEasycom(names) {
    return names.reduce((coms, name) => {
        const source = uni_cli_shared_1.matchEasycom(name);
        if (source) {
            coms.push({
                name,
                source,
            });
        }
        return coms;
    }, []);
}
