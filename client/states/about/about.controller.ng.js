'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:AboutCtrl
 * @requires $scope
 * @description
 * # AboutCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('AboutCtrl', function ($scope) {
      $scope.version = '0.6.1';
    });
