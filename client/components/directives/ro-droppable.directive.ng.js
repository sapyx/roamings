/**
 * Created by Sapyx on 16/06/2015.
 */

'use strict';

/**
 * @ngdoc directive
 * @name roamingsApp.directive:roDroppable
 * @description
 * # roDroppable
 */

angular.module('roamingsApp')
    .directive('roDroppable', function ($window) {
        return {
            scope: {
                drop: '&', // parent
                bin: '=' // bi-directional scope
            },
            link: function (scope, element) {
                // we need the native object
                var el = element[0];

                el.addEventListener(
                    'dragover',
                    function (e) {
                        e.dataTransfer.dropEffect = 'move';
                        // allows us to drop
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragenter',
                    function (e) {
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragleave',
                    function (e) {
                        this.classList.remove('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'drop',
                    function (e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();

                        this.classList.remove('over');

                        var binId = this.id;
                        var item = document.getElementById(e.dataTransfer.getData('Text'));
                        this.appendChild(item);
                        // call the passed drop function
                        scope.$apply(function (scope) {
                            var fn = scope.drop();
                            if ('undefined' !== typeof fn) {
                                fn(item.id, binId);
                            }
                        });

                        return false;
                    },
                    false
                );
            }
        }
    });