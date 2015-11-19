'use strict';

class RoamEditController {

    saveRoam = function (roamName) {
        console.log('RoamsEdit: External \'Save Roam\' for %s, called', roamName);
    };

    removePilot = function (pilotName) {
        console.log('RoamsEdit: External \'Remove Pilot\' for %s, called', pilotName);
    };

    addPilot = function (pilotName) {
        console.log('RoamsEdit: External \'Add Pilot\' for %s, called', pilotName);
    };

    constructor($stateParams) {
        this.legend = 'Edit Roam <i>' + $stateParams.roamName + '</i>';
        this.roamName = $stateParams.roamName;
    };
}

angular.module('roamingsApp').controller('RoamEditCtrl', RoamEditController);