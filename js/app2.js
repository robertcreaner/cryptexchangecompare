(function(){

	'use strict';

    // Get arbitrage data
    var arbitrage = new Arbitrage();
    var coinData = arbitrage.data;

    // Retrieve KRW-EUR exchange rate from Fixer API
    var fixer = new Fixer();
    fixer.getCurrencyExchangeRate();

    // Helper class used to calculate arbitrage
    var mathhelper = new Mathhelper();

    // Coinone Api
    var coinone = new Coinone();

    // Kraken Api
    var kraken = new Kraken({mathhelper:mathhelper});

    // Update prices every 6 seconds
    function setData() {
        coinone.getCoinOnePrices(coinData, fixer.krwEurExRate);
        kraken.getKrakenPrices(coinData);
        displayCoinTable();
        updateHTML();
        priceFlash(coinData);
    }

    setData();
    setInterval(function(){
        updateData();
    }, 6000);

    function updateData() {
        // Store current coin price data
        coinData.btc.oldDiff = coinData.btc.diff;
        coinData.eth.oldDiff = coinData.eth.diff;
        coinData.etc.oldDiff = coinData.etc.diff;
        coinData.xrp.oldDiff = coinData.xrp.diff;

        // Update coin price data
        setData();
    }

    function updateHTML() {
        $('.' + coinData.btc.kraken.className).html('€ '+ coinData.btc.kraken.price);
        $('.' + coinData.eth.kraken.className).html('€ '+ coinData.eth.kraken.price);
        $('.' + coinData.etc.kraken.className).html('€ '+ coinData.etc.kraken.price);
        $('.' + coinData.xrp.kraken.className).html('€ '+ coinData.xrp.kraken.price);
        $('.' + coinData.btc.coinone.className).html('€ '+mathhelper.round(coinData.btc.coinone.price, 2));
        $('.' + coinData.eth.coinone.className).html('€ '+mathhelper.round(coinData.eth.coinone.price, 2));
        $('.' + coinData.etc.coinone.className).html('€ '+mathhelper.round(coinData.etc.coinone.price, 2));
        $('.' + coinData.xrp.coinone.className).html('€ '+mathhelper.round(coinData.xrp.coinone.price, 2));
        $('.' + coinData.btc.className).html(coinData.btc.diff);
        $('.' + coinData.eth.className).html(coinData.eth.diff);
        $('.' + coinData.etc.className).html(coinData.etc.diff);
        $('.' + coinData.xrp.className).html(coinData.xrp.diff);
    }

    function displayCoinTable() {
        $('#loader').addClass('hide-loader');
        $('.coin-table').addClass('show-coin-table');
    }

    function priceFlash(data) {
        _.forEach(data, function(value, key) {
            console.log(value.diff);
            console.log(value.oldDiff);
            if(value.diff > value.oldDiff) {
                $('.' + value.className).addClass('green');
                setTimeout(function() {
                    $('.' + value.className).removeClass('green');
                }, 3000);
            } else if (value.diff < value.oldDiff) {
                $('.' + value.className).addClass('red');
                setTimeout(function() {
                    $('.' + value.className).removeClass('red');
                }, 3000);
            }
        });
    }

})();
