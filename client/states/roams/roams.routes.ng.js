'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('roams', {
                url: '/roams',
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {label: 'Roams'}
            })
            .state('roams.list', {
                url: '/list',
                templateUrl: 'client/states/roams/list/roams.list.view.ng.html',
                controller: 'RoamsListCtrl as roamsList',
                ncyBreadcrumb: {label: 'List'}
            })
            .state('roams.new', {
                url: '/new',
                templateUrl: 'client/states/roams/new/roam.new.view.ng.html',
                controller: 'RoamNewCtrl as roamNew',
                ncyBreadcrumb: {label: 'New'}
            })
            .state('roams.detail', {
                url: '/detail/:roamName',
                templateUrl: 'client/states/roams/detail/roam.detail.view.ng.html',
                controller: 'RoamDetailCtrl as roamDetail',
                ncyBreadcrumb: {label: 'Detail', parent: 'roams.list'}
            })
            .state('roams.detail.remote', {
                url: '/:roamId',
                ncyBreadcrumb: {label: 'Detail remote', parent: 'roams.list'}
            })
            .state('roams.edit', {
                url: '/edit/:roamName',
                templateUrl: 'client/states/roams/edit/roam.edit.view.ng.html',
                controller: 'RoamEditCtrl as roamEdit',
                ncyBreadcrumb: {label: 'Edit', parent: 'roams.list'}
            });

    })
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when('/roams', '/roams/list');
    });