'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                // url: '/login',
                //templateUrl: 'client/states/404/404.view.ng.html',

                resolve: {
                    PreviousState: function ($state) {
                        return {Name: $state.current.name, Params: $state.params};
                    }
                },
                controller: function ($state, $alert, PreviousState) {
                    var serviceName = 'Eveonline';
                    var loginWithService = Meteor["loginWith" + serviceName];

                    var options = {};

                    loginWithService(options, function (err) {
                        if (err) {
                            $alert({
                                title: 'Login',
                                content: err.reason || 'Unknown error',
                                type: 'error'
                            })
                        }
                    });

                    $state.go(PreviousState.Name, PreviousState.Params, {reload: false});
                }
            })
    });


