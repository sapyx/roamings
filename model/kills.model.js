Kills = new Mongo.Collection('kills');

Kills.allow({
  insert: function(userId, kill) {
    return userId;
  },
  update: function(userId, kill, fields, modifier) {
    return userId;
  },
  remove: function(userId, kill) {
    return userId;
  }
});