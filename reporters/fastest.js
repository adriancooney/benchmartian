var reporter = require("./"),
	colors = require("colors");

reporter.on("file", function(name, suite) {
	console.log(("\nBenchmarking " + name + "..").red);

	suite.on("cycle", function() {
		process.stdout.write(".");
	});

	suite.on("complete", function() {
		console.log("\nCompleted file " + name + ".\n");
	});
});

reporter.on("complete", function(results) {
	console.log("Results".blue);
	Object.keys(results).forEach(function(file) {
		var result = results[file];
		console.log(("-> " + file).white);
		console.log("    " + result.join("\n    "));
		console.log("    " + (result.filter("fastest").pluck("name") + " is fastest").green + " and " + (result.filter("slowest").pluck("name") + " is slowest.").red);
	})
});

module.exports = reporter;