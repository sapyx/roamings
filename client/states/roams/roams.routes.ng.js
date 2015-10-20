'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('roams', {
                url: '/roams',
                abstract: true,
                template: '<ui-view/>',
                ncyBreadcrumb: {label: 'Roams'}
            })
            .state('roams.list', {
                url: '/list',
                templateUrl: 'client/states/roams/list/roams.list.view.ng.html',
                controller: 'RoamsListCtrl',
                ncyBreadcrumb: {label: 'List'}
            })
            .state('roams.new', {
                url: '/new',
                templateUrl: 'client/states/roams/new/roam.new.view.ng.html',
                controller: 'RoamNewCtrl',
                ncyBreadcrumb: {label: 'New'}
            })
            .state('roams.detail', {
                url: '/detail/:roamName',
                templateUrl: 'client/states/roams/detail/roam.detail.view.ng.html',
                controller: 'RoamDetailCtrl',
                ncyBreadcrumb: {label: 'Detail', parent: 'roams.list'}
            })
            .state('roams.edit', {
                url: '/edit/:roamName',
                templateUrl: 'client/states/roams/edit/roam.edit.view.ng.html',
                controller: 'RoamEditCtrl',
                ncyBreadcrumb: {label: 'Edit', parent: 'roams.list'}
            });

    })
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when('/roams', '/roams/list');
    });