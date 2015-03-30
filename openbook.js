var fs = require('fs');
var async = require('async');

var opts = require("nomnom")
  .option('output', {
    abbr: 'o',
    default: 'csv',
    help: 'Output format, json or csv'
  })
  .option('pretty', {
    abbr: 'p',
    flag: true,
    default: false,
    help: 'Pretty json output'
  })
  .option('filter', {
    abbr: 'f',
    help: 'Symbol filter'
  })
  .option('file', {
    position: 0,
    metavar: 'FILE',
    list: true,
    help: 'Input file in Openbook Ultra format',
    required: true
  })
  .parse();

async.eachSeries(opts.file, function(file, done) {
  console.error('Starting: ' + file);

  var readStream = fs.createReadStream(file);
  var outStream = readStream.pipe(require('./src/stream')(opts.filter));
  if (opts.output === 'csv') {
    outStream = outStream.pipe(require('./src/csv')(','))
  } else {
    outStream = outStream.pipe(require('./src/json')(opts.pretty))
  }
  outStream.pipe(process.stdout);

  outStream.on('end', done);
});
