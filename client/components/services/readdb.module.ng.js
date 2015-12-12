'use strict';

/**
 * @ngdoc service
 * @name roamingsApp.readDB
 * @requires
 * @requires

 * @description
 * # readDB
 * Service in the roamingsApp.
 **/

class readDBService {
    saveRoam(name, roam, isAuthenticated) {
        if (this._localStorageService.isSupported) {
            if (angular.isString(name) && angular.isObject(roam))
                this._localStorageService.set(name, roam);
        }
    }

    getRoam(roamName, roamId, isAuthenticated) {
        var roam;

        if (roamId) {
            return this._meteor.subscribe('roams')
                .then((subscriptionHandle)=> {
                    roam = Roams.findOne({_id: roamId});

                    this._log.debug(roamId, roam);

                    subscriptionHandle.stop(); //stop the subscription

                    return roam;
                })
                .catch((err)=> {
                    return err;
                });
        } else {
            if (this._localStorageService.isSupported) {
                var deferred = this._q.defer();

                roam = this._localStorageService.get(roamName);

                this._log.debug(roam);

                if (!roam) {
                    deferred.reject({error: 'no roam'});
                } else {
                    deferred.resolve(roam);
                }

                return deferred.promise;
            }
        }
    }

    getRoamsList(isAuthenticated) {
        var rowCollection = [];

        this._meteor.subscribe('roams')
            .then((subscriptionHandle)=> {
                var roams = this._meteor.collection(Roams, false, false);

                angular.forEach(roams, (value)=> {
                    if (angular.isObject(value)) {
                        rowCollection.push({
                            'id': value._id,
                            'label': value.roam,
                            'startDate': value.startDate,
                            'endDate': value.endDate,
                            'crew': value.crew.length,
                            'actions': false
                        });
                    }
                });

                subscriptionHandle.stop(); //stop the subscription
            });

        if (this._localStorageService.isSupported) {
            var keys = this._localStorageService.keys();

            angular.forEach(keys, (value)=> {
                var content = this._localStorageService.get(value);
                if (angular.isObject(content)) {
                    rowCollection.push({
                        'label': value,
                        'startDate': content.startDate,
                        'endDate': content.endDate,
                        'crew': content.crew.length,
                        'actions': true
                    });
                }
            });
        }

        return rowCollection;
    }

    deleteRoam(roamName, isAuthenticated) {
        if (this._localStorageService.isSupported) {
            this._localStorageService.remove(roamName);

            return true
        } else {
            return false;
        }
    }

    constructor($q, $log, $meteor, localStorageService) {
        this._log = $log;
        this._q = $q;
        this._meteor = $meteor;
        this._localStorageService = localStorageService;
    }
}

angular.module('roamingsApp').service('readDB', readDBService);