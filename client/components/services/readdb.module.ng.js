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
        var deferred = this._q.defer();

        if (roamId) {
            var subscriptionHandle = Meteor.subscribe('roams', null, {
                onReady: ()=> {
                    this._log.debug("onReady And roam actually arrive");

                    roam = Roams.findOne({_id: roamId});
                    this._log.debug(roam);

                    subscriptionHandle.stop(); //stop the subscription
                    deferred.resolve(roam);
                },
                onStop: (err) => {
                    if (err) {
                        this._log.error('An error happened - ' + err);
                        deferred.reject({error: err});
                    } else {
                        this._log.debug('The subscription stopped');
                    }
                }
            });
        } else {
            if (this._localStorageService.isSupported) {
                roam = this._localStorageService.get(roamName);

                this._log.debug(roam);

                if (!roam) {
                    deferred.reject({error: 'no roam'});
                } else {
                    deferred.resolve(roam);
                }
            }
        }
        return deferred.promise;
    }

    getRoamsList(isAuthenticated) {
        var defRemote = this._q.defer();
        var defLocal = this._q.defer();

        var subscriptionHandle = Meteor.subscribe('roams', null, {
            onReady: ()=> {
                this._log.debug("onReady And roams actually arrive");
                var remoteRows = [];

                var roams = Roams.find({});
                angular.forEach(roams, (value)=> {
                    if (angular.isObject(value)) {
                        remoteRows.push({
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
                defRemote.resolve(remoteRows);
            },
            onStop: (err) => {
                if (err) {
                    this._log.error('An error happened - ' + err);
                    //deferred.reject({error: err});
                } else {
                    this._log.debug('The subscription stopped');
                }
            }
        });

        if (this._localStorageService.isSupported) {
            var keys = this._localStorageService.keys();
            var localRows = [];

            angular.forEach(keys, (value)=> {
                var content = this._localStorageService.get(value);

                if (angular.isObject(content)) {
                    localRows.push({
                        'label': value,
                        'startDate': content.startDate,
                        'endDate': content.endDate,
                        'crew': content.crew.length,
                        'actions': true
                    });
                }
            });
            defLocal.resolve(localRows);
        }

        return this._q.all([defLocal.promise, defRemote.promise])
            .then((roamsLists)=> {
                var roamsList = [];

                angular.forEach(roamsLists, (rows) => {
                    angular.forEach(rows, (row) => {
                        roamsList.push(row);
                    });
                });

                return roamsList
            });
    }

    deleteRoam(roamName, isAuthenticated) {
        if (this._localStorageService.isSupported) {
            this._localStorageService.remove(roamName);

            return true
        } else {
            return false;
        }
    }

    constructor($q, $log, localStorageService) {
        this._localStorageService = localStorageService;
        this._log = $log;
        this._q = $q;
    }
}

angular.module('roamingsApp').service('readDB', readDBService);