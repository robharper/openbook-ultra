var openbookFormat = require('./format');
var translate = require('./translate');

var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

function OpenBook(options) {
  // allow use without new
  if (!(this instanceof OpenBook)) {
    return new OpenBook(options);
  }

  this._buf = null;

  options = options || {};
  options.objectMode = true;

  this._filter = options.filter;

  // init Transform
  Transform.call(this, options);
}
util.inherits(OpenBook, Transform);

var i = 0;
OpenBook.prototype._transform = function (chunk, enc, cb) {
  if (this._buf) {
    chunk = Buffer.concat([this._buf, chunk]);
  }

  var ofs = 0;
  while (chunk.length - ofs >= 69) {
    var message = openbookFormat(chunk, ofs);
    message = translate(message);
    if (!this._filter || message.Symbol === this._filter) {
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
};

module.exports = OpenBook;