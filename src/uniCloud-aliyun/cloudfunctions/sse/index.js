'use strict';
exports.main = async (event, context) => {
  const sseChannelObj = event.sseChannel
  const sseChannel = uniCloud.deserializeSSEChannel(sseChannelObj)
  return new Promise(async (resolve, reject) => {
    await sseChannel.write('message1')
    await sseChannel.write('message2')
    setTimeout(async () => {
      await sseChannel.end()
      resolve({
        errCode: 0
      })
    }, 300)
  })
};
