'use strict';

/**
 * @ngdoc service
 * @name roamingsApp.manageKills
 * @requires
 * @requires

 * @description
 * # manageKills
 * Service in the roamingsApp.

 */
/*angular.module('roamingsApp')
 .service('manageKills', function ($q, $filter, localStorageService, eveAPI, zKillboardAPI, Restangular) {
 var self = this;*/

class manageKillsService {

    _setChangeSSystemortKills(kills) {
        var solarSystemId = 0;
        var killTime = false;

        angular.forEach(kills, (value, keys) => {
            if (solarSystemId != value.solarSystemID) {
                value.ssChanged.changed = true;

                value.ssChanged.delta = (killTime === false) ? 0 : (killTime.getTime() - value.killTime.getTime()) / 1000;

                solarSystemId = value.solarSystemID;
            } else {
                value.ssChanged.changed = false;
            }

            killTime = angular.copy(value.killTime);
        });

        return kills;
    }

    _searchEVENames(sysIds, shipIds, moonIds) {
        var shipIdsList = '';
        var sysIdsList = '';
        var moonIdsList = '';

        angular.forEach(sysIds, (value, key) => {
            if (value == '') sysIdsList += key + ',';
        });
        sysIdsList = sysIdsList.slice(0, -1);

        if (sysIdsList.length !== 0) {
            this._eveApiRestangular.all('eve').all("CharacterName").get('', {ids: sysIdsList})
                .then((apiResult) => {
                    this._log.info(apiResult.plain());

                    var systemNames = apiResult.eveapi.result.rowset.row;

                    if (angular.isArray(systemNames) && systemNames.length > 0) {
                        angular.forEach(systemNames, (value) => {
                            sysIds[value._characterID] = value._name;
                        });
                    } else {
                        sysIds[systemNames._characterID] = systemNames._name;
                    }
                });
        }

        angular.forEach(shipIds, (value, key) => {
            if (value == '') shipIdsList += key + ',';
        });
        shipIdsList = shipIdsList.slice(0, -1);

        if (shipIdsList.length !== 0) {
            this._eveApiRestangular.all('eve').all("TypeName").get('', {ids: shipIdsList})
                .then((apiResult) => {
                    this._log.info(apiResult.plain());

                    var shipNames = apiResult.eveapi.result.rowset.row;

                    if (angular.isArray(shipNames) && shipNames.length > 0) {
                        angular.forEach(shipNames, (value) => {
                            shipIds[value._typeID] = value._typeName;
                        });
                    } else {
                        shipIds[shipNames._typeID] = shipNames._typeName;
                    }
                });
        }

        if (moonIds.length !== 0) {
            angular.forEach(moonIds, (value, key)=> {
                if (value == '') moonIdsList += key + ',';
            });

            moonIdsList = moonIdsList.slice(0, -1);

            if (moonIdsList.length !== 0) {
                this._eveApiRestangular.all('eve').all("CharacterName").get('', {ids: moonIdsList})
                    .then((apiResult) => {
                        this._log.info(apiResult.plain());

                        var moonNames = apiResult.eveapi.result.rowset.row;

                        if (angular.isArray(moonNames) && moonNames.length > 0) {
                            angular.forEach(moonNames, (value)=> {
                                moonIds[value._characterID] = value._name;
                            });
                        } else {
                            moonIds[moonNames._characterID] = moonNames._name;
                        }
                    });
            }
        }
    }

    _successCallback(crew, deferred, killsArray) { // arg1 is binded param, arg1 is binded param, arg3 is from callback
        this._log.debug('killsArray: ', killsArray);

        var topDamage;
        var totalDamageDone;

        var work = {
            kills: [],
            sysIds: {},
            shipIds: {},
            moonIds: {},
            stats: {
                members: crew.length,
                kills: 0,
                losses: 0,
                lossDamage: 0,
                lossValue: 0,
                killDamage: 0,
                killValue: 0,
                killsByDamageValue: 0
            }
        };

        angular.forEach(killsArray, (kills) => {
            this._log.debug('kills: ', kills);

            angular.forEach(kills, (value, key) => {
                if ((this._filter('filter')(work.kills, {killID: value.killID}, true)).length === 0) {

                    var characterID = value.moonID === 0 ? value.victim.characterID : value.moonID;
                    var characterName = value.moonID === 0 ? value.victim.characterName : '';

                    work.shipIds[value.victim.shipTypeID] = '';
                    work.sysIds[value.solarSystemID] = '';

                    if (characterName == '' && characterID != 0) work.moonIds[characterID] = '';

                    topDamage = {id: -1, damage: 0};
                    totalDamageDone = 0;

                    var isCrewMemberVictim = false;
                    if (characterID != 0) {
                        angular.forEach(crew, (member) => {
                            if (member.id == characterID) {
                                isCrewMemberVictim = true;
                                member.losses++;
                            }
                        });
                    }

                    angular.forEach(value.attackers, (attacker) => {
                        angular.forEach(crew, (member, pos) => {
                            if (member.id == attacker.characterID) {
                                member.killsDamage += attacker.damageDone;
                                member.killsValue += value.zkb.totalValue;
                                member.killsByDamageValue += value.victim.damageTaken === 0 ? 0 :
                                (value.zkb.totalValue / value.victim.damageTaken) * attacker.damageDone;
                                member.finalBlows += attacker.finalBlow ? 1 : 0;
                                member.kills++;

                                topDamage = (topDamage.damage < attacker.damageDone) ? {
                                    id: pos,
                                    damage: attacker.damageDone
                                } : topDamage;

                                totalDamageDone += attacker.damageDone;
                            }
                        });
                    });

                    if (topDamage.id != -1)
                        crew[topDamage.id].topDamage++;

                    work.kills.push({
                        killID: value.killID,
                        killTime: new Date(Date.UTC(value.killTime.substr(0, 4), parseInt(value.killTime.substr(5, 2)) - 1,
                            value.killTime.substr(8, 2), value.killTime.substr(11, 2), value.killTime.substr(14, 2))),
                        solarSystemID: value.solarSystemID,
                        ssChanged: {changed: null, delta: null},
                        victim: {
                            characterID: characterID,
                            characterName: characterName,
                            shipTypeID: value.victim.shipTypeID,
                            corporationID: value.victim.corporationID,
                            corporationName: value.victim.corporationName,
                            allianceID: value.victim.factionID !== 0 ? value.victim.factionID : value.victim.allianceID,
                            allianceName: value.victim.factionID !== 0 ? value.victim.factionName : value.victim.allianceName,
                            friendly: isCrewMemberVictim
                        },
                        stats: {
                            damageTaken: value.victim.damageTaken,
                            totalValue: value.zkb.totalValue,
                            involved: value.attackers.length
                        }
                    });

                    if (isCrewMemberVictim) {
                        work.stats.losses++;
                        work.stats.lossValue += value.zkb.totalValue;
                        work.stats.lossDamage += value.victim.damageTaken;
                    } else {
                        work.stats.kills++;
                        work.stats.killValue += value.zkb.totalValue;
                        work.stats.killDamage += value.victim.damageTaken;
                        work.stats.killsByDamageValue += value.victim.damageTaken === 0 ? 0 :
                        (value.zkb.totalValue / value.victim.damageTaken) * totalDamageDone;
                    }
                }
            })
        });

        work.kills = this._filter('orderBy')(work.kills, '-killTime');

        this._searchEVENames(work.sysIds, work.shipIds, work.moonIds);
        this._setChangeSSystemortKills(work.kills);

        deferred.resolve(work);
    }

    getKillsForCrew(crew, startDate, endDate) {
        var len = 0;
        var charIds = '';

        var deferred = this._q.defer();
        var killRequests = [];

        do {
            for (var loop = 0; (loop < 10); loop++) {
                if ((loop + len) > crew.length - 1)
                    break;

                angular.extend(crew[loop + len], {
                    kills: 0,
                    killsValue: 0,
                    killsDamage: 0,
                    killsByDamageValue: 0,
                    losses: 0,
                    lossValue: 0,
                    lossDamage: 0,
                    topDamage: 0,
                    finalBlows: 0
                });

                charIds += crew[loop + len].id + ',';
            }
            len += 10;
            charIds = charIds.slice(0, -1);

            killRequests.push(this._zKbdRestangular
                    .all('combined')
                    .one('startTime', this._filter('date')(startDate, 'yyyyMMddHHmm'))
                    .one('endTime', this._filter('date')(endDate, 'yyyyMMddHHmm'))
                    .several('characterID', charIds)
                    .getList()
            );

            charIds = '';
        }
        while (len < crew.length);

        var successCallback = this._successCallback.bind(this, crew, deferred);

        this._q.all(killRequests)
            .then(successCallback)
            .catch((err)=> {
                this._log.error("View: ", err);

                deferred.reject(err);
            });

        return deferred.promise;
    }

    getSingleKill(crew, startDate, endDate) {
    }

    constructor($q, $filter, $log, Restangular) {
        this._log = $log;
        this._q = $q;
        this._filter = $filter;

        this._zKbdRestangular = Restangular
            .withConfig((RestangularConfigurer)=> RestangularConfigurer
                .setBaseUrl('https://beta.eve-kill.net/api/'));

        this._eveApiRestangular = Restangular
            .withConfig((RestangularConfigurer)=> RestangularConfigurer
                .setBaseUrl('https://api.eveonline.com/')
                .setRequestSuffix('.xml.aspx')
        );
    }
}

angular.module('roamingsApp').service('manageKills', manageKillsService);