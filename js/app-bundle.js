/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function() {

    'use strict';

    // Get arbitrage data
    var Arbitrage = __webpack_require__(1);
    var arb = new Arbitrage(); 
    var coinData = arb.data;

    // Retrieve KRW-EUR exchange rate from Fixer API
    var fixer = new Fixer();
    fixer.getCurrencyExchangeRate();

    // Helper class used to calculate arb
    var Mathhelper = __webpack_require__(2);
    var mathhelper = new Mathhelper();

    // Coinone Api
    var Coinone = __webpack_require__(3);
    var coinone = new Coinone();
    var coinoneData = null;

    // Kraken Api
    var Kraken = __webpack_require__(4);
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
        console.log(krakenData);
        updateData();
    }

    // Update prices every 2 seconds
    setInterval(function() {
        init();
    }, 6000);

    function updateData() {
        // Store current coin price data
        coinData.btc.oldDiff = coinData.btc.diff;
        coinData.eth.oldDiff = coinData.eth.diff;
        coinData.etc.oldDiff = coinData.etc.diff;
        coinData.xrp.oldDiff = coinData.xrp.diff;
        updateCoinonePrices(coinoneData);
        updateKrakenPrices(krakenData);
    }

    function updateKrakenPrices(res) {
        coinData.btc.kraken.price = res.BTC.EUR;
        coinData.etc.kraken.price = res.ETC.EUR;
        coinData.eth.kraken.price = res.ETH.EUR;
        coinData.xrp.kraken.price = res.XRP.EUR;

        coinData.eth.diff = mathhelper.getDifference(coinData.eth.kraken.price, coinData.eth.coinone.price);
        coinData.btc.diff = mathhelper.getDifference(coinData.btc.kraken.price, coinData.btc.coinone.price);
        coinData.etc.diff = mathhelper.getDifference(coinData.etc.kraken.price, coinData.etc.coinone.price);
        coinData.xrp.diff = mathhelper.getDifference(coinData.xrp.kraken.price, coinData.xrp.coinone.price);
    }

    function updateCoinonePrices(res) {
        coinData.btc.coinone.price = parseInt(res.btc.last) / fixer.krwEurExRate;
        coinData.eth.coinone.price = parseInt(res.eth.last) / fixer.krwEurExRate;
        coinData.etc.coinone.price = parseInt(res.etc.last) / fixer.krwEurExRate;
        coinData.xrp.coinone.price = parseInt(res.xrp.last) / fixer.krwEurExRate;
    }

    function updateHTML() {
        $('.' + coinData.btc.kraken.className).html('€ ' + coinData.btc.kraken.price);
        $('.' + coinData.eth.kraken.className).html('€ ' + coinData.eth.kraken.price);
        $('.' + coinData.etc.kraken.className).html('€ ' + coinData.etc.kraken.price);
        $('.' + coinData.xrp.kraken.className).html('€ ' + coinData.xrp.kraken.price);
        $('.' + coinData.btc.coinone.className).html('€ ' + mathhelper.round(coinData.btc.coinone.price, 2));
        $('.' + coinData.eth.coinone.className).html('€ ' + mathhelper.round(coinData.eth.coinone.price, 2));
        $('.' + coinData.etc.coinone.className).html('€ ' + mathhelper.round(coinData.etc.coinone.price, 2));
        $('.' + coinData.xrp.coinone.className).html('€ ' + mathhelper.round(coinData.xrp.coinone.price, 2));
        $('.' + coinData.btc.className).html(coinData.btc.diff);
        $('.' + coinData.eth.className).html(coinData.eth.diff);
        $('.' + coinData.etc.className).html(coinData.etc.diff);
        $('.' + coinData.xrp.className).html(coinData.xrp.diff);
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() {
    
    'use strict';

    var Arbitrage = (function(Arbitrage){

        Arbitrage = function(){
            this.data = {
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
            };
        }

        return Arbitrage;
        
    })(Arbitrage || {});

    module.exports = Arbitrage;
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Mathhelper = (function(Mathhelper){

	'use strict';

    Mathhelper = function( conf ){

    }

    Mathhelper.prototype.getDifference = function (first, second) {
        return this.round(100 - ((first * 100) / second),2) + ' %';
    }

    Mathhelper.prototype.round = function(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    return Mathhelper;

})(Mathhelper || {});

module.exports = Mathhelper;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function() {
    'use strict';

    var Kraken = (function(Kraken) {

        Kraken = function() {}

        Kraken.prototype.getKrakenPrices = function(coinData) {
            return JSON.parse($.ajax({
                dataType: "json",
                url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,XRP&tsyms=EUR&e=Kraken',
                method: 'GET',
                async: false,
            }).responseText);
        };

        return Kraken;
        
    })(Kraken || {});

    module.exports = Kraken;
})();

/***/ })
/******/ ]);