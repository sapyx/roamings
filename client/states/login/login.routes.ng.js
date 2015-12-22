'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                // url: '/login',
                //templateUrl: 'client/states/404/404.view.ng.html',
                template: '<h1>Logging in...</h1>',

                resolve: {
                    PreviousState: function ($state) {
                        return {Name: $state.current.name, Params: $state.params};
                    }
                },
                controller: function ($state, $alert, $log, PreviousState) {
                    Meteor.loginWithEveonline({}, function (err) {
                        if (err) {
                            $alert({
                                title: 'Login',
                                content: err.errorType + ': '+ err.message,
                                type: 'danger'
                            });
                            $log.debug('%s: %s',err.errorType, err.message);
                        }

                        $state.go(PreviousState.Name, PreviousState.Params, {reload: false});
                    });
                }
            })
    });