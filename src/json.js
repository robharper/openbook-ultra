module.exports = function(pretty) {
  if (pretty) {
    return require('through2').obj(function(chunk, enc, callback){
      this.push( JSON.stringify(chunk, null, '\t') + ',\n' );
      callback();
    });
  } else {
    return require('through2').obj(function(chunk, enc, callback){
      this.push( JSON.stringify(chunk) + ',\n' );
      callback();
    });
  }
};