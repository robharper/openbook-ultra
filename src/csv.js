module.exports = function(sep) {
  return require('through2').obj(function(chunk, enc, callback){
    this.push(
      chunk.MsgSeqNum + sep +
      chunk.MsgType + sep +
      chunk.SendTime + sep +
      chunk.Symbol + sep +
      chunk.MsgSize + sep +
      chunk.SecurityIndex + sep +
      chunk.SourceTime + sep +
      chunk.SourceTimeMicroSecs + sep +
      chunk.QuoteCondition + sep +
      chunk.TradingStatus + sep +
      chunk.SourceSeqNum + sep +
      chunk.SourceSessionID + sep +
      chunk.PriceScaleCode + sep +
      chunk.PriceNumerator + sep +
      chunk.Price + sep +
      chunk.Volume + sep +
      chunk.ChgQty + sep +
      chunk.NumOrders + sep +
      chunk.Side + sep +
      chunk.ReasonCode + sep +
      chunk.LinkID1 + sep +
      chunk.LinkID2 + sep +
      chunk.LinkID3 + '\n'
    );
    callback();
  });
};