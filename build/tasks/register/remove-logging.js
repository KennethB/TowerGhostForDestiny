module.exports = function (grunt) {
	//that adds the templates
	grunt.registerMultiTask("combine-templates", "Combine multiple html files to a single js file", function() {
		var path = require("path"),
			prefix = this.data.object,
			files = grunt.file.expand(this.data.src),
			result = prefix + " = {};\n";

		files.forEach(function(file) {
			//strip the extension to determine a template name
			var name = path.basename(file).replace(".tmpl.html", ""),
				//remove line feeds and escape quotes
				escapedContents = grunt.file.read(file).replace(/"/g ,"\\x22").replace(/(\r\n|\n|\r)/gm, "");

			result += prefix + "[\"" + name + "\"] = \"" + escapedContents + "\";\n";
		});

		grunt.file.write(this.data.dest, result);
	});
}