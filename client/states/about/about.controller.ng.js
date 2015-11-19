'use strict';

class AboutController {
    constructor($meteor) {
        this.version = '0.7.9';
    };
}

angular.module('roamingsApp').controller('AboutCtrl', AboutController);