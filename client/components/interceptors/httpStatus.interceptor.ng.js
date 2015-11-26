/**
 * Created by Sapyx on 25/11/2015.
 */

"use strict";

angular.module('roamingsApp')
    .factory('httpStatusInterceptor', function ($q, $log) {
        return {
            'response': function (response) {
                $log.info(JSON.stringify(response));

                return response;
            },

            'responseError': function (rejection) {
                $log.info(JSON.stringify(rejection));

                return $q.reject(rejection);
            }
        };
    });

// register the interceptor via client.config.js
// $httpProvider.interceptors.push('httpStatusInterceptor');

