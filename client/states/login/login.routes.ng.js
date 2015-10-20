
'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/signIn',
                templateUrl: 'client/states/404/404.view.ng.html'
                /*
                resolve: {
                    PreviousState: function ($state) {
                        return {Name: $state.current.name, Params: $state.params};
                    }
                },
                controller: function ($state, $meteor, $filter, PreviousState) {
                    var serviceName = 'Eveonline';
                    var loginWithService = Meteor["loginWith" + serviceName];

                    var options = {}; // use default scope unless specified
                    if (Accounts.ui._options.requestPermissions[serviceName])
                        options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
                    if (Accounts.ui._options.requestOfflineToken[serviceName])
                        options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
                    if (Accounts.ui._options.forceApprovalPrompt[serviceName])
                        options.forceApprovalPrompt = Accounts.ui._options.forceApprovalPrompt[serviceName];

                    loginWithService(options, function (err) {
                        console.dir(err);
                    });

                    $state.go(PreviousState.Name, PreviousState.Params, {reload: true});
                }
*/            })
    });

