// 用于同步额外的侧边栏信息，例如 QQ 群。
var fs = require('fs');
var START_TEXT = '<div class="contact-box">';

var targetSidebarList = [
	'./api/_sidebar.md',
	'./component/_sidebar.md',
	'./collocation/_sidebar.md'
];

fs.readFile('./_sidebar.md', 'utf8', function(error, result) {
	if (error) {
		throw error;
	}
	var contactContent = result.substring(result.indexOf(START_TEXT));
	targetSidebarList.forEach(function(targetPath) {
		fs.readFile(targetPath, 'utf8', function(error, target) {
			if (error) {
				throw error;
			}
			var startIndex = target.indexOf(START_TEXT);
			if (startIndex > 0) {
				target = target.replace(target.substring(startIndex), contactContent);
				fs.writeFile(targetPath, target, 'utf8', function(error) {
					if (error) {
						throw error;
					}
					console.log('copy ' + targetPath + ' success');
				});
			}
		});
	});
});
