var fs = require('fs');
var OpenbookReader = require('./src/openbook/stream-transform');

var opts = require("nomnom")
   .option('filter', {
      abbr: 'f',
      help: 'Symbol filter'
   })
   .option('in', {
      abbr: 'i',
      help: 'Input file in Openbook Ultra format',
      required: true
   })
   .parse();

var readStream = fs.createReadStream(opts.in);

readStream
  .pipe(new OpenbookReader({
    filter: opts.filter
  }))
  .pipe(require('through2').obj(function(chunk, enc, callback){
    this.push(
      chunk.MsgSeqNum + '\t' +
      chunk.MsgType + '\t' +
      chunk.SendTime + '\t' +
      chunk.Symbol + '\t' +
      chunk.MsgSize + '\t' +
      chunk.SecurityIndex + '\t' +
      chunk.SourceTime + '\t' +
      chunk.SourceTimeMicroSecs + '\t' +
      chunk.QuoteCondition + '\t' +
      chunk.TradingStatus + '\t' +
      chunk.SourceSeqNum + '\t' +
      chunk.SourceSessionID + '\t' +
      chunk.PriceScaleCode + '\t' +
      chunk.PriceNumerator + '\t' +
      chunk.Price + '\t' +
      chunk.Volume + '\t' +
      chunk.ChgQty + '\t' +
      chunk.NumOrders + '\t' +
      chunk.Side + '\t' +
      chunk.ReasonCode + '\t' +
      chunk.LinkID1 + '\t' +
      chunk.LinkID2 + '\t' +
      chunk.LinkID3 + '\n'
    );
    callback();
  }))
  .pipe(process.stdout);
