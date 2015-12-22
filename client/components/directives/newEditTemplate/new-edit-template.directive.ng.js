'use strict';
class newEditTemplateController {
    saveRoam() {
        this._readDB.saveRoam(this.roamName, {
            startDate: this.startDate,
            endDate: this.endDate,
            crew: angular.copy(this.crew) //this._pilots.pilotAffiliation(this.crew)
        });

        this.roamSave()(this.roamName);  //Call external scope's function

        // this._location.path('/roams'); redirect in external function
    }

    dismissRoam() {
        this.roamDismiss()(this.roamName); //Call external scope's function

        // this._location.path('/roams'); redirect in external function
    }

    removePilot() {
        this.pilotRemove()(this.pilotName); //Call external scope's function

        this.crew = this._filter('filter')(this.crew, {name: '!' + this.pilotName}, true);
    }

    addPilots() {
        if (+this.pilotName === +this.pilotName) { //is number
            //--------------
            this._zKbdRestangular.all('kills').all('no-items').one('killID', this.pilotName).get()
                .then((value) => {
                    this.inTesting = true;

                    angular.forEach(value[0].attackers, (value) => {
                        var pilotInCrew = this._filter('filter')(this.crew, {name: value.characterName}, true);
                        if (pilotInCrew.length === 0) {
                            this.pilotAdd()(value.characterName);  //Call external scope's function

                            this.crew.push({
                                name: value.characterName,
                                id: value.characterID,
                                inZkbd: true
                            });
                        }
                    });

                    this.inTesting = false;
                })
                .catch((err) => {
                    this._log.debug('%s: %s',err.errorType, err.message);
                    this._alert({
                        title: 'Add crew',
                        content: "Mass Add: " + err.message,
                        type: 'danger'
                    });
                });

            this.pilotName = '';
        } else
            this._addPilot();
    }

    _addPilot() {
        var pilotInCrew = this._filter('filter')(this.crew, {name: this.pilotName}, true);

        if (pilotInCrew.length === 0) {
            this.inTesting = true;

            this._pilots.testPilot(this.pilotName)
                .then((pilot) => {
                    // pilotName: pilot.name, eveIsPresent: true, zkbIsPresent: isPresent
                    if (angular.isObject(pilot)) {
                        if (pilot.eveIsPresent) {
                            this.crew.push({name: pilot.name, id: pilot.id, inZkbd: pilot.zkbIsPresent});

                            if (pilot.zkbIsPresent) {
                                this._alert({
                                    title: 'Add crew',
                                    content: 'Pilot ' + pilot.name + ' exists in EVE AND in zKillboard.',
                                    type: 'info'
                                });

                            } else {
                                this._alert({
                                    title: 'Add crew',
                                    content: 'Pilot ' + pilot.name + ' NOT exists in zKillboard.',
                                    type: 'warning'
                                });
                            }
                        }
                        else {
                            this._alert({
                                title: 'Add crew',
                                content: 'Pilot ' + pilot.name + ' NOT exists in EVE.',
                                type: 'danger'
                            });
                        }
                    }
                    else {
                        this._alert({
                            title: 'Add crew',
                            content: pilot,
                            type: 'danger'
                        });
                    }
                })
                .catch((err) => {
                    this._alert({
                        title: 'Add crew',
                        content: "NewEdit: " + err.errorType + ", " + err.message,
                        type: 'danger'
                    });

                    this._log.debug('New Edit - %s: %s',err.errorType, err.message);
                })
                .finally(() => {
                    this.pilotName = "";
                    this.inTesting = false;
                });

        } else {
            this._alert({
                title: 'Add crew',
                content: 'Pilot ' + this.pilotName + ' already present.',
                type: 'danger'
            });
        }

        this.pilotAdd()(this.pilotName);  //Call external scope's function
    }

    selectPilot(pilotName) {
        this.pilotName = pilotName;
    }

    constructor($log, $filter, $alert, pilots, restAPIs, readDB) {
        this._filter = $filter;
        this._alert = $alert;
        this._pilots = pilots;
        this._log = $log;
        this._readDB = readDB;

        this._zKbdRestangular = restAPIs.zKbdRestangular;
        //this._eveApiRestangular = restAPIs.eveApiRestangular;

        this.crew = [];
        this.inTesting = false;

        if (this.isEdit) { // read data; only local for now.
            readDB.getRoam(this.roamName)
                .then((roam)=> {
                    $log.debug(roam);

                    this.startDate = roam.startDate;
                    this.endDate = roam.endDate;
                    this.crew = roam.crew;
                })
                .catch((err)=> {
                    $log.debug('%s: %s',err.errorType, err.message);
                    $alert({
                        title: 'Edit roam',
                        content: err,
                        type: 'danger'
                    });

                    this.dismissRoam();
                });
        }
    }
}

/**
 * @ngdoc directive
 * @name roamingsApp.directive:newEditTemplate
 * @description
 * # newEditTemplate
 */
angular.module('roamingsApp')
    .directive('newEditTemplate', () => {
        return {
            restrict: 'EA',
            scope: true,
            bindToController: {
                legend: '=',
                isEdit: '=',
                roamName: '=?',
                roamSave: '&',
                roamDismiss: '&',
                pilotAdd: '&',
                pilotRemove: '&'
            },
            controller: newEditTemplateController,
            controllerAs: 'newEditCtrl',
            templateUrl: 'client/components/directives/newEditTemplate/newedit.tpl.ng.html'
        };
    });

