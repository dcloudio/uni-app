const net = require('net')
const os = require('os')
/**获取本机ip**/
function getIPAdress() {
	var interfaces = os.networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
}
const hostname = getIPAdress(); //主机名
function portIsOccupied(port) {
	const server = net.createServer().listen(port)
	return new Promise((resolve, reject) => {
		server.on('listening', () => {
			console.log('Successful service operation')
			console.log(`the server is runnint on:  http://${hostname}:${port}`)
			console.log(`the server is runnint on:  http://localhost:${port}`)
			server.close()
			resolve(port)
		})

		server.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				resolve(portIsOccupied(port + 1)) //注意这句，如占用端口号+1
				console.log(`this port ${port} is occupied.try another.`)
			} else {
				reject(err)
			}
		})
	})
}
module.exports = portIsOccupied
