var zeros = /\0/g;

module.exports = function(vars) {
  vars.Symbol = vars.Symbol.replace(zeros, '');

  vars.QuoteCondition = String.fromCharCode(vars.QuoteCondition).replace(zeros, '');
  vars.TradingStatus = String.fromCharCode(vars.TradingStatus).replace(zeros, '');

  vars.Price = vars.PriceNumerator / Math.pow(10,vars.PriceScaleCode);

  vars.Side = String.fromCharCode(vars.Side).replace(zeros, '');
  vars.ReasonCode = String.fromCharCode(vars.ReasonCode).replace(zeros, '');

  return vars;
};