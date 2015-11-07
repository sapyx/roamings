'use strict';

Meteor.publish("configs", function () {
    return Configs.find({Type: 'Corporation'}, {limit: 1}, {fields: {Type: false}});
});