'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamDetailCtrl
 * @requires $scope
 * @requires $filter
 * @requires $stateParams
 * @requires $window
 * @requires localStorageService
 * @requires roamingsApp.eveAPI
 * @requires roamingsApp.zKillboardAPI
 * @requires roamingsApp.defaultImages
 * @description
 * # RoamDetailCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamDetailCtrl', function ($scope, $alert, $filter, $stateParams, $state, $window, $compile,
                                            eveAPI, zKillboardAPI, defaultImages, readDB) {

// --------- load button ---------------

        var compileFunction = $compile(
            '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#left-navbar-collapse" ' +
            'data-animation="am-slide-left" data-placement="left" data-template="client/states/roams/detail/crew-aside.tpl.ng.html" ' +
            'title="Crew" bs-aside="" data-container="body"> ' +
            '<span class="sr-only">Toggle Crew</span> ' +
            '<span class="glyphicon glyphicon-user"></span> ' +
            '</button>'); //compile HTML fragment

        var htmlOuputFromDirective = compileFunction($scope);
        $('#aside-button').html(htmlOuputFromDirective);

        $scope.$on("$destroy", function () {
            $('#aside-button').html('');
        });
// --------------------
        var self = this;

        self.defaultImages = defaultImages;

// read data
        self.roamName = $stateParams.roamName;

        var roam = readDB.getRoam(self.roamName, false);

        if (!roam) {
            $state.go('roams.list');
            return;
        } else {
            self.crew = angular.copy(roam.crew);

            self.startDate = roam.startDate;
            self.endDate = roam.endDate;
// end read data

            self.kills = [];

            self.sysIds = {};
            self.shipIds = {};
            self.moonIds = {};

            self.stats = {
                members: self.crew.length,
                kills: 0,
                losses: 0,
                lossDamage: 0,
                lossValue: 0,
                killDamage: 0,
                killValue: 0,
                killsByDamageValue: 0
            };
        }

        var setChangeSSystemortKills = function () {
            var solarSystemId = 0;
            var killTime = false;

            angular.forEach(self.kills, function (value, keys) {
                if (solarSystemId != value.solarSystemID) {
                    value.ssChanged.changed = true;

                    value.ssChanged.delta = (killTime === false) ? 0 : (killTime.getTime() - value.killTime.getTime()) / 1000;

                    solarSystemId = value.solarSystemID;
                } else {
                    value.ssChanged.changed = false;
                }

                killTime = angular.copy(value.killTime);
            })
        };

        var searchEVENames = function () {
            var shipIdsList = '';
            var sysIdsList = '';
            var moonIdsList = '';

            angular.forEach(self.sysIds, function (value, key) {
                if (value == '') sysIdsList += key + ',';
            });
            sysIdsList = sysIdsList.slice(0, -1);

            if (sysIdsList.length !== 0) {
                eveAPI.searchEVECharacterNames(sysIdsList)
                    .then(function (systemNames) {
                        if (angular.isArray(systemNames) && systemNames.length > 0) {
                            angular.forEach(systemNames, function (value) {
                                self.sysIds[value._characterID] = value._name;
                            });
                        } else {
                            self.sysIds[systemNames._characterID] = systemNames._name;
                        }
                    }
                );
                console.log('searchEVECharacterNames: ' + sysIdsList);
            }

            angular.forEach(self.shipIds, function (value, key) {
                if (value == '') shipIdsList += key + ',';
            });
            shipIdsList = shipIdsList.slice(0, -1);

            if (shipIdsList.length !== 0) {
                eveAPI.searchEVETypeNames(shipIdsList)
                    .then(function (shipNames) {
                        if (angular.isArray(shipNames) && shipNames.length > 0) {
                            angular.forEach(shipNames, function (value) {
                                self.shipIds[value._typeID] = value._typeName;
                            });
                        } else {
                            self.shipIds[shipNames._typeID] = shipNames._typeName;
                        }
                    }
                );
                console.log('shipIdsList: ' + shipIdsList);
            }

            if (self.moonIds.length !== 0) {
                angular.forEach(self.moonIds, function (value, key) {
                    if (value == '') moonIdsList += key + ',';
                });

                moonIdsList = moonIdsList.slice(0, -1);

                if (moonIdsList.length !== 0) {
                    eveAPI.searchEVECharacterNames(moonIdsList)
                        .then(function (moonNames) {
                            if (angular.isArray(moonNames) && moonNames.length > 0) {
                                angular.forEach(moonNames, function (value) {
                                    self.moonIds[value._characterID] = value._name;
                                });
                            } else {
                                self.moonIds[moonNames._characterID] = moonNames._name;
                            }
                        }
                    );
                    console.log('searchEVECharacterNames: ' + moonIdsList);
                }
            }
        };

        self.goZKbd = function (url) {
            $window.open('https://beta.eve-kill.net/detail/' + url + '/');
        };

// ------- Init ---------

        //init(function () {
        var len = 0;
        var charIds = '';

        do {
            for (var loop = 0; (loop < 10); loop++) {
                if ((loop + len) > self.crew.length - 1) {
                    break;
                }
                angular.extend(self.crew[loop + len], {
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
                charIds += self.crew[loop + len].id + ',';
            }
            len += 10;
            charIds = charIds.slice(0, -1);

            zKillboardAPI.apiCall(
                'combined/endTime/:endTime/startTime/:startTime/characterID/:charIds/',
                {
                    startTime: $filter('date')(self.startDate, 'yyyyMMddHHmm'),
                    endTime: $filter('date')(self.endDate, 'yyyyMMddHHmm'),
                    charIds: charIds
                })
                .then(function (value, responseHeaders) {
                    angular.forEach(value, function (value, key) {
                        if (($filter('filter')(self.kills, {killID: value.killID}, true)).length === 0) {

                            console.dir(value);

                            var characterID = value.moonID === 0 ? value.victim.characterID : value.moonID;
                            var characterName = value.moonID === 0 ? value.victim.characterName : '';

                            self.shipIds[value.victim.shipTypeID] = '';
                            self.sysIds[value.solarSystemID] = '';

                            if (characterName == '' && characterID != 0) self.moonIds[characterID] = '';

                            var topDamage = {id: -1, damage: 0};
                            angular.forEach(value.attackers, function (attacker) {
                                angular.forEach(self.crew, function (member, pos) {
                                    if (member.id == attacker.characterID) {
                                        self.crew[pos].killsDamage += attacker.damageDone;
                                        self.crew[pos].killsValue += value.zkb.totalValue;
                                        self.crew[pos].killsByDamageValue += value.victim.damageTaken === 0 ? 0 : (value.zkb.totalValue / value.victim.damageTaken) * attacker.damageDone;
                                        self.crew[pos].finalBlows += attacker.finalBlow ? 1 : 0;
                                        self.crew[pos].kills++;

                                        topDamage = (topDamage.damage < attacker.damageDone) ? {
                                            id: pos,
                                            damage: attacker.damageDone
                                        } : topDamage;

                                        //self.stats.killsByDamageValue += self.crew[pos].killsByDamageValue;
                                    }
                                });
                            });

                            if (topDamage.id != -1)
                                self.crew[topDamage.id].topDamage++;

                            var crewMember = characterID != 0 ? $filter('filter')(self.crew, {id: characterID}, false) : [];

                            self.kills.push({
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

                                self.stats.losses++;
                                self.stats.lossValue += value.zkb.totalValue;
                                self.stats.lossDamage += value.victim.damageTaken;
                            } else {
                                self.stats.kills++;
                                //self.stats.killValue += value.zkb.totalValue;
                                //self.stats.killDamage += value.victim.damageTaken;
                            }
                        }
                    });
                    angular.forEach(self.crew, function (member, pos) {
                        self.stats.killValue += member.killsValue;
                        self.stats.killDamage += member.killsDamage;
                        self.stats.killsByDamageValue += member.killsByDamageValue;
                        console.log("%s - %s", self.stats.killsByDamageValue, member.killsByDamageValue)
                    });
                    //value.victim.damageTaken === 0 ? 0 : (value.zkb.totalValue / value.victim.damageTaken) * attacker.damageDone;

                    //console.dir(self.stats);

                    searchEVENames();
                    self.kills = $filter('orderBy')(self.kills, '-killTime');
                    setChangeSSystemortKills();
                })
                .catch(function (err) {
                    $alert({
                        title: 'Add crew',
                        content: "NewEdit: " + err.status + ", " + err.statusText + " (" + err.url + ")",
                        type: 'danger'
                    });

                    console.log("View: %s, %s (%s)", err.status, err.statusText, err.url);
                })
                /*.finally(function () { })*/;

            charIds = '';
        }
        while (len < self.crew.length);
        //});
    }
);
