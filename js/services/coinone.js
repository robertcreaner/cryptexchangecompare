(function() {
    'use strict';

    var Coinone = (function(Coinone) {
        
        Coinone = function() {}
        
        Coinone.prototype.getCoinOnePrices = function(coinData) {
            return JSON.parse($.ajax({
                dataType: "json",
                url: 'https://api.coinone.co.kr/ticker?currencyType=EUR&currency=',
                method: 'GET',
                async: false
            }).responseText);
        };

        return Coinone;
        
    })(Coinone || {});

    module.exports = Coinone;
})();