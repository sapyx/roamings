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
        //this._log.debug('https://beta.eve-kill.net/api/' + queryString + JSON.stringify(queryObj));

        var zKillApi = this._resource('https://beta.eve-kill.net/api/' + queryString/*, {}, tranformResponseDef*/);
        return zKillApi[isGet ? 'get' : 'query'](queryObj).$promise;
    }

    constructor($log, $resource, Restangular) {
        this._log = $log;
        this._resource = $resource;
        this._zKbdRestangular = Restangular.withConfig(
            (RestangularConfigurer)=> RestangularConfigurer.setBaseUrl('https://beta.eve-kill.net/api/')
        );
    }
}

angular.module('roamingsApp').service('zKillboardAPI', zKillboardAPIService);