'use strict';

Meteor.publish("config_corp", function () {
    return Configs.find({Type: 'Corporation'}, {limit: 1}, {fields: {Type: 0}});
});
