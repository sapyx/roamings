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
                                corporationID: zkbPilot.info.corporationID,
                                allianceID: zkbPilot.info.allianceID,
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

    pilotAffiliation(crew) {
        var len = 0;
        var charIds = '';

        var deferred = this._q.defer();
        var charAffiliationRequests = [];

        do {
            for (var loop = 0; (loop < 100); loop++) {
                if ((loop + len) > crew.length - 1)
                    break;

                angular.extend(crew[loop + len], {
                    corporationId: 0,
                    corporationName: '',
                    allianceId: 0,
                    allianceName: '',
                    factionId: 0,
                    factionName: ''
                });

                charIds += crew[loop + len].id + ',';
            }
            len += 100;
            charIds = charIds.slice(0, -1);

            charAffiliationRequests.push(
                this._eveApiRestangular.all('eve').all("CharacterAffiliation").get('', {'ids': charIds})
            );

            charIds = '';
        }
        while (len < crew.length);

        this._q.all(charAffiliationRequests)
            .then((charAffiliationResponse)=>{
                this._log.debug(charAffiliationResponse);
                angular.forEach(crew, (member, pos) => {
                });
            })
            .catch((err)=> {
                this._log.error("pilotAffiliation: ", err);

                deferred.reject(err);
            });

        return deferred.promise;

    }

    constructor($q, $log, restAPIs) {
        this._log = $log;
        this._q = $q;

        this._zKbdRestangular = restAPIs.zKbdRestangular;
        this._eveApiRestangular = restAPIs.eveApiRestangular;
    }
}

angular.module('roamingsApp').service('pilots', pilotsService);