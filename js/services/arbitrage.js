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
                },
                bch: {
                    diff: null,
                    oldDiff: null,
                    coinone: {
                        price: null,
                        className: 'coinone-BCH-price'
                    },
                    kraken: {
                        price: null,
                        className: 'kraken-BCH-price'
                    },
                    className: 'BCH-difference'
                },
                ltc: {
                    diff: null,
                    oldDiff: null,
                    coinone: {
                        price: null,
                        className: 'coinone-LTC-price'
                    },
                    kraken: {
                        price: null,
                        className: 'kraken-LTC-price'
                    },
                    className: 'LTC-difference'
                }
            };
        }

        return Arbitrage;
        
    })(Arbitrage || {});

    module.exports = Arbitrage;
})();