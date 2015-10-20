'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:MainCtrl
 * @requires $scope
 * @description
 * # MainCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('HomeCtrl', function ($scope) {
      $scope.corporation ={Id:98361290, Name: 'Deus-Ex-Machina', Ticker: 'D-E-X'};
    });
