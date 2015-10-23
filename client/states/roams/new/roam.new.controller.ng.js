'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamsNewCtrl
 * @requires

 * @description
 * # RoamsNewCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamNewCtrl', function () {
      var self = this;

      self.saveRoam = function (roamName) {
        console.log('External \'Save Roam\' for %s, called', roamName);
      };

      self.removePilot = function (pilotName) {
        console.log('External \'Remove Pilot\' for %s, called', pilotName);
      };

      self.addPilot = function (pilotName) {
        console.log('External \'Add Pilot\' for %s, called', pilotName);
      };
    });
