# Benchmartian
### Run Javascript benchmarks from the CLI
Benchmartian allows you to run your incredible [benchmark.js][http://benchmarkjs.com] benchmarks from the command line much like you would any other test suite such as `mocha`.

### Install
Install from npm.

	$ npm install -g benchmartian


And to run benchmarks:

	$ benchmartian

	Benchmarking benchmarks/benchmarks.js..
	..
	Completed file benchmarks/benchmarks.js.

	Results
	-> benchmarks/benchmarks.js
	    RegExp#test x 15,634,369 ops/sec ±0.96% (94 runs sampled)
	    String#indexOf x 25,131,771 ops/sec ±0.97% (95 runs sampled)

Simple as.

## Usage
Benchmartian will take an array of files as arguments or if no arguments are given, `benchmartian` will look in `benchmark/` directory of current working directory. You can also supply a reporter which will define how the test results are outputted. To see a list of reporters do `benchmartian --reporters`.


	benchmartian -- Run benchmark.js benchmarks from the CLI.

	Usage:
	  benchmartian [files]     Begin benchmarking. If no are files supplied, benchmartian looks in `benchmark/`.
	  --reporter [reported]    Select a reporter from /reporters. Defaults to basic.
	  --reporters              Print out available reporters.
	  --help                   Print this help.

## Benchmarks
To make defining benchmarks incredibly simple, `benchmartian` exposes all method on the `benchmark.Suite` prototype into the global scope which allows for concise definitions. The only function `benchmartian` calls (if it hasn't already been called with your own options) is `suite.run`. The reporters take care of handling the output so you can sit back and focus on your benchmarks.

Example from the [benchmarkjs.com homepage](http://benchmarkjs.com).
```js
add('RegExp#test', function() {
  /o/.test('Hello World!');
});

add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
});
```

Example defining your own `run` options:
```js
add('RegExp#test', function() {
  /o/.test('Hello World!');
});

add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
});

run({
	async: true
});
```

## Reporters
Reporters for `benchmartian` are made incredibly easy by the `benchmark.js` library. To begin, create a Javascript file by the name of your reporter in the `reporters/` directory and require the `index.js` file. See `reporter/basic.js` for an example.

```js
	var reporter = require("./");
```

The reporter's job is to handle different events emitted by `benchmartian` and a `benchmark.Suite` on a suite. `benchmartian` emits 3 events:
* `begin` with the `(files)` as an argument.
* `file` with `(filename, suite)`. It's in this callback where you define your [`benchmark.Suite` events](http://benchmarkjs.com/docs#options_onAbort).
* `complete` with `(results)`. Results is a key value store of `filename: suite` so you can compile a comphrensive report.

Finally, export your reporter:
```js
	module.exports = reporter;
```

## Thanks
Thanks to the authors of the incredible [benchmark.js](http://benchmarkjs.com) library. `benchmartian` owes it's existance to it.

#### License
MIT