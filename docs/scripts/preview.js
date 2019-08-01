var url = require("url"),
    fs = require("fs"),
    http = require("http"),
    path = require("path");
http.createServer(function (req, res) {
    var pathname = path.join(__dirname, '../') + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }
	switch(path.extname(pathname)){
		case ".html":
			res.writeHead(200, {"Content-Type": "text/html"});
			pathname = path.join(__dirname, '../') + '/index.html'
			break;
		case ".js":
			res.writeHead(200, {"Content-Type": "text/javascript"});
			break;
		case ".css":
			res.writeHead(200, {"Content-Type": "text/css"});
			break;
		default:
			res.writeHead(200, {"Content-Type": "application/octet-stream"});
	}
	fs.readFile(pathname, function (err, data) {
		res.end(data);
	});
}).listen(3000);
console.log("服务在3000启动");