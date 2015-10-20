'use strict';

angular.module('roamingsApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('err404', {
                url: '/error',
                templateUrl: 'client/states/404/404.view.ng.html',
                ncyBreadcrumb: {label: 'Error 404'}
            });
    });