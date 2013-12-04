var sourceEditor = ace.edit("source");
sourceEditor.setTheme("ace/theme/monokai");
sourceEditor.setReadOnly(true);
sourceEditor.getSession().setMode("ace/mode/javascript");

var outputEditor = ace.edit("output");
outputEditor.setReadOnly(true);
outputEditor.getSession().setMode("ace/mode/javascript");

var consoleEditor = ace.edit("console");
consoleEditor.setReadOnly(true);
consoleEditor.getSession().setMode("ace/mode/javascript");

var firebase;
var gist = location.pathname.slice(1);
if(_.parseInt(gist, 10)) {
	console.log = function() {
		consoleEditor.navigateFileEnd();
		consoleEditor.insert(_.map(arguments, function(v) { return JSON.stringify(v); }).join(' ') + '\n');
	};

	firebase = new Firebase('https://' + Math.random().toString(36).slice(2) + '.firebaseio-demo.com/');

	var onValue = firebase.on('value', function(snapshot) {
		outputEditor.getSession().setValue(JSON.stringify(snapshot.exportVal(), null, '\t'));
	});

	var model = {
		description: ko.observable(),
		gist_url: ko.observable(),
		firebase_url: firebase.toString()
	};

	$.get('https://api.github.com/gists/' + gist, function(data) {
		model.description(data.description);
		model.gist_url(data.html_url);
		var file = _.find(data.files, {language: "JavaScript"});
		if(file) {
			sourceEditor.getSession().setValue(file.content.trim());
			$.ajax({
				url: file.raw_url,
				dataType: "script",
				cache: true
			});
		}
	}, 'json');

	ko.applyBindings(model);
}
