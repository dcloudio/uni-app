// // 批量导出文件
// const requireApi = require.context('.', false, /.js$/)
// let module = {}
// let noAllowPaht = ['./index.js']
// requireApi.keys().forEach((key, index) => {
// 	if ( noAllowPaht.indexOf(key) !== -1 ) return
// 	Object.assign(module, requireApi(key))
// })
// export default module

