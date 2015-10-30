'use strict';

/**
 * @ngdoc controller
 * @name roamingsApp.controller:RoamDetailCtrl
 * @requires $scope
 * @requires $alert
 * @requires $stateParams
 * @requires $window
 * @requires $state
 * @requires $compile
 * @requires roamingsApp.manageKills
 * @requires roamingsApp.readDB
 * @requires roamingsApp.defaultImages
 * @description
 * # RoamDetailCtrl
 * Controller of the roamingsApp
 */
angular.module('roamingsApp')
    .controller('RoamDetailCtrl', function ($scope, $alert, $stateParams, $state, $window, $compile,
                                            defaultImages, readDB, manageKills) {

// --------- load button ---------------
        var compileFunction = $compile(
            '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#left-navbar-collapse" ' +
            'data-animation="am-slide-left" data-placement="left" data-template="client/states/roams/detail/crew-aside.tpl.ng.html" ' +
            'title="Crew" bs-aside="" data-container="body"> ' +
            '<span class="sr-only">Toggle Crew</span> ' +
            '<span class="glyphicon glyphicon-user"></span> ' +
            '</button>'); //compile HTML fragment

        var htmlOuputFromDirective = compileFunction($scope);
        $('#aside-button').html(htmlOuputFromDirective);

        $scope.$on("$destroy", function () {
            $('#aside-button').html('');
        });
// --------------------

        var self = this;

        self.defaultImages = defaultImages;

        self.roamName = $stateParams.roamName;

    // read data
       var roam = readDB.getRoam(self.roamName, false);

        if (!roam) {
            $state.go('roams.list');
            return;
        } else {
            self.crew = angular.copy(roam.crew);

            self.startDate = roam.startDate;
            self.endDate = roam.endDate;
        }
    // end read data

        self.goZKbd = function (url) {
            $window.open('https://beta.eve-kill.net/detail/' + url + '/');
        };

        manageKills.getKillsForCrew(self.crew, self.startDate, self.endDate)
            .then(function (retval) {
                self.kills = retval.kills;

                self.sysIds = retval.sysIds;
                self.shipIds = retval.shipIds;
                self.moonIds = retval.moonIds;

                self.stats = retval.stats;
            })
            .catch(function (err) {
                $alert({
                    title: 'Add crew',
                    content: "Detail: " + err.status + ", " + err.statusText + " (" + err.url + ")",
                    type: 'danger'
                })
            });
    }
);
