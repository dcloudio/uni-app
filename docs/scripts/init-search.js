var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '../');
var indexPath = root + '/index.html';
var indexs = [];
// 忽略一些不必要文件和目录
var ignores = [
	'.nojekyll', '.svn', 'mpvue', 'nativeUI',
	'node_modules', 'package.json', 'package-lock.json', '_navbar.md', '_sidebar.md',
	'static', 'scripts', 'backup', 'ssr.html', 'h5',
	'demo', 'update', 'tuku'
];

var readDirSync = function(dir) {
	var paths = fs.readdirSync(dir);
	paths.forEach(function(path) {
		var info = fs.statSync(dir + '/' + path);
		var test = ~ignores.indexOf(path);
		console.log("path = " + path + test);
		if (~ignores.indexOf(path)) {
			console.log("忽略")
			return;
		}
		if (info.isDirectory()) {
			readDirSync(dir + '/' + path);
		} else {
			if (path.match(/^[a-zA-Z].*\.md/)) {
				path = path.replace('.md', '');
				var indexPath = dir.replace(root, '') ? dir.replace(root, '') + '/' + path : dir.replace(root, '/') + path;
				indexPath = indexPath === '/README' ? '/' : indexPath;
				indexs.push(indexPath);
			}
		}
	});
}
readDirSync(root);

fs.readFile(indexPath, 'utf8', function(err, data) {
	var result = data.replace(data.match(/paths:\s?\[([^\[\]]+)?\]/)[0], 'paths: ' + JSON.stringify(indexs).replace(/\"/g, '\''));
	fs.writeFile(indexPath, result, 'utf8', function(err) {
		if (err) {
			throw err;
		}
	});
});
