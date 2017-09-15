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
