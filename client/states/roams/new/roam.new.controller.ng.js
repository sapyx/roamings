'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamsNewCtrl
 * @requires $scope

 * @description
 * # RoamsNewCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamNewCtrl', function ($scope) {

      $scope.saveRoam = function (roamName) {
        console.log('External \'Save Roam\' for %s, called', roamName);
      };

      $scope.removePilot = function (pilotName) {
        console.log('External \'Remove Pilot\' for %s, called', pilotName);
      };

      $scope.addPilot = function (pilotName) {
        console.log('External \'Add Pilot\' for %s, called', pilotName);
      };

    });
