'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'client/states/about/about.view.ng.html',
                controller: 'AboutCtrl as about',
                ncyBreadcrumb: {label: 'About'}
            });
    });