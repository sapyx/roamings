'use strict';

class RoamDetailController {
    _addCrewButton(element) {
        var compileFunction = this._compile(
            '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#left-navbar-collapse" ' +
            'data-animation="am-slide-left" data-placement="left" data-template="client/states/roams/detail/crew-aside.tpl.ng.html" ' +
            'title="Crew" bs-aside="" data-container="body"> ' +
            '<span class="sr-only">Toggle Crew</span> ' +
            '<span class="glyphicon glyphicon-user"></span> ' +
            '</button>'); //compile HTML fragment

        angular.element(element).html(compileFunction(this._scope));

        this._scope.$on("$destroy", ()=> angular.element(element).html(''));
    }

    goZKbd(killCode) {
        this._window.open('https://beta.eve-kill.net/detail/' + killCode + '/')
    }

    constructor($scope, $compile, $alert, $stateParams, $state, $window, defaultImages, readDB, manageKills) {
        this._scope = $scope;
        this._compile = $compile;
        this._window = $window;

        this._addCrewButton('#aside-button');

        this.defaultImages = defaultImages;
        this.roamName = $stateParams.roamName;

        // read data
        var roam = readDB.getRoam(this.roamName, false);

        if (!roam) {
            $state.go('roams.list');
            return;
        } else {
            this.crew = angular.copy(roam.crew);

            this.startDate = roam.startDate;
            this.endDate = roam.endDate;
        }
        // end read data

        manageKills.getKillsForCrew(this.crew, this.startDate, this.endDate)
            .then((retval)=> {
                this.kills = retval.kills;

                this.sysIds = retval.sysIds;
                this.shipIds = retval.shipIds;
                this.moonIds = retval.moonIds;

                this.stats = retval.stats;
            })
            .catch((err)=> {
                $alert({
                    title: 'Add crew',
                    content: "Detail: " + err.status + ", " + err.statusText + " (" + err.url + ")",
                    type: 'danger'
                })
            });

    }
}

angular.module('roamingsApp').controller('RoamDetailCtrl', RoamDetailController);