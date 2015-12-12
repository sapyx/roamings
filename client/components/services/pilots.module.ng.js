'use strict';

class pilotsService {
    testPilot(pilotName) {
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
                        .catch((err)=> {
                            this._log.error('Catch N.3:', err);
                            return 'Error on zkillboard API'
                        });
            })
            .catch((err)=> {
                this._log.error('Catch N.1:', err);
                return 'Error on EVE API'
            });
    }

    constructor($log, Restangular) {
        this._log = $log;

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