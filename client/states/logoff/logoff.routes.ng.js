'use strict';

angular.module('roamingsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('logoff', {
                resolve: {
                    PreviousState: function ($state) {
                        return {Name: $state.current.name, Params: $state.params};
                    }
                },
                controller: function ($state, PreviousState) {
                    Meteor.logout();

                    $state.go(PreviousState.Name, PreviousState.Params, {reload: true});
                }
            })
    });
