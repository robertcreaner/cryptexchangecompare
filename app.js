(function() {

    'use strict';

    // Get arbitrage data
    var Arbitrage = require('./js/services/arbitrage');
    var arb = new Arbitrage(); 
    var coinData = arb.data;

    // Retrieve KRW-EUR exchange rate from Fixer API
    var fixer = new Fixer();
    fixer.getCurrencyExchangeRate();

    // Helper class used to calculate arb
    var Mathhelper = require('./js/services/mathhelper');
    var mathhelper = new Mathhelper();

    // Coinone Api
    var Coinone = require('./js/services/coinone');
    var coinone = new Coinone();
    var coinoneData = null;

    // Kraken Api
    var Kraken = require('./js/services/kraken');
    var kraken = new Kraken();
    var krakenData = null;

    function init() {
        getData();
        if (dataIsReady()) {
            updateHTML();
        }
    }

    function getData() {
        coinoneData = coinone.getCoinOnePrices(coinData);
        krakenData = kraken.getKrakenPrices(coinData);
        console.log(coinoneData);
        console.log(krakenData);
        updateData();
    }

    // Update prices every 2 seconds
    setInterval(function() {
        init();
    }, 2000);

    function updateData() {
        // Store current coin price data
        coinData.btc.oldDiff = coinData.btc.diff;
        coinData.eth.oldDiff = coinData.eth.diff;
        coinData.etc.oldDiff = coinData.etc.diff;
        coinData.xrp.oldDiff = coinData.xrp.diff;
        coinData.ltc.oldDiff = coinData.ltc.diff;
        coinData.bch.oldDiff = coinData.bch.diff;
        updateCoinonePrices(coinoneData);
        updateKrakenPrices(krakenData);
    }

    function updateKrakenPrices(res) {
        coinData.btc.kraken.price = res.BTC.EUR;
        coinData.etc.kraken.price = res.ETC.EUR;
        coinData.eth.kraken.price = res.ETH.EUR;
        coinData.xrp.kraken.price = res.XRP.EUR;
        coinData.bch.kraken.price = res.BCH.EUR;
        coinData.ltc.kraken.price = res.LTC.EUR;

        coinData.eth.diff = mathhelper.getDifference(coinData.eth.kraken.price, coinData.eth.coinone.price);
        coinData.btc.diff = mathhelper.getDifference(coinData.btc.kraken.price, coinData.btc.coinone.price);
        coinData.etc.diff = mathhelper.getDifference(coinData.etc.kraken.price, coinData.etc.coinone.price);
        coinData.xrp.diff = mathhelper.getDifference(coinData.xrp.kraken.price, coinData.xrp.coinone.price);
        coinData.bch.diff = mathhelper.getDifference(coinData.bch.kraken.price, coinData.bch.coinone.price);
        coinData.ltc.diff = mathhelper.getDifference(coinData.ltc.kraken.price, coinData.ltc.coinone.price);
    }

    function updateCoinonePrices(res) {
        coinData.btc.coinone.price = parseInt(res.btc.last) / fixer.krwEurExRate;
        coinData.eth.coinone.price = parseInt(res.eth.last) / fixer.krwEurExRate;
        coinData.etc.coinone.price = parseInt(res.etc.last) / fixer.krwEurExRate;
        coinData.xrp.coinone.price = parseInt(res.xrp.last) / fixer.krwEurExRate;
        coinData.bch.coinone.price = parseInt(res.bch.last) / fixer.krwEurExRate;
        coinData.ltc.coinone.price = parseInt(res.ltc.last) / fixer.krwEurExRate;
    }

    function updateHTML() {
        $('.' + coinData.btc.kraken.className).html('€ ' + coinData.btc.kraken.price);
        $('.' + coinData.eth.kraken.className).html('€ ' + coinData.eth.kraken.price);
        $('.' + coinData.etc.kraken.className).html('€ ' + coinData.etc.kraken.price);
        $('.' + coinData.xrp.kraken.className).html('€ ' + coinData.xrp.kraken.price);
        $('.' + coinData.bch.kraken.className).html('€ ' + coinData.bch.kraken.price);
        $('.' + coinData.ltc.kraken.className).html('€ ' + coinData.ltc.kraken.price);
        $('.' + coinData.btc.coinone.className).html('€ ' + mathhelper.round(coinData.btc.coinone.price, 2));
        $('.' + coinData.eth.coinone.className).html('€ ' + mathhelper.round(coinData.eth.coinone.price, 2));
        $('.' + coinData.etc.coinone.className).html('€ ' + mathhelper.round(coinData.etc.coinone.price, 2));
        $('.' + coinData.xrp.coinone.className).html('€ ' + mathhelper.round(coinData.xrp.coinone.price, 2));
        $('.' + coinData.bch.coinone.className).html('€ ' + mathhelper.round(coinData.bch.coinone.price, 2));
        $('.' + coinData.ltc.coinone.className).html('€ ' + mathhelper.round(coinData.ltc.coinone.price, 2));
        $('.' + coinData.btc.className).html(coinData.btc.diff);
        $('.' + coinData.eth.className).html(coinData.eth.diff);
        $('.' + coinData.etc.className).html(coinData.etc.diff);
        $('.' + coinData.xrp.className).html(coinData.xrp.diff);
        $('.' + coinData.bch.className).html(coinData.bch.diff);
        $('.' + coinData.ltc.className).html(coinData.ltc.diff);
        displayCoinTable();
        priceFlasher(coinData);
    }

    function displayCoinTable() {
        $('#loader').addClass('hide-loader');
        $('.coin-table').addClass('show-coin-table');
        $('.coin-table').removeClass('hide-coin-table');
    }

    function priceFlasher(data) {
        _.forEach(data, function(value, key) {
            if (value.diff > value.oldDiff) {
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

    function dataIsReady() {
        return coinData.btc.diff != '100 %' ? true : false;
    }
})();