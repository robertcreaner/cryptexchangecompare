(function(){

	'use strict';

    var krwEurExRate;

    var coinData = {
        btc: {
            diff: null,
            oldDiff: null,
            coinone: {
                price: null,
                className: 'coinone-BTC-price'
            },
            kraken: {
                price: null,
                className: 'kraken-BTC-price'
            },
            className: 'BTC-difference'
        },
        eth: {
            diff: null,
            oldDiff: null,
            coinone: {
                price: null,
                className: 'coinone-ETH-price'
            },
            kraken: {
                price: null,
                className: 'kraken-ETH-price'
            },
            className: 'ETH-difference'
        },
        etc: {
            diff: null,
            oldDiff: null,
            coinone: {
                price: null,
                className: 'coinone-ETC-price'
            },
            kraken: {
                price: null,
                className: 'kraken-ETC-price'
            },
            className: 'ETC-difference'
        },
        xrp: {
            diff: null,
            oldDiff: null,
            coinone: {
                price: null,
                className: 'coinone-XRP-price'
            },
            kraken: {
                price: null,
                className: 'kraken-XRP-price'
            },
            className: 'XRP-difference'
        }
    }

    // Currency Exchange rate
    var getCurrencyExchangeRate = function() {
        $.ajax({
            method:'GET',
            url:'http://api.fixer.io/latest?base=EUR&symbols=KRW',
            dataType:'json'
        }).done(function(res){
            krwEurExRate = res.rates.KRW;
        });
    }

    // Kraken Prices
    var getKrakenPrices = function() {
        $.ajax({
            dataType: "json",
            url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,XRP&tsyms=EUR&e=Kraken',
            method: 'GET'
        }).done(function(res) {
            coinData.btc.kraken.price = res.BTC.EUR;
            coinData.eth.kraken.price = res.ETH.EUR;
            coinData.etc.kraken.price = res.ETC.EUR;
            coinData.xrp.kraken.price = res.XRP.EUR;

            coinData.btc.diff = getDifference(coinData.btc.kraken.price,coinData.btc.coinone.price);
            coinData.eth.diff = getDifference(coinData.eth.kraken.price,coinData.eth.coinone.price);
            coinData.etc.diff = getDifference(coinData.etc.kraken.price,coinData.etc.coinone.price);
            coinData.xrp.diff = getDifference(coinData.xrp.kraken.price,coinData.xrp.coinone.price);

            updateHTML();
            priceFlash(coinData);
        });
    };

    // CoinOne Prices
    var getCoinOnePrices = function() {
        $.ajax({
            dataType: "json",
            url: 'https://api.coinone.co.kr/ticker?currencyType=EUR&currency=',
            method: 'GET'
        }).done(function(res) {
            coinData.btc.coinone.price = parseInt(res.btc.last) / krwEurExRate;
            coinData.eth.coinone.price = parseInt(res.eth.last) / krwEurExRate;
            coinData.etc.coinone.price = parseInt(res.etc.last) / krwEurExRate;
            coinData.xrp.coinone.price = parseInt(res.xrp.last) / krwEurExRate;

            getKrakenPrices();
        });
    };

    // Retrieve KRW-EUR exchange rate from Fixer API
    getCurrencyExchangeRate();

    // Update prices every 10 seconds
    getCoinOnePrices();
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
        getCoinOnePrices();
    }

    function getDifference(first, second) {
        return round(100 - ((first * 100) / second),2) + ' %';
    }

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    function updateHTML() {
        $('.' + coinData.btc.kraken.className).html('€ '+ coinData.btc.kraken.price);
        $('.' + coinData.eth.kraken.className).html('€ '+ coinData.eth.kraken.price);
        $('.' + coinData.etc.kraken.className).html('€ '+ coinData.etc.kraken.price);
        $('.' + coinData.xrp.kraken.className).html('€ '+ coinData.xrp.kraken.price);
        $('.' + coinData.btc.coinone.className).html('€ '+round(coinData.btc.coinone.price, 2));
        $('.' + coinData.eth.coinone.className).html('€ '+round(coinData.eth.coinone.price, 2));
        $('.' + coinData.etc.coinone.className).html('€ '+round(coinData.etc.coinone.price, 2));
        $('.' + coinData.xrp.coinone.className).html('€ '+round(coinData.xrp.coinone.price, 2));
        $('.' + coinData.btc.className).html(coinData.btc.diff);
        $('.' + coinData.eth.className).html(coinData.eth.diff);
        $('.' + coinData.etc.className).html(coinData.etc.diff);
        $('.' + coinData.xrp.className).html(coinData.xrp.diff);
    }

    function priceFlash(data) {
        _.forEach(data, function(value, key) {
            if(value.diff > value.oldDiff) {
                console.log(value.className);
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
