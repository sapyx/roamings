'use strict';

class newEditTemplatecontroller {

    saveRoam() {
        $scope.roamSave()($scope.roamName);  //Call external scope's function

        if (localStorageService.isSupported) {
            localStorageService.set($scope.roamName, {
                startDate: $scope.startDate,
                endDate: $scope.endDate,
                crew: angular.copy($scope.crew)
            });
        }

        $location.path('/roams');
    }

    removePilot() {
        $scope.pilotRemove()($scope.pilotName); //Call external scope's function

        $scope.crew = $filter('filter')($scope.crew, {name: '!' + $scope.pilotName}, true);
    }

    addPilots() {
        if (+$scope.pilotName === +$scope.pilotName) //is number
            zKillboardAPI.apiCall(
                'kills/killID/:killID/no-items/', {killID: $scope.pilotName})
                .then(function (value, responseHeaders) {
                    $scope.inTesting = true;

                    angular.forEach(value[0].attackers, function (value, key) {
                        console.dir(value);

                        var pilotInCrew = $filter('filter')($scope.crew, {name: value.characterName}, true);
                        if (pilotInCrew.length === 0) {
                            $scope.pilotAdd()(value.characterName);  //Call external scope's function

                            $scope.crew.push({
                                name: value.characterName,
                                id: value.characterID,
                                inZkbd: true
                            });
                        }
                    });

                    $scope.inTesting = false;
                })
                .catch(function (err) {
                    $alert({
                        title: 'Add crew',
                        content: "Mass Add: " + err.status + ", " + err.statusText + " (" + err.url + ")",
                        type: 'danger'
                    });
                })
                /*.finally(function () { })*/;
        else
            $scope.addPilot();
    }

    addPilot() {
        $scope.pilotAdd()($scope.pilotName);  //Call external scope's function

        var pilotInCrew = $filter('filter')($scope.crew, {name: $scope.pilotName}, true);
        if (pilotInCrew.length === 0) {
            $scope.inTesting = true;

            pilots.testPilot($scope.pilotName)
                .then(function (pilot) {
                    // pilotName: pilot.name, eveIsPresent: true, zkbIsPresent: isPresent
                    if (angular.isObject(pilot)) {
                        if (pilot.eveIsPresent) {
                            $scope.crew.push({name: pilot.name, id: pilot.id, inZkbd: pilot.zkbIsPresent});

                            if (pilot.zkbIsPresent) {
                                $alert({
                                    title: 'Add crew',
                                    content: 'Pilot ' + pilot.name + ' exists in EVE AND in zKillboard.',
                                    type: 'info'
                                });

                            } else {
                                $alert({
                                    title: 'Add crew',
                                    content: 'Pilot ' + pilot.name + ' NOT exists in zKillboard.',
                                    type: 'warning'
                                });
                            }
                        }
                        else {
                            $alert({
                                title: 'Add crew',
                                content: 'Pilot ' + pilot.name + ' NOT exists in EVE.',
                                type: 'danger'
                            });
                        }
                    }
                    else {
                        $alert({
                            title: 'Add crew',
                            content: pilot,
                            type: 'danger'
                        });
                    }
                })
                .catch(function (err) {
                    $alert({
                        title: 'Add crew',
                        content: "NewEdit: " + err.status + ", " + err.statusText + " (" + err.url + ")",
                        type: 'danger'
                    });

                    console.log("NewEdit: %s, %s (%s)", err.status, err.statusText, err.url);
                })
                .finally(function () {
                    $scope.pilotName = "";
                    $scope.inTesting = false;
                });

        } else {
            $alert({
                title: 'Add crew',
                content: 'Pilot ' + $scope.pilotName + ' already present.',
                type: 'danger'
            });
        }

    }

    constructor($scope, $filter, $alert, $location, $templateCache, localStorageService, pilots, zKillboardAPI) {
        $scope.crew = [];
        $scope.inTesting = false;

        if ($scope.isEdit) { // read data
            if (localStorageService.isSupported)
                var roam = localStorageService.get($scope.roamName);

            if (!roam)
                $location.path('/roams');

            //$scope.roamName = roamName;
            $scope.crew = angular.copy(roam.crew);
            $scope.startDate = roam.startDate;
            $scope.endDate = roam.endDate;
        } // end read data

        $scope.selectPilot = this._selectPilot;
        $scope.saveRoam = this._saveRoam;
        $scope.removePilot = this._removePilot;
        $scope.addPilots = this._addPilots;
        $scope.addPilot = this._addPilot;
        $scope.selectPilot = this._selectPilot;
        $scope.pilotName = this._pilotName;
    }
}