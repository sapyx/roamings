'use strict';

class restAPIsService {
    get zKbdRestangular() {
        return this._Restangular.withConfig(
            (RestangularConfigurer)=> RestangularConfigurer
                .setBaseUrl(this._baseURLs.zKillboard)
                .setFullResponse(false)
        );
    }

    get eveApiRestangular() {
        return this._Restangular.withConfig(
            (RestangularConfigurer)=> RestangularConfigurer
                .setBaseUrl(this._baseURLs.eveApi)
                .setRequestSuffix(this._baseURLs.eveApiSuffix)
        );
    }

    constructor($log, baseURLs, Restangular) {
        this._log = $log;

        this._baseURLs = baseURLs;

        this._Restangular = Restangular;
    }
}

angular.module('roamingsApp').service('restAPIs', restAPIsService);