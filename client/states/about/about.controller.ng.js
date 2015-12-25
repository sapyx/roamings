'use strict';

class AboutController {
    constructor() {
        this.version = '0.8.5';
    };
}

angular.module('roamingsApp').controller('AboutCtrl', AboutController);