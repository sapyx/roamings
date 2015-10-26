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
angular.module('roamingsApp')
    .service('manageKills', function ($q, $filter, localStorageService, eveAPI, zKillboardAPI) {
        var self = this;

        self.setChangeSSystemortKills = function (kills) {
            var solarSystemId = 0;
            var killTime = false;

            angular.forEach(kills, function (value, keys) {
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
        };

        self.searchEVENames = function (sysIds, shipIds, moonIds) {
            var shipIdsList = '';
            var sysIdsList = '';
            var moonIdsList = '';

            angular.forEach(sysIds, function (value, key) {
                if (value == '') sysIdsList += key + ',';
            });
            sysIdsList = sysIdsList.slice(0, -1);

            if (sysIdsList.length !== 0) {
                eveAPI.searchEVECharacterNames(sysIdsList)
                    .then(function (systemNames) {
                        if (angular.isArray(systemNames) && systemNames.length > 0) {
                            angular.forEach(systemNames, function (value) {
                                sysIds[value._characterID] = value._name;
                            });
                        } else {
                            sysIds[systemNames._characterID] = systemNames._name;
                        }
                    }
                );
                //console.log('searchEVECharacterNames: ' + sysIdsList);
            }

            angular.forEach(shipIds, function (value, key) {
                if (value == '') shipIdsList += key + ',';
            });
            shipIdsList = shipIdsList.slice(0, -1);

            if (shipIdsList.length !== 0) {
                eveAPI.searchEVETypeNames(shipIdsList)
                    .then(function (shipNames) {
                        if (angular.isArray(shipNames) && shipNames.length > 0) {
                            angular.forEach(shipNames, function (value) {
                                shipIds[value._typeID] = value._typeName;
                            });
                        } else {
                            shipIds[shipNames._typeID] = shipNames._typeName;
                        }
                    }
                );
                //console.log('shipIdsList: ' + shipIdsList);
            }

            if (moonIds.length !== 0) {
                angular.forEach(moonIds, function (value, key) {
                    if (value == '') moonIdsList += key + ',';
                });

                moonIdsList = moonIdsList.slice(0, -1);

                if (moonIdsList.length !== 0) {
                    eveAPI.searchEVECharacterNames(moonIdsList)
                        .then(function (moonNames) {
                            if (angular.isArray(moonNames) && moonNames.length > 0) {
                                angular.forEach(moonNames, function (value) {
                                    moonIds[value._characterID] = value._name;
                                });
                            } else {
                                moonIds[moonNames._characterID] = moonNames._name;
                            }
                        }
                    );
                    //console.log('searchEVECharacterNames: ' + moonIdsList);
                }
            }
        };

        self.getKillsForCrew = function (crew, startDate, endDate) {
            var len = 0;
            var charIds = '';

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
                },
                err: {}
            };

            var deferred = $q.defer();

            do {
                for (var loop = 0; (loop < 10); loop++) {
                    if ((loop + len) > crew.length - 1) {
                        break;
                    }
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

                console.log(charIds)
                zKillboardAPI.apiCall(
                    'combined/endTime/:endTime/startTime/:startTime/characterID/:charIds/',
                    {
                        startTime: $filter('date')(startDate, 'yyyyMMddHHmm'),
                        endTime: $filter('date')(endDate, 'yyyyMMddHHmm'),
                        charIds: charIds
                    })
                    .then(function (value) {
                        console.log(value);
                        angular.forEach(value, function (value, key) {
                            if (($filter('filter')( work.kills, {killID: value.killID}, true)).length === 0) {

                                console.dir(value);

                                var characterID = value.moonID === 0 ? value.victim.characterID : value.moonID;
                                var characterName = value.moonID === 0 ? value.victim.characterName : '';

                                work.shipIds[value.victim.shipTypeID] = '';
                                work.sysIds[value.solarSystemID] = '';

                                if (characterName == '' && characterID != 0) self.moonIds[characterID] = '';

                                var topDamage = {id: -1, damage: 0};
                                angular.forEach(value.attackers, function (attacker) {
                                    angular.forEach(crew, function (member, pos) {
                                        if (member.id == attacker.characterID) {
                                            crew[pos].killsDamage += attacker.damageDone;
                                            crew[pos].killsValue += value.zkb.totalValue;
                                            crew[pos].killsByDamageValue += value.victim.damageTaken === 0 ? 0 : (value.zkb.totalValue / value.victim.damageTaken) * attacker.damageDone;
                                            crew[pos].finalBlows += attacker.finalBlow ? 1 : 0;
                                            crew[pos].kills++;

                                            topDamage = (topDamage.damage < attacker.damageDone) ? {
                                                id: pos,
                                                damage: attacker.damageDone
                                            } : topDamage;

                                            //stats.killsByDamageValue += crew[pos].killsByDamageValue;
                                        }
                                    });
                                });

                                if (topDamage.id != -1)
                                    crew[topDamage.id].topDamage++;

                                var crewMember = characterID != 0 ? $filter('filter')(crew, {id: characterID}, false) : [];

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
                                        friendly: (crewMember.length != 0)
                                    },
                                    // attackers: angular.copy(crewInKill),
                                    stats: {
                                        damageTaken: value.victim.damageTaken,
                                        totalValue: value.zkb.totalValue,
                                        involved: value.attackers.length
                                    }
                                });

                                if (crewMember.length != 0) {
                                    /* crewMember[0].losses++;
                                     crewMember[0].lossValue += value.zkb.totalValue;
                                     crewMember[0].lossDamage += value.victim.damageTaken;*/

                                    work.stats.losses++;
                                    work.stats.lossValue += value.zkb.totalValue;
                                    work.stats.lossDamage += value.victim.damageTaken;
                                } else {
                                    work.stats.kills++;
                                    //stats.killValue += value.zkb.totalValue;
                                    //stats.killDamage += value.victim.damageTaken;
                                }
                            }
                        });
                        angular.forEach(crew, function (member, pos) {
                            work.stats.killValue += member.killsValue;
                            work.stats.killDamage += member.killsDamage;
                            work.stats.killsByDamageValue += member.killsByDamageValue;
                            console.log("%s - %s", work.stats.killsByDamageValue, member.killsByDamageValue)
                        });
                        //value.victim.damageTaken === 0 ? 0 : (value.zkb.totalValue / value.victim.damageTaken) * attacker.damageDone;

                        //console.dir(stats);

                        self.searchEVENames(work.sysIds, work.shipIds, work.moonIds);

                        work.kills = $filter('orderBy')(work.kills, '-killTime');
                        self.setChangeSSystemortKills(work.kills);

                        deferred.resolve(work);
                    })
                    .catch(function (err) {
                        console.log("View: %s, %s (%s)", err.status, err.statusText, err.url);

                        deferred.reject(err);
                    });

                work.charIds = '';
            }
            while (len < crew.length);

            return deferred.promise;
        }
    }
);
