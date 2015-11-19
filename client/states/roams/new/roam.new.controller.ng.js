'use strict';

class RoamNewController {

    saveRoam = function (roamName) {
        console.log('RoamsNew: External \'Save Roam\' for %s, called', roamName);
    };

    removePilot = function (pilotName) {
        console.log('RoamsNew: External \'Remove Pilot\' for %s, called', pilotName);
    };

    addPilot = function (pilotName) {
        console.log('RoamsNew: External \'Add Pilot\' for %s, called', pilotName);
    };

    constructor() {
    };
}

angular.module('roamingsApp').controller('RoamNewCtrl', RoamNewController);