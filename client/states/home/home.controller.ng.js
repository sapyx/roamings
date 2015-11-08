'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:MainCtrl
 * @requires $meteor
 * @description
 * # MainCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('HomeCtrl', function ($meteor) {
        var self = this;

        $meteor.subscribe('configs').then(function (subscriptionHandle) {
            self.corporation = $meteor.collection(Configs, false, false)[0];

            // You can use the subscription handle to stop the subscription if you want
            subscriptionHandle.stop();
        });
    });
