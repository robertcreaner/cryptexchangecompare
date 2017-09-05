var Coinone = (function(Coinone){

	'use strict';

    Coinone = function( conf ){

    }

    Coinone.prototype.getCoinOnePrices = function (coinData, krwEurExRate) {
        $.ajax({
            dataType: "json",
            url: 'https://api.coinone.co.kr/ticker?currencyType=EUR&currency=',
            method: 'GET',
            async: false
        }).done(function(res) {
            coinData.btc.coinone.price = parseInt(res.btc.last) / krwEurExRate;
            coinData.eth.coinone.price = parseInt(res.eth.last) / krwEurExRate;
            coinData.etc.coinone.price = parseInt(res.etc.last) / krwEurExRate;
            coinData.xrp.coinone.price = parseInt(res.xrp.last) / krwEurExRate;
        });
    };

    return Coinone;

})(Coinone || {});
