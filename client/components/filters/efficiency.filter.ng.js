'use strict';

/**
 * @ngdoc filter
 * @name roamingsApp.filter:efficiency
 * @function
 * @description
 * # efficiency
 * Filter in the roamingsApp.
 */
angular.module('roamingsApp')
  .filter('efficiency', function ($window) {
    return function (input, divided, round) {

      var divider = (angular.isString(input)) ? $window.Number(input) : input;
      divided = (divider + divided) || 100;

      round = round || false;

      if (!angular.isNumber(divider) || $window.isNaN(divider)) return input;

      return round
        ? ((divider / divided) * 100).toFixed(round)
        : (divider / divided) * 100;
    }
  });
