'use strict';

/**
 * @ngdoc service
 * @name roamingsApp.zKillboardAPI
 * @requires ngResource.$resource

 * @description
 * # zKillboardAPI
 * Service to talk with zKillboard api.
 */

class zKillboardAPIService {
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
    apiCall(queryString, queryObj, isGet = false) {
        this._log.debug('https://beta.eve-kill.net/api/' + queryString + JSON.stringify(queryObj));

        var tranformResponseDef = {
            get: {
                method: 'GET',
                headers: {'Access-Control-Allow-Origin': '*'},
                transformResponse: (data, headers) => {
                    var response = {};
                    response = data;
                    response.headers = headers();
                    return response;
                }
            },
            query: {
                method: 'QUERY',
                headers: {'Access-Control-Allow-Origin': '*'},
                transformResponse: (data, headers) => {
                    var response = {};
                    response = data;
                    response.headers = headers();
                    return response;
                }
            }
        };

        var zKillApi = this._resource('https://beta.eve-kill.net/api/' + queryString/*, {}, tranformResponseDef*/);
        return zKillApi[isGet ? 'get' : 'query'](queryObj).$promise;
    }

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

    testPilotPresence(pilotId) {
        this._log.debug('stats/characterID/%s/', pilotId);

        return this.apiCall('stats/characterID/:pilotId/', {pilotId: pilotId}, true)
            .then(function (value) {
                return 'groups' in value;
            })
            .catch(function (err) {
                return {status: err.status, statusText: err.statusText, url: err.config.url};
            });
    }

    constructor($log, $resource) {
        this._log = $log;
        this._resource = $resource;
    }
}

angular.module('roamingsApp').service('zKillboardAPI', zKillboardAPIService);