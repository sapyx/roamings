'use strict';

/**
 * @ngdoc directive
 * @name roamingsApp.directive:viewTitle
 * @description
 * # viewTitle
 */
var title;

angular.module('roamingsApp')
    .directive('viewTitle', function ($rootScope, $timeout) {
        return {
            restrict: 'EA',
            link: function (scope, iElement, iAttrs, controller, transcludeFn) {
                // If we've been inserted as an element then we detach from the DOM because the caller
                // doesn't want us to have any visual impact in the document.
                // Otherwise, we're piggy-backing on an existing element so we'll just leave it alone.
                var tagName = iElement[0].tagName.toLowerCase();
                if (tagName === 'view-title' || tagName === 'viewtitle') {
                    iElement.remove();
                }

                scope.$watch(
                    function () {
                        return iElement.text();
                    },
                    function (newTitle) {
                        $rootScope.viewTitle = title = newTitle;
                    }
                );
                scope.$on(
                    '$destroy',
                    function () {
                        title = undefined;
                        // Wait until next digest cycle do delete viewTitle
                        $timeout(function () {
                            if (!title) {
                                // No other view-title has reassigned title.
                                delete $rootScope.viewTitle;
                            }
                        });
                    }
                );
            }
        };
    });