'use strict';

/**
 * @ngdoc service
 * @name roamingsApp.pilots
 * @requires roamingsApp.eveAPI
 * @requires roamingsApp.zKillboardAPI

 * @description
 * # pilots
 * Service in the roamingsApp.

 */
angular.module('roamingsApp')
  .service('pilots', function (eveAPI, zKillboardAPI) {
    var self = this;

    /**
     * @ngdoc property
     * @name roamingsApp.pilots#testPilot

     * @methodOf roamingsApp.pilots
     * @description
     * Method to test pilots against Eve and the zKillboard api
     * @example
     * pilots.testPilot(pilotName, eveApiSuccess, eveApiError, zKbdSuccess, zKbdError);
     * @param {string} pilotName Pilot Name to test

     */
      // pilotName: pilot.name, eveIsPresent: true, zkbIsPresent: isPresent
    self.testPilot = function (pilotName) {
      return eveAPI.testPilotPresence(pilotName)
        .then(function (pilot) {
          if (pilot.id == 0) {
            return {name: pilotName, eveIsPresent: false};
          } else {
            return zKillboardAPI.testPilotPresence(pilot.id)
              .then(function (isPresent) {
                return {name: pilot.name, id: pilot.id, eveIsPresent: true, zkbIsPresent: isPresent};
              })
              .catch(function (err) {
                return err;
              });
          }
        });
    };
  });
