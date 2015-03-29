var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var word32 = function(buffer, ofs) {
  return buffer.readUInt32BE(ofs);
}

var word16 = function(buffer, ofs) {
  return buffer.readUInt16BE(ofs);
}

var word8 = function(buffer, ofs) {
  return buffer.readUInt8(ofs);
}

var string = function(buffer, ofs, len) {
  return decoder.write(buffer.slice(ofs, ofs+len));
}

module.exports = function(buffer, ofs) {
  var ret = {};
  ret['MsgSeqNum'] = word32(buffer, ofs);
  ofs += 4;

  ret['MsgType'] = word16(buffer, ofs);
  ofs += 2;
  ret['SendTime'] = word32(buffer, ofs);
  ofs += 4;

  ret['Symbol'] = string(buffer, ofs, 11);
  ofs += 11;

  ret['MsgSize'] = word16(buffer, ofs);
  ofs += 2;
  ret['SecurityIndex'] = word16(buffer, ofs);
  ofs += 2;
  ret['SourceTime'] = word32(buffer, ofs);
  ofs += 4;

  ret['SourceTimeMicroSecs'] = word16(buffer, ofs);
  ofs += 2;

  ret['QuoteCondition'] = word8(buffer, ofs);
  ofs += 1;
  ret['TradingStatus'] = word8(buffer, ofs);
  ofs += 1;

  ret['SourceSeqNum'] = word32(buffer, ofs);
  ofs += 4;


  ret['SourceSessionID'] = word8(buffer, ofs);
  ofs += 1;
  ret['PriceScaleCode'] = word8(buffer, ofs);
  ofs += 1;

  ret['PriceNumerator'] = word32(buffer, ofs);
  ofs += 4;

  ret['Volume'] = word32(buffer, ofs);
  ofs += 4;

  ret['ChgQty'] = word32(buffer, ofs);
  ofs += 4;


  ret['NumOrders'] = word16(buffer, ofs);
  ofs += 2;

  ret['Side'] = word8(buffer, ofs);
  ofs += 1;
  ret['Filler'] = word8(buffer, ofs);
  ofs += 1;
  ret['ReasonCode'] = word8(buffer, ofs);
  ofs += 1;
  ret['Filler'] = word8(buffer, ofs);
  ofs += 1;

  ret['LinkID1'] = word32(buffer, ofs);
  ofs += 4;

  ret['LinkID2'] = word32(buffer, ofs);
  ofs += 4;

  ret['LinkID3'] = word32(buffer, ofs);
  ofs += 4;

  return ret;
}