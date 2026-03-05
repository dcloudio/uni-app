'use strict';
exports.main = async (event, context) => {
  const secretType = context.secretType
  // secretType 是客户端调用 uniCloud.callFunction 传递的参数 secretType
  if (secretType !== 'both') {
    const error = new Error('客户端指定的secretType不为both，拒绝此次请求')
    error.code = 'INVALID_SECRET_TYPE'
    throw error  // 拒绝本次请求
  }
  return {
    returnBy: 'encyption'
  }
};
