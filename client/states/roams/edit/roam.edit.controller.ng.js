'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamsEditCtrl
 * @requires $scope
 * @requires $routeParams

 * @description
 * # RoamsEditCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamEditCtrl', function ($scope, $stateParams) {
      $scope.legend = 'Edit Roam <i>' + $stateParams.roamName + '</i>';
      $scope.roamName = $stateParams.roamName;

      $scope.saveRoam = function (roamName) {
        console.log('RoamsEdit: External \'Save Roam\' for %s, called', roamName);
      };

      $scope.removePilot = function (pilotName) {
        console.log('RoamsEdit: External \'Remove Pilot\' for %s, called', pilotName);
      };

      $scope.addPilot = function (pilotName) {
        console.log('RoamsEdit: External \'Add Pilot\' for %s, called', pilotName);
      };

    });