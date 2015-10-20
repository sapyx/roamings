'use strict';

/**
 * @ngdoc service
 * @name roamingsApp.zKillboardAPI
 * @requires ngResource.$resource

 * @description
 * # zKillboardAPI
 * Service to talk with zKillboard api.
 */
angular.module('roamingsApp')
  .service('zKillboardAPI', function ($resource) {
    var self = this;

    /**
     * @ngdoc property
     * @name roamingsApp.zKillboardAPI#apiCall

     * @methodOf roamingsApp.zKillboardAPI
     * @description
     * Generic method to get data form the zKillboard api
     * @example
     * zKillboardAPI.apiCall(queryString, queryObj, isGet);
     * @param {string} queryString Query string in zKillboard URL format
     * @param {object} queryObj Query pairs
     * @param {boolean} isGet Type of query (optional, default false). True = Get, False = Query.
     */

    self.apiCall = function (queryString, queryObj, isGet) {
      console.log('https://beta.eve-kill.net/api/' + queryString + queryObj);

      isGet = typeof isGet !== 'undefined' ? isGet : false; // default value: false

      var zKillApi = $resource('https://beta.eve-kill.net/api/' + queryString);
      return zKillApi[isGet ? 'get' : 'query'](queryObj).$promise;
    };

    /**
     * @ngdoc property
     * @name roamingsApp.zKillboardAPI#testPilotPresence
     * @methodOf roamingsApp.zKillboardAPI
     * @description
     * Method to test Pilot Presence into zKillboard
     * @example
     * zKillboardAPI.testPilotPresence(pilotId, zKbdSuccess, zKbdError);
     * @param {string} pilotId String of comma separated Character Ids
     */

    self.testPilotPresence = function (pilotId) {
      console.log('stats/characterID/%s/', pilotId);
      return self.apiCall('stats/characterID/:pilotId/', {pilotId: pilotId}, true)
        .then(function (value) {
          return 'groups' in value;
        })
        .catch(function (err) {
          return {status: err.status, statusText: err.statusText, url: err.config.url};
        });
    }
  }
);
