'use strict';

/**
 * @ngdoc filter
 * @name roamingsApp.filter:timeFormat
 * @function
 * @description
 * # timeFormat
 * Filter in the roamingsApp.
 */
angular.module('roamingsApp')
    .filter('timeFormat', ($window) => {
        return (input) => {
            var sec_num = parseInt(input, 10); // don't forget the second param

            var hours = $window.Math.floor(sec_num / 3600);
            var minutes = $window.Math.floor((sec_num - (hours * 3600)) / 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return ((hours != 0) ? hours + ' hours, ' : '') + ((minutes != 0) ? minutes + ' minutes ' : '');
        };
    });
