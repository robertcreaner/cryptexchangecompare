(function() {
    'use strict';

    var Kraken = (function(Kraken) {

        Kraken = function() {}

        Kraken.prototype.getKrakenPrices = function(coinData) {
            return JSON.parse($.ajax({
                dataType: "json",
                url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,XRP,LTC,BCH&tsyms=EUR&e=Kraken',
                method: 'GET',
                async: false,
            }).responseText);
        };

        return Kraken;
        
    })(Kraken || {});

    module.exports = Kraken;
})();