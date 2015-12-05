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

class pilotsService {
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


    testPilot(pilotName) {  // pilotName: pilot.name, eveIsPresent: true, zkbIsPresent: isPresent
        return this._eveApiRestangular.all('eve').all("CharacterID").get('', {'names': pilotName})
            .then((apiResult) => {
                this._log.info(apiResult.plain());

                return apiResult.eveapi.result.rowset.row;
            })
            .then((pilotInfo)=> {
                this._log.info(pilotInfo);

                if (pilotInfo._characterID == 0)
                    return {name: pilotName, eveIsPresent: false};
                else
                    return this._zKbdRestangular.all('stats').one('characterID', pilotInfo._characterID).get()
                        .then((zkbPilot)=> {
                            this._log.info(zkbPilot.plain());
                            return {
                                name: pilotInfo._name,
                                id: pilotInfo._characterID,
                                eveIsPresent: true,
                                zkbIsPresent: 'groups' in zkbPilot
                            }
                        })
                        .catch((err)=> {this._log.error('Catch N.3:',err);return 'Error on zkillboard API'});
            })
            .catch((err)=> {this._log.error('Catch N.1:',err);return 'Error on EVE API'});

    }

    constructor($log, Restangular/*, eveAPI, zKillboardAPI*/) {
        this._log = $log;

/*        this._zKillboardAPI = zKillboardAPI;
        this._eveAPI = eveAPI;*/

        this._zKbdRestangular = Restangular.withConfig(
            (RestangularConfigurer)=> RestangularConfigurer
                .setBaseUrl('https://beta.eve-kill.net/api/')
                .setFullResponse(false)
        );
        this._eveApiRestangular = Restangular.withConfig(
            (RestangularConfigurer)=> RestangularConfigurer
                .setBaseUrl('https://api.eveonline.com/')
                .setRequestSuffix('.xml.aspx')
        );
    }
}

angular.module('roamingsApp').service('pilots', pilotsService);