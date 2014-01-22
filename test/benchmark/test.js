add("RegExp#test", function() {
  /o/.test("Hello World!");
});

add('String#indexOf', function() {
  "Hello World!".indexOf("o") > -1;
});

options.maxTime = 3;