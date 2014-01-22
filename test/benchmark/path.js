var path = require("path");

add("Path.resolve #1", function() {
	path.resolve("path/to/dirname", "/more");
});

add("Path.resolve #2", function() {
	path.resolve("/dirname", "pathtoanotherdir", "path/to/dirname");
});
