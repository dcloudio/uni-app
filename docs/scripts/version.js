var fs = require('fs');
var path = require('path');

var indexPath = path.join(__dirname, '../index.html');
var TAG_REG = /\<(?:script|link)\s(?:[^>]+)?(?:href|src)=\"([^>]+)"\>/g;
var VERSION_REG = /\?v=\d+/;
var now = Date.now();

fs.readFile(indexPath, 'utf8', function(error, content) {
	if (error) {
		throw error;
	}
	var result = null;
	while (result = TAG_REG.exec(content)) {
		var path = result[1];
		if (path.match(VERSION_REG)) {
			path = path.replace(VERSION_REG, '?v=' + now);
			content = content.replace(result[1], path);
		}
	}
	fs.writeFile(indexPath, content, 'utf8', function(error) {
		if (error) {
			throw error;
		}
		console.log('update version success.');
	});
});
