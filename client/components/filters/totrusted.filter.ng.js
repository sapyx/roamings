'use strict';

/**
 * @ngdoc filter
 * @name roamingsApp.filter:toTrusted
 * @function
 * @description
 * # toTrusted
 * Filter in the roamingsApp.
 */
angular.module('roamingsApp')
    .filter('toTrusted', ($sce) => {
        return (input)=> {
            return $sce.trustAsHtml(input);
        };
    });
