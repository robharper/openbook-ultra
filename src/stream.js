var openbookFormat = require('./format');
var translate = require('./translate');
var through = require('through2');

module.exports = function(filter) {
  return through.obj(function(chunk, enc, cb){
    if (this._buf) {
      chunk = Buffer.concat([this._buf, chunk]);
    }

    var ofs = 0;
    while (chunk.length - ofs >= 69) {
      var message = openbookFormat(chunk, ofs);
      message = translate(message);
      if (!filter || message.Symbol === filter) {
        this.push( message );
      }
      ofs += 69;
    }

    if (ofs < chunk.length) {
      this._buf = chunk.slice(ofs);
    } else {
      this._buf = null;
    }

    cb();
  });
};
