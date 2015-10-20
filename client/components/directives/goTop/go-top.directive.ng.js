/**
 * Created by Sapyx on 01/05/2015.
 */

'use strict';

/**
 * @ngdoc directive
 * @name roamingsApp.directive:goTop
 * @restrict A
 * @description
 * # goTop
 */
angular.module('roamingsApp')
    .directive('goTop', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    scope.$apply(function () {
                        $window.scrollTo(0, 0);
                    });
                });
            }
        };
    });

