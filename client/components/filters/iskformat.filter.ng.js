'use strict';

/**
 * @ngdoc filter
 * @name roamingsApp.filter:iskFormat
 * @function
 * @description
 * # iskFormat
 * Filter in the roamingsApp.
 */
angular.module('roamingsApp')
    .filter('iskFormat', ($filter) => {
        return (input) => {
            return (input >= 1000000000) ? $filter('currency')(input / 1000000000, '', 2) + ' B' :
                (input >= 1000000) ? $filter('currency')(input / 1000000, '', 2) + ' M' :
                    $filter('currency')(input, '', 2)
        };
    });
