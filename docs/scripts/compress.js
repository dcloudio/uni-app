var UglifyJS = require('uglify-js');
var Uglifycss = require('uglifycss');
var fs = require('fs');
var $path = require('path');

var root = $path.join(__dirname, '../');

var files = ['docsify.js', 'search.js', 'index.css','banner.js','preview.js'];

files.forEach(file => {
	var names = file.split('.');
	names.splice(1, 0, 'min');
	var output = $path.join(root, '/static/' + names.join('.')),
		file = $path.join(root, '/static/' + file);
	var result = null;
	if (~file.indexOf('css')) {
		result = Uglifycss.processFiles([file]);
	} else {
		var data = fs.readFileSync(file);
		result = UglifyJS.minify(data.toString()).code;
	}
	fs.writeFileSync(output, result);
});

console.log('结束')
