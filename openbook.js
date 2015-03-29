var fs = require('fs');

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
    list: false,
    help: 'Input file in Openbook Ultra format',
    required: true
  })
  .parse();


var readStream = fs.createReadStream(opts.file);

var outStream = readStream.pipe(require('./src/stream')(opts.filter));

if (opts.output === 'csv') {
  outStream = outStream.pipe(require('./src/csv')(','))
} else {
  outStream = outStream.pipe(require('./src/json')(opts.pretty))
}

outStream.pipe(process.stdout);
