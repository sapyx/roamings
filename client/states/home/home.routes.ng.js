'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'client/states/home/home.view.ng.html',
                controller: 'HomeCtrl as home',
                ncyBreadcrumb: {label: 'Home'}
            });
    });