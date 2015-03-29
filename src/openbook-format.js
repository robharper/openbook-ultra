module.exports = function(binary) {
  return binary
    .word32bu('MsgSeqNum')
    .word16bu('MsgType')
    .word32bu('SendTime')

    .buffer('Symbol', 11)

    .word16bu('MsgSize')
    .word16bu('SecurityIndex')
    .word32bu('SourceTime')
    .word16bu('SourceTimeMicroSecs')

    .word8bu('QuoteCondition')
    .word8bu('TradingStatus')

    .word32bu('SourceSeqNum')

    .word8bu('SourceSessionID')
    .word8bu('PriceScaleCode')

    .word32bu('PriceNumerator')
    .word32bu('Volume')
    .word32bu('ChgQty')

    .word16bu('NumOrders')

    .word8bu('Side')
    .word8bu('Filler')
    .word8bu('ReasonCode')
    .word8bu('Filler')

    .word32bu('LinkID1')
    .word32bu('LinkID2')
    .word32bu('LinkID3');
}