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
                    Meteor.loginWithEveonline({}, function (err) {
                        if (err) {
                            $alert({
                                title: 'Login',
                                content: err.reason || 'Unknown error',
                                type: 'error'
                            })
                        } else {
                            $state.go(PreviousState.Name, PreviousState.Params, {reload: false});
                        }
                    });

                }
            })
    });