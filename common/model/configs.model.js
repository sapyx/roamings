Configs = new Mongo.Collection('configs');

Configs.allow({
  insert: function(userId, config) {
    return userId;
  },
  update: function(userId, config, fields, modifier) {
    return userId;
  },
  remove: function(userId, config) {
    return userId;
  }
});