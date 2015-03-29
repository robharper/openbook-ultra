var decoder = require('string_decoder').StringDecoder('utf8');
var zeros = /\0/g;

module.exports = function(vars) {
  // vars.Symbol = decoder.write(vars.Symbol).replace(, '');
  vars.Symbol = vars.Symbol.toString('utf8').replace(zeros, '');

  vars.QuoteCondition = String.fromCharCode(vars.QuoteCondition).replace(zeros, '');
  vars.TradingStatus = String.fromCharCode(vars.TradingStatus).replace(zeros, '');

  vars.Price = parseFloat(vars.PriceNumerator + '.' + vars.PriceScaleCode);

  vars.Side = String.fromCharCode(vars.Side).replace(zeros, '');
  vars.ReasonCode = String.fromCharCode(vars.ReasonCode).replace(zeros, '');

  return vars;
};