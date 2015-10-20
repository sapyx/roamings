'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamsListCtrl
 * @requires $scope
 * @requires $filter
 * @requires $state
 * @requires localStorageService
 * @description
 * # RoamsListCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamsListCtrl', function ($scope, $filter, $state, localStorageService) {
        if (localStorageService.isSupported) {
            $scope.rowCollection = [];
            var keys = localStorageService.keys();

            $scope.open = {'title': "Open this roam"};
            $scope.edit = {'title': "Edit this roam"};
            $scope.delete = {'title': "Delete this roam"};

            angular.forEach(keys, function (value) {
                var content = localStorageService.get(value);

                $scope.rowCollection.push({
                    'label': value,
                    'startDate': content.startDate,
                    'endDate': content.endDate,
                    'crew': content.crew.length,
                    'actions': false
                });
            });
        }

        $scope.rowSelected = function (roam, selected) {
            roam.actions = selected;
        };

        $scope.useEvent = function ($event) {
            var action = $event.target.id;
            var label = angular.element($event.target).scope().row.label;

            switch (action) {
                case 'edit':
                    $state.go('roams.edit', {roamName: label});
                    break;
                case 'remove':
                    $scope.rowCollection = $filter('filter')($scope.rowCollection, {label: '!' + label}, false);

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
