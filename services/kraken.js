var Kraken = (function(Kraken){

	'use strict';

    Kraken = function( conf ){
        this.mathhelper = conf.mathhelper;
    }

    Kraken.prototype.getKrakenPrices = function (coinData) {
        var me  = this;
        $.ajax({
            dataType: "json",
            url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,XRP&tsyms=EUR&e=Kraken',
            method: 'GET',
            async: false
        }).done(function(res) {
            coinData.btc.kraken.price = res.BTC.EUR;
            coinData.eth.kraken.price = res.ETH.EUR;
            coinData.etc.kraken.price = res.ETC.EUR;
            coinData.xrp.kraken.price = res.XRP.EUR;

            coinData.btc.diff = me.mathhelper.getDifference(coinData.btc.kraken.price,coinData.btc.coinone.price);
            coinData.eth.diff = me.mathhelper.getDifference(coinData.eth.kraken.price,coinData.eth.coinone.price);
            coinData.etc.diff = me.mathhelper.getDifference(coinData.etc.kraken.price,coinData.etc.coinone.price);
            coinData.xrp.diff = me.mathhelper.getDifference(coinData.xrp.kraken.price,coinData.xrp.coinone.price);
        });
    };

    return Kraken;

})(Kraken || {});
