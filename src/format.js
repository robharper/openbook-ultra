var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var reader = {
  int4: function(buffer, ofs) {
    return buffer.readUInt32BE(ofs);
  },
  int2: function(buffer, ofs) {
    return buffer.readUInt16BE(ofs);
  },
  int1: function(buffer, ofs) {
    return buffer.readUInt8(ofs);
  },
  string: function(buffer, ofs, len) {
    return decoder.write(buffer.slice(ofs, ofs+len));
  }
};

var openbookFormat = [
  {name: 'MsgSeqNum', type: 'int', len: 4},
  {name: 'MsgType',   type: 'int', len: 2},
  {name: 'SendTime',  type: 'int', len: 4},

  {name: 'Symbol',    type: 'string', len: 11},

  {name: 'MsgSize',       type: 'int', len: 2},
  {name: 'SecurityIndex', type: 'int', len: 2},
  {name: 'SourceTime',    type: 'int', len: 4},
  {name: 'SourceTimeMicroSecs', type: 'int', len: 2},

  {name: 'QuoteCondition',  type: 'int', len: 1},
  {name: 'TradingStatus',   type: 'int', len: 1},
  {name: 'SourceSeqNum',    type: 'int', len: 4},

  {name: 'SourceSessionID', type: 'int', len: 1},
  {name: 'PriceScaleCode',  type: 'int', len: 1},
  {name: 'PriceNumerator',  type: 'int', len: 4},

  {name: 'Volume',    type: 'int', len: 4},
  {name: 'ChgQty',    type: 'int', len: 4},

  {name: 'NumOrders', type: 'int', len: 2},

  {name: 'Side',      type: 'int', len: 1},
  {name: 'Filler',    type: 'int', len: 1},
  {name: 'ReasonCode',type: 'int', len: 1},
  {name: 'Filler',    type: 'int', len: 1},

  {name: 'LinkID1',    type: 'int', len: 4},
  {name: 'LinkID2',    type: 'int', len: 4},
  {name: 'LinkID3',    type: 'int', len: 4}
];


module.exports = function(buffer, ofs) {
  var ret = {};

  for (var i=0; i<openbookFormat.length; i++) {
    var record = openbookFormat[i];
    if (record.type === 'int') {
      ret[record.name] = reader['int'+record.len](buffer, ofs);
    } else {
      ret[record.name] = reader[record.type](buffer, ofs, record.len);
    }
    ofs += record.len;
  }

  return ret;
}