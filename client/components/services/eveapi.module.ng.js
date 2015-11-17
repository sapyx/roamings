'use strict';

/**
 * @ngdoc service
 * @name roamingsApp.eveAPI
 * @requires ngResource.$resource

 * @description
 * # eveAPI
 * Service in the roamingsApp.
 */
angular.module('roamingsApp')
  .service('eveAPI', function ($resource) {
    var self = this;

    /**
     * @ngdoc property
     * @name roamingsApp.eveAPI#apiCall

     * @methodOf roamingsApp.eveAPI
     * @description
     * Generic method to get data form the EveOnline api
     * @example
     * eveAPI.apiCall('eve/TypeName', {ids: typeIdsList}, function (apiResult){}, function (httpResponse){});
     * @param {string} service Query string in EveApi URL format
     * @param {object} queryObj Query pairs
     */

    self.apiCall = function (service, queryObj) {
      return $resource('https://api.eveonline.com/' + service + '.xml.aspx')
        .get(queryObj).$promise;
    };

    /**
     * @ngdoc property
     * @name roamingsApp.eveAPI#searchEVETypeNames

     * @methodOf roamingsApp.eveAPI
     * @description
     * Method to get Type Names from their ids
     * @example
     * eveAPI.searchEVETypeNames('670', function (apiResult){}, function (httpResponse){});
     * @param {string} typeIdsList String of comma separated type ids.
     */

    self.searchEVETypeNames = function (typeIdsList) {
      return self.apiCall('eve/TypeName', {ids: typeIdsList})
        .then(function (apiResult) {// success
          return apiResult.eveapi.result.rowset.row;
        });
    };

    /**
     * @ngdoc property
     * @name roamingsApp.eveAPI#searchEVECharacterNames

     * @methodOf roamingsApp.eveAPI
     * @description
     * Method to get Character Names from their ids
     * @example
     * eveAPI.searchEVECharacterNames('905954997', function (apiResult){}, function (httpResponse){});
     * @param {string} charIdsList String of comma separated Character ids.
     */

    self.searchEVECharacterNames = function (charIdsList) {
      return self.apiCall('eve/CharacterName', {ids: charIdsList})
        .then(function (apiResult) {          // success
          return apiResult.eveapi.result.rowset.row;
        });
    };


    /**
     * @ngdoc property
     * @name roamingsApp.eveAPI#testPilotPresence

     * @methodOf roamingsApp.eveAPI
     * @description
     * Method to verify a pilot presence in eveonline
     * @example
     * eveAPI.testPilotPresence('905954997', function (apiResult){}, function (httpResponse){});
     * @param {string} pilotName String of comma separated Character Names.
     */

    self.testPilotPresence = function (pilotName) {
      return self.apiCall('eve/CharacterID', {names: pilotName})
        .then(function (apiResult) {
          var character = apiResult.eveapi.result.rowset.row;

          return {name:character._name, id:character._characterID};
        });
    };
  }
);
