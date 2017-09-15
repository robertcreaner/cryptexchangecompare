var Fixer = (function(Fixer){

    'use strict';

    Fixer = function(conf){
        this.krwEurExRate = null;
    }

    Fixer.prototype.getCurrencyExchangeRate = function() {
        var me = this;
        $.ajax({
            method:'GET',
            url:'http://api.fixer.io/latest?base=EUR&symbols=KRW',
            dataType:'json'
        }).done(function(res){
            me.krwEurExRate = res.rates.KRW;
        });
    };

    return Fixer;

})(Fixer || {});
