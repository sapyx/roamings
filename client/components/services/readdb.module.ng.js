'use strict';

/**
 * @ngdoc service
 * @name roamingsApp.readDB
 * @requires
 * @requires

 * @description
 * # readDB
 * Service in the roamingsApp.

 */
angular.module('roamingsApp')
    .service('readDB', function (localStorageService) {
        var self = this;

        /**
         * @ngdoc property
         * @name roamingsApp.readDB#getRoam

         * @methodOf roamingsApp.readDB
         * @description
         * Method to test pilots against Eve and the zKillboard api
         * @example
         * readDB.getRoam (roamName, isAuthenticated);
         * @param {string} roamName Roam Name to retrieve
         * @param {boolean} isAuthenticated is User authenticated?
         */

        self.saveRoam = function (name, roam, isAuthenticated) {
            if (localStorageService.isSupported) {
                if (angular.isString(name) && angular.isObject(roam))
                    localStorageService.set(name, roam);
            }
        };

        self.getRoam = function (roamName, isAuthenticated) {
            if (localStorageService.isSupported) {
                var roam = localStorageService.get(roamName);

                if (!roam || roam.crew.length === 0) {
                    return false; // no roam or empty crew
                } else {
                    return roam;
                }
            } else
                return false; // no service


        };

        self.getRoamsList = function (isAuthenticated) {
            if (localStorageService.isSupported) {
                var rowCollection = [];
                var keys = localStorageService.keys();

                angular.forEach(keys, function (value) {
                    var content = localStorageService.get(value);
                    if (angular.isObject(content)) {
                        rowCollection.push({
                            'label': value,
                            'startDate': content.startDate,
                            'endDate': content.endDate,
                            'crew': content.crew.length,
                            'actions': false
                        });
                    }
                });

                return rowCollection;
            } else {
                return false;
            }
        };

        self.deleteRoam = function (roamName, isAuthenticated) {
            if (localStorageService.isSupported) {
                localStorageService.remove(roamName);

                return true
            } else {
                return false;
            }
        };
    }
);
