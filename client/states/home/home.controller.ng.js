'use strict';

class HomeController {
    constructor($meteor) {
        $meteor.subscribe('configs').then((subscriptionHandle)=> {
            this.corporation = $meteor.collection(Configs, false, false)[0];

            subscriptionHandle.stop(); //stop the subscription
        });
    }
}

angular.module('roamingsApp').controller('HomeCtrl', HomeController);

