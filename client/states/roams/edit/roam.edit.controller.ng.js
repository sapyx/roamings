'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamsEditCtrl
 * @requires $routeParams

 * @description
 * # RoamsEditCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamEditCtrl', function ($stateParams) {
      var self = this;

      self.legend = 'Edit Roam <i>' + $stateParams.roamName + '</i>';
      self.roamName = $stateParams.roamName;

      self.saveRoam = function (roamName) {
        console.log('RoamsEdit: External \'Save Roam\' for %s, called', roamName);
      };

      self.removePilot = function (pilotName) {
        console.log('RoamsEdit: External \'Remove Pilot\' for %s, called', pilotName);
      };

      self.addPilot = function (pilotName) {
        console.log('RoamsEdit: External \'Add Pilot\' for %s, called', pilotName);
      };
    });