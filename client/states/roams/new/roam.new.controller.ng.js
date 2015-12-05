'use strict';

class RoamNewController {
    _saveRoam(roamName) {
        this._log.info('RoamsNew: External \'Save Roam\' for %s, called', roamName);

        this._location.path('/roams');
    }

    _dismissRoam() {
        this._log.info('RoamsNew: External \'Dismiss Roam\' for unsaved roam, called');

        this._location.path('/roams');
    }

    _removePilot(pilotName) {
        this._log.info('RoamsNew: External \'Remove Pilot\' for %s, called', pilotName);
    }

    _addPilot(pilotName) {
        this._log.info('RoamsNew: External \'Add Pilot\' for %s, called', pilotName);
    }

    constructor($log, $location) {
        this._location = $location;
        this._log = $log;

        this.saveRoam = this._saveRoam.bind(this);
        this.dismissRoam = this._dismissRoam.bind(this);
        this.removePilot = this._removePilot.bind(this);
        this.addPilot = this._addPilot.bind(this);
    }
}

angular.module('roamingsApp').controller('RoamNewCtrl', RoamNewController);