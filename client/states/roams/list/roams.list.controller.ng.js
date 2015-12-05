'use strict';

class RoamsListController {
    rowSelected(roam, css_class) {
        roam.selectedCssClass = css_class;
    }

    useEvent(event) {
        var action = event.target.id;
        var label = angular.element(event.target).scope().row.label;

        switch (action) {
            case 'edit':
                this._state.go('roams.edit', {roamName: label});
                break;
            case 'remove':
                this.roamsList = this._filter('filter')(this.roamsList, {label: '!' + label}, false);

                this._readDB.deleteRoam(label, false);
                break;
            case 'open':
            //openRoam(label);
            //break;
            default:
                this._state.go('roams.detail', {roamName: label});
                break;
        }
    }

    constructor($filter, $state, readDB) {
        this._filter = $filter;
        this._state = $state;
        this._readDB = readDB;

        this.open = {'title': "Open this roam"};
        this.edit = {'title': "Edit this roam"};
        this.remove = {'title': "Delete this roam"};

        this.roamsList = this._readDB.getRoamsList(false);
    }
}

angular.module('roamingsApp').controller('RoamsListCtrl', RoamsListController);