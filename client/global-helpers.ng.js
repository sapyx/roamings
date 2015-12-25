/**
 * Created by Sapyx on 25/12/2015.
 */

angular.module('roamingsApp')
    .run(function ($rootScope) {

        $rootScope.helpers({
            isLoggedInX() {
                return Meteor.userId() != null;
            },
            currentUserX() {
                return Meteor.user();
            },
            loggingInX(){
                return Meteor.loggingIn();
            }
        });
    });