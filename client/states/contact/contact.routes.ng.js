'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                templateUrl: 'client/states/contact/contact.view.ng.html',
                controller: 'ContactCtrl',
                ncyBreadcrumb: {label: 'Contact'}
            });
    });