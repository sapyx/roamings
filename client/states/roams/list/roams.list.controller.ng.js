'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamsListCtrl
 * @requires $filter
 * @requires $state
 * @requires readDB
 * @description
 * # RoamsListCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamsListCtrl', function ($filter, $state, readDB) {
        var self = this;

        self.open = {'title': "Open this roam"};
        self.edit = {'title': "Edit this roam"};
        self.delete = {'title': "Delete this roam"};

        self.rowCollection = readDB.getRoamsList(false);

        self.rowSelected = function (roam, selected) {
            roam.actions = selected;
        };

        self.useEvent = function ($event) {
            var action = $event.target.id;
            var label = angular.element($event.target).scope().row.label;

            switch (action) {
                case 'edit':
                    $state.go('roams.edit', {roamName: label});
                    break;
                case 'remove':
                    self.rowCollection = $filter('filter')(self.rowCollection, {label: '!' + label}, false);

                    readDB.deleteRoam(label, false);
                    break;
                case 'open':
                //openRoam(label);
                //break;
                default:
                    $state.go('roams.detail', {roamName: label});
                    break;
            }
        };
    });
