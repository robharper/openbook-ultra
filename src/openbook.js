var binary = require('binary');
var openbookFormat = require('./openbook-format');
var translate = require('./openbook-translate');

// cb(end, vars)
//  - end() to stop reading from stream
//  - vars is hash of data
module.exports = function(cb) {
  return binary().loop(function(end) {
    openbookFormat(this)
      .tap(function(vars) {
        cb(end, translate(vars));
      });
  });
};
