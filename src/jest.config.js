const fs = require('fs')
const path = require('path')

const config = {
  testTimeout: 15000,
  reporters: ['default'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['js', 'json'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/pages/**/*test.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/pages/uni-ui/'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testSequencer: path.join(__dirname, "testSequencer.js")
}

// 如果主机电脑中有虚拟网卡（比如安装了 Docker/WSL 等软件），额外的 IP 地址有可能干扰应用端通过 IP 地址连接到主机端的测试工具。
// 如果存在这种情况，可以在当前目录下创建一个 globalSetup.js 文件，在其中检测到实际用于网络通信的主 IP 地址并传递给应用端。
// globalSetup.js 的内容可参考下面这段代码：
//
// const dgram = require('dgram');
// function getPrimaryIP() {
//   return new Promise((resolve, reject) => {
//     const socket = dgram.createSocket('udp4');
//     // 这里并不会真的发送数据包，只是触发系统路由选择
//     socket.connect(80, '8.8.8.8', () => {
//       const { address } = socket.address();
//       socket.close();
//       resolve(address);
//     });
//     socket.on('error', (err) => {
//       resolve(undefined);
//     });
//   });
// }
// module.exports = async () => {
//   process.env.UNI_AUTOMATOR_HOST = await getPrimaryIP()
// };

const globalSetupPath = path.resolve(__dirname, 'globalSetup.js')
if (fs.existsSync(globalSetupPath)) {
  config.globalSetup = globalSetupPath;
}

module.exports = config;
