'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamsListCtrl
 * @requires $filter
 * @requires $state
 * @requires localStorageService
 * @description
 * # RoamsListCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamsListCtrl', function ($filter, $state, localStorageService) {
        var self = this;

        if (localStorageService.isSupported) {
            self.rowCollection = [];
            var keys = localStorageService.keys();

            self.open = {'title': "Open this roam"};
            self.edit = {'title': "Edit this roam"};
            self.delete = {'title': "Delete this roam"};

            angular.forEach(keys, function (value) {
                var content = localStorageService.get(value);

                self.rowCollection.push({
                    'label': value,
                    'startDate': content.startDate,
                    'endDate': content.endDate,
                    'crew': content.crew.length,
                    'actions': false
                });
            });
        }

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

                    if (localStorageService.isSupported) {
                        localStorageService.remove(label);
                    }
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
