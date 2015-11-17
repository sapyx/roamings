'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('logoff', {
                // url: '/logoff',
                resolve: {
                    previousState: function ($state) {
                        return {Name: $state.current.name, Params: $state.params};
                    }
                },
                controller: function ($state, $meteor, previousState) {
                    $meteor.logout();

                    $state.go(previousState.Name, previousState.Params, {reload: false});
                }
            })
    });
