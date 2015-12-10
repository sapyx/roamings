'use strict';

class RoamsListController {
    rowSelected(roam, css_class) {
        roam.selectedCssClass = css_class;
    }

    useEvent(event) {
        var action = event.target.id;
        var row = angular.element(event.target).scope().row;

        switch (action) {
            case 'edit':
                this._state.go('roams.edit', {roamName: row.label});
                break;
            case 'remove':
                this.roamsList = this._filter('filter')(this.roamsList, {label: '!' + row.label}, false);

                this._readDB.deleteRoam(row.label, false);
                break;
            case 'open':
            //openRoam(label);
            //break;
            default:
                //console.dir(angular.element(event.target).scope().row)
                if (row.id)
                    this._state.go('roams.detail.remote', {roamId: row.id, roamName: row.label});
                else
                    this._state.go('roams.detail', {roamName: row.label});
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