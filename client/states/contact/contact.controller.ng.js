'use strict';

class ContactController {
    constructor(defaultImages) {
        this.defaultImages = defaultImages;

        this.author = {Id: 905954997, Name: 'Anne Sapyx'};
    }
}

angular.module('roamingsApp').controller('ContactCtrl', ContactController);
