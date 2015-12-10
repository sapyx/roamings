'use strict';

Meteor.publish("roams", function () {
    return Roams.find();
});