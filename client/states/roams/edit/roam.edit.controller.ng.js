'use strict';

class RoamEditController {
    _saveRoam(roamName) {
        this._log.info('RoamsEdit: External \'Save Roam\' for %s, called', roamName);

        this._location.path('/roams');
    }

    _dismissRoam(roamName='') {
        this._log.info('RoamsEdit: External \'Dismiss Roam\' for %s, called', roamName);

        this._location.path('/roams');
    }

    _removePilot(pilotName) {
        this._log.info('RoamsEdit: External \'Remove Pilot\' for %s, called', pilotName);
    }

    _addPilot(pilotName) {
        this._log.info('RoamsEdit: External \'Add Pilot\' for %s, called', pilotName);
    }

    constructor($stateParams, $log, $location) {
        this._location = $location;
        this._log = $log;

        this.saveRoam = this._saveRoam.bind(this);
        this.dismissRoam = this._dismissRoam.bind(this);
        this.removePilot = this._removePilot.bind(this);
        this.addPilot = this._addPilot.bind(this);

        this.legend = 'Edit Roam <i>' + $stateParams.roamName + '</i>';
        this.roamName = $stateParams.roamName;
    }
}

angular.module('roamingsApp').controller('RoamEditCtrl', RoamEditController);