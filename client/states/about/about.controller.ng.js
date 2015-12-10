'use strict';

class AboutController {
    constructor($meteor) {
        this.version = '0.8.5';
    };
}

angular.module('roamingsApp').controller('AboutCtrl', AboutController);