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

    refreshImages() {
        if (!this._refreshed) {
            this._timeout(null, 1000)
                .then(()=>this._rootScope.$emit('lazyImg:refresh'));
            this._refreshed = !this._refreshed;
        }
    }

    constructor($rootScope, $scope, $compile, $alert, $state, $window, $timeout, defaultImages, readDB, manageKills) {
        this._scope = $scope;
        this._rootScope = $rootScope;
        this._compile = $compile;
        this._window = $window;
        this._timeout = $timeout;

        this.defaultImages = defaultImages;
        this.roamName = $state.params.roamName;

        var roamId = $state.params.roamId;

        this._refreshed = false;

        this._addCrewButton('#aside-button');

        // read data
        readDB.getRoam(this.roamName, roamId, false)
            .then((roam)=> {
                this.crew = angular.copy(roam.crew);

                this.startDate = roam.startDate;
                this.endDate = roam.endDate;
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
                            title: 'Get Roam',
                            content: err,
                            type: 'danger'
                        })
                    });
            })
            .catch((err)=> {
                $alert({
                    title: 'Get Kills',
                    content: "Detail: " + err.status + ", " + err.statusText + " (" + err.url + ")",
                    type: 'danger'
                });

                $state.go('roams.list');
            });
    }
}

angular.module('roamingsApp').controller('RoamDetailCtrl', RoamDetailController);